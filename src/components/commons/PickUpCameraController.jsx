import React, { useRef, useState } from "react";
import addImage from "../../assets/icons/write/Add Image.svg";

const PickUpCameraController = ({ setSource }) => {
  const [sources, setSources] = useState([]);
  const fileInputRef = useRef(null);

  const handleCapture = (target) => {
    if (target.files && target.files.length !== 0 && sources.length < 3) {
      const file = target.files[0];

      setSource((prevSrc) => [...prevSrc, file]);

      const newUrl = URL.createObjectURL(file);
      setSources((prevSources) => [...prevSources, newUrl]);
    }
  };

  const handleSvgClick = () => {
    fileInputRef.current.click();
    setSource(sources);
  };
  return (
    <div className="w-full xl:w-1/3 h-fit mt-3 flex flex-col">
      <div>
        <div className="flex">
          <div
            onClick={handleSvgClick}
            className="flex-shrink-0 w-24 h-24 mr-2 flex items-center justify-center cursor-pointer border border-dashed border-gray-300 rounded-md"
          >
            <img src={addImage} alt="add Image" className="w-8 h-8" />
          </div>
          {sources.map((source, index) => (
            <div key={index} className="flex-shrink-0 w-24 h-24 mr-2">
              <img
                src={source}
                alt={`snap-${index}`}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>
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

export default PickUpCameraController;
