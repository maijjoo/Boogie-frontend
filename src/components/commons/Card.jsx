import { useEffect, useState } from "react";
import { getImageByFileName } from "../../api/researchApi";
import { useNavigate } from "react-router-dom";

const Card = ({ report, tab, onMove = null }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [formattedDate, setFormattedDate] = useState("날짜 정보 없음");
  const navigate = useNavigate();
  useEffect(() => {
    if (report.reportTime || report.cleanDateTime || report.submitDateTime) {
      const date = new Date(
        report?.reportTime || report?.cleanDateTime || report.submitDateTime
      );
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      setFormattedDate(`${year}.${month}.${day}`);
    }
    const fetchThumbnail = async () => {
      try {
        const thumbnailData = await handleThumbnails(report.data);
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

      return res;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="border rounded-lg shadow-sm overflow-hidden w-60 h-90 relative cursor-pointer"
      onClick={() => {
        onMove();
        if (tab === "조사 완료") {
          navigate("/researchReport", {
            state: { reportId: report.id, isNeeded: true },
          });
        } else if (tab === "조사") {
          navigate("/researchReport", {
            state: { reportId: report.id, isNeeded: false },
          });
        } else if (tab === "청소 완료") {
          navigate("/cleanReport", {
            state: { reportId: report.id, isNeeded: true },
          });
        } else if (tab === "청소") {
          navigate("/cleanReport", {
            state: { reportId: report.id, isNeeded: false },
          });
        } else {
          navigate("/collectReport", {
            state: { reportId: report.id },
          });
        }
      }}
    >
      <img
        src={thumbnail}
        alt={report?.beachName || report?.pickUpPlace || "장소 정보 없음"}
        className="w-60 h-60 object-cover"
      />
      <p className="absolute top-3 right-3 p-1 font-bold bg-red-500 text-base text-white rounded">
        {report.status === "ASSIGNMENT_NEEDED"
          ? "배정 필요"
          : report.status === "ASSIGNMENT_COMPLETED"
          ? tab === "조사"
            ? "조사 완료"
            : tab === "청소"
            ? "청소 완료"
            : tab === "수거"
            ? "수거 완료"
            : "작업 완료"
          : "상태 없음"}
      </p>
      <div className="p-4 bg-white h-30">
        <h2 className="font-semibold text-l mb-2">
          {report?.beachName || report?.pickUpPlace || "장소 정보 없음"}
        </h2>
        <div className="flex justify-between">
          <p className="text-sm text-gray-600">
            {report?.researcherName ||
              report?.cleanerName ||
              report?.submitterName}
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
