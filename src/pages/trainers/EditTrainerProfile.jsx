import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../services/trainerServices";
import { toast } from "react-toastify";

export default function EditTrainerProfile() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    phone_number: "",
    specialization: "",
    experience: "",
    earnings_per_session: "",
    image: null,
    verification_docs: null,
  });

  const [preview, setPreview] = useState(null);
  const [docName, setDocName] = useState("");

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const res = await getProfile();
        const trainer = res.data.trainer;
        setId(trainer._id);
        setFormData({
          fullname: trainer.fullname,
          phone_number: trainer.phone_number,
          specialization: trainer.specialization,
          experience: trainer.experience,
          earnings_per_session: trainer.earnings_per_session,
          image: null,
          verification_docs: null,
        });
        setPreview(trainer.image);
        setDocName(trainer.verification_docs?.split("/").pop() || "");
      } catch (err) {
        toast.error("Failed to load profile", { position: "top-center" });
      }
    };
    fetchTrainer();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [field]: file });
      if (field === "image") setPreview(URL.createObjectURL(file));
      if (field === "verification_docs") setDocName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      const res = await updateProfile(data, id);
      toast.success(res.data.message || "Profile updated successfully", {
        position: "top-center",
      });
      navigate("/auth/trainer/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Edit Fitness Profile
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Profile Image */}
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
          onChange={(e) => handleFileChange(e, "image")}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0 file:text-sm file:font-semibold
            file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
        />

        {/* Text Inputs */}
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
          className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Contact Number"
          value={formData.phone_number}
          onChange={handleChange}
          className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <select
          name="specialization"
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
          value={formData.experience}
          onChange={handleChange}
          className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <textarea
          name="earnings_per_session"
          placeholder="Earnings per session"
          value={formData.earnings_per_session}
          onChange={handleChange}
          className="w-full p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
        ></textarea>

        {/* Verification Document */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Upload Verification Document
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            name="verification_docs"
            onChange={(e) => handleFileChange(e, "verification_docs")}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0 file:text-sm file:font-semibold
            file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
          />
          {docName && (
            <p className="mt-2 text-sm text-gray-600">
              Selected file: {docName}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 border-gray-400 hover:bg-blue-700 text-white p-3 rounded-lg transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
