import { FaLinkedin, FaTwitterSquare, FaTelegramPlane } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

export const footerContent = [
  {
    title: "SPM",
    subtitles: [
      {
        text: "About Us",
        href: "/about",
      },
      {
        text: "Contact Us",
        href: "/blank",
      },
      {
        text: "Address",
        href: "/blank",
      },
      {
        text: "Social Media",
        href: "/blank",
      },
    ],
  },
  {
    title: "Customer Services",
    subtitles: [
      {
        text: "Common Questions",
        href: "/blank",
      },
      {
        text: "Return Procedures",
        href: "/blank",
      },
      {
        text: "FAQs",
        href: "/blank",
      },
    ],
  },
  {
    title: "Support",
    subtitles: [
      {
        text: "How To Place An Order?",
        href: "/blank",
      },
      {
        text: "Order Submission Procedure",
        href: "/blank",
      },
      {
        text: "Payment Methods",
        href: "/blank",
      },
    ],
  },
];

export const socialMedia = [
  {
    name: "instagram",
    icon: AiFillInstagram,
    href: "/",
  },
  {
    name: "linkedin",
    icon: FaLinkedin,
    href: "/",
  },
  {
    name: "twitter",
    icon: FaTwitterSquare,
    href: "/",
  },
  {
    name: "telegram",
    icon: FaTelegramPlane,
    href: "/",
  },
];
