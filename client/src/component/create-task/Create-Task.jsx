import React, {useRef} from 'react';
import {IsEmpty} from "../../helper/FormHelper.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {CreateTaskRequest} from "../../Api Fetch/AllAPIRequest.js";

const CreateTask = () => {
  let navigate = useNavigate();
  let titleRef = useRef(null)
  let descriptionRef = useRef(null)

  const CreateHandler = async () => {
    let title = titleRef.current.value
    let description = descriptionRef.current.value

    if(IsEmpty(title)){
      toast.error("Title Required!")
    }
    else if(IsEmpty(description)){
      toast.error("Description Required!")
    }
    else{
      await CreateTaskRequest(title, description).then((res)=>{
        if(res===true){
          navigate("/all")
          titleRef.current.value = ""
          descriptionRef.current.value = ""
        }
      }).catch(err=>{

      })
    }
  }

  return (
    <div>
      <div className="w-full md:w-[70%] mx-auto px-5 mt-5">
        <div className="bg-white p-5 shadow-md rounded-md">
          <h2 className="font-semibold mb-5 text-[1.5rem]">Create New Task</h2>
          <div className="flex flex-col space-y-5">
            <input
              ref={titleRef}
              className="px-5 py-2 border border-gray-400 outline-0 rounded-md focus:border-pink-400 duration-200"
              type="text"
              placeholder={"Task Name"}
            />
            <textarea
              ref={descriptionRef}
              rows={5}
              className="px-5 py-2 border border-gray-400 outline-0 rounded-md focus:border-pink-400 duration-200"
              placeholder={"Task Description"}
            />
            <div>
              <button
                className="px-5 py-2 bg-pink-600 rounded text-white font-semibold cursor-pointer float-end"
                onClick={CreateHandler}
              >CREATE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;