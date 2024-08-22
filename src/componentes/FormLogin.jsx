import React, { useState } from 'react';  
import "./style.css";
import foto from "../assets/background.jpg";

function LoginForm({ onLogin }) { 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "user" && password === "pass") {
      onLogin(); 
    } else {
      alert("Credenciais inválidas");
    }
  };

  return (
    <section className="login-form">
      <img className="back" src={foto} alt="background" />
      <form onSubmit={handleSubmit}>
        <span className="span signIn">Sign in</span>
        <input
          className="inputs"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email or Mobile number"
        />
        <input
          className="inputs"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <div className="divButtons">
          <button className="btn um" type="submit">Sign in</button>
          <span className="span OR">OR</span>
          <button className="btn dois" type="button">Use a Sign-in Code</button>
          <a className="link" href="#">Forgot password?</a>
        </div>
        <div className="conteudo">
          <div className="checkbox">
            <input type="checkbox" name="Remember me" id="Remember me" />
            <span className="span Remember">Remember me</span>
          </div>
          <div className="info">
            <span className="span New">New to Netflix?<a className="link" href="#"> Sign up now.</a></span>
            <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. <a className="link" href="#">Learn more.</a></p>
          </div>
        </div>
      </form>
    </section>
  );
}

export default LoginForm;
