import React, { useState, useRef } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {IsEmail, IsEmpty, IsMobile, IsPasswordValid} from "../../helper/FormHelper.js";
import toast from "react-hot-toast";
import {RegistrationApiRequest} from "../../Api Fetch/RegistrationAPIRequest.js";

const RegistrationForm = () => {
  const navigate = useNavigate();
  // const [imagePreview, setImagePreview] = useState("");
  // const [image, setImage] = useState(null);

  // Refs for input fields
  const emailRef = useRef(null);
  const fullNameRef = useRef(null);
  const mobileRef = useRef(null);
  const passwordRef = useRef(null);
  // const photoRef = useRef(null);


  // Registration handler
  const RegistrationHandler = async () => {
    let email = emailRef.current.value;
    let fullName = fullNameRef.current.value;
    let mobile = mobileRef.current.value;
    let password = passwordRef.current.value;
    let photo = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCI+CiAgPGltYWdlIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgeGxpbms6aHJlZj0iZGF0YTppbWcvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRElBQUFBeUNBWUFBQUFlUDRpeEFBQUZCa2xFUVZSb2diMWF5MUVqU3hCTUZHdUEzblV1S3l4WVlRR0RCVm9zV0xBQWNabXJ4SFV1SUF2QUE4QUNDUXRXendMMExuTmRtZkNpSUV0YlU4eW51eVhJQ0lWaXBPbFBkbFZYVmVmTUVRNklDa1VPUUQ3ZkFZeGFldDRBK0EvQUtrTzVPdFRvZXhHcFVBd0IvQVF3NFhjS25nQTh5M2VHY3Z1bFJDb1VzdG96VG43WWNNdUdIOEVMdjAvNVBXcXhscEJZQUxoTElSUkZoQmFZa29TZitCTW52ZXFiQ1B2SmpTWHRZaVFSQ2laQy83OTNxeWsrdnNoUVBvWDIwOUwzQllCZkpLZVF4VG5QVUs1RCtnZ2lVcUdZT3l0STU5ZUgzS3hvWHl3WjU2NnZiUytSQ29WMGZHRit1c2xRenBObkc0Q0doWHZJVUY1MnRld2s0a2lJdjU2Rm1ucGYwRHFQWnY5MGtta2w0a2lzU1NJNVBLYUEwVkhJalB2SU5CSnhwbzBtVWFINHlYQTdkbjlKWHk4eHdZRVJibW42YXR3ekg0alFwRXRleXVTUFEwaVkwSHpWa2xzc29rSXNMZlBiOUh2aVhmeklOUml5d2FpdFFjdEFZN3FBVDNRK3F1WHVPampFdWdWZVp5aFA3UDhEZC8vVVRPWW1jSUFMUjE0bWQ1bWhQTXBRbnRrUGdIL2tQNVAxcGMyU2srd0VRLzBOTDhkMC94MTJGcUg1WHRzWXQ1QVlrNFFpS09iajR6NE1qb2dWaWxjdVFNM3RyVVZzM0w0TzZIQm9UQTFhSVlnRTNsZDRUdXVBdnYvSVB2dGcyMHoxM2dIcVZTd2l5dXVwMlh4aWlZZFFFb2JNZzNFWFdlVnBUeE4xTWJYY1ZZMklLOXdXZloyUnVIYXlpckZFdzhUbVpzOWM5ZHl1MERrT3VVZDNSQ2I4M2dURytDamlBVkNyREptRE9rRkxhdGlld0ZrRUxNVkRvR2VMN2I2VkwvNU9USEhhZGErQmp2c1c4UVl1OUwxMHRUVFFVSHZJdWt2M3BhOEcycUJ6RlN2bUE1ZWtRc3R5SlJKSy9ETmc1em9lVUNnQTk4ZVhGb1VPVVdObktEZm1jamh3R1RrVWVtK29QNGNnSklkNHFGVk9mWWtTU3lUVW4wT2dMcDYwN3l5UkdIK3ZiYlQwdWIvRGhkeC9VL3BJdFlnTnVWNVJTWUVtd20xRUNxakJFZ24yZHdZRmpmMjVadGNVVkNpbXhxMFdxUUVuMVNKZ1lhbUQzcklTamdJWDRKWnRwSy9rVW1mZ3pnYkI0TXJaU25RWll4bGE0dDc4SkFlc1dHdW9KVjhHRkpUZmlBU1cwVHV3UExGazdpc1VuUWNsMmRoeWo3RUVlQVNJMHNoNGZsSnN2ekVXNjRiTll6ZWIxRWtWaWkxWFY2VlEyVGNiaGxLTlFpcEdlSG4wUEZIb3ExVWtBOWZKcEtGQko3Z3lvNGI0UDJJeE91TW5iMGg2NnhSUElHemh1dGJOcmxZSWZqUWc3bE9oZU9UeCtMWkJXQWlCU3FSL3BLL1FuT1FPZ205ei84YUxaejFqeUlidE91MXhzRm1MSXJKaXN0eTB1UXZiajdpaXVRa3lNcjdzbnhXRmp5NTNzK2NobWZ1NytFQ0dyL3h6UmNXamFSVnVuUTZzQ1d5UktxV1MyQy9YcitDT2hENUVNaXRBWkNoRm1YblBJN3haVDNxNU43RlJTMnBpTmxXTXkzMzBZRmw1eXFESEpzbUNtc0J2bjU4WTR0V0t1OU9wbFlPc1ZjUTFqazFERys5WERKY3gxWEl3T1BGN1U1QnVWZHh3QW1KTkR2SktvOVdhYnVqM2xzU25QMUpvbVF1WXIzNFlDYWltb2ZWSnBvb3RyYkQzK1R3R0RkNmc2SlpNYWFiekJoSm5YMDBDZjBXSkUzZDZ0S1hSRGgrS1JtNWNxelJ1SWsrUG40M3JwdURTV1AzUzl6U0NqRmtRUmhXVmh3QTMvdExrakx1MkhCZjc2QzIxTG9yR3dSNjl0WkRCWjBjdUJwd1o2anF3V0tKVFdBOTlQTzJqeHlhbDlBNGNaMmFpNWpaVUlJOTVZY0FuS3JCNlhhUW84YWJmb2FtUzdUNWNjN0VPOThLQUczamU4Snh3NjE3aDZJeHlEQnc1QzhlbVZ6aHVZaFgrMUpkcVFoNTh0cmxkVzZuK2RTL1ZOSUYrUFdrNU9QVkJMZm04YjhJOTlJdG5zbitVVUp1OEpPNG5CTVFGRDZQbUEvZ2ZKalAwejdyYWdqVUFBQUFBU1VWT1JLNUNZSUk9Ii8+Cjwvc3ZnPgo="



    if (IsEmail(email)) {
      toast.error("Valid Email Address required!");
    } else if (IsEmpty(fullName)) {
      toast.error("Full Name required!");
    } else if (!IsMobile(mobile)) {
      toast.error("Valid Mobile required!");
    } else if (IsEmpty(password)) {
      toast.error("Password required!");
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters!");
    } else if (IsPasswordValid(password)) {
      toast.error("Password must include at least one uppercase letter, one lowercase letter, one number, and one special character!");
    }
    else {
      let success = await RegistrationApiRequest( fullName, email, mobile, password, photo);
      if (success===true) {
        emailRef.current.value = "";
        fullNameRef.current.value = "";
        mobileRef.current.value = "";
        passwordRef.current.value = "";
        navigate("/login")
      }
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="px-5 w-full md:w-[70%] lg:w-[40%] mx-auto">
        <div className="p-5 bg-white rounded-lg shadow-lg">
          <h5 className="text-[24px] font-semibold mb-5 text-center">Sign Up</h5>
          <div className="flex flex-col space-y-5">
            <input
              ref={emailRef}
              className="px-5 py-3 rounded border border-gray-200 outline-0 focus:ring-2 focus:ring-pink-400 duration-[0.5s]"
              type="email"
              placeholder="Enter your email"
            />
            <input
              ref={fullNameRef}
              className="px-5 py-3 rounded border border-gray-200 outline-0 focus:ring-2 focus:ring-pink-400 duration-[0.5s]"
              type="text"
              placeholder="Enter your Full Name"
            />
            <input
              ref={mobileRef}
              className="px-5 py-3 rounded border border-gray-200 outline-0 focus:ring-2 focus:ring-pink-400 duration-[0.5s]"
              type="text"
              placeholder="Enter your Mobile"
            />
            <input
              ref={passwordRef}
              className="px-5 py-3 rounded border border-gray-200 outline-0 focus:ring-2 focus:ring-pink-400 duration-[0.5s]"
              type="password"
              placeholder="Password"
            />
            <button
              className="cursor-pointer bg-pink-500 py-2 rounded text-white"
              type="button"
              onClick={RegistrationHandler}
            >
              Next
            </button>
            <div className="space-y-2 text-center">
              <div>
                <Link
                  to={'/login'}
                  className="hover:underline hover:text-blue-600 font-semibold"
                >
                  Sign In
                </Link>
              </div>
              <Link
                to={'/forget-password'}
                className="hover:underline hover:text-blue-600 font-semibold"
              >
                Forgotten password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
