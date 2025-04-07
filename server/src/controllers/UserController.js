import {
    DeleteProfileService,
    LoginService,
    LogOutProfileService,
    ReadProfileService, RecoverEmailVerifyService, RecoverVerifyOtpService,
    RegisterService, ResetPasswordService,
    UpdateProfileService, VerifyEmailService,
} from "../services/UserService.js";


export const Register = async (req, res) => {
    let result = await  RegisterService(req, res)
    return res.json(result)
}



export const VerifyEmail = async (req, res) => {
    let result = await VerifyEmailService (req)
    return res.json(result)
}


export const Login = async (req, res) => {
    let result = await LoginService (req, res)
    return res.json(result)
}



export const UpdateProfile = async (req, res) => {
    let result = await UpdateProfileService (req, res)
    return res.json(result)
}

export const ReadProfile = async (req, res) => {
    let result = await ReadProfileService (req, res)
    return res.json(result)
}

export const LogOutProfile = async (req, res) => {
    let result = await LogOutProfileService (req, res)
    return res.json(result)
}

export const DeleteProfile = async (req, res) => {
    let result = await DeleteProfileService (req, res)
    return res.json(result)
}


export const RecoverEmailVerify = async (req, res) => {
    let result = await RecoverEmailVerifyService (req, res)
    return res.json(result)
}


export const RecoverVerifyOtp = async (req, res) => {
    let result = await RecoverVerifyOtpService (req, res)
    return res.json(result)
}


export const ResetPassword = async (req, res) => {
    let result = await ResetPasswordService (req, res)
    return res.json(result)
}
