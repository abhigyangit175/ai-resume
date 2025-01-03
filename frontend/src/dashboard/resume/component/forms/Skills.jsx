import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

function Skills({ enableNext }) {
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    resumeInfo && setSkillsList(resumeInfo?.skills);
  }, []);
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);

  const addNewField = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };
  const removeField = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };
  const handelChange = (index, name, value) => {
    const newEntry = skillsList.slice();
    newEntry[index][name] = value;
    setSkillsList(newEntry);
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList.map(({ id, ...rest }) => rest),
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
        <h2 className="font-bold text-lg">Skills</h2>
        <p>Add your professional top skills</p>
        <div>
          {skillsList.map((skill, index) => (
            <div
              key={index}
              className="flex justify-between border rounded-lg p-3 mb-2"
            >
              <div>
                <label className="text-xs">Name</label>
                <Input
                  className="w-full"
                  defaultValue={skill?.name}
                  onChange={(e) => handelChange(index, "name", e.target.value)}
                />
              </div>
              <Rating
                style={{ maxWidth: 130 }}
                value={skill.rating}
                defaultValue={skill?.rating}
                onChange={(v) => handelChange(index, "rating", v)}
              />
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
              + Add More Skills
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
    </div>
  );
}

export default Skills;
