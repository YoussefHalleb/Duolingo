import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";


const SignUp = () => {
  const [nom, setNom] = useState("");  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    nom: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: ""
  });
  const [touched, setTouched] = useState({
    nom: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    if (email !== "") {
      document.querySelector('input[name="email"]')?.classList.add('has-val');
    }
    if (password !== "") {
      document.querySelector('input[name="password"]')?.classList.add('has-val');
    }
    if (nom !== "") {
      document.querySelector('input[name="nom"]')?.classList.add('has-val');
    }
    if (confirmPassword !== "") {
      document.querySelector('input[name="confirmPassword"]')?.classList.add('has-val');
    }
  }, [nom, email, password, confirmPassword]);

  const validateField = (name, value) => {
    let error = "";
    
    switch(name) {
      case "nom":
        if (!value.trim()) {
          error = "Le nom est requis";
        } else if (value.length < 2) {
          error = "Le nom doit contenir au moins 2 caractères";
        }
        break;
      case "email":
        if (!value) {
          error = "L'email est requis";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Veuillez entrer un email valide";
        }
        break;
      case "password":
        if (!value) {
          error = "Le mot de passe est requis";
        } else if (value.length < 6) {
          error = "Le mot de passe doit contenir au moins 6 caractères";
        } else if (!/[A-Z]/.test(value)) {
          error = "Le mot de passe doit contenir au moins une majuscule";
        } else if (!/[0-9]/.test(value)) {
          error = "Le mot de passe doit contenir au moins un chiffre";
        }
        break;
      case "confirmPassword":
        if (!value) {
          error = "Veuillez confirmer votre mot de passe";
        } else if (value !== password) {
          error = "Les mots de passe ne correspondent pas";
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter(value);
    
    if (value.trim() !== "") {
      e.target.classList.add('has-val');
    } else {
      e.target.classList.remove('has-val');
    }
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
    
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      nom: validateField("nom", nom),
      email: validateField("email", email),
      password: validateField("password", password),
      confirmPassword: validateField("confirmPassword", confirmPassword),
      general: ""
    };
    
    setErrors(newErrors);
    setTouched({
      nom: true,
      email: true,
      password: true,
      confirmPassword: true
    });
    
    return !Object.values(newErrors).some(error => error);
  };

  const signUp = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setErrors(prev => ({ ...prev, general: "" }));

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(userCredential.user, {
        displayName: nom
      });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        nom: nom,
        email: email,
        createdAt: new Date(),
        uid: userCredential.user.uid
      });

      console.log("Inscription réussie", userCredential.user);
      setIsLoggedIn(true); // Met à jour le statut de connexion
      navigate('/home'); // Redirige directement vers home au lieu de SignIn
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      let errorMessage = "Une erreur est survenue lors de l'inscription";
      
      switch(error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Cet email est déjà utilisé";
          break;
        case "auth/weak-password":
          errorMessage = "Le mot de passe doit contenir au moins 6 caractères";
          break;
        case "auth/invalid-email":
          errorMessage = "Email invalide";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Opération non autorisée";
          break;
        case "auth/too-many-requests":
          errorMessage = "Trop de tentatives. Veuillez réessayer plus tard";
          break;
      }
      
      setErrors(prev => ({ ...prev, general: errorMessage }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-400 to-indigo-600 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg overflow-hidden shadow-lg">
        <form className="p-8" onSubmit={signUp}>
          <span className="block text-3xl text-gray-800 text-center mb-10">Créer un compte</span>
          
          {errors.general && (
            <div className="flex items-center gap-2 p-3 mb-5 bg-red-50 text-red-600 border border-red-600 rounded">
              <span className="w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">!</span> {errors.general}
            </div>
          )}
          
          <div className="relative mb-6">
            <div className="relative">
              <input 
                className={`w-full h-12 bg-transparent pl-2 text-base text-gray-600 border-b-2 ${errors.nom && touched.nom ? 'border-red-500' : 'border-gray-400'} focus:border-indigo-500 outline-none transition-colors has-val`} 
                type="text" 
                name="nom"
                value={nom}
                onChange={(e) => handleInputChange(e, setNom)}
                onBlur={handleBlur}
              />
              <span className={`absolute left-0 top-4 text-gray-400 text-base transition-all duration-400 ${nom ? 'top-[-15px] text-sm' : ''}`}>Nom</span>
            </div>
            {errors.nom && touched.nom && <div className="text-red-600 text-sm mt-1">{errors.nom}</div>}
          </div>
          
          <div className="relative mb-6">
            <div className="relative">
              <input 
                className={`w-full h-12 bg-transparent pl-2 text-base text-gray-600 border-b-2 ${errors.email && touched.email ? 'border-red-500' : 'border-gray-400'} focus:border-indigo-500 outline-none transition-colors has-val`} 
                type="email" 
                name="email"
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
                onBlur={handleBlur}
              />
              <span className={`absolute left-0 top-4 text-gray-400 text-base transition-all duration-400 ${email ? 'top-[-15px] text-sm' : ''}`}>Email</span>
            </div>
            {errors.email && touched.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
          </div>
          
          <div className="relative mb-6">
            <div className="relative">
              <input 
                className={`w-full h-12 bg-transparent pl-2 text-base text-gray-600 border-b-2 ${errors.password && touched.password ? 'border-red-500' : 'border-gray-400'} focus:border-indigo-500 outline-none transition-colors has-val`} 
                type="password" 
                name="password"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
                onBlur={handleBlur}
              />
              <span className={`absolute left-0 top-4 text-gray-400 text-base transition-all duration-400 ${password ? 'top-[-15px] text-sm' : ''}`}>Mot de passe</span>
            </div>
            {errors.password && touched.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
          </div>
          
          <div className="relative mb-6">
            <div className="relative">
              <input 
                className={`w-full h-12 bg-transparent pl-2 text-base text-gray-600 border-b-2 ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-400'} focus:border-indigo-500 outline-none transition-colors has-val`} 
                type="password" 
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => handleInputChange(e, setConfirmPassword)}
                onBlur={handleBlur}
              />
              <span className={`absolute left-0 top-4 text-gray-400 text-base transition-all duration-400 ${confirmPassword ? 'top-[-15px] text-sm' : ''}`}>Confirmer le mot de passe</span>
            </div>
            {errors.confirmPassword && touched.confirmPassword && <div className="text-red-600 text-sm mt-1">{errors.confirmPassword}</div>}
          </div>
          
          <div className="flex justify-center mb-4 mt-5">
            <button 
              className="w-full h-12 bg-gradient-to-r from-cyan-400 to-purple-500 text-white rounded-lg uppercase text-base font-medium hover:from-cyan-500 hover:to-purple-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Inscription en cours...' : 'S\'inscrire'}
            </button>
          </div>
          
          <div className="flex justify-center items-center mt-12 gap-1">
            <span className="text-sm text-gray-400">Vous avez déjà un compte?</span>
            <Link className="text-sm text-indigo-500 hover:text-purple-600 transition-colors" to="/SignIn">Se connecter</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;