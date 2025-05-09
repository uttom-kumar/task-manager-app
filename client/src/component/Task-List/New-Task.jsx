import React, {useEffect} from 'react';
import {TaskListByStatusRequest} from "../../Api Fetch/AllAPIRequest.js";
import {useSelector} from "react-redux";
import {AiOutlineCalendar, AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import {DeleteAlert} from "../../helper/DeleteAlert.js";
import {UpdateStatusAlert} from "../../helper/UpdateAlert.js";

const NewTask = () => {
  const NewList = useSelector((state) => state.task.New)

  useEffect(() => {
    (async () => {
      await TaskListByStatusRequest("New")
    })()
  }, []);


  const DeleteTodoHandler = async (id) => {
    await DeleteAlert(id)
    await TaskListByStatusRequest("New")
  }

  const UpdateStatusHandler = async (id, status) => {
    await UpdateStatusAlert(id, status).then( async (res) => {
      if(res===true){
        await TaskListByStatusRequest("New")
      }
    })
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-3 mb-5">
        {
          NewList?.map((task,i) => {
            return(
              <div key={i}>
                <div className="bg-white shadow-md rounded-md p-5 h-full">
                  <h6 className="font-semibold mb-3 text-[18px]">{task?.title}</h6>
                  <p className="mb-3 text-gray-600">{task?.description}</p>
                  <div className="flex justify-between items-center text-gray-600">
                    <div className="flex items-center">
                      <span className="flex items-center"><AiOutlineCalendar />{task?.createdDate}</span>
                      <button
                        onClick={() => UpdateStatusHandler (task._id, task.status)}
                        className="mx-5 cursor-pointer text-blue-600"
                      >
                        <AiOutlineEdit />
                      </button>
                      <button onClick={() => DeleteTodoHandler(task._id)} className="mx-5 cursor-pointer text-red-600"><AiOutlineDelete /></button>
                    </div>
                    <button className="cursor-pointer px-3 py-1 bg-cyan-600 rounded text-white font-semibold">{task?.status}</button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  );
};

export default NewTask;