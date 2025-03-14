import React, {useEffect, useRef} from 'react';
import {ProfileDetailRequest, ProfileUpdateRequest, UpdatePasswordRequest} from "../../Api Fetch/AllAPIRequest.js";
import {useSelector} from "react-redux";
import {getBase64, IsEmail, IsMobile, IsPasswordValid} from "../../helper/FormHelper.js";
import toast from "react-hot-toast";

const ProfileDetails = () => {
  const ProfileData = useSelector((state) => state.profile.value)

  let userFullNameRef = useRef(null);
  let userImgRef = useRef(null);
  let userImgView = useRef(null);
  let userEmailRef = useRef(null);
  let userPhoneRef = useRef(null);
  let userPasswordRef = useRef(null);
  let userConfirmPassword = useRef(null);


  const PreviewImage = () => {
    const ImgFile = userImgRef.current.files[0];
    getBase64(ImgFile).then((base64Img) => {
      userImgView.current.src = base64Img;
    });
  };


  const UpdateProfileHandler = async () => {
    let fullName = userFullNameRef.current.value;
    let email = userEmailRef.current.value;
    let phone = userPhoneRef.current.value;
    let photo = userImgView.current.src;

    if (photo.length > 50 * 1024 * 1.37) {
      toast.error("Image size is too large. Maximum size is 50 KB.");
    }
    else if(IsEmail(email)) {
      toast.error("Valid Email Address.");
    }
    else if(!IsMobile(phone)) {
      toast.error("Valid Phone number.");
    }
    else{
      await ProfileUpdateRequest(fullName, email, phone,photo).then(async (res) => {
        if(res===true){
          await ProfileDetailRequest()
        }
      })
    }
  }

  const UpdatePasswordHandler = async () => {
    let password = userPasswordRef.current.value;
    let confirmPassword = userConfirmPassword.current.value;

    if(!password && !confirmPassword){
      toast.error("All fields are required!");
    }
    else if(!password){
      toast.error("Password is required!");
    }
    else if(IsPasswordValid(password)){
      toast.error("Password must include at least one uppercase letter, one lowercase letter, one number, and one special character!");
    }
    else if(!confirmPassword){
      toast.error("Confirm Password is required!");
    }
    else if(confirmPassword !== password){
      toast.error("Passwords does not match!");
    }
    else{
      await UpdatePasswordRequest(password).then(async (res) => {
        if(res===true){
          await ProfileDetailRequest()
          userPasswordRef.current.value=""
          userConfirmPassword.current.value=""
        }
      })
    }
  }

  useEffect(() => {
    (async () => {
      await ProfileDetailRequest()
    })()
  }, []);


  return (
    <div className="w-full xl:w-[80%] mx-auto px-5 my-4">
      <div className="p-4 bg-white shadow rounded mb-4">
        <button className="bg-pink-700 px-4 py-3 rounded-md cursor-pointer text-white text-[18px] font-semibold">Account Details</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
        <div className="flex flex-col space-y-5 bg-white shadow-md rounded-md p-5 ">
          <div className="">
            <img ref={userImgView} className="w-[100px] h-[100px] rounded-full" src={ProfileData.photo} alt=""/>
          </div>
          <div>
            <label className="text-gray-700 inline-block mb-2" htmlFor="photo">Profile Picture</label>
            <input
              type="file"
              ref={userImgRef}
              onChange={PreviewImage}
              id={"photo"}
              readOnly={true}
              className="text-gray-700 border-1 border-gray-400 rounded px-5 py-3 w-full focus:border-pink-600 outline-0 cursor-pointer"
            />
          </div>
          <div>
            <label className="text-gray-700 inline-block mb-2" htmlFor="email">Email Address</label>
            <input
              ref={userEmailRef}
              className="text-gray-700 border-1 border-gray-400 px-5 py-3 w-full rounded focus:border-pink-600 outline-0"
              type="email" id={"email"}
              defaultValue={ProfileData.email}
            />
          </div>
          <div>
            <label className="text-gray-700 inline-block mb-2" htmlFor="name">Full Name</label>
            <input
              ref={userFullNameRef}
              className="text-gray-700 border-1 border-gray-400 px-5 py-3 w-full rounded focus:border-pink-600 outline-0"
              type="name" id={"name"}
              defaultValue={ProfileData.fullName}
            />
          </div>
          <div>
            <label className="text-gray-700 inline-block mb-2" htmlFor="Mobile">Mobile</label>
            <input
              ref={userPhoneRef}
              className="text-gray-700 border-1 border-gray-400 px-5 py-3 w-full rounded focus:border-pink-600 outline-0"
              type="tel" id={"Mobile"}
              defaultValue={ProfileData.phone}
            />
          </div>
          <div className="">
            <button
              onClick={UpdateProfileHandler}
              className="w-full py-2 cursor-pointer bg-pink-600 rounded-md text-white font-semibold">
              UPDATE
            </button>
          </div>
        </div>
        {/*------------ right side ---------- */}
        <div className="flex flex-col space-y-5 bg-white shadow-md rounded-md p-5">
          <div>
            <label className="text-gray-700 inline-block mb-2" htmlFor="password">New Password</label>
            <input
              ref={userPasswordRef}
              className="text-gray-700 border-1 border-gray-400 px-5 py-3 w-full rounded focus:border-pink-600 outline-0"
              type="password" id={"password"}
              placeholder="New password"
            />
          </div>
          <div>
            <label className="text-gray-700 inline-block mb-2" htmlFor="ConfirmPassword">Confirm Password</label>
            <input
              ref={userConfirmPassword}
              className="text-gray-700 border-1 border-gray-400 px-5 py-3 w-full rounded focus:border-pink-600 outline-0"
              type="password" id={"ConfirmPassword"}
              placeholder="Confirm Password"
            />
          </div>
          <div>
            <button
              onClick={UpdatePasswordHandler}
              className="w-full py-2 cursor-pointer bg-pink-600 rounded-md text-white font-semibold"
            >
              Set Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;