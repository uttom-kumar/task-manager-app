import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
  userID:{type:mongoose.Schema.Types.ObjectId,required:true},
  title:{type:String,required: true},
  description:{type:String,required: true},
  status:{type:String,required: true},
  createdDate: { type: Date, default: Date.now }
},{timestamps: true, versionKey:false})

export const TaskModel = mongoose.model('tasks', TaskSchema)