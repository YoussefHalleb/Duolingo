import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaExclamationCircle, FaGoogle } from 'react-icons/fa';
import { useAuth } from "./AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });
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
  }, [email, password]);

  const validateForm = () => {
    const newErrors = { email: "", password: "", general: "" };
    let isValid = true;

    if (!email) {
      newErrors.email = "L'email est requis";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Veuillez entrer un email valide";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Le mot de passe est requis";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrors({ ...errors, general: "" });

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Connexion réussie:", userCredential.user);
        setIsLoggedIn(true); // Met à jour le statut de connexion
          console.log("isLoggedIn est maintenant:", true);
        navigate('/home');
      })
      .catch((error) => {
        console.error("Erreur de connexion:", error.message);
        let errorMessage = "Une erreur est survenue lors de la connexion";
        
        switch(error.code) {
          case "auth/user-not-found":
            errorMessage = "Aucun utilisateur trouvé avec cet email";
            break;
          case "auth/wrong-password":
            errorMessage = "Mot de passe incorrect";
            break;
          case "auth/too-many-requests":
            errorMessage = "Trop de tentatives. Veuillez réessayer plus tard";
            break;
          case "auth/invalid-email":
            errorMessage = "Email invalide";
            break;
        }
        
        setErrors({ ...errors, general: errorMessage });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const signInWithGoogle = async () => {
    try {
      setIsSubmitting(true);
      setErrors({ ...errors, general: "" });
      
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Connexion Google réussie:", result.user);
      setIsLoggedIn(true); // Met à jour le statut de connexion
      navigate('/home');
    } catch (error) {
      console.error("Erreur de connexion Google:", error.message);
      setErrors({ ...errors, general: "Échec de la connexion avec Google" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
    if (e.target.value.trim() !== "") {
      e.target.classList.add('has-val');
    } else {
      e.target.classList.remove('has-val');
    }
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-400 to-indigo-600 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg overflow-hidden shadow-lg">
        <form className="p-8" onSubmit={handleSubmit} noValidate>
          <span className="block text-3xl text-gray-800 text-center mb-10">Connexion</span>
          
          {errors.general && (
            <div className="flex items-center gap-2 p-3 mb-5 bg-red-50 text-red-600 border border-red-600 rounded">
              <FaExclamationCircle /> {errors.general}
            </div>
          )}
          
          <div className="relative mb-6">
            <div className="relative">
              <input 
                className={`w-full h-12 bg-transparent pl-8 text-base text-gray-600 border-b-2 ${errors.email ? 'border-red-500' : 'border-gray-400'} focus:border-indigo-500 outline-none transition-colors has-val`}
                type="email" 
                name="email"
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
                required
              />
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"><FaUser /></span>
            </div>
            {errors.email && (
              <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
                <FaExclamationCircle /> {errors.email}
              </div>
            )}
          </div>
          
          <div className="relative mb-6">
            <div className="relative">
              <input 
                className={`w-full h-12 bg-transparent pl-8 text-base text-gray-600 border-b-2 ${errors.password ? 'border-red-500' : 'border-gray-400'} focus:border-indigo-500 outline-none transition-colors has-val`}
                type="password" 
                name="password"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
                required
              />
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"><FaLock /></span>
            </div>
            {errors.password && (
              <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
                <FaExclamationCircle /> {errors.password}
              </div>
            )}
          </div>
          
          <div className="flex justify-center mb-4 mt-5">
            <button 
              className="w-full h-12 bg-gradient-to-r from-cyan-400 to-purple-500 text-white rounded-lg uppercase text-base font-medium hover:from-cyan-500 hover:to-purple-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </div>

          <div className="flex items-center my-5">
            <div className="flex-1 border-b border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">OU</span>
            <div className="flex-1 border-b border-gray-300"></div>
          </div>

          <div className="flex justify-center mb-4">
            <button 
              className="w-full h-12 bg-white border border-gray-300 rounded-lg text-gray-600 text-base font-medium hover:bg-gray-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              type="button"
              onClick={signInWithGoogle}
              disabled={isSubmitting}
            >
              <FaGoogle className="text-red-600 text-lg" />
              Se connecter avec Google
            </button>
          </div>
          
          <div className="flex justify-center items-center mt-12 gap-1">
            <span className="text-sm text-gray-400">Vous n'avez pas de compte?</span>
            <Link className="text-sm text-indigo-500 hover:text-purple-600 transition-colors" to="/SignUp">S'inscrire</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;