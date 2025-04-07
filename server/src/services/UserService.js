import {UserModel} from "../models/UserModel.js";
import {EncodedToken} from "../utility/TokenUtility.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import bcrypt from 'bcryptjs';
import {EmailSend} from "../utility/EmailUtility.js";
import { EmailVerifyUtility} from "../utility/EmailVerifyUtility.js";




export const RegisterService = async (req) => {
    try{
        let reqBody = req.body
        let code = Math.floor(100000+Math.random()*900000)
        let EmailTo = reqBody.email
        let EmailText = `${code}`
        let EmailSubject = "Email Verification Code"

        let user = await UserModel.findOne({email : reqBody.email})


        if(user){
            return {
                status : "failed",
                message : "Email already exists"
            }
        }
        await EmailVerifyUtility (EmailTo, EmailText, EmailSubject)

        await UserModel.create({
            fullName : reqBody.fullName,
            email : reqBody.email,
            phone : reqBody.phone,
            password: reqBody.password,
            otp : code,
        })


        setTimeout(async () => {
            const user = await UserModel.findOne({ email : reqBody.email });
            if (user && !user.isVerified) {
                await UserModel.deleteOne({ email: reqBody.email  });
            }
        }, 60 * 1000);

        return {
            status : "success",
            message : "User registration successfully!",
        }

    }
    catch (err) {
        return {
            status : "failed",
            message : "some thing went wrong" ,
            error : err.toString()
        }
    }
}

export const VerifyEmailService = async (req) => {
    try{
        const email = req.params.email;
        const otpVerify = req.params.otp;
        const user = await UserModel.findOne({email : email})
        if(!user){
            return {
                status : "failed",
                message : "User does not exist"
            }
        }
        if(user.otp !== otpVerify){
            return {
                status : "failed",
                message : "Invalid verification code"
            }
        }

        await UserModel.updateOne(
            { email: email },
            { $set: { isVerified: true, otp: null } }
        );

    }
    catch (err) {
        return {
            status : "failed",
            message : "some thing went wrong" ,
            error : err.toString()
        }
    }
}


export const LoginService = async (req,res) => {
    try{
        let {email,password} = req.body
        let user = await UserModel.findOne(
          {
            $or : [{email : email}, {phone: email}]
          }
        )

        if (!user) {
            return{
                status: "failed",
                message: "User not found",
            }
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return {
                status: "failed",
                message: "Incorrect password",
            };
        }

        let token = EncodedToken( user['email'], user['_id'])

        let options = {
            maxAge: 30*24*60*60,
            httpOnly: true,
            sameSite: "None",
            secure: true,
        };
        res.cookie("token", token, options)

        return{
            status : "success",
            message : "Login Successfully",
            token : token,
            data: user
        }

    }
    catch (err){
        return{
            status: "failed",
            message: "service login failed",
            error: err.toString()
        }
    }
}

export const UpdateProfileService = async (req) => {
    try{
        let user_id = req.headers.user_id
        let reqBody = req.body

        if (reqBody.password) {
            const salt = await bcrypt.genSalt(10);
            reqBody.password = await bcrypt.hash(reqBody.password, salt);
        }

        await UserModel.updateOne(
          {_id: user_id},
          {$set: reqBody}
        )

        return {
            status: "success",
            message: "Profile updated successfully.",
        }
    }
    catch (err){
        return {
            status : "failed",
            message : "Profile Update Failed",
            error : err.toString()
        }
    }
}

export const ReadProfileService = async (req) => {
    try{
        let user_id = new ObjectId(req.headers.user_id)

        let MatchStage = {
            $match : {
                _id : user_id
            }
        }

        let projectionStage = {
            $project: {
                'password':0,
            }
        }
        let data = await UserModel.aggregate([
            MatchStage,
            projectionStage,
        ])

        return{
            status : "success",
            message : "Profile Read Successfully",
            data : data
        }
    }
    catch (err){
        return {
            status : "failed",
            message : "Profile Update Failed",
            error : err.toString()
        }
    }
}

export const LogOutProfileService = async (req, res) => {
    try{
        res.clearCookie("token")
        return {
            status : "success",
            message : "Logged Out Successfully",
        }
    }
    catch (err){
        return {
            status : "failed",
            message : "Failed to Logout",
            error : err.toString()
        }
    }
}

export const DeleteProfileService = async (req) => {
    try{
        let userID = req.headers.user_id
        await UserModel.deleteOne({_id: userID})
        return {
            status : "success",
            message : "Profile Deleted Successfully"
        }
    }
    catch (err){
        return {
            status : "failed",
            message : "Profile Delete Failed",
            error : err.toString()
        }
    }
}

export const RecoverEmailVerifyService = async (req) => {
    try{
        let email = req.params.email;
        let user = await UserModel.aggregate([
            {$match :  {email : email}},
            {$count : "total"}
        ])


        let code = Math.floor(100000+Math.random()*900000)
        let EmailTo = email
        let EmailText = `${code}`
        let EmailSubject = "Email Verification Code"


        if(user[0]?.total === 1) {
            await EmailSend (EmailTo, EmailText, EmailSubject)
            await UserModel.updateOne({email:email},{$set:{otp: code}},{upsert:true})
            return {
                status : "success",
                message : "6 digits Code Send Successfully"
            }
        }
        else{
            return {
                status : "failed",
                message : "User Not Found",
            }
        }
    }
    catch(err) {
        return {
            status : "failed",
            message : "Email Verification Failed",
            error : err.toString()
        }
    }
}


export const RecoverVerifyOtpService = async (req) => {
    try {
        let { email, otp } = req.body;
        otp = parseInt(otp);

        let OtpCount = await UserModel.findOne({
            email: email,
            otp: otp
        });

        if (OtpCount) {
            let OtpUpdate = await UserModel.updateOne(
              { email: email },
              { otp: otp }
            );

            return {
                status: "success",
                message: "OTP verification successful",
                data: OtpUpdate
            };
        } else {
            return {
                status: "failed",
                message: "Invalid OTP Code"
            };
        }
    } catch (err) {
        return {
            status: "failed",
            message: "Invalid OTP Code. Please Try again",
            error: err.toString()
        };
    }
}


export const ResetPasswordService = async (req) => {
    try{
        let reqBody = req.body
        let {email ,otp} = reqBody


        let OtpUsedCount = await UserModel.aggregate([
            {$match :  {email, otp}},
            {$count : "total"}
        ])

        // Hash the user's password
        const salt = await bcrypt.genSalt(10);  // Generate salt with a strength of 10
        const hashedPassword = await bcrypt.hash(reqBody.password, salt); // Hash the password

        if(OtpUsedCount[0]?.total === 1){
            //update password
            let passUpdate = await UserModel.updateOne(
              {
                  email : email,
                  otp : otp
              },
              {
                  otp : null,
                  password: hashedPassword
              }
            )
            return {
                status : "success",
                message : "Password changed Successfully",
                data : passUpdate
            }
        }
        else {
            return {
                status : "failed",
                message : "password does not change!"
            }
        }
    }
    catch (err){
        return {
            status : "failed",
            message : "Something went wrong",
            error : err.toString()
        }
    }
}



