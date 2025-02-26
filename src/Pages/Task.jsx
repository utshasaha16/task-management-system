import useTask from "../hooks/useTask";
import { IconButton } from "@material-tailwind/react";
import { FaPenNib } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router";

const Task = () => {
  const [task, refetch, isLoading] = useTask();
  console.log(task);

  const toDoTask = task.filter((t) => t.status === "To-Do");
  const inProgressTask = task.filter((t) => t.status === "In Progress");
  const doneTask = task.filter((t) => t.status === "Done");

  if (isLoading) {
    return <Loader />;
  }

  const handledDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://localhost:5000/tasks/${id}`).then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your task has been deleted.",
                icon: "success",
              });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
        });
      });
  };

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-3 bg-[#F4F5F7]">
        <div className=" md:p-4 p-2">
          <h2 className="text-xl font-semibold">To-Do</h2>
          <div className="mt-4">
            {toDoTask.map((t) => (
              <div
                className="flex justify-between gap-2 p-3 mt-2 shadow-sm bg-[#E0F2FE]"
                key={t._id}
              >
                <div>
                  <h3 className="font-semibold">{t.title}</h3>
                  <p>{t.description}</p>
                  <div className="mt-2">
                    <p className="mb-1">
                      Start Date: {new Date(t.start_date).toLocaleDateString()}
                    </p>
                    <p>Due Date: {new Date(t.due_date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link to={`/updateTask/${t._id}`}>
                    <IconButton className="bg-orange-400" size="xs">
                      <FaPenNib></FaPenNib>
                    </IconButton>
                  </Link>
                  <IconButton
                    onClick={() => handledDelete(t._id)}
                    className="bg-red-500"
                    size="xs"
                  >
                    <FaTrash></FaTrash>
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:p-4 p-2">
          <h2 className="text-xl font-semibold">In Progress</h2>
          <div className="mt-4">
            {inProgressTask.map((t) => (
              <div
                className="flex justify-between gap-2 p-3 mt-2 shadow-sm bg-[#E8F5E9]"
                key={t._id}
              >
                <div>
                  <h3 className="font-semibold">{t.title}</h3>
                  <p>{t.description}</p>
                  <div className="mt-2">
                    <p className="mb-1">
                      Start Date: {new Date(t.start_date).toLocaleDateString()}
                    </p>
                    <p>Due Date: {new Date(t.due_date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link to={`/updateTask/${t._id}`}>
                    <IconButton className="bg-orange-400" size="xs">
                      <FaPenNib></FaPenNib>
                    </IconButton>
                  </Link>
                  <IconButton
                    onClick={() => handledDelete(t._id)}
                    className="bg-red-500"
                    size="xs"
                  >
                    <FaTrash></FaTrash>
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:p-4 p-2">
          <h2 className="text-xl font-semibold">Done</h2>
          <div className="mt-4">
            {doneTask.map((t) => (
              <div
                className="flex justify-between gap-2 p-3 mt-2 shadow-sm bg-[#F0F0F0]"
                key={t._id}
              >
                <div>
                  <h3 className="font-semibold">{t.title}</h3>
                  <p>{t.description}</p>
                  <div className="mt-2">
                    <p className="mb-1">
                      Start Date: {new Date(t.start_date).toLocaleDateString()}
                    </p>
                    <p>Due Date: {new Date(t.due_date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link to={`/updateTask/${t._id}`}>
                    <IconButton className="bg-orange-400" size="xs">
                      <FaPenNib></FaPenNib>
                    </IconButton>
                  </Link>
                  <IconButton
                    onClick={() => handledDelete(t._id)}
                    className="bg-red-500"
                    size="xs"
                  >
                    <FaTrash></FaTrash>
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Task;
