import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "./../../service/GlobalApi";
import ResumeCardItem from "./components/ResumeCardItem";

function DashBoard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) GetResumeList();
  }, [user]);

  const GetResumeList = async () => {
    try {
      setLoading(true);
      const resp = await GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress);
      // Validate API response structure
      const data = Array.isArray(resp?.data?.data) ? resp.data.data : [];
      setResumeList(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching resumes:", err);
      setError("Failed to load resumes. Please try again.");
      setResumeList([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating AI resume to your next Job role</p>
      
      {loading && <p>Loading resumes...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />
        {Array.isArray(resumeList) && resumeList.map((resume, index) => (
          <ResumeCardItem resume={resume} refreshData={GetResumeList} key={index} />
        ))}
      </div>
    </div>
  );
}

export default DashBoard;
