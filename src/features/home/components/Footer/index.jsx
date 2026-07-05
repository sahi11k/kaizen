import React from "react";
import { FOOTER_LINKS } from "@/features/home/constants";
import { DEFAULT_NAV_ROUTE } from "@/shared/constants";
import { Link } from "react-router";
import { Button } from "@/shared/ui";
import { ThemeToggle } from "@/features/theme";

const FooterMain = () => {
  return (
    <footer className="px-6 pt-10 md:pt-14">
      <div className="flex flex-col xl:max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center gap-6 pb-16 md:pb-20">
          <h2 className="heading-2 tracking-tight">
            Start small
            <br />
            <span className="italic text-primary"> Stay consistent</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-md">
            That&apos;s all Kaizen asks.
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
          <div className="flex items-center gap-6 text-text-muted">
            {FOOTER_LINKS.map(({ label, href, Icon }) => (
              <FooterLink key={label} href={href}>
                <Icon />
              </FooterLink>
            ))}
            <ThemeToggle
              tooltipSide="top"
              tooltipLevel="footer"
              className="!w-5 !h-5 xl:!w-6 xl:!h-6 !p-0 text-muted-foreground hover:!text-primary hover:!bg-transparent"
            />
          </div>
          <div className="font-serif body-description text-center">
            KAIZEN
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
      className="w-5 h-5 xl:w-6 xl:h-6 text-muted-foreground hover:text-primary transition-colors"
    >
      {children}
    </a>
  );
};

export default FooterMain;
