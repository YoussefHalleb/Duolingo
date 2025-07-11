import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";

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
  }, []);

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
      navigate('/SignIn');
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
    <div className="login-container">
      <div className="container-login">
        <form className="login-form" onSubmit={signUp}>
          <span className="login-form-title">Créer un compte</span>
          
          {errors.general && (
            <div className="alert alert-danger">
              <span className="error-icon">!</span> {errors.general}
            </div>
          )}
          
          <div className="input-container">
            <div className="wrap-input">
              <input 
                className={`input ${errors.nom && touched.nom ? 'input-error' : ''}`} 
                type="text" 
                name="nom"
                value={nom}
                onChange={(e) => handleInputChange(e, setNom)}
                onBlur={handleBlur}
              />
              <span className="focus-input" data-placeholder="Nom"></span>
              {errors.nom && touched.nom && <div className="error-message">{errors.nom}</div>}
            </div>
          </div>
          
          <div className="input-container">
            <div className="wrap-input">
              <input 
                className={`input ${errors.email && touched.email ? 'input-error' : ''}`} 
                type="email" 
                name="email"
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
                onBlur={handleBlur}
              />
              <span className="focus-input" data-placeholder="Email"></span>
              {errors.email && touched.email && <div className="error-message">{errors.email}</div>}
            </div>
          </div>
          
          <div className="input-container">
            <div className="wrap-input">
              <input 
                className={`input ${errors.password && touched.password ? 'input-error' : ''}`} 
                type="password" 
                name="password"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
                onBlur={handleBlur}
              />
              <span className="focus-input" data-placeholder="Mot de passe"></span>
              {errors.password && touched.password && <div className="error-message">{errors.password}</div>}
            </div>
          </div>
          
          <div className="input-container">
            <div className="wrap-input">
              <input 
                className={`input ${errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}`} 
                type="password" 
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => handleInputChange(e, setConfirmPassword)}
                onBlur={handleBlur}
              />
              <span className="focus-input" data-placeholder="Confirmer le mot de passe"></span>
              {errors.confirmPassword && touched.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
            </div>
          </div>
          
          <div className="container-login-form-btn">
            <button 
              className="login-form-btn" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Inscription en cours...' : 'S\'inscrire'}
            </button>
          </div>
          
          <div className="text-center">
            <span className="txt1">Vous avez déjà un compte?</span>
            <Link className="txt2" to="/SignIn">Se connecter</Link>
          </div>
        </form>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        body {
          width: 100%;
          min-height: 100vh;
          background-image: linear-gradient(rgba(126,101,254,255), rgba(126,101,254,255));
          background-position: center;
          background-size: cover;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 15px;
        }

        .login-container {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .container-login {
          width: 500px;
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 3px 20px 0 rgba(0,0,0,.1);
        }

        .login-form {
          width: 100%;
          padding: 30px;
        }

        .login-form-title {
          display: block;
          font-size: 30px;
          color: #333;
          line-height: 1.2;
          text-align: center;
          padding-bottom: 44px;
        }

        .input-container {
          margin-bottom: 25px;
          position: relative;
        }

        .wrap-input {
          width: 100%;
          position: relative;
          border-bottom: 2px solid #adadad;
        }

        .input {
          font-size: 15px;
          color: #555;
          line-height: 1.2;
          display: block;
          width: 100%;
          height: 45px;
          background: transparent;
          padding: 0 5px;
          border: none;
          outline: none;
        }

        .input-error + .focus-input::before {
          background: #ff3860 !important;
        }

        .error-message {
          color: #ff3860;
          font-size: 12px;
          position: absolute;
          bottom: -20px;
          left: 0;
          height: 20px;
        }

        .focus-input {
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
        }

        .focus-input::before {
          content: "";
          display: block;
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #6a7dfe;
          transition: all .4s;
        }

        .focus-input::after {
          font-size: 15px;
          color: #adadad;
          content: attr(data-placeholder);
          display: block;
          width: 100%;
          position: absolute;
          top: 16px;
          left: 5px;
          transition: all .4s;
        }

        .input:focus + .focus-input::after {
          top: -15px;
          font-size: 13px;
        }

        .input:focus + .focus-input::before {
          width: 100%;
        }

        .has-val + .focus-input::after {
          top: -15px;
          font-size: 13px;
        }

        .has-val + .focus-input::before {
          width: 100%;
        }

        .alert {
          padding: 10px 15px;
          margin-bottom: 20px;
          border-radius: 4px;
          font-size: 14px;
        }

        .alert-danger {
          background-color: #ffebee;
          color: #ff3860;
          border: 1px solid #ff3860;
          display: flex;
          align-items: center;
        }

        .error-icon {
          display: inline-block;
          width: 20px;
          height: 20px;
          background-color: #ff3860;
          color: white;
          border-radius: 50%;
          text-align: center;
          line-height: 20px;
          margin-right: 10px;
          font-weight: bold;
        }

        .container-login-form-btn {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding-bottom: 13px;
          margin-top: 20px;
        }

        .login-form-btn {
          font-size: 15px;
          border: none;
          border-radius: 10px;
          color: #fff;
          line-height: 1.2;
          text-transform: uppercase;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 50px;
          background: #6a7dfe;
          background: linear-gradient(to left, #21d4fd, #b721ff);
          transition: all .4s;
          cursor: pointer;
        }

        .login-form-btn:hover:not(:disabled) {
          background: linear-gradient(to right, #21d4fd, #b721ff);
        }

        .login-form-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .text-center {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 50px;
        }

        .txt1 {
          font-size: 14px;
          color: #adadad;
          line-height: 1.5;
          padding-right: 5px;
        }

        .txt2 {
          font-size: 14px;
          color: #6a7dfe;
          line-height: 1.5;
          text-decoration: none;
          transition: all .4s;
        }

        .txt2:hover {
          color: #b721ff;
        }
      `}</style>
    </div>
  );
};

export default SignUp;