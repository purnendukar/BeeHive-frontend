import { useState } from "react";
import { useRouter } from "next/router";

import styles from "../../styles/Sprint.module.css";
import Sidebar from "../../../../components/sidebar";

export default function Task() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Sidebar></Sidebar>
    </div>
  );
}
