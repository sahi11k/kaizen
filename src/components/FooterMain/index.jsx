import React from "react";
import { FOOTER_LINKS } from "@/constants/footer";
import { Link } from "react-router";

const FooterMain = () => {
  return (
    <footer className="min-h-50 bg-card px-6">
      <div className="flex flex-col  xl:max-w-[80vw] mx-auto">
        <div className="flex justify-between py-12 w-full gap-12">
          <div className="flex flex-col gap-2">
            <div className="heading-3">kaïzen.</div>
            <p className="body-description">
              Bringing you the best of the best.
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span className="heading-3">Navigate</span>
            <div className="flex justify-center flex-col body-description">
              {/* <Link to="/dashboard">Dashboard</Link> */}
              <Link to="/dashboard/pomodoro">Pomodoro</Link>
              <Link to="/dashboard/journals">Journals</Link>
              <Link to="/dashboard/bookmarks">Bookmarks</Link>
            </div>
          </div>
        </div>
        <div className="flex gap-4 flex-col md:flex-row justify-between items-center border-t border-border py-6 w-full">
          <div className="flex gap-6 text-text-muted">
            {FOOTER_LINKS.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.icon}
              </FooterLink>
            ))}
          </div>
          <div className="body-description text-center">
            &copy; {new Date().getFullYear()} Kaizen, All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-5 h-5 xl:w-6 xl:h-6 text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </a>
  );
};

export default FooterMain;
