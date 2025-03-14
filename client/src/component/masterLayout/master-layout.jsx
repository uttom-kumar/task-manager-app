import React from 'react';
import SideMenu from "../menu-bar/side-menu.jsx";
import TopMenu from "../menu-bar/top-menu.jsx";

const MasterLayout = ({children}) => {
  return (
    <div>
      <div className="sticky top-0">
        <TopMenu />
      </div>
      <div className="flex">
        <div className="hidden md:block w-0 md:w-[20%] fixed top-[60px] h-screen bg-white mt-5 overflow-y-auto">
          <SideMenu />
        </div>
        <div className="w-full md:w-[80%] ml-auto px-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;