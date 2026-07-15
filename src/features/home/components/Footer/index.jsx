import React from "react";
import { FOOTER_LINKS } from "@/features/home/constants";
import { DEFAULT_NAV_ROUTE } from "@/shared/constants";
import { Link } from "react-router";
import { Button } from "@/shared/ui";
import { ThemeToggle } from "@/features/theme";

const FooterMain = () => {
  return (
    <footer className="pt-16 xl:pt-24">
      <div className="flex flex-col">
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center gap-6 pb-16 xl:pb-24 px-6 xl:px-0">
          <h1 className="heading-1">
            Start small,
            <br />
            <span className="italic text-primary"> Stay consistent</span>
          </h1>
          <p className="text-muted-foreground text-base max-w-md">
            That&apos;s all Kaizen asks.
          </p>
          <Link to={DEFAULT_NAV_ROUTE}>
            <Button variant="default" className="shadow-none mt-2">
              Get Started
            </Button>
          </Link>
        </div>
        <div className="border-t border-border/50">
          <div className="flex gap-4 flex-col md:flex-row justify-between items-center py-4 px-6 xl:px-0 w-full xl:max-w-7xl mx-auto">
            <div className="flex items-center gap-8 md:gap-6 text-subtle-foreground">
              {FOOTER_LINKS.map(({ label, href, Icon }) => (
                <FooterLink key={label} href={href}>
                  <Icon />
                </FooterLink>
              ))}
              <ThemeToggle
                tooltipSide="top"
                tooltipLevel="footer"
                className="!w-5 !h-5 xl:!w-6 xl:!h-6 !p-0 text-subtle-foreground hover:!text-foreground hover:!bg-transparent"
              />
            </div>
            <div className="heading-6 tracking-[4px] !text-lg !text-subtle-foreground">
              KAIZEN
            </div>
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
      className="w-5 h-5 xl:w-6 xl:h-6 text-subtle-foreground hover:text-foreground transition-colors"
    >
      {children}
    </a>
  );
};

export default FooterMain;
