import Image from "next/image";

import styles from "../styles/Login.module.css";
import { login } from "../apis/auth";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.container_box}>
        <Image
          src="/assets/images/communication.png"
          alt="Login SignUp"
          width={1200}
          height={1000}
        />
      </div>
      <div className={`${styles.container_box} ${styles.login_section}`}>
        <div className={styles.login_form_section}>
          <div className={styles.welcome}>Welcome to BeeHive</div>
          <div className={styles.info}>Your Personal Project Manager</div>
          <form className={styles.login_form}>
            <input
              type="text"
              autoComplete="email"
              placeholder="Email"
              required
            />
            <input
              type="password"
              autoComplete="password"
              placeholder="Password"
              required
            />
            <button type="submit">Login</button>
          </form>
          <p className={styles.info}>
            Don't have an account?{" "}
            <a href="/signup" className={styles.signup_link}>
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
