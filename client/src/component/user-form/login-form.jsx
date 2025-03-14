import React, {useRef} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {IsEmail, IsEmpty} from "../../helper/FormHelper.js";
import toast from "react-hot-toast";
import {LoginApiRequest} from "../../Api Fetch/RegistrationAPIRequest.js";

const LoginForm = () => {
  let  emailRef = useRef(null)
  let passwordRef = useRef(null)

  const loginHandler = async () => {
    let email = emailRef?.current.value;
    let password = passwordRef.current.value;

    if(IsEmpty(email)){
      toast.error("email address required!");
    }
    else if(IsEmail(email)){
      toast.error("Invalid Email address");
    }
    else if(IsEmpty(password)){
      toast.error("password required!");
    }

    else{
      let res = await LoginApiRequest(email, password)
      if(res === true){
        window.location.href = "/"
        toast.success("Login successful");
        emailRef.current.value = ""
        passwordRef.current.value = "";
      }
    }
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="w-[90%] p-5 mx-auto md:w-[70%] lg:w-[40%] xl:w-[30%] shadow-md rounded bg-white">
        <h3 className="text-center text-[24px] font-semibold mb-5">Sign In</h3>
        <div className="flex flex-col space-y-5">
          <input className="border border-gray-400 px-5 py-2 outline-0 focus:border-pink-500 duration-200 rounded"
                 type="email"
                 placeholder="User email address"
                 ref={emailRef}
          />
          <input className="border border-gray-400 px-5 py-2 outline-0 focus:border-pink-500 duration-200 rounded"
                 ref={passwordRef}
                 type="password"
                 placeholder="User Password"
          />
          <div>
            <button className="bg-pink-500 py-3 block w-full text-white font-semibold rounded cursor-pointer"
              onClick={loginHandler}
            >
              Next
            </button>
          </div>
          <div className="flex items-center justify-end gap-3">
            <Link className="font-semibold" to="/register">
              Sing Up
            </Link>
            <hr className="h-[20px] w-[2px] bg-gray-400" />
            <Link className="hover:underline font-semibold" to="/forget-password">
              Forgotten Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;