import React, { FC, useEffect, useState } from "react";

type Props = {
  name: string;
};
type TagType = {
  container: string;
  dot: string;
};
const CustomTag: FC<Props> = ({ name }) => {
  const lowerName = name.toLowerCase();
  const [className, setClassName] = useState<TagType>({
    container: "",
    dot: "",
  });
  useEffect(() => {
    if (lowerName === "đã sử dụng")
      setClassName({
        container: "border-extraDarkGray bg-extraLightGray text-extraDarkGray",
        dot: "bg-extraDarkGray",
      });
    if (lowerName === "chưa sử dụng" || lowerName === "đang áp dụng")
      setClassName({
        container: "border-normalGreen bg-lightGreen text-normalGreen",
        dot: "bg-normalGreen",
      });
    if (lowerName === "hết hạn" || lowerName === "tắt")
      setClassName({
        container: "border-normalRed bg-lightRed text-normalRed",
        dot: "bg-normalRed",
      });
  }, []);
  return (
    <div
      className={`flex items-baseline justify-evenly gap-1 p-1 max-w-fit border-solid border-[1px] rounded ${className.container}`}
    >
      <span
        className={`rounded-full w-2 h-2 inline-block ${className.dot}`}
      ></span>
      {name}
    </div>
  );
};

export default CustomTag;
