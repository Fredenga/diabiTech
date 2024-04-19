import React, { FormEvent, useState } from "react";
import "./Auth.scss";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { FormData } from "./Register";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setFormData({ email: "", password: "" });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="content">
        <h1>Welcome Back to DiabiTech</h1>
        <p>Join over 30,000 people planning and monitoring their lifestyles</p>
        <ul>
          <li>Improved organization and time management</li>
          <li>Enhanced collaboration</li>
          <li>Flexibility and customization</li>
        </ul>
      </div>
      <div className="registration-form">
        <h2>Sign in into your Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email..."
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter your password..."
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
        {/* <span>or</span> */}
        <div className="social-login">
          <button>Google</button>
        </div>
        <p>Don't have an account? Register</p>
      </div>
    </div>
  );
};

export default Login;
