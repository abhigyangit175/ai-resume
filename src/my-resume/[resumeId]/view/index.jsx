import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/component/ResumePreview";
import React, { useEffect, useState } from "react";
import GlobalApi from "./../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();

  useEffect(() => {
    getResumeInfo();
  }, []);

  const getResumeInfo = () => {
    GlobalApi.getResumeById(resumeId).then((resp) => {
      setResumeInfo(resp.data.data);
    });
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats!! your Resume is ready
          </h2>
          <p className="text-center text-gray-400">
            Congrats on completing your resume,{resumeInfo?.firstName} you're
            one step closer to success!
          </p>
          <div className="flex justify-between px-44 my-10">
            <Button onClick={handleDownload}>Download</Button>
            <RWebShare
              data={{
                text: "Greetings to Everyone!! This is my resume",
                url:
                  import.meta.env.VITE_BASE_URL +
                  "/my-resume/" +
                  resumeId +
                  "/view",
                title: resumeInfo?.firstName + "'s Resume",
              }}
              onClick={() => toast("Shared successfully!")}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>

      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
