import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { Brain, LoaderCircle } from "lucide-react";
import { AiChatSession } from "./../../../../../service/AIModel";
import { toast } from "sonner";

function Summary({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState();
  const prompt = `Job title: ${resumeInfo?.jobTitle}. Based on this job title, provide a resume summary in 4-5 lines in JSON format with two fields: 'experienceLevel' and 'summary'. The 'experienceLevel' field should include 'Fresher', 'Mid_Level', and 'Experienced', and each should have a corresponding summary.`;

  useEffect(() => {
    summary &&
      setResumeInfo({
        ...resumeInfo,
        summary: summary,
      });
  }, [summary]);
  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summary: summary,
      },
    };
    GlobalApi.updateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        enableNext(true);
        setLoading(false);
        toast("Details updated");
      },
      (err) => {
        setLoading(false);
      }
    );
  };

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    try {
      const result = await AiChatSession.sendMessage(prompt);
      const jsonResponse = result.response; // Already JSON, no need to parse

      // Extract the relevant part of the response
      let rr = jsonResponse.candidates[0].content.parts[0].text.trim();

      // Clean up the response, and wrap it in square brackets to form a valid JSON array
      rr = `[${rr}]`;

      // Now parse the cleaned response as JSON
      const jsonArray = JSON.parse(rr);

      setAiGeneratedSummaryList(jsonArray);
    } catch (error) {
      console.error("Error parsing AI response:", error);
    } finally {
      setLoading(false);
    }
  };
  const handelAiSuggestion = (e) => {
    setSummary(e.target.innerText);
  };
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for your job title</p>
        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              onClick={GenerateSummaryFromAI}
              type="button"
              variant="outline"
              size="sm"
              className="border-primary text-primary flex gap-2"
            >
              <Brain className="h-4 w-4" />
              Generate from AI
            </Button>
          </div>
          <Textarea
            required
            className="mt-5"
            value={summary}
            defaultValue={resumeInfo?.summary}
            onChange={(e) => {
              setSummary(e.target.value);
            }}
          />
          <div className="mt-3 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
      {aiGeneratedSummaryList && (
        <div className="my-5">
          <h2 className="font-bold text-xl mb-5">Suggestions</h2>
          {aiGeneratedSummaryList.map((item, idx) => (
            <div
              key={idx}
              className="rounded-lg my-5 cursor-pointer hover:bg-primary hover:text-white transition-all hover:scale-105"
              onClick={handelAiSuggestion}
            >
              <h2 className="font-bold my-1">Level: {item.experienceLevel}</h2>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;
