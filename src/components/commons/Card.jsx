import { useEffect, useState } from "react";
import { getImageByFileName } from "../../api/researchApi";
import { useNavigate } from "react-router-dom";

const Card = ({ report }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [formattedDate, setFormattedDate] = useState("날짜 정보 없음");
  const navigate = useNavigate();
  useEffect(() => {
    if (report.reportTime) {
      const date = new Date(report.reportTime);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      setFormattedDate(`${year}.${month}.${day}`);
    }
    const fetchThumbnail = async () => {
      try {
        const thumbnailData = await handleThumbnails(report.data);
        console.log("썸네일 데이터: ", thumbnailData);
        setThumbnail(thumbnailData); // thumbnail.data가 이미지 경로라고 가정
      } catch (error) {
        console.error("Error fetching thumbnail:", error);
      }
    };

    fetchThumbnail();
  }, [report]);

  const handleThumbnails = async (img) => {
    try {
      const res = await getImageByFileName(img);
      console.log("=================아무거나", res);

      return res;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="border rounded-lg shadow-sm overflow-hidden w-60 h-90 relative cursor-pointer"
      onClick={() => navigate("/researchReport", { state: report })}
    >
      <img
        src={thumbnail}
        alt={report.beachName || "해안가명"}
        className="w-60 h-60 object-cover"
      />
      <p className="absolute top-3 right-3 p-1 font-bold bg-red-500 text-m text-white rounded">
        {report.status === "ASSIGNMENT_NEEDED"
          ? "배정 필요"
          : report.status === "ASSIGNMENT_COMPLETED"
          ? "작업 완료"
          : "상태 없음"}
      </p>
      <div className="p-4 bg-white h-30">
        <h2 className="font-semibold text-l mb-2">
          {report.beachName || "해안가명"}
        </h2>
        <div className="flex justify-between">
          <p className="text-sm text-gray-600">
            {report.researcherName || report.cleanerName || "작업 종류"}
          </p>
          <p className="text-sm text-gray-600">
            {formattedDate || "날짜 정보 없음"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
