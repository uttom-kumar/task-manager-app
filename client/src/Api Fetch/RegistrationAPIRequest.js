import axios from "axios";
import toast from "react-hot-toast";
import store from "../redux/store/store.js";
import {HideLoader, ShowLoader} from "../redux/state-slice/settings-slice.js";


// const BaseUrl = "http://localhost:5050/api";
const BaseUrl = "https://task-manager-rest-api-nine.vercel.app/api";


export const RegistrationApiRequest = (fullName, email, phone, password, photo) => {
  let URL = BaseUrl + "/Register"
  let ReqBody = {fullName, email, phone, password, photo};
  store.dispatch(ShowLoader())
  return axios.post(URL, ReqBody).then((res) => {
    store.dispatch(HideLoader())
    if(res.status === 200){
      if(res.data['status']=== "failed"){
        toast.error("Email Already Existed");
        return false;
      }
      else{
        toast.success("Registration Successful!");
        return true;
      }
    }
    else{
      toast.error("SomeThing Went Wrong")
      return false;
    }
  }).catch((error) => {
    store.dispatch(HideLoader())
    toast.error("Something went wrong!");
    return false;
  })
}


export const VerifyEmailRequest = (email, otp) => {
  let URL = `${BaseUrl}/${email}/${otp}`;
  store.dispatch(ShowLoader())
  return axios.post(URL).then((res) => {
    store.dispatch(HideLoader())
    if(res.status === 200){
      if(res.data['status']=== "success"){
        toast.success("Email Verified");
        return true;
      }
      else{
        toast.error("Something went wrong!");
        return false;
      }
    }
  })
}


export const LoginApiRequest = (email, password) => {
  let URL = BaseUrl + "/Login"
  let ReqBody = {email, password};
  store.dispatch(ShowLoader())
  return axios.post(URL, ReqBody).then((res) => {
    store.dispatch(HideLoader())
    if(res.status === 200){
      if(res.data.status === "failed"){
        toast.error(res.data.message);
        return false;
      }
      else{
        localStorage.setItem("token", res.data.token)
        return true;
      }
    }
  })
    .catch((error) => {
      store.dispatch(HideLoader())
      toast.error("Something went wrong!");
      return false;
    })
}