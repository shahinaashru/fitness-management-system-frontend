import React, { useState } from "react";
import { toast } from "react-toastify";
import { doRegister } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (
      !formData.role ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirm_password
    ) {
      toast.error("All fields are required!", {
        position: "top-center",
      });
      return;
    } else if (formData.password.trim() !== formData.confirm_password.trim()) {
      toast.error("The password and confirm password fields do not match.", {
        position: "top-center",
      });
      return;
    }
    const { confirm_password, ...dataToSend } = formData;
    doRegister(dataToSend)
      .then((res) => {
        const data = res.data;
        toast.success(data.message || "Register successful!", {
          position: "top-center",
        });
        navigate("/");
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
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Register with Us
          </h2>
        </div>

        <div className="mt-10 p-10 mx-auto w-full max-w-[800px] h-auto lg:max-w-lg md:max-w-md sm:max-w-sm border border-gray-100 shadow-md rounded-lg bg-white">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Select User Type
                </label>

                <div className="flex items-center gap-6 mt-2">
                  <label className="flex items-center gap-2 text-gray-700">
                    <input
                      type="radio"
                      name="role"
                      value="trainer"
                      checked={formData.role === "trainer"}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600"
                    />
                    Trainer
                  </label>

                  <label className="flex items-center gap-2 text-gray-700">
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={formData.role === "user"}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600"
                    />
                    User
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                User Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="username"
                  id="username"
                  required={true}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  required={true}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  required={true}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirm_password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  onChange={handleChange}
                  required={true}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p class="mt-10 text-center text-sm/6 text-gray-500">
            A member?
            <Link
              to="/"
              class="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
