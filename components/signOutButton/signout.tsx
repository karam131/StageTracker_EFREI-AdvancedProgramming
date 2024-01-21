import React from "react";
import styles from './signOut.module.css';
import { PowerIcon } from "@heroicons/react/20/solid";

const Signout = () => {
  return (
    <button className={styles.button}>
      <span className={styles.text}>sign out</span>
      <span className={styles.icon}>
      <PowerIcon className="w-6" />
      </span>
    </button>
  );
};

export default Signout;
