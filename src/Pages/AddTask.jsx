import { Input, Typography, Select, Textarea } from "@material-tailwind/react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AddTask = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [status, setStatus] = useState("");
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    data.start_date = startDate.toISOString();
    data.due_date = dueDate.toISOString();
    data.status = status;
    console.log(data);
  };

  const handleStatusChange = (status) => {
    setStatus(status);
  };

  // const handleAddTask = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const title = formData.get("title");
  //   const description = formData.get("description");

  //   const start_date = startDate.toISOString();
  //   const due_date = dueDate.toISOString();
  //   console.log({ title, description, status, start_date, due_date });
  // };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
          <div className="flex justify-between">
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
              <div className="text-gray-700">
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

            <Select
              className="w-full"
              placeholder="Select Status"
              onChange={handleStatusChange}
              required
            >
              <Select.Trigger className="w-full" placeholder="Select Version" />
              <Select.List>
                <Select.Option value="To-Do">To-Do</Select.Option>
                <Select.Option value="In Progress">In Progress</Select.Option>
                <Select.Option value="Done">Done</Select.Option>
              </Select.List>
            </Select>
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
