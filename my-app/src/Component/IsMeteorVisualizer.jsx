import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import MeteoriteCard from "./MetoreorCard";

const ISS_MeteorVisualizer = () => {
  const globeEl = useRef();
  const [countries, setCountries] = useState({ features: [] });
  const [meteorData, setMeteorData] = useState([]);
  const [labelsData, setLabelsData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
    )
      .then((res) => res.json())
      .then(setCountries);

    fetch("/meteorites.json")
      .then((res) => res.json())
      .then((data) => {
        setMeteorData(data);
        const labels = data.map((m, index) => ({
          text: m.city || m.name,
          lat: m.lat,
          lng: m.lng,
          name: m.name,
          color: "yellow",
          fullData: m,
        }));
        setLabelsData(labels);
      });

    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2 }, 1000);
    }
  }, []);

  const allPoints = [...meteorData.map((m) => ({ ...m, color: "red" }))];
  const ringsData = meteorData.map((m) => ({
    lat: m.lat,
    lng: m.lng,
    maxRadius: m.radius, // from effect → 1–5
    propagationSpeed: 1,
    repeatPeriod: 700,
    color: "rgb(255, 0, 0)", // or `m.color`
  }));
  console.log(labelsData);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "25%",
          padding: "1rem",
          color: "white",
          overflowY: "auto",
          backgroundColor: "rgb(0, 0, 0)",
          // background: "linear-gradient(to bottom right, black,rgb(66, 31, 91))",
        }}
      >
        {selectedCity ? (
          <MeteoriteCard meteorite={selectedCity} />
        ) : (
          <p>Click on a meteorite to view its details.</p>
        )}
      </div>
      <div
        style={{
          width: "75%",
          cursor: "pointer",
        }}
      >
        <Globe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="#000000"
          polygonsData={countries.features}
          polygonCapColor={() => "rgba(200, 200, 200, 0.3)"}
          polygonSideColor={() => "rgba(0, 100, 200, 0.15)"}
          polygonStrokeColor={() => "#111"}
          polygonLabel={({ properties: d }) => {
            const country = d.ADMIN ? `<b>Country:</b> ${d.ADMIN}` : "";
            const code = d.ISO_A2 ? `<br/><b>Code:</b> ${d.ISO_A2}` : "";
            return `<div style='font-size: 1.2rem'>${country}${code}</div>`;
          }}
          ringsData={ringsData}
          pointsData={allPoints}
          pointLat={(d) => d.lat}
          pointLng={(d) => d.lon || d.lng}
          pointColor={(d) => d.color}
          pointAltitude={0.01}
          pointLabel={(d) => {
            if (d.year) {
              return `<div style='font-size: 1rem'><b>${d.name}</b><br/>Year: ${d.year}<br/>Class: ${d.class}<br/>Mass: ${d.mass} g</div>`;
            }
            return `<div style='font-size: 1.2rem'><b>${d.name}</b></div>`;
          }}
          onPointClick={setSelectedCity}
          labelsData={labelsData}
          labelLabel={(d) => d.text}
          labelLat={(d) => d.lat}
          labelLng={(d) => d.lng}
          labelText={(d) => d.text}
          labelColor={() => "yellow"}
          labelAltitude={0.01}
          labelSize={1.2}
          labelDotRadius={0.1}
          labelIncludeDot={true}
          onLabelClick={(label) => setSelectedCity(label.fullData)}
        />
      </div>
    </div>
  );
};

export default ISS_MeteorVisualizer;
