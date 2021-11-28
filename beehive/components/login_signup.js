import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import styles from "../styles/LoginSignup.module.css";

export default function LoginSignup({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      router.push("/board");
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container_box}>
        <Image
          src="/assets/images/communication.png"
          alt="Login SignUp"
          width={1200}
          height={1000}
          priority
        />
      </div>
      <div className={`${styles.container_box} ${styles.login_section}`}>
        {children}
      </div>
    </div>
  );
}
