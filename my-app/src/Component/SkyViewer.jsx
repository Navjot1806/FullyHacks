import React from "react";
import "./SkyView.css";

const SkyMap = () => {
  const iframeUrl =
    "http://server1.sky-map.org/skywindow?object=M100&zoom=8&img_source=SDSS";
  return (
    <div className="sky-map-wrapper">
      <iframe
        src={iframeUrl}
        title="Sky Map"
        width="1000"
        height="700"
        frameBorder="0"
        allowFullScreen
        className="sky-iframe"
      />
    </div>
  );
};

export default SkyMap;
