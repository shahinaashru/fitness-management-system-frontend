import React, { useState } from "react";
import { createProfile } from "../../services/trainerServices";
import { toast } from "react-toastify";
export default function CreateProfile() {
  const [formData, setFormData] = useState({
    fullname: "",
    phone_number: "",
    specialization: "",
    experience: "",
    verification_docs: "",
    earnings_per_session: "",
    image: null,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    if (
      !formData.fullname ||
      !formData.phone_number ||
      !formData.specialization ||
      !formData.experience ||
      !formData.verification_docs ||
      !formData.earnings_per_session
    ) {
      toast.error("All fileds are required!", {
        position: "top-center",
      });
      return;
    }
    createProfile(formData)
      .then((res) => {
        const data = res.data;
        toast.success(data.message || "Register successful!", {
          position: "top-center",
        });
        setFormData({
          fullname: "",
          phone_number: "",
          specialization: "",
          experience: "",
          verification_docs: "",
          earnings_per_session: "",
          image: null,
        });
        setImage(null);
        setPreview(null);
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
    <div className="w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Create Fitness Profile
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex">
          {preview ? (
            <img
              src={preview}
              className="w-32 h-32 rounded-full object-cover shadow"
              alt="Preview"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
              Upload Image
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0 file:text-sm file:font-semibold
          file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
        />
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          required
          value={formData.fullname}
          onChange={handleChange}
          className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="phone_number"
          name="phone_number"
          placeholder="Contact Number"
          required
          value={formData.phone_number}
          onChange={handleChange}
          className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <select
          name="specialization"
          required
          value={formData.specialization}
          onChange={handleChange}
          className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Select Specialization</option>
          <option value="karate">Karate</option>
          <option value="kungfu">Kung Fu</option>
          <option value="yoga">Yoga</option>
          <option value="gym_fitness">Gym Fitness</option>
          <option value="dietician">Dietician</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          name="experience"
          placeholder="Experience"
          required
          value={formData.experience}
          onChange={handleChange}
          className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <textarea
          name="earnings_per_session"
          placeholder="Earnings per session"
          required
          value={formData.earnings_per_session}
          onChange={handleChange}
          className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
        ></textarea>
        {/* Verification Document Upload */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Upload Verification Document
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            name="verification_docs"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                verification_docs: e.target.files[0],
              }))
            }
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
      file:rounded-lg file:border-0 file:text-sm file:font-semibold
      file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
          />
          {formData.verification_docs && (
            <p className="mt-2 text-sm text-gray-600">
              Selected file: {formData.verification_docs.name}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 border-gray-400 hover:bg-blue-700 text-white p-3 rounded-lg transition"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
