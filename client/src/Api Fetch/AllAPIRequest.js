import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice.js";
import axios from "axios";
import toast from "react-hot-toast";
import {getToken} from "../helper/CookieHelper.js";
import {SetCanceledTask, SetCompletedTask, SetNewTask, SetProgressTask} from "../redux/state-slice/task-slice.js";
import {SetSummary} from "../redux/state-slice/summary-slice.js";
import {SetProfile} from "../redux/state-slice/profile-slice.js";
import {unAuthorized} from "../helper/FormHelper.js";


// const BaseUrl = "http://localhost:5050/api";
const BaseUrl = "https://task-manager-rest-api-nine.vercel.app/api";


const axiosHeaders = {headers: {"token": getToken()}};


export const SummaryRequest = async () => {
  store.dispatch(ShowLoader())
  let URL = `${BaseUrl}/CountTask`;
  axios.get(URL, axiosHeaders).then((res) => {
    store.dispatch(HideLoader())
    if(res.status === 200){
      store.dispatch(SetSummary(res.data.data))
    }

  }).catch((err) => {
    store.dispatch(HideLoader())
    if (err.response?.status === 401) {
      unAuthorized()
    }
    else {
      toast.error("Something went wrong");
    }
  })
}


export const CreateTaskRequest = async (title, description) => {
  store.dispatch(ShowLoader())
  let URL = `${BaseUrl}/CreateTask`;
  let ReqBody = {title: title, description: description, status: "New"};

  return await axios.post(URL, ReqBody, axiosHeaders).then((res) => {
    store.dispatch(HideLoader())
    if(res.status === 200){
      toast.success("Task created successfully")
      return true
    }
  }).catch((err) => {
    store.dispatch(HideLoader())
    if (err.response?.status === 401) {
      unAuthorized()
    }
    else {
      toast.error("Something went wrong");
      return false
    }
  })
}

export const TaskListByStatusRequest = async (status) => {
  store.dispatch(ShowLoader())
  let URL = `${BaseUrl}/TaskListByStatus/${status}`;

  return await axios.get(URL, axiosHeaders).then((res) => {
    store.dispatch(HideLoader())
    if(res.status === 200) {
      if(status === "New"){
        store.dispatch(SetNewTask(res.data.data))
      }
      else if(status === "Completed") {
        store.dispatch(SetCompletedTask(res.data.data))
      }
      else if(status === "Progress") {
        store.dispatch(SetProgressTask(res.data.data))
      }
      else if(status === "Canceled") {
        store.dispatch(SetCanceledTask(res.data.data))
      }
    }
    else {
      toast.error("Something went wrong!")
    }
  })
    .catch((err) => {
      store.dispatch(HideLoader())
      if (err.response?.status === 401) {
        unAuthorized()
      }
      else {
        toast.error("Something went wrong");
      }
    })
}

export const TaskDeleteRequest = async (taskId) => {
  store.dispatch(ShowLoader())
  let URL = `${BaseUrl}/DeleteTask/${taskId}`;

  return await axios.get(URL, axiosHeaders).then((res) => {
    store.dispatch(HideLoader())
    if(res.status === 200){
      toast.success("deleted successfully")
      return true;
    }
    else{
     toast.error("Something went wrong!")
     return false;
    }
  }).catch((err) => {
    store.dispatch(HideLoader())
    if (err.response?.status === 401) {
      unAuthorized()
    }
    else {
      toast.error("Something went wrong");
      return false;
    }
  })
}

export const TaskUpdateStatusRequest = async (taskId, status) => {
  store.dispatch(ShowLoader())

  let URL = `${BaseUrl}/UpdateTaskStatus/${taskId}/${status}`;

  return await axios.post(URL,{}, axiosHeaders).then((res) => {
    store.dispatch(HideLoader())
    if(res.status === 200){
      toast.success("updated successfully")
      return true;
    }
    else{
      toast.error("Something went wrong!")
      return false;
    }
  })
  .catch((err) => {
    store.dispatch(HideLoader())
    if (err.response?.status === 401) {
      unAuthorized()
    }
    else {
      toast.error("Something went wrong");
      return false;
    }
  })
}

export const LogOutRequest = async () => {
  store.dispatch(ShowLoader())
  let URL = `${BaseUrl}/LogOut`;
  return await axios.post(URL,{}, axiosHeaders).then((res) => {
    if(res.status===200){
      toast.success("LogOut successfully")
      return true;
    }
    else{
      toast.error("Something went wrong!")
      return false;
    }
  }).catch((err) => {
    store.dispatch(HideLoader())
    if (err.response?.status === 401) {
      unAuthorized()
    }
    else {
      toast.error("Something went wrong");
      return false;
    }
  })

}

export const ProfileDetailRequest = async () => {
  store.dispatch(ShowLoader())
  let URL = `${BaseUrl}/ReadProfile`;
  return await axios.get(URL, axiosHeaders).then((res) => {
    store.dispatch(HideLoader())
    if(res.status === 200){
      store.dispatch(SetProfile(res.data.data[0]))
    }
    else{
      toast.error("Something went wrong!")
    }
  }).catch((err) => {
    store.dispatch(HideLoader())
    if (err.response?.status === 401) {
      unAuthorized()
    }
    else {
      toast.error("Something went wrong");
    }
  })
}

export const ProfileUpdateRequest = async (fullName, email, phone,photo) => {
  store.dispatch(ShowLoader())
  let URL = `${BaseUrl}/UpdateProfile`;
  let ReqBody = {fullName, email, phone,photo}
  return await axios.post(URL, ReqBody, axiosHeaders).then((res) => {
    store.dispatch(HideLoader())
    if(res.status === 200){
      toast.success("Profile Update successfully")
      return true;
    }
    else{
      toast.error("Something went wrong!")
      return false;
    }
  })
  .catch((err) => {
    store.dispatch(HideLoader())
    if (err.response?.status === 401) {
      unAuthorized()
    }
    else {
      toast.error("Something went wrong");
    }
  })
}

export const UpdatePasswordRequest = async (password) => {
  store.dispatch(ShowLoader())
  let URL = `${BaseUrl}/UpdateProfile`;
  let ReqBody = {password}
  return await axios.post(URL, ReqBody, axiosHeaders).then((res) => {
    store.dispatch(HideLoader())
    if(res.status === 200){
      toast.success("Password Update successfully")
      return true;
    }
    else{
      toast.error("Something went wrong!")
      return false;
    }
  })
    .catch((err) => {
      store.dispatch(HideLoader())
      if (err.response?.status === 401) {
        unAuthorized()
      }
      else {
        toast.error("Something went wrong");
        return false;
      }
    })
}

export const RecoverEmailVerifyRequest = async (email) => {
  store.dispatch(ShowLoader())
  let URL = `${BaseUrl}/RecoverEmailVerify/${email}`;
  return await axios.get(URL).then((res) => {
    store.dispatch(HideLoader())
    if(res.status === 200){
      if(res.data.status === "failed"){
        toast.error(res.data.message)
        return false;
      }
      else{
        toast.success("Send Otp email verification")
        return true;
      }
    }
    else{
      toast.error("Something went wrong!")
      return false;
    }
  })
  .catch((err) => {
    store.dispatch(HideLoader())
    toast.error("Something went wrong!")
    return false;
  })
}

export const OTPVerifyRequest = async (email,otp) => {
  store.dispatch(ShowLoader())
  let URL = `${BaseUrl}/RecoverVerifyOtp`;
  let ReqBody = {email, otp}
  return await axios.post(URL,ReqBody).then((res) => {
    console.log(res)
    store.dispatch(HideLoader())
    if(res.status === 200){
      if(res.data.status === "failed"){
        toast.error(res.data.message)
      }
      else{
        toast.success("Verification Successfully")
        return true;
      }
    }
    else{
      toast.error("Something went wrong!")
      return false;
    }
  })
    .catch((err) => {
      store.dispatch(HideLoader())
      toast.error("Something went wrong!")
      return false;
    })
}


export const ResetPasswordRequest = async (email,otp, password) => {
  store.dispatch(ShowLoader())
  let URL = `${BaseUrl}/ResetPassword`;
  let ReqBody = {email, otp, password}
  return await axios.post(URL,ReqBody).then((res) => {
    console.log(res)
    store.dispatch(HideLoader())
    if(res.status === 200){
      if(res.data.status === "failed"){
        toast.error(res.data.message)
        return false;
      }
      else{
        toast.success(res.data.message)
        return true;
      }
    }
    else{
      toast.error("Something went wrong!")
      return false;
    }
  })
    .catch((err) => {
      store.dispatch(HideLoader())
      toast.error("Something went wrong!")
      return false;
    })
}