import { useEffect, useState } from "react";

const useCurrentPosition = () => {
  const [hookCoords, setHookCoords] = useState(null);
  const [hookError, setHookError] = useState(null);
  const [loading, setLoading] = useState(null);

  const getCurrentPositionAsync = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          console.log("inside hook pos: ", pos);

          resolve(pos);
        },
        (error) => {
          console.log("inside hook error: ", error);
          reject(error);
        }
      );
    });
  };

  const fetchLocation = async () => {
    setLoading(true);
    try {
      const position = await getCurrentPositionAsync();
      const { latitude, longitude } = position.coords;
      console.log("inside fetch lat, lng: [", latitude, ", ", longitude, "]");
      setHookCoords([latitude, longitude]);
      return { coords: [latitude, longitude], error: null };
    } catch (error) {
      setHookError("위치 정보를 가져오는데 실패했습니다: ", error.message);
      return {
        coords: null,
        error: "위치 정보를 가져오는 데 실패했습니다: " + error.message,
      };
    }
  };

  return { fetchLocation };
};

export default useCurrentPosition;
