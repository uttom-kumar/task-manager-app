import express from 'express'
const router = express.Router()
import {AuthMiddleware} from "../middlewares/AuthMiddleware.js";
import * as UserController from "../controllers/UserController.js"
import * as TaskController from "../controllers/TaskManagerController.js"




// user API
router.post('/Register',UserController.Register)
router.post('/Login',UserController.Login)
router.post('/UpdateProfile',AuthMiddleware,UserController.UpdateProfile)
router.get('/ReadProfile',AuthMiddleware,UserController.ReadProfile)
router.post('/LogOut',AuthMiddleware,UserController.LogOutProfile)
router.post('/DeleteProfile',AuthMiddleware,UserController.DeleteProfile)

router.get('/RecoverEmailVerify/:email', UserController.RecoverEmailVerify)
router.post('/RecoverVerifyOtp', UserController.RecoverVerifyOtp)
router.post('/ResetPassword', UserController.ResetPassword)

router.post('/CreateTask', AuthMiddleware, TaskController.CreateTask)
router.post('/UpdateTaskStatus/:taskID/:status', AuthMiddleware, TaskController.UpdateTaskStatus)
router.get('/DeleteTask/:id', AuthMiddleware, TaskController.DeleteTask)
router.get('/TaskListByStatus/:status', AuthMiddleware, TaskController.TaskListByStatus)
router.get('/CountTask', AuthMiddleware, TaskController.CountTask)



export default router;