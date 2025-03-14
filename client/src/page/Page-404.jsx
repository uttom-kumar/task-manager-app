import React from 'react';
import photo from '../../public/404.svg'
import { Link } from "react-router-dom";
import { getToken } from "../helper/CookieHelper.js";

const Page404 = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <img className="" src={photo} alt=""/>
        <h1 className="text-[44px] font-semibold">PAGE NOT FOUND</h1>
        <Link to={getToken() ? "/" : "/login"}>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg mt-5 cursor-pointer">
            Go Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page404;
