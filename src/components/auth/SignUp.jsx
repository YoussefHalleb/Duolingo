import { useState, useEffect } from "react";
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
    <div className="min-h-screen bg-gradient-to-r from-indigo-400 to-indigo-600 flex justify-center items-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-300 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-cyan-300 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-0 right-1/3 w-40 h-40 bg-indigo-300 rounded-full opacity-20 blur-xl"></div>
      </div>
      
      <div className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl flex z-10">
        {/* Left side - Form */}
        <div className="w-full lg:w-1/2">
          <form className="p-8 lg:p-12" onSubmit={signUp}>
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h3>
              <p className="text-gray-600">Join our community of language learners</p>
            </div>
          
          {errors.general && (
            <div className="flex items-center gap-2 p-3 mb-5 bg-red-50 text-red-600 border border-red-600 rounded">
              <span className="w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">!</span> {errors.general}
            </div>
          )}
          
          <div className="space-y-6">
            <div className="relative">
              <div className="relative">
                <input 
                  className={`w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800 text-base border ${
                    errors.nom && touched.nom ? 'border-red-500' : 'border-gray-200'
                  } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all`}
                  type="text" 
                  name="nom"
                  placeholder="Enter your name"
                  value={nom}
                  onChange={(e) => handleInputChange(e, setNom)}
                  onBlur={handleBlur}
                />
              </div>
              {errors.nom && touched.nom && (
                <div className="flex items-center gap-1 text-red-600 text-sm mt-1 pl-1">
                  <i className="fas fa-exclamation-circle text-xs"></i> {errors.nom}
                </div>
              )}
            </div>

            <div className="relative">
              <div className="relative">
                <input 
                  className={`w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800 text-base border ${
                    errors.email && touched.email ? 'border-red-500' : 'border-gray-200'
                  } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all`}
                  type="email" 
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => handleInputChange(e, setEmail)}
                  onBlur={handleBlur}
                />
              </div>
              {errors.email && touched.email && (
                <div className="flex items-center gap-1 text-red-600 text-sm mt-1 pl-1">
                  <i className="fas fa-exclamation-circle text-xs"></i> {errors.email}
                </div>
              )}
            </div>

            <div className="relative">
              <div className="relative">
                <input 
                  className={`w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800 text-base border ${
                    errors.password && touched.password ? 'border-red-500' : 'border-gray-200'
                  } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all`}
                  type="password" 
                  name="password"
                  placeholder="Choose a password"
                  value={password}
                  onChange={(e) => handleInputChange(e, setPassword)}
                  onBlur={handleBlur}
                />
              </div>
              {errors.password && touched.password && (
                <div className="flex items-center gap-1 text-red-600 text-sm mt-1 pl-1">
                  <i className="fas fa-exclamation-circle text-xs"></i> {errors.password}
                </div>
              )}
            </div>

            <div className="relative">
              <div className="relative">
                <input 
                  className={`w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800 text-base border ${
                    errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-200'
                  } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all`}
                  type="password" 
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => handleInputChange(e, setConfirmPassword)}
                  onBlur={handleBlur}
                />
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="flex items-center gap-1 text-red-600 text-sm mt-1 pl-1">
                  <i className="fas fa-exclamation-circle text-xs"></i> {errors.confirmPassword}
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8">
            <button 
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-base font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">Already have an account?{' '}
              <Link className="text-indigo-600 hover:text-purple-600 font-medium transition-colors" to="/SignIn">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
        </div>

        {/* Right side - Image and features */}
        <div className="hidden lg:block w-1/2 relative bg-gradient-to-br from-purple-500 to-indigo-600 p-12 text-white">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <img src="/pics/hi.png" alt="Logo" className="w-20" />
              <h2 className="text-4xl font-bold">Language Explorer</h2>
            </div>
            <h3 className="text-3xl font-bold mb-6">Start Your Journey!</h3>
            <p className="text-lg opacity-90 mb-8">Join our community and discover a new way to learn languages. Practice pronunciation, track progress, and connect with learners worldwide.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <i className="fas fa-check text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Free Access</h3>
                  <p className="opacity-80">Get started with basic features at no cost</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <i className="fas fa-users text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Community</h3>
                  <p className="opacity-80">Learn together with global community</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <i className="fas fa-star text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Achievement System</h3>
                  <p className="opacity-80">Earn rewards as you progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;