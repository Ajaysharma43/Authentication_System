import React, { useState } from "react";

const SidebarLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <div
        className={`top-0 left-0 h-full bg-blue-600 text-white p-6 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out sm:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6 break-all whitespace-pre-wrap">My Sidebar</h2>
        <nav>
          <ul className="space-y-4 break-all whitespace-pre-wrap">
            <li>
              <a
                href="#"
                className="block p-2 rounded hover:bg-blue-700 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block p-2 rounded hover:bg-blue-700 transition"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block p-2 rounded hover:bg-blue-700 transition"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block p-2 rounded hover:bg-blue-700 transition"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
  );
};

export default SidebarLayout;
