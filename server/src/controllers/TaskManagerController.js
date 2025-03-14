import {
  CountTaskService,
  CreateTaskService,
  DeleteTaskService,
  TaskListByStatusService,
  UpdateTaskStatusService
} from "../services/TaskManagerService.js";

export const CreateTask = async (req,res)=>{
  let result = await CreateTaskService(req)
  return res.json(result)
}


export const UpdateTaskStatus = async (req,res)=>{
  let result = await UpdateTaskStatusService(req)
  return res.json(result)
}

export const DeleteTask = async (req,res)=>{
  let result = await DeleteTaskService(req)
  return res.json(result)
}

export const TaskListByStatus = async (req,res)=>{
  let result = await TaskListByStatusService(req)
  return res.json(result)
}

export const CountTask = async (req,res)=>{
  let result = await CountTaskService(req)
  return res.json(result)
}