import React, { useState } from "react";
import { createProfile } from "../../services/userServices";
import { toast } from "react-toastify";
export default function CreateProfile() {
  const [formData, setFormData] = useState({
    fullname: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    fitness_goals: "",
    image: null,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle text input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image upload
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

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    if (
      !formData.fullname ||
      !formData.age ||
      !formData.gender ||
      !formData.height ||
      !formData.weight ||
      !formData.fitness_goals
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
          age: "",
          gender: "",
          height: "",
          weight: "",
          fitness_goals: "",
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
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 mb-6">
        Create Fitness Profile
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Image Preview */}
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

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0 file:text-sm file:font-semibold
          file:bg-orange-100 file:text-orange-700 hover:file:bg-blue-200"
        />

        {/* Full Name */}
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          required
          value={formData.fullname}
          onChange={handleChange}
          className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Age */}
        <input
          type="number"
          name="age"
          placeholder="Age"
          required
          value={formData.age}
          onChange={handleChange}
          className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Gender */}
        <select
          name="gender"
          required
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        {/* Height */}
        <input
          type="number"
          name="height"
          placeholder="Height (cm)"
          required
          value={formData.height}
          onChange={handleChange}
          className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Weight */}
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          required
          value={formData.weight}
          onChange={handleChange}
          className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Fitness Goals */}
        <textarea
          name="fitness_goals"
          placeholder="Describe your fitness goals..."
          required
          value={formData.fitness_goals}
          onChange={handleChange}
          className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
        ></textarea>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-orange-500 border-gray-400 hover:bg-orange-300 text-white p-3 rounded-lg transition"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
