import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";

function Education({ enableNext }) {
  const [educationalList, setEducationaList] = useState([
    {
      universityName: "",
      startDate: "",
      endDate: "",
      degree: "",
      major: "",
      description: "",
    },
  ]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const handelChange = (event, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationaList(newEntries);
  };
  const addNewField = () => {
    setEducationaList([
      ...educationalList,
      {
        universityName: "",
        startDate: "",
        endDate: "",
        degree: "",
        major: "",
        description: "",
      },
    ]);
  };
  const removeField = () => {
    setEducationaList((educationalList) => educationalList.slice(0, -1));
  };
  useEffect(() => {
    resumeInfo && setEducationaList(resumeInfo?.education);
  }, []);
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList,
    });
  }, [educationalList]);
  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest),
      },
    };
    GlobalApi.updateResumeDetail(params.resumeId, data).then(
      (resp) => {
        console.log(resp);
        setLoading(false);
        toast("Details Updated !!");
      },
      (err) => {
        setLoading(false);
        toast("Server Error, Try Again !!");
      }
    );
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Education</h2>
        <p>Add your educational details</p>
      </div>

      <div>
        {educationalList.map((edu, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label>University Name</label>
                <Input
                  name="universityName"
                  onChange={(event) => handelChange(event, index)}
                  defaultValue={edu?.universityName}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input
                  name="degree"
                  onChange={(event) => handelChange(event, index)}
                  defaultValue={edu?.degree}
                />
              </div>
              <div>
                <label>Major</label>
                <Input
                  name="major"
                  onChange={(event) => handelChange(event, index)}
                  defaultValue={edu?.major}
                />
              </div>
              <div>
                <label>Start Date</label>
                <Input
                  name="startDate"
                  type="date"
                  onChange={(event) => handelChange(event, index)}
                  defaultValue={edu?.startDate}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  name="endDate"
                  type="date"
                  onChange={(event) => handelChange(event, index)}
                  defaultValue={edu?.endDate}
                />
              </div>
              <div className="col-span-2">
                <label>Description</label>
                <Textarea
                  name="description"
                  defaultValue={edu?.description}
                  onChange={(event) => handelChange(event, index)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-primary"
            onClick={addNewField}
          >
            + Add More Education
          </Button>
          <Button
            variant="outline"
            className="text-primary"
            onClick={removeField}
          >
            - Remove
          </Button>
        </div>

        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Education;
