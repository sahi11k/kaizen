import LinkedInIcon from "@/assets/icons/linkedin.svg?react";
import InstagramIcon from "@/assets/icons/insta.svg?react";
import MailIcon from "@/assets/icons/mail.svg?react";

export const FOOTER_LINKS = [
  {
    label: "Email",
    href: "mailto:sahil511kumar@gmail.com",
    icon: <MailIcon className="fill-current w-full h-full" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sahi11k",
    icon: <InstagramIcon className="stroke-current w-full h-full" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sahi11k/",
    icon: <LinkedInIcon className="stroke-current w-full h-full" />,
  },
];
