import React, { useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import CardImages from "../../assets/images/CardImages.jpg";
import RedPin from "../../assets/icons/write/ic-location-red.svg";
import BlackPin from "../../assets/icons/write/ic-location-black.svg";

const KakaoMap = ({ myCoords, spots, setDetail }) => {
  return (
    <Map
      center={{
        lat: myCoords.lat,
        lng: myCoords.lng,
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
      level={3} // 지도의 확대 레벨
    >
      {spots.map((spot) => {
        return (
          <MapMarker
            key={spot.id}
            position={{ lat: spot.latitude, lng: spot.longitude }}
            title={spot.pickUpPlace}
            image={{
              src: BlackPin,
              size: {
                width: 24,
                height: 35,
              },
            }}
            onClick={() => {
              setDetail(spot.id);
            }}
          />
        );
      })}
    </Map>
  );
};

export default KakaoMap;
