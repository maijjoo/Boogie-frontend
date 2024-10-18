import React, { useRef, useState } from "react";
import addImage from "../../assets/icons/write/Add Image.svg";
import dot from "../../assets/icons/write/Circle.svg";
import fatX from "../../assets/icons/workerMode/whiteFullX.png";
import thinX from "../../assets/icons/workerMode/whiteThinX.png";
import cancel from "../../assets/icons/write/Cancel.svg";

const CameraController = ({ setSource, title, max, min, border = null }) => {
  const [sources, setSources] = useState([]);
  const fileInputRef = useRef(null);

  const handleCapture = (target) => {
    if (target.files && target.files.length !== 0) {
      const file = target.files[0];

      setSource((prevSrc) => [...prevSrc, file]);

      const newUrl = URL.createObjectURL(file);
      setSources((prevSources) => [...prevSources, newUrl]);
    }
  };

  const handleSvgClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div
      className={`w-full xl:w-1/3 h-fit mt-3 flex flex-col bg-white ${border}`}
    >
      <div className="my-2">
        <label className="font-semibold">
          <img src={dot} alt="dot" className="w-1 me-2 inline" />
          {title}
        </label>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="flex p-2 gap-2">
          <div
            onClick={sources.length >= Number(max) ? null : handleSvgClick}
            className="flex-shrink-0 w-24 h-24 flex items-center justify-center cursor-pointer border border-solid border-black rounded-md"
          >
            <img src={addImage} alt="add Image" className="w-8 h-8" />
          </div>
          {sources.map((source, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-24 h-24 cursor-pointer"
              onClick={() => {
                console.log("큰 사진 모달");
              }}
            >
              <img
                src={source}
                alt={`snap-${index}`}
                className="w-full h-full object-cover rounded-md border border-black"
              />
              <img
                src={fatX}
                alt={`delete-${index}`}
                className="absolute top-1 right-1 w-5 h-5 cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation();
                  if (confirm("사진을 삭제하시겠습니까?")) {
                    setSources(
                      (prevSources) => prevSources.filter((_, i) => i !== index) // 현재 인덱스를 제외한 새로운 배열 생성
                    );
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2">
        <p
          className={`${
            sources.length < Number(min) || sources.length === Number(max)
              ? "text-red-600"
              : "text-gray-500"
          }`}
        >
          {sources.length < min
            ? `사진을 ${min}장 이상 첨부해주세요`
            : `${sources.length}/${max}`}
        </p>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        capture="environment"
        onChange={(e) => handleCapture(e.target)}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default CameraController;
