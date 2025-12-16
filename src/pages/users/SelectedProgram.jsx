import React, { useState, useEffect } from "react";
import { getFitnessProgramById } from "../../services/fitnessService";
import SelectedProgramDetails from "../../components/SelectedProgramDetails";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const SelectedProgram = () => {
  const [program, setProgram] = useState([]);
  const { id } = useParams();
  const getFitnessProgram = async (id) => {
    try {
      const res = await getFitnessProgramById(id);
      const data = res?.data?.fitness_program;
      if (!data) {
        toast.error("No program data found");
        return;
      }
      setProgram(data);
      console.log("Program fetched:", data);
      toast.success(res?.data?.message || "Program loaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update session status");
    }
  };
  useEffect(() => {
    getFitnessProgram(id);
  }, []);

  return (
    <>
      {program && program.program_name ? (
        <SelectedProgramDetails program={program} />
      ) : (
        <p>Loading program...</p>
      )}
    </>
  );
};

export default SelectedProgram;
