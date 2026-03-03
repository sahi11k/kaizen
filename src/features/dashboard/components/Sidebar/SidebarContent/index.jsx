import React from "react";
import { Link, useLocation } from "react-router";
import { Logo } from "@/shared/ui";
import { SIDEBAR_LINKS } from "@/features/dashboard/constants";

const SidebarContent = ({ setOpen, isMobile = false }) => {
  return (
    <>
      <div className="h-16 flex justify-between items-center">
        <Logo
          showText={false}
          className="-ml-1"
          iconClassName="size-8"
          link="/"
        />
      </div>
      <ul className="flex-1 flex flex-col space-y-1 overflow-y-auto -mx-2 cursor-pointer">
        {SIDEBAR_LINKS.map((link) => (
          <LinkItem
            key={link.to}
            setOpen={setOpen}
            isMobile={isMobile}
            {...link}
          />
        ))}
      </ul>
    </>
  );
};

const LinkItem = ({ to, label, Icon, IconFilled, setOpen, isMobile }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const ActiveIcon = isActive ? IconFilled : Icon;
  return (
    <Link to={to} key={to}>
      <li
        className={`p-2 rounded-lg hover:bg-muted font-medium flex items-center gap-2 ${
          isActive
            ? "bg-primary-container text-primary-container-foreground hover:!bg-primary-container"
            : "text-muted-foreground"
        }`}
        onClick={() => isMobile && setOpen((prev) => !prev)}
      >
        <span>
          <ActiveIcon fill="currentColor" />
        </span>
        <span className="whitespace-nowrap">{label}</span>
      </li>
    </Link>
  );
};

export default SidebarContent;
