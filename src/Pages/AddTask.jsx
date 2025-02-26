import { Input, Typography, Textarea } from "@material-tailwind/react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const AddTask = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    data.start_date = startDate.toISOString();
    data.due_date = dueDate.toISOString();
    
    const res = await axios.post("https://task-management-server-alpha-drab.vercel.app/addTask", data)
    console.log(res.data);
    if(res.data.insertedId){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your task has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      reset();
    }else{
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Your task could not be saved",
        showConfirmButton: false,
        timer: 1500
      });
    }
    
  };
  return (
    <div className="flex justify-center items-center min-h-screen pt-20 bg-gray-100">
      <div className=" p-4 rounded-lg w-full">
        <h2 className="text-2xl font-semibold text-center">Create Your Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="mb-4">
            <Typography
              as="label"
              htmlFor="title"
              type="small"
              color="default"
              className="font-semibold"
            >
              Title
            </Typography>
            <Input
              type="text"
              {...register("title")}
              placeholder="Add task title"
            />
          </div>
          <div className="mb-4">
            <Typography
              as="label"
              htmlFor="Description"
              type="small"
              color="default"
              className="font-semibold"
            >
              Description
            </Typography>
            <div className="w-full space-y-4">
              <Textarea
                {...register("description")}
                size="sm"
                placeholder="Add task description"
              />
            </div>
          </div>
          {/* time stamp */}
          <div className="mb-2">
            <Typography
              as="label"
              htmlFor="Timestamp"
              type="small"
              color="default"
              className="font-semibold"
            >
              Timeline
            </Typography>
          </div>
          <div className="md:flex md:justify-between justify-normal">
            <div className="mb-4">
              <Typography
                as="label"
                htmlFor="text"
                type="small"
                color="default"
                className="font-medium text-gray-700"
              >
                Start Date
              </Typography>
              <div className="text-gray-700">
                <DatePicker
                  showIcon
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>
            <div className="mb-4">
              <Typography
                as="label"
                htmlFor="text"
                type="small"
                color="default"
                className="font-medium text-gray-700"
              >
                Due Date
              </Typography>
              <div className="text-gray-700 w-1/2">
                <DatePicker
                  showIcon
                  selected={dueDate}
                  onChange={(date) => setDueDate(date)}
                />
              </div>
            </div>
          </div>
          {/* task status */}
          <div className="mb-4">
            <Typography
              as="label"
              htmlFor="Description"
              type="small"
              color="default"
              className="font-semibold"
            >
              Task Status
            </Typography>

            <select defaultValue="null" {...register("status")} className="select hover:border-black select-bordered w-full">
              <option disabled value="null">
                Select Task Status
              </option>
              <option>To-Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 mt-4"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
