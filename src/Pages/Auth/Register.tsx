import React, { FormEvent, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import "./Auth.scss";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export interface FormData {
  email: string;
  password: string;
  username?: string;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    username: "",
  });

  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, email, password } = formData;

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setFormData({ email: "", password: "", username: "" });
      await updateProfile(user, {
        displayName: username,
      });
      await setDoc(doc(db, "glucoseData", user.uid), {});
      await setDoc(doc(db, "glucosePredictions", user.uid), {});

      user && navigate("/");
      console.log(user || "No user");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="content">
        <h1>Plan Your Daily Life</h1>
        <p>Join over 30,000 people planning and monitoring their lifestyles</p>
        <ul>
          <li>Improved organization and time management</li>
          <li>Enhanced collaboration</li>
          <li>Flexibility and customization</li>
        </ul>
      </div>
      <div className="registration-form">
        <h2>Get started with DiabiTech</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Enter Your Username..."
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email..."
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Your Password"
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        {/* <span>or</span> */}
        <div className="social-login">
          <button>Google</button>
          <button>Facebook</button>
        </div>
        <p>Already have an account? Login</p>
      </div>
    </div>
  );
};

export default Register;
