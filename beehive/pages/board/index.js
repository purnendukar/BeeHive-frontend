import { useState } from "react";
import { useRouter } from "next/router";

import styles from "../../styles/Board.module.css";
import Sidebar from "../../components/sidebar";

export default function Board() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Sidebar></Sidebar>
    </div>
  );
}
