import React, { useRef, useState } from 'react';
import toast from "react-hot-toast";
import {OTPVerifyRequest} from "../../Api Fetch/AllAPIRequest.js";
import {getEmail, setOTP} from "../../helper/FormHelper.js";
import {useNavigate} from "react-router-dom";

const VerifyOtp = ({ length = 6 }) => {
  const inputRefs = Array.from({ length }, () => useRef(null));
  let email = getEmail()
  const navigate = useNavigate();

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text');
    const digits = pasteData.split('').slice(0, length);

    digits.forEach((digit, index) => {
      if (inputRefs[index]?.current) {
        inputRefs[index].current.value = digit;
      }
    });
  };

  const handleChange = (index, e) => {
    const value = e.target.value;

    if (value && index < length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '') {
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }

      if (e.key === 'Backspace' && e.ctrlKey) {
        inputRefs.forEach((ref) => (ref.current.value = ''));
        inputRefs[0].current.focus();
      }
    }
  };

  const VerifyOtpHandler = async () => {
    const otp = inputRefs.map((ref) => ref.current?.value).join('');

    if (!/^\d+$/.test(otp) || otp.length !== length) {
      return toast.error('Please enter a valid OTP');
    }
    else if(otp.length !== 6){
      return toast.error("Enter 6 digits code")
    }
    else{
      await OTPVerifyRequest(email, otp).then((res) => {
        if(res===true){
          setOTP(otp)
          navigate("/reset-password")
        }
      })
    }
  };

  return (
    <div className="flex flex-col h-screen px-5 justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">OTP VERIFICATION</h2>
        <p className="text-gray-500 text-center">
          Enter the 6-digit OTP sent to your email
        </p>
        <p className="mb-6 text-gray-500 text-center">{email}</p>

        <div
          className="flex justify-center space-x-2 mb-6"
          onPaste={handlePaste}
        >
          {inputRefs.map((ref, index) => (
            <input
              key={index}
              ref={ref}
              type="text"
              maxLength={1}
              className="w-9 h-9 sm:w-12 sm:h-12 text-center text-2xl rounded-lg ring-2 ring-gray-300 focus:ring-pink-500 outline-0"
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        <button
          onClick={VerifyOtpHandler}
          className="mt-8 w-full py-3 bg-pink-500 rounded-lg text-white font-semibold"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
