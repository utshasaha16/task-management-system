import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
const SignUp = () => {
  const { createUser, googleSignIn, updateProfileInfo } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        const userInfo = {
          email: user?.email,
          name: user?.displayName,
        };
        axios.post("http://localhost:5000/users", userInfo).then((res) => {
          console.log(res.data);
          Swal.fire({
            title: "Successfully Sign In",
            showClass: {
              popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `,
            },
            hideClass: {
              popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `,
            },
          });
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const name = formData.get("name");
    const password = formData.get("password");
    console.log(email, name, password);
    createUser(email, password).then((result) => {
      const user = result.user;
      console.log(user);
      updateProfileInfo(name)
        .then(() => {
          const userInfo = {
            email: email,
            name: name,
          };
          axios.post("http://localhost:5000/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Successfully Sign Up",
                showClass: {
                  popup: `
                          animate__animated
                          animate__fadeInUp
                          animate__faster
                        `,
                },
                hideClass: {
                  popup: `
                          animate__animated
                          animate__fadeOutDown
                          animate__faster
                        `,
                },
              });
              navigate(from, { replace: true });
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className=" p-6 rounded-lg w-full">
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
        <p className="text-gray-500 text-center mt-2">
          Give credentials to sign Up to your account
        </p>

        <form onSubmit={handleSignUp} className="mt-4">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Type your email"
              name="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="name"
              placeholder="Type your name"
              name="name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Type your password"
              name="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 mt-4"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-gray-500">or continue with</div>

        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={handleGoogleSignIn}
            className="p-3 border rounded-full hover:bg-gray-200"
          >
            <FaGoogle className="text-red-500 text-xl" />
          </button>
        </div>
        <p className="text-center mt-4">
          Allready Have an Account?
          <Link to="/signIn" className="text-blue-500 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
