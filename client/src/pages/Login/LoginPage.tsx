import { useNavigate } from "react-router-dom";
import "./login-page.css";
import type { FormEvent } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      navigate("/home");
    } catch (err) {
      throw new Error("Bad request");
    }
  };

  return (
    <>
      <section className="login-page">
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="identifiant">Identififiant</label>
          <input name="identifiant" type="text" />

          <label htmlFor="password">Mot de passe</label>
          <input name="password" type="password" />

          <button type="submit">Se connecter</button>
        </form>
      </section>
    </>
  );
}

export default LoginPage;
