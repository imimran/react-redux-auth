import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import { useSelector } from "react-redux";

// const userLogin = useSelector((state) => state.userLogin);
// const { userInfo } = userLogin;

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },

  {
    title: "Company",
    path: "/organizations",
    icon: <BsIcons.BsTable />,
    cName: "nav-text",
  },

  {
    title: "Employee",
    path: "/employees",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Announce",
    path: "/announcements",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "Payroll",
    path: "/payrolls",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "Attendence",
    path: "/attendences",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },

  {
    title: "leaves",
    path: "/leaves",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "CostList",
    path: "/costs",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
];
