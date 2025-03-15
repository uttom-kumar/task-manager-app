import React, { useState, useEffect, useRef } from 'react';
import {AiOutlineLogout, AiOutlineMenu, AiOutlineMenuUnfold, AiOutlineUser} from "react-icons/ai";
import { LuSquareMenu } from "react-icons/lu";
import {LogOutRequest, ProfileDetailRequest} from "../../Api Fetch/AllAPIRequest.js";
import {getUserDetails, removeSession} from "../../helper/CookieHelper.js";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {MdOutlineVerified} from "react-icons/md";
import SideBarModal from "../modal/SideBar-Modal.jsx";
import SideMenu from "./side-menu.jsx";


const TopMenu = () => {
  const ProfileData = useSelector((state) => state.profile.value)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [showModal, setShowModal] = useState(false)

  const DropDownHandler = () => {
    setDropdownOpen(!dropdownOpen);
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
  }, []);


  const LogoutHandler = async () => {
    await LogOutRequest().then((res) => {
      if(res===true){
        removeSession()
      }
    })
  }


  useEffect(() => {
    (async () => {
      await ProfileDetailRequest()
    })()
  }, []);


  return (
    <>
      <div className="px-5 py-4 bg-white border border-gray-200 shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="block md:hidden">
              <button onClick={() => setShowModal(!showModal)} className="cursor-pointer text-[24px]">
                <AiOutlineMenuUnfold />
              </button>
            </div>
            <div>
              <p className="flex gap-1 items-center "><LuSquareMenu className="text-pink-400" /> <span className="font-semibold">Task Manager</span></p>
            </div>
          </div>
          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center gap-1 bg-gray-200 px-1 py-1 cursor-pointer rounded-xl"
                 onClick={DropDownHandler}
            >
              <img
                className="w-[30px] h-[30px] rounded-full "
                src={ProfileData['photo']}
                alt="profile image"
              />
              <AiOutlineMenu className="text-[24px]" />
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 top-[60px] w-[280px] sm:w-[350px] bg-white shadow-md py-5 cursor-pointer">
                <div className="flex items-center gap-2 px-5">
                  <div className="text-center">
                    <img src={ProfileData['photo']} className="w-[50px] h-[50px] rounded-full mx-auto" alt=""/>
                  </div>
                   <div>
                     <h6 className="font-semibold  text-gray-700 text-[18px] flex items-center gap-2">{ProfileData['fullName']}<MdOutlineVerified className={"text-green-700"} /></h6>
                     <h6 className="text-gray-700  text-[14px]">{ProfileData['phone']}</h6>
                   </div>
                </div>
                <div className="mt-5">
                  <Link to={'/profile'} className="py-2 block w-full text-left px-5 cursor-pointer hover:bg-pink-300 hover:border-l-3 hover:border-l-pink-600 hover:text-white hover:font-semibold">
                    <span className="flex items-center gap-2"><AiOutlineUser />Profile</span>
                  </Link>
                  <button
                    onClick={LogoutHandler}
                    className="py-2 block w-full text-left px-5 cursor-pointer hover:bg-pink-300 hover:border-l-3 hover:border-l-pink-600 hover:text-white hover:font-semibold"
                  >
                    <span className="flex items-center gap-2"><AiOutlineLogout />Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <SideBarModal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div className={`w-[250px] sm:w-[400px] h-full bg-white py-5 `}>
            <SideMenu />
          </div>
        </SideBarModal>
      </div>
    </>
  );
};

export default TopMenu;