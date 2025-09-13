import React from "react";
import { Link, useLocation } from "react-router";
import { Logo } from "@/components/ui/logo";
import { SIDEBAR_LINKS } from "@/constants/sidebar";
import { Tooltip } from "@/components/ui/tooltip";

const SidebarContent = ({ isCollapsed, setOpen, isMobile = false }) => {
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
            isCollapsed={isCollapsed}
            setOpen={setOpen}
            isMobile={isMobile}
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
  icon,
  iconFilled,
  isCollapsed,
  setOpen,
  isMobile,
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} key={to}>
      <Tooltip content={isCollapsed ? label : null} side="right">
        <li
          className={`p-2 rounded-lg hover:bg-sidebar-accent font-medium flex items-center gap-2 ${
            isActive
              ? "bg-primary-light text-primary hover:!bg-primary-light"
              : "text-sidebar-foreground"
          }`}
          onClick={() => isMobile && setOpen((prev) => !prev)}
        >
          <span className="">{isActive ? iconFilled : icon}</span>
          <span hidden={isCollapsed}>{label}</span>
        </li>
      </Tooltip>
    </Link>
  );
};

export default SidebarContent;
