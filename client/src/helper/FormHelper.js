

// let EmailRegx = /^\w+@\w+\.\w+$/;
let EmailRegx = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
let MobileRegx = /^(?:\+88|0088)?01[3-9]\d{8}$/;
let PasswordRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;



class FormHelper {
  IsEmpty(value) {
    return value.length === 0;
  }

  IsMobile(value) {
    return MobileRegx.test(value);
  }

  IsImageValid(imgExtension){
    return imgExtension.includes(imgExtension);
  }

  IsEmail(value) {
    return !EmailRegx.test(value);
  }

  IsPasswordValid(value) {
    return !PasswordRegx.test(value);
  }

  getBase64(file){
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    })
  }

  setEmail(email){
    return sessionStorage.setItem('email', email)
  }
  getEmail(){
    return sessionStorage.getItem('email')
  }

  setOTP(otp){
    return sessionStorage.setItem('otp', otp)
  }

  getOTP(){
    return sessionStorage.getItem('otp')
  }

  unAuthorized(){
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

}

export const {
  IsEmpty,
  IsMobile,
  IsImageValid,
  IsEmail,
  IsPasswordValid,
  getBase64,
  setEmail,
  getEmail,
  setOTP,
  getOTP,
  unAuthorized,
} = new FormHelper();