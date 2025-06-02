import React from "react";
import GithubIcon from "@/assets/icons/github.svg?react";
import TwitterIcon from "@/assets/icons/twitter.svg?react";
import MailIcon from "@/assets/icons/mail.svg?react";
import LinkedInIcon from "@/assets/icons/linkedin.svg?react";
import styles from "./style.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__socials}>
        <p className={styles.footer__socialsTitle}>Keep Zening.</p>
        <p className={styles.footer__socialLinks}>
          <a
            href="mailto:sahil511kumar@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MailIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/sahi11k/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://github.com/sahi11k/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
          </a>
          <a
            href="https://x.com/sahi11k/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </a>
        </p>
      </div>
      <div className={styles.footer__copyright}>
        <div> &copy; {new Date().getFullYear()} Zenten</div>
      </div>
    </footer>
  );
};

export default Footer;
