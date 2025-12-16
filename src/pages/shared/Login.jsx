import React, { useState } from "react";
import { toast } from "react-toastify";
import { doLogin } from "../../services/userServices";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("All fields are required!", {
        position: "top-center",
      });
      return;
    }

    doLogin(formData)
      .then((res) => {
        console.log(res);
        const data = res.data;
        const loggedInUser = data.user;
        dispatch(setUser(loggedInUser));

        toast.success(data.message || "Login successful!", {
          position: "top-center",
        });
        if (data.user.role == "user") {
          navigate("/auth/user/dashboard");
        } else if (data.user.role == "trainer") {
          navigate("/auth/trainer/dashboard");
        } else {
          navigate("/auth/admin/dashboard");
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(
            err.response.data.error ||
              err.response.data.message ||
              "Something went wrong!",
            { position: "top-center" }
          );
        } else {
          toast.error("Network error. Please try again.", {
            position: "top-center",
          });
        }
      });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 p-10 mx-auto w-full max-w-[800px] sm:max-w-sm border border-gray-100 shadow-md rounded-lg bg-white">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md px-3 py-1.5 outline outline-1 outline-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md px-3 py-1.5 outline outline-1 outline-gray-300"
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-indigo-500"
          >
            Sign in
          </button>
        </form>
        <p class="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?
          <Link
            to="/signup"
            class="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
