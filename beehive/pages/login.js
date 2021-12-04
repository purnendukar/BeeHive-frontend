import { useState } from "react";
import { useRouter } from "next/router";

import styles from "../styles/LoginSignup.module.css";
import LoginSignup from "../components/login_signup";
import { login } from "../apis/auth";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const loginSubmit = async (event) => {
    event.preventDefault();

    const body = JSON.stringify({
      email: event.target.email.value,
      password: event.target.password.value,
    });

    const [status, result] = await login(body);

    switch (status) {
      case 200:
        if (typeof window !== "undefined") {
          localStorage.setItem("token", result["token"]);
        }
        router.push("/board");
        break;
      case 400:
        setErrorMessage("Invalid input");
        break;
      case 401:
        setErrorMessage("Enter valid email or password");
        break;
      default:
        setErrorMessage("Opp's Something went wrong.");
    }
  };

  return (
    <LoginSignup>
      <div className={styles.login_signup_form_section}>
        <p className={styles.welcome}>Welcome to BeeHive</p>
        <p className={styles.info}>Your Personal Project Manager</p>
        <form onSubmit={loginSubmit} className={styles.login_signup_form}>
          <span className={styles.errorMessage}>{errorMessage}</span>
          <input
            id="email"
            type="text"
            autoComplete="email"
            placeholder="Email"
            required
          />
          <input
            id="password"
            type="password"
            autoComplete="password"
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className={styles.info}>
          Don't have an account?{" "}
          <a href="/signup" className={styles.redirect_link}>
            Sign Up
          </a>
        </p>
      </div>
    </LoginSignup>
  );
}
