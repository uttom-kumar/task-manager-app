import React, { useState, useEffect } from 'react';
import { VerifyEmailRequest } from "../../Api Fetch/RegistrationAPIRequest.js";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(60);
    const navigate = useNavigate();
    const email = sessionStorage.getItem("email");

    useEffect(() => {
        if (timer === 0) {
            // Timer expired, redirect to register page
            navigate("/register");
            return;
        }

        // Start countdown
        const interval = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
        }, 1000);

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [timer, navigate]);

    const VerifyOtpHandler = async () => {
        let res = await VerifyEmailRequest(email, otp);
        if (res === true) {
            navigate("/login");
            sessionStorage.removeItem("email");
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div>
            <div className="flex flex-col h-screen px-5 justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-4">OTP VERIFICATION</h2>
                    <p className="text-gray-500 text-center">
                        Enter the 6-digit OTP sent to your email
                    </p>
                    <p className="mb-6 text-gray-500 text-center">{email}</p>

                    <input
                        type="text"
                        placeholder={"Enter 6 Digits OTP"}
                        className="w-full py-4 px-5 outline-0 ring-1 ring-gray-300 focus:ring-pink-600 rounded-md duration-300"
                        onChange={(e) => setOtp(e.target.value)}
                    />

                    <button
                        onClick={VerifyOtpHandler}
                        className="mt-8 w-full py-3 bg-pink-500 rounded-lg text-white font-semibold"
                    >
                        Verify OTP
                    </button>

                    <div className="mt-4 text-center text-gray-500">
                        Time remaining: {formatTime(timer)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailVerify;
