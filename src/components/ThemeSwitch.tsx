import React from "react";
import styles from "./ThemeSwitch.module.css";

type ThemeSwitchProps = {
  isDarkMode: boolean;
  onToggle: () => void;
};

export default function ThemeSwitch({ isDarkMode, onToggle }: ThemeSwitchProps) {
  return (
    <div className={styles.toggleWrapper}>
      <input
        className={styles.toggleCheckbox}
        type="checkbox"
        checked={isDarkMode}
        onChange={onToggle}
        aria-label="Toggle global theme"
      />
      <div className={styles.toggleContainer}>
        <div className={styles.toggleButton}>
          <div className={styles.toggleButtonCirclesContainer}>
            <div className={styles.toggleButtonCircle} />
            <div className={styles.toggleButtonCircle} />
            <div className={styles.toggleButtonCircle} />
            <div className={styles.toggleButtonCircle} />
            <div className={styles.toggleButtonCircle} />
            <div className={styles.toggleButtonCircle} />
            <div className={styles.toggleButtonCircle} />
            <div className={styles.toggleButtonCircle} />
            <div className={styles.toggleButtonCircle} />
            <div className={styles.toggleButtonCircle} />
            <div className={styles.toggleButtonCircle} />
            <div className={styles.toggleButtonCircle} />
          </div>
        </div>
      </div>
    </div>
  );
}
