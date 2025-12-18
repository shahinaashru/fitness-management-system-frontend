import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/userServices";
import { toast } from "react-toastify";

export default function EditProfile() {
  const [id, setId] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    fitness_goals: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        const profile = res?.data?.user;
        if (!profile) return;
        setId(profile._id);
        setFormData({
          fullname: profile.fullname || "",
          age: profile.age || "",
          gender: profile.gender || "",
          height: profile.height || "",
          weight: profile.weight || "",
          fitness_goals: profile.fitness_goals || "",
          image: null,
        });

        if (profile.image) {
          setPreview(profile.image);
        }
      } catch (err) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) payload.append(key, value);
      });
      const res = await updateProfile(payload, id);

      toast.success(res.data.message || "Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Profile update failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Edit Fitness Profile
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex justify-center">
          {preview ? (
            <img
              src={preview}
              className="w-32 h-32 rounded-full object-cover"
              alt="Profile"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
              No Image
            </div>
          )}
        </div>

        <input type="file" accept="image/*" onChange={handleImageUpload} />

        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full p-3 border border-gray-400 rounded-lg"
        />

        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          required
          className="w-full p-3 border border-gray-400 rounded-lg"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-400 rounded-lg"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          placeholder="Height (cm)"
          required
          className="w-full p-3 border border-gray-400 rounded-lg"
        />

        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Weight (kg)"
          required
          className="w-full p-3 border border-gray-400 rounded-lg"
        />

        <textarea
          name="fitness_goals"
          value={formData.fitness_goals}
          onChange={handleChange}
          placeholder="Fitness goals"
          required
          className="w-full p-3 border border-gray-400 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-300 text-white p-3 rounded-lg"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
