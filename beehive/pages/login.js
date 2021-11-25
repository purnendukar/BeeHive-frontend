import styles from "../styles/Login.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.container_box}></div>
      <div className={`${styles.container_box} ${styles.login_section}`}>
        <div className={styles.login_form_section}>
          <div className={styles.welcome}>Welcome to BeeHive</div>
          <div className={styles.description}>
            Your Personal Project Manager
          </div>
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
              className="asdad ,asd sad as asd asd "
              placeholder="Password"
              required
            />
            <button type="submit" className={styles.login_button}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
