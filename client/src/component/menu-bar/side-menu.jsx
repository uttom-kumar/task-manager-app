import React from 'react';
import {NavLink} from "react-router-dom";
import {MdCancelPresentation, MdOutlineDashboard} from "react-icons/md";
import {CiCircleCheck, CiEdit} from "react-icons/ci";
import {TbMenu3} from "react-icons/tb";
import {GiSandsOfTime} from "react-icons/gi";

const SideMenu = () => {
  return (
    <div>
      <div>
        <ul className="flex flex-col space-y-3">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-4 transition inline-block w-full ${
                  isActive ? "bg-pink-200 border-l-4 border-pink-700" : " hover:bg-pink-100"
                }`
              }
            >
             <span className="flex items-center gap-2"> <MdOutlineDashboard /><span className="text-[14px]">Dashboard</span></span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create-page"
              className={({ isActive }) =>
                `px-4 py-4 transition inline-block w-full ${
                  isActive ? "bg-pink-200 border-l-4 border-pink-700" : " hover:bg-pink-100"
                }`
              }
            >
              <span className="flex items-center gap-2"><CiEdit /><span className="text-[14px]">Create New</span></span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all"
              className={({ isActive }) =>
                `px-4 py-4 transition inline-block w-full ${
                  isActive ? "bg-pink-200 border-l-4 border-pink-700" : " hover:bg-pink-100"
                }`
              }
            >
              <span className="flex items-center gap-2"><TbMenu3 /><span className="text-[14px]">New Task</span></span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/in-progress"
              className={({ isActive }) =>
                `px-4 py-4 transition inline-block w-full ${
                  isActive ? "bg-pink-200 border-l-4 border-pink-700" : " hover:bg-pink-100"
                }`
              }
            >
              <span className="flex items-center gap-2"><GiSandsOfTime /><span className="text-[14px]">In Progress</span></span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/completed"
              className={({ isActive }) =>
                `px-4 py-4 transition inline-block w-full ${
                  isActive ? "bg-pink-200 border-l-4 border-pink-700" : " hover:bg-pink-100"
                }`
              }
            >
              <span className="flex items-center gap-2"><CiCircleCheck /><span className="text-[14px]">Completed</span></span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/canceled"
              className={({ isActive }) =>
                `px-4 py-4 transition inline-block w-full ${
                  isActive ? "bg-pink-200 border-l-4 border-pink-700" : " hover:bg-pink-100"
                }`
              }
            >
              <span className="flex items-center gap-2"><MdCancelPresentation /><span className="text-[14px]">Canceled</span></span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;