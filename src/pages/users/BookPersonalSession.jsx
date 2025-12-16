import React, { useEffect, useState } from "react";
import { getFitnessPrograms } from "../../services/fitnessService";
import { getTrainers } from "../../services/trainerServices";
import { createSesion } from "../../services/sessionService";
import { toast } from "react-toastify";
export default function BookPersonalSession() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [trainers, setTrainers] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    trainerId: "",
    programId: "",
    sessionDate: "",
    startTime: "",
    endTime: "",
    mode: "online",
    location: "",
    cost: 0,
    notes: "",
  });
  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        getTrainers()
          .then((res) => {
            setTrainers(res.data.trainer);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.error("Error trainer data:", err);
        setError("Failed to load trainer data");
      } finally {
        setLoading(false);
      }
    };
    const fetchFitnessPrograms = async () => {
      try {
        getFitnessPrograms()
          .then((res) => {
            setPrograms(res.data.fitness_programs);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.error("Error trainer data:", err);
        setError("Failed to load trainer data");
      } finally {
        setLoading(false);
      }
    };

    fetchFitnessPrograms();
    fetchTrainerData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "trainerId") {
      const prog = trainers.find((t) => t._id === value);
      setForm((prev) => ({
        ...prev,
        trainerId: value,
        cost: prog?.earnings_per_session || 0,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log(form);
    if (
      !form.programId ||
      !form.trainerId ||
      !form.sessionDate ||
      !form.startTime ||
      !form.endTime ||
      !form.cost ||
      !form.mode
    ) {
      toast.error("All fileds are required!", {
        position: "top-center",
      });
      return;
    }
    createSesion(form)
      .then((res) => {
        const data = res.data;
        toast.success(data.message || "Creation successful!", {
          position: "top-center",
        });
        setForm({
          trainerId: "",
          programId: "",
          sessionDate: "",
          startTime: "",
          endTime: "",
          mode: "online",
          location: "",
          cost: 0,
          notes: "",
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
    <div className="max-w-6xl mx-auto bg-white p-12 rounded shadow h-screen my-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Book Personal Session
      </h2>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block mb-1">Choose Trainer</label>
          <select
            name="trainerId"
            required
            onChange={handleChange}
            className="w-full border border-gray-400 px-3 py-2"
          >
            <option value="">Select trainer</option>
            {trainers?.map((t) => (
              <option key={t._id} value={t._id}>
                {t.fullname}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Choose Program</label>
          <select
            name="programId"
            required
            onChange={handleChange}
            className="w-full border border-gray-400 px-3 py-2"
          >
            <option value="">Select program</option>
            {programs?.map((p) => (
              <option key={p._id} value={p._id}>
                {p.program_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Price Per Session</label>
          <input
            readOnly
            value={form.cost}
            className="w-full border border-gray-400 px-3 py-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1">Session Date</label>
          <input
            name="sessionDate"
            required
            type="date"
            onChange={handleChange}
            className="w-full border border-gray-400 px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            name="startTime"
            required
            type="time"
            onChange={handleChange}
            className="w-full border border-gray-400 px-3 py-2"
          />
          <input
            name="endTime"
            required
            type="time"
            onChange={handleChange}
            className="w-full border border-gray-400 px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">Mode</label>
          <select
            name="mode"
            onChange={handleChange}
            className="w-full border border-gray-400 px-3 py-2"
          >
            <option value="online">Online</option>
            <option value="in-person">In Person</option>
          </select>
        </div>

        {form.mode === "in-person" && (
          <div>
            <label className="block mb-1">Location</label>
            <input
              name="location"
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2"
            />
          </div>
        )}

        <div>
          <label className="block mb-1">Notes</label>
          <textarea
            name="notes"
            onChange={handleChange}
            className="w-full border border-gray-400 px-3 py-2"
            rows="3"
          />
        </div>

        <button className="w-full bg-orange-500 text-white py-2 rounded">
          Request Booking
        </button>
      </form>
    </div>
  );
}
