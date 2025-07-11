import React, { useState, useEffect } from "react";
import { 
  signInWithEmailAndPassword,
  signInWithPopup 
} from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaExclamationCircle, FaGoogle } from 'react-icons/fa';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (email !== "") {
      document.querySelector('input[name="email"]')?.classList.add('has-val');
    }
    if (password !== "") {
      document.querySelector('input[name="password"]')?.classList.add('has-val');
    }
  }, []);

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
    <div className="login-container">
      <div className="container-login">
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <span className="login-form-title">Connexion</span>
          
          {errors.general && (
            <div className="alert alert-danger">
              <FaExclamationCircle /> {errors.general}
            </div>
          )}
          
          <div className="wrap-input">
            <input 
              className={`input ${errors.email ? 'is-invalid' : ''}`}
              type="email" 
              name="email"
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
              required
            />
            <span className="focus-input" data-placeholder="Email">
              <FaUser className="input-icon" />
            </span>
            {errors.email && (
              <div className="invalid-feedback">
                <FaExclamationCircle /> {errors.email}
              </div>
            )}
          </div>
          
          <div className="wrap-input">
            <input 
              className={`input ${errors.password ? 'is-invalid' : ''}`}
              type="password" 
              name="password"
              value={password}
              onChange={(e) => handleInputChange(e, setPassword)}
              required
            />
            <span className="focus-input" data-placeholder="Mot de passe">
              <FaLock className="input-icon" />
            </span>
            {errors.password && (
              <div className="invalid-feedback">
                <FaExclamationCircle /> {errors.password}
              </div>
            )}
          </div>
          
          <div className="container-login-form-btn">
            <button 
              className="login-form-btn" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </div>

          <div className="separator">
            <span className="separator-text">OU</span>
          </div>

          <div className="container-login-form-btn">
            <button 
              className="google-login-btn"
              type="button"
              onClick={signInWithGoogle}
              disabled={isSubmitting}
            >
              <FaGoogle className="google-icon" />
              Se connecter avec Google
            </button>
          </div>
          
          <div className="text-center">
            <span className="txt1">Vous n'avez pas de compte?</span>
            <Link className="txt2" to="/SignUp">S'inscrire</Link>
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

        .wrap-input {
          width: 100%;
          position: relative;
          border-bottom: 2px solid #adadad;
          margin-bottom: 10px;
        }

        .input {
          font-size: 15px;
          color: #555;
          line-height: 1.2;
          display: block;
          width: 100%;
          height: 45px;
          background: transparent;
          padding: 0 5px 0 30px;
          border: none;
          outline: none;
        }

        .input.is-invalid {
          border-bottom-color: #ff3860;
        }

        .input-icon {
          position: absolute;
          left: 5px;
          top: 50%;
          transform: translateY(-50%);
          color: #adadad;
          font-size: 15px;
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

        .input:focus + .focus-input::before {
          width: 100%;
        }

        .has-val + .focus-input::before {
          width: 100%;
        }

        .input.is-invalid + .focus-input::before {
          background: #ff3860;
          width: 100%;
        }

        .invalid-feedback {
          color: #ff3860;
          font-size: 12px;
          margin-top: 5px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .alert {
          padding: 10px 15px;
          margin-bottom: 20px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .alert-danger {
          background-color: #ffebee;
          color: #ff3860;
          border: 1px solid #ff3860;
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

        .google-login-btn {
          font-size: 15px;
          border: none;
          border-radius: 10px;
          color: #555;
          line-height: 1.2;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 50px;
          background: #fff;
          border: 1px solid #ddd;
          transition: all .4s;
          cursor: pointer;
          gap: 10px;
        }

        .google-login-btn:hover:not(:disabled) {
          background: #f5f5f5;
          border-color: #ccc;
        }

        .google-login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .google-icon {
          color: #DB4437;
          font-size: 18px;
        }

        .separator {
          display: flex;
          align-items: center;
          margin: 20px 0;
        }

        .separator::before,
        .separator::after {
          content: "";
          flex: 1;
          border-bottom: 1px solid #ddd;
        }

        .separator-text {
          padding: 0 10px;
          color: #777;
          font-size: 14px;
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

export default SignIn;