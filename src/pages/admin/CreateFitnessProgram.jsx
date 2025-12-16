import React, { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { createFitnessProgram } from "../../services/fitnessService";
import { toast } from "react-toastify";
export default function CreateFitnessProgram() {
  const [formData, setFormData] = useState({
    program_name: "",
    description: "",
    suitable_for: "",
    goal_type: "",
    duration: "",
    number_of_sessions: "",
    session_duration: "",
    workout_plan: "",
    nutrition_plan: "",
    cost: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (
      !formData.program_name ||
      !formData.duration ||
      !formData.number_of_sessions ||
      !formData.session_duration ||
      !formData.cost
    ) {
      toast.error(
        "Program Name, Duration,Number of sessions,Session duration and Cost are required!",
        {
          position: "top-center",
        }
      );
      return;
    }
    createFitnessProgram(formData)
      .then((res) => {
        const data = res.data;
        toast.success(data.message || "Register successful!", {
          position: "top-center",
        });
        setFormData({
          program_name: "",
          description: "",
          suitable_for: "",
          goal_type: "",
          duration: "",
          number_of_sessions: "",
          session_duration: "",
          workout_plan: "",
          nutrition_plan: "",
          cost: "",
          image: null,
        });
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Create Fitness Program
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Choose Image
            </label>

            {/* Custom Browse Button */}
            <label
              htmlFor="imageUpload"
              className="flex items-center gap-3 cursor-pointer w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 hover:bg-gray-200 transition"
            >
              <PhotoIcon className="h-6 w-6 text-gray-600" />

              <span className="text-gray-700">
                {formData.image ? formData.image.name : "Click to browse image"}
              </span>
            </label>

            {/* Hidden File Input */}
            <input
              id="imageUpload"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />

            {/* Preview */}
            {formData.image && (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                className="mt-3 h-40 w-full object-cover rounded-lg border"
              />
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Program Title
            </label>
            <input
              type="text"
              name="program_name"
              value={formData.program_name}
              onChange={handleChange}
              placeholder="Enter program Title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter program description"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Goal Type
            </label>
            <textarea
              name="goal_type"
              value={formData.goal_type}
              onChange={handleChange}
              placeholder="Enter program goal type"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={2}
              required
            />
          </div>
          {/* Duration & Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 4 weeks"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Sitable for
              </label>
              <select
                name="suitable_for"
                value={formData.suitable_for}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="">Select Suitable Option</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Number Of Sessions
              </label>
              <input
                type="text"
                name="number_of_sessions"
                value={formData.number_of_sessions}
                onChange={handleChange}
                placeholder="e.g., 30"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Session Duration
              </label>
              <input
                type="text"
                name="session_duration"
                value={formData.session_duration}
                onChange={handleChange}
                placeholder="e.g., 1 hour"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Workout Plan
            </label>
            <textarea
              name="workout_plan"
              value={formData.workout_plan}
              onChange={handleChange}
              placeholder="Enter workout plan"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Nutrition Plan
            </label>
            <textarea
              name="nutrition_plan"
              value={formData.nutrition_plan}
              onChange={handleChange}
              placeholder="Enter nutrition plan"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Cost</label>
            <input
              type="text"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              placeholder="e.g.,3000"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            {formData.cost && (
              <p className="text-gray-500 mt-1 text-sm">
                <span className="font-semibold">Note:</span> 10% of the program
                cost (~${(formData.cost * 0.1).toFixed(2)}) goes to the admin.
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Program
          </button>
        </form>
      </div>
    </div>
  );
}
