import React, { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function ThemeColor() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [selectedColor, setSelectedColor] = useState();
  const { resumeId } = useParams();
  const colors = [
    "#FFFFFF",
    "#F0F0F0",
    "#D3D3D3",
    "#A9A9A9",
    "#FFB6C1",
    "#FF69B4",
    "#FF6347",
    "#FFA07A",
    "#FFD700",
    "#F0E68C",
    "#EEE8AA",
    "#98FB98",
    "#90EE90",
    "#32CD32",
    "#20B2AA",
    "#87CEEB",
    "#ADD8E6",
    "#4682B4",
    "#9370DB",
    "#BA55D3",
  ];

  const onColorSelect = (color) => {
    setSelectedColor(color);
    setResumeInfo({
      ...resumeInfo,
      themeColor: color,
    });
    const data = {
      data: {
        themeColor: color,
      },
    };
    GlobalApi.updateResumeDetail(resumeId, data).then((resp) => {
      toast("Theme Color Updated!!")
    });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-2 text-sm font-bold">Select Theme color</h2>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((col, index) => (
            <div
              key={index}
              className={`h-5 w-5 rounded-full cursor-pointer hover:border-black border ${
                selectedColor === col && "border border-black"
              }`}
              onClick={() => onColorSelect(col)}
              style={{ backgroundColor: col }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
