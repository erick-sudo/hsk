import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import {
  FacebookOutlined,
  Instagram,
  LinkedIn,
  Twitter,
} from "@mui/icons-material";
import React from "react";
import { NavLink } from "react-router-dom";
import AppName from "./common/AppName";

function Footer() {
  const services = [
    {
      title: "House Cleaning",
      to: "house_cleaning",
    },
    {
      title: "Office Cleaning",
      to: "office_cleaning",
    },
    {
      title: "Floor Cleaning",
      to: "floor_cleaning",
    },
    {
      title: "Window Cleaning",
      to: "window_cleaning",
    },
    {
      title: "Carpet Cleaning",
      to: "carpet_cleaning",
    },
    {
      title: "Move-in/Move-out Cleaning",
      to: "move_in_move_out_cleaning",
    },
  ];

  const nalLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Services",
      path: "/services",
    },
    {
      name: "Contact",
      path: "/contact",
    },
    {
      name: "Blog",
      path: "/blog",
    },
    {
      name: "FAQ's",
      path: "/faqs",
    },
  ];

  const contact = [
    {
      title: "Email",
      to: "mailto:<EMAIL>",
      icon: <EnvelopeIcon height={12} />,
    },
    {
      title: "Phone",
      to: "tel:1-800-555-1212",
      icon: <PhoneIcon height={12} />,
    },
    {
      title: "Address",
      to: "https://www.google.com",
      icon: <MapPinIcon height={12} />,
    },
  ];

  const social = [
    {
      title: "Facebook",
      to: "https://www.facebook.com",
      icon: <FacebookOutlined />,
    },
    {
      title: "Instagram",
      to: "https://www.instagram.com",
      icon: <Instagram />,
    },
    {
      title: "Twitter",
      to: "https://www.twitter.com",
      icon: <Twitter />,
    },
    {
      title: "LinkedIn",
      to: "https://www.linkedin.com",
      icon: <LinkedIn />,
    },
  ];
  return (
    <div className="bg-gray-900 mt-[7em] text-white xl:m-[7em] xl:rounded-lg">
      <div className="container">
        <div className="bg-gradient-to-r from-purple-700 to-purple-800 text-white lg:flex items-center mx-8 rounded-lg -translate-y-12 p-4">
          <div className="p-4">
            <h4 className="font-bold text-2xl ">
              Subscribe To Our News Letter
            </h4>
            <p>
              Subscribe to our news letter to get<br></br>latest news and
              updates.
            </p>
          </div>
          <form className="flex max-w-xl grow m-4 border rounded-full p-1">
            <input
              className="grow outline-none bg-transparent px-4 py-1"
              type="email"
              placeholder="Enter your email"
            />
            <button className="px-4 bg-[#fff] hover:bg-purple-400 hover:text-white duration-300 font-bold rounded-full text-purple-800">
              Subscribe
            </button>
          </form>
        </div>

        <div className="flex -md:flex-col -md:items-center">
          <div>
            <div className="py-4">
              <AppName />
            </div>
            <div className="max-w-sm">
              Provide you with a clean, safe, and healthy environment for your
              customers and employees. Clean offices improves employee moods,
              health and overall safety.
            </div>
            <div className="flex gap-2 py-4 px-2">
              {social.map((link, idx) => (
                <NavLink
                  title={link.title}
                  key={idx}
                  className="hover:text-gray-500 text-purple-700 duration-300 "
                  to={link.to}
                >
                  {link.icon}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="grow grid gap-4 -md:grid-cols-2 md:grid-cols-3">
            <div className="">
              <div className="w-max">
                <h3 className="pr-6">Our Services</h3>
                <div className="w-1/2 border-b-2 border-gray-200"></div>
              </div>
              <div className="grid gap-2 py-2 px-2">
                {services.map((service, idx) => (
                  <NavLink
                    key={idx}
                    className="text-gray-500 hover:text-purple-700 duration-300 "
                    to={service.to}
                  >
                    {service.title}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="">
              <div className="w-max">
                <h3 className="pr-6">Useful Links</h3>
                <div className="w-1/2 border-b-2 border-gray-200"></div>
              </div>
              <div className="grid gap-2 py-2 px-2">
                {nalLinks.map((link, idx) => (
                  <NavLink
                    key={idx}
                    className="text-gray-500 hover:text-purple-700 duration-300 "
                    to={link.path}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="">
              <div className="w-max">
                <h3 className="pr-6">Contact</h3>
                <div className="w-1/2 border-b-2 border-gray-200"></div>
              </div>
              <div className="grid gap-2 py-2 px-2">
                {contact.map((contact, idx) => (
                  <NavLink
                    key={idx}
                    className="text-gray-500 hover:text-purple-700 duration-300 flex items-center gap-2"
                    to={contact.to}
                  >
                    <span className="">{contact.icon}</span>
                    <span>{contact.title}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex py-4 items-center gap-4">
        <div className="grow border-b border-gray-500"></div>
        <h4>
          Copyright by Cleanex @ {new Date().getFullYear()}. All rights reserved
        </h4>
        <div className="grow border-b border-gray-500"></div>
      </div>
    </div>
  );
}

export default Footer;
