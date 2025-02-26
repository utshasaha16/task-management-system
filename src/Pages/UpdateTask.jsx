import { Input, Typography, Textarea } from "@material-tailwind/react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";




const UpdateTask = () => {
  const {id} = useParams();
  const { register, handleSubmit, reset } = useForm();

  const { data: task = [], isLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const res = await axios.get(`https://task-management-server-alpha-drab.vercel.app/tasks/${id}`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {

    const res = await axios.patch(`https://task-management-server-alpha-drab.vercel.app/tasks/${id}`, data);
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your task has been updated",
        showConfirmButton: false,
        timer: 1500,
      });
      // reset();
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Your task could not be updated",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="">
      <div className="flex justify-center items-center min-h-screen pt-20 bg-gray-100">
        <div className=" p-4 rounded-lg w-full">
          <h2 className="text-2xl font-semibold text-center">
            Update Your Task
          </h2>
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
              defaultValue={task.title}
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
                defaultValue={task.description}
                  {...register("description")}
                  size="sm"
                  placeholder="Add task description"
                />
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

              <select
                defaultValue={task.status}
                {...register("status")}
                className="select hover:border-black select-bordered w-full"
              >
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
              Update Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
