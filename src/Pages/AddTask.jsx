import { Input, Typography } from "@material-tailwind/react";

const AddTask = () => {
  const handleAddTask = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className=" p-6 rounded-lg w-full">
        <h2 className="text-2xl font-semibold text-center">Add Your Task</h2>
        <form onSubmit={handleAddTask} className="mt-4">
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
            <Input type="text" placeholder="Add task title" />
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
            <Input type="text" placeholder="Add task description" />
          </div>

          <div className="mb-4">
            <Typography
              as="label"
              htmlFor="Timestamp"
              type="small"
              color="default"
              className="font-semibold"
            >
              Timestamp
            </Typography>
            <Input id="email" type="email" placeholder="someone@example.com" />
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
