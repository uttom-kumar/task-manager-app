import mongoose from "mongoose";
import {TaskModel} from "../models/TaskModle.js";
let ObjectId = mongoose.Types.ObjectId

export const CreateTaskService = async (req) => {
  try{
    const user_id = req.headers.user_id
    let reqBody = req.body
    reqBody.userID = user_id

    await TaskModel.create(reqBody)
    return {
      status:"success",
      message:"Task create Successfully",
    }
  }
  catch(error){
    return{
      status: "failed",
      message: "task creation failed",
      error: error.toString(),
    }
  }
}

export const UpdateTaskStatusService = async (req) => {
  try{
    const user_id = req.headers.user_id
    console.log(user_id)
    const {taskID,status} = req.params

    await TaskModel.updateOne(
      {_id: taskID, userID:user_id},
      {status:status}
    )
    return {
      status:"success",
      message:"Task status update Successfully",
    }
  }
  catch(error){
    return{
      status: "failed",
      message: "task status update failed",
      error: error.toString(),
    }
  }
}

export const DeleteTaskService = async (req) => {
  try{
    const user_id = req.headers.user_id
    const taskID = req.params.id

    const exitTask = await TaskModel.findOne({_id:taskID,userID:user_id})
    if(!exitTask){
      return {
        status:"failed",
        message:"Task not found or unAuthorized",
      }
    }

    await TaskModel.deleteOne({_id: taskID, userID:user_id})
    return{
      status:"success",
      message:"task delete successfully",
    }
  }
  catch(error){
    return{
      status:"failed",
      message:"task delete failed",
      error: error.toString(),
    }
  }
}

export const TaskListByStatusService = async (req) => {
  try {
    let user_id = new ObjectId(req.headers['user_id']);
    let status = req.params.status

    let tasks = await TaskModel.aggregate([
      {
        $match: { status: status, userID: user_id }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          status: 1,
          createdDate: {
            $dateToString: {
              date: "$createdDate",
              format: "%d-%m-%Y"
            }
          }
        }
      }
    ]);

    return {
      status: "success",
      message: "Task List",
      data: tasks  // Fix: Include the result in response
    };
  } catch (e) {
    return {
      status: "fail",
      message: e.toString()
    };
  }
};

export const CountTaskService = async (req)=>{
  try {
    let user_id=new ObjectId(req.headers['user_id'])
    let data=await TaskModel.aggregate([
      {$match:{userID : user_id}},
      {$group:{_id:"$status",sum:{$count:{}}}}
    ])
    return {
      status:"success",
      message:"Count successfully",
      data:data
    }
  }
  catch (e) {
    return{
      status:"fail",
      message: "count failed",
      error: e.toString(),
    }
  }
}