import React from "react";
import { Link, useLocation } from "react-router";
import { Logo } from "@/components/ui/logo";
import { SIDEBAR_LINKS } from "@/constants/sidebar";
import { Settings } from "lucide-react";

const SidebarContent = ({ isCollapsed }) => {
  return (
    <>
      <div className="h-16 flex justify-between items-center">
        <Logo
          to="/"
          showText={false}
          className="-ml-1"
          iconClassName="size-8"
        />
      </div>
      <ul className="flex-1 flex flex-col space-y-1 overflow-y-auto -mx-2 cursor-pointer">
        {SIDEBAR_LINKS.map((link) => (
          <LinkItem
            key={link.to}
            to={link.to}
            label={link.label}
            icon={link.icon}
            isCollapsed={isCollapsed}
          />
        ))}
      </ul>
      <ul className="flex flex-col cursor-pointer py-2 border-t border-border -mx-2">
        <LinkItem
          key={"/dashboard/settings"}
          to={"/dashboard/settings"}
          label={"Settings"}
          icon={<Settings className="size-6" />}
          isCollapsed={isCollapsed}
        />
      </ul>
    </>
  );
};

const LinkItem = ({ to, label, icon, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} key={to}>
      <li
        className={`p-2 rounded-lg hover:bg-accent flex items-center gap-2 ${
          isActive
            ? "bg-primary/10 text-primary font-medium hover:bg-primary/10"
            : "text-muted-foreground"
        }`}
        title={label}
      >
        <span className="">{icon}</span>
        <span hidden={isCollapsed}>{label}</span>
      </li>
    </Link>
  );
};

export default SidebarContent;
