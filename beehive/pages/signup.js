import { useState } from "react";
import { useRouter } from "next/router";

import styles from "../styles/LoginSignup.module.css";
import LoginSignup from "../components/login_signup";
import { signup } from "../apis/auth";

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const signupSubmit = async (event) => {
    event.preventDefault();

    const body = JSON.stringify({
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    });

    const [status, result] = await signup(body);

    switch (status) {
      case 201:
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
        <form onSubmit={signupSubmit} className={styles.login_signup_form}>
          <span className={styles.errorMessage}>{errorMessage}</span>
          <input
            id="first_name"
            type="text"
            autoComplete="first_name"
            placeholder="First Name"
            required
          />
          <input
            id="last_name"
            type="text"
            autoComplete="last_name"
            placeholder="Last Name"
            required
          />
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
          <input
            id="confirm_password"
            type="password"
            autoComplete="confirm_password"
            placeholder="Confirm Password"
            required
          />
          <button type="submit">SignUp</button>
        </form>
        <p className={styles.info}>
          Already have an account?{" "}
          <a href="/login" className={styles.redirect_link}>
            Login
          </a>
        </p>
      </div>
    </LoginSignup>
  );
}
