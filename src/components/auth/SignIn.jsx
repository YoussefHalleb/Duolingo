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
    <div className="min-h-screen bg-gradient-to-r from-indigo-400 to-indigo-600 flex justify-center items-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-300 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-1/2 -right-20 w-60 h-60 bg-cyan-300 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-indigo-300 rounded-full opacity-20 blur-xl"></div>
      </div>
      
      <div className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl flex z-10">
        {/* Left side - Image and welcome text */}
        <div className="hidden lg:block w-1/2 relative bg-gradient-to-br from-indigo-500 to-purple-600 p-12 text-white">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <img src="/pics/hi.png" alt="Logo" className="w-20" />
              <h2 className="text-4xl font-bold">Language Explorer</h2>
            </div>
            <h3 className="text-3xl font-bold mb-6">Welcome Back!</h3>
            <p className="text-lg opacity-90 mb-8">Continue your language learning journey with us. Practice, learn, and master new languages.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <i className="fas fa-globe text-xl"></i>
                </div>
                <p>Access to multiple languages</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <i className="fas fa-microphone text-xl"></i>
                </div>
                <p>Interactive pronunciation practice</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <i className="fas fa-chart-line text-xl"></i>
                </div>
                <p>Track your progress</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full lg:w-1/2">
          <form className="p-8 lg:p-12" onSubmit={handleSubmit} noValidate>
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h3>
              <p className="text-gray-600">Welcome back! Please enter your details.</p>
            </div>
          
          {errors.general && (
            <div className="flex items-center gap-2 p-3 mb-5 bg-red-50 text-red-600 border border-red-600 rounded">
              <FaExclamationCircle /> {errors.general}
            </div>
          )}
          
          <div className="space-y-6">
            <div className="relative">
              <div className="relative">
                <input 
                  className={`w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800 text-base border ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all pl-10`}
                  type="email" 
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => handleInputChange(e, setEmail)}
                  required
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaUser className="text-lg" />
                </span>
              </div>
              {errors.email && (
                <div className="flex items-center gap-1 text-red-600 text-sm mt-1 pl-1">
                  <FaExclamationCircle className="text-xs" /> {errors.email}
                </div>
              )}
            </div>
            
            <div className="relative">
              <div className="relative">
                <input 
                  className={`w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-800 text-base border ${
                    errors.password ? 'border-red-500' : 'border-gray-200'
                  } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all pl-10`}
                  type="password" 
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => handleInputChange(e, setPassword)}
                  required
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaLock className="text-lg" />
                </span>
              </div>
              {errors.password && (
                <div className="flex items-center gap-1 text-red-600 text-sm mt-1 pl-1">
                  <FaExclamationCircle className="text-xs" /> {errors.password}
                </div>
              )}
          </div>
          
            </div>
            
            <div className="mt-8 space-y-6">
              <button 
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-base font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 text-gray-500 bg-white">Or continue with</span>
                </div>
              </div>

              <button 
                className="w-full py-3 px-4 bg-white border-2 border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transform hover:scale-[1.02] transition-all duration-200 focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                type="button"
                onClick={signInWithGoogle}
                disabled={isSubmitting}
              >
                <FaGoogle className="text-xl text-red-500" />
                Sign in with Google
              </button>
            </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">Don't have an account yet?{' '}
              <Link className="text-indigo-600 hover:text-purple-600 font-medium transition-colors" to="/SignUp">
                Sign up for free
              </Link>
            </p>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;