import React, {useRef} from 'react';
import {IsEmail, IsEmpty, setEmail} from "../../helper/FormHelper.js";
import toast from "react-hot-toast";
import {RecoverEmailVerifyRequest} from "../../Api Fetch/AllAPIRequest.js";
import {useNavigate} from "react-router-dom";

const SendOtp = () => {
  let emailRef = useRef(null)
  const navigate = useNavigate();

  const SendOTPHandler = async () => {
    let email = emailRef.current.value;
    if(IsEmpty(email)) {
      toast.error("Email address required!")
    }
    else if(IsEmail(email)) {
      toast.error("Valid email address required!")
    }
    else{
      await RecoverEmailVerifyRequest(email).then((res) => {
        if(res===true){
          setEmail(email)
          navigate("/verify-otp")
        }
      })
    }
  }

  return (
    <div className={"flex flex-col h-screen justify-center items-center px-5"}>
      <div className="w-full p-5 sm:w-[70%] lg:w-[40%] bg-white shadow-md rounded-md">
        <h2 className="text-[24px] font-semibold mb-5">EMAIL ADDRESS</h2>
        <div>
          <p className='text-gray-400 mb-2'>Your email address</p>
          <input
            type="email" ref={emailRef}
            className="w-full px-5 py-2 border-1 border-gray-400 focus:border-pink-600 outline-0 "
            placeholder={"Your email address"}
          />
          <button
            className="mt-5 w-full py-3 bg-pink-500 text-white font-semibold rounded-md cursor-pointer"
            onClick={SendOTPHandler}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendOtp;