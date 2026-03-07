import React from "react";
import { FOOTER_LINKS } from "@/features/home/constants";
import { DEFAULT_NAV_ROUTE } from "@/shared/constants";
import { Link } from "react-router";
import { Button } from "@/shared/ui";

const FooterMain = () => {
  return (
    <footer className="px-6 pt-16  md:pt-24 ">
      <div className="flex flex-col xl:max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center gap-6 pb-16 md:pb-20">
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight">
            Ready to level up?
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-md">
            Build better habits, stay focused, and reflect on your growth — all
            in one place.
          </p>
          <Link to={DEFAULT_NAV_ROUTE}>
            <Button
              variant="default"
              className="shadow-none mt-2 px-8 h-12 text-base"
            >
              Get Started
            </Button>
          </Link>
        </div>
        <div className="flex gap-4 flex-col md:flex-row justify-between items-center border-t border-border py-6 w-full">
          <div className="flex gap-6 text-text-muted">
            {FOOTER_LINKS.map(({ label, href, Icon }) => (
              <FooterLink key={label} href={href}>
                <Icon />
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
