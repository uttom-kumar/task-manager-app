import React, {useRef} from 'react';
import {getEmail, getOTP, IsEmpty, IsPasswordValid} from "../../helper/FormHelper.js";
import toast from "react-hot-toast";
import {ResetPasswordRequest} from "../../Api Fetch/AllAPIRequest.js";
import {useNavigate} from "react-router-dom";

const CreatePassword = () => {
  const PasswordRef = useRef(null);
  const ConfirmPassword = useRef(null);
  const email = getEmail();
  const otp = getOTP()
  const navigate = useNavigate();

  const PasswordHandler = async () => {
    let password = PasswordRef.current.value;
    let ConfirmPass = ConfirmPassword.current.value;

    if(IsEmpty(password)) {
      toast.error("Password is required!");
    }
    else if(IsEmpty(ConfirmPass)) {
      toast.error("Confirm Password is required!");
    }
    else if(password !== ConfirmPass) {
      toast.error("Password does not match!");
    }
    else if(IsPasswordValid(password)) {
      toast.error("Password must include at least one uppercase letter, one lowercase letter, one number, and one special character!");
    }
    else{
      await ResetPasswordRequest(email, otp,password).then((res) => {
        if(res===true){
          navigate("/login");
          sessionStorage.removeItem("email");
          sessionStorage.removeItem("otp");
        }
      })
    }
  }


  return (
    <div className="flex flex-col h-screen justify-center items-center px-5">
      <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[40%]">
        <div className="flex flex-col space-y-5 bg-white shadow-md rounded-md p-5">
          <h2 className="text-[24px] font-semibold mb-6">SET NEW PASSWORD</h2>
          <p>{email}</p>
          <div>
            <label className="font-semibold text-gray-700 inline-block mb-2" htmlFor="password">New Password</label>
            <input
              ref={PasswordRef}
              className="text-gray-700 ring-2 ring-gray-300 px-5 py-3 w-full rounded focus:ring-pink-600 outline-0"
              type="password" id={"password"}
              placeholder="New password"
            />
          </div>
          <div>
            <label className=" font-semiboldtext-gray-700 inline-block mb-2" htmlFor="ConfirmPassword">Confirm Password</label>
            <input
              ref={ConfirmPassword}
              className="text-gray-700 ring-2 ring-gray-300 px-5 py-3 w-full rounded focus:ring-pink-600 outline-0"
              type="password" id={"ConfirmPassword"}
              placeholder="Confirm Password"
            />
          </div>
          <div>
            <button
              onClick={PasswordHandler}
              className="w-full py-3 cursor-pointer bg-pink-600 rounded-md text-white font-semibold"
            >
              Set Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;