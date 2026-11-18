import React from "react";
import { Link, useLocation } from "react-router";
import { Logo, Tooltip } from "@/shared/ui";
import { SIDEBAR_LINKS } from "@/features/dashboard/constants";

const SidebarContent = ({ setOpen, isMobile = false, isCollapsed = false }) => {
  return (
    <>
      <div className="h-16 flex justify-between items-center">
        <Logo
          showText={!isCollapsed}
          className="-ml-1"
          link="/"
          iconClassName="!w-7 !h-7"
          textClassName="!text-2xl"
        />
      </div>
      <ul className="flex-1 flex flex-col space-y-1 overflow-y-auto no-scrollbar -mx-2 cursor-pointer">
        {SIDEBAR_LINKS.map((link) => (
          <LinkItem
            key={link.to}
            setOpen={setOpen}
            isMobile={isMobile}
            isCollapsed={isCollapsed}
            {...link}
          />
        ))}
      </ul>
    </>
  );
};

const LinkItem = ({
  to,
  label,
  Icon,
  IconFilled,
  setOpen,
  isMobile,
  isCollapsed,
}) => {
  const location = useLocation();
  const isActive =
    to === "/dashboard"
      ? location.pathname === to
      : location.pathname === to || location.pathname.startsWith(`${to}/`);
  const ActiveIcon = isActive ? IconFilled : Icon;
  const link = (
    <Link to={to} key={to} aria-label={isCollapsed ? label : undefined}>
      <li
        className={`p-2 rounded-lg flex items-center gap-2 ${
          isActive
            ? "bg-sidebar-active text-sidebar-active-foreground hover:bg-sidebar-active"
            : "text-sidebar-muted-foreground hover:bg-sidebar-hover hover:text-sidebar-hover-foreground"
        }`}
        onClick={() => isMobile && setOpen((prev) => !prev)}
      >
        <span>
          <ActiveIcon fill="currentColor" />
        </span>
        {!isCollapsed && (
          <span
            className={`whitespace-nowrap ${
              isActive ? "text-nav-item-active" : "text-nav-item"
            }`}
          >
            {label}
          </span>
        )}
      </li>
    </Link>
  );

  if (!isCollapsed) {
    return link;
  }

  return (
    <Tooltip content={label} side="right" sideOffset={12} level="header">
      {link}
    </Tooltip>
  );
};

export default SidebarContent;
