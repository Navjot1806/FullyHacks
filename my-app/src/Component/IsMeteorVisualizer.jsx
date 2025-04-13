import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

const meteorShowers = [
  {
    name: "Perseids",
    lat: 42.0,
    lon: 20.0,
  },
  {
    name: "Leonids",
    lat: 25.0,
    lon: 90.0,
  },
  {
    name: "Geminids",
    lat: -10.0,
    lon: -45.0,
  },
];

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
          color: "yellow",
          fullData: m,
        }));
        setLabelsData(labels);
      });

    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2 }, 1000);
    }
  }, []);

  const allPoints = [
    ...meteorShowers.map((s) => ({ ...s, color: "red" })),
    ...meteorData.map((m) => ({ ...m, color: "yellow" })),
  ];

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <div
        style={{
          width: "25%",
          padding: "1rem",
          backgroundColor: "#111",
          color: "white",
          overflowY: "auto",
        }}
      >
        {selectedCity ? (
          <div
            style={{
              border: "1px solid yellow",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <h2>{selectedCity.name}</h2>
            <p>
              <strong>City:</strong> {selectedCity.city}
            </p>
            <p>
              <strong>Year:</strong> {selectedCity.year}
            </p>
            <p>
              <strong>Mass:</strong> {selectedCity.mass} g
            </p>
            <p>
              <strong>Class:</strong> {selectedCity.class}
            </p>
            <p>
              <strong>Latitude:</strong> {selectedCity.lat}
            </p>
            <p>
              <strong>Longitude:</strong> {selectedCity.lng}
            </p>
          </div>
        ) : (
          <p>Click on a meteorite to view its details.</p>
        )}
      </div>
      <div style={{ width: "75%", cursor: "pointer" }}>
        <Globe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="#000000"
          polygonsData={countries.features}
          polygonCapColor={() => "rgba(200, 200, 200, 0.3)"}
          polygonSideColor={() => "rgba(0, 100, 200, 0.15)"}
          polygonStrokeColor={() => "#111"}
          polygonLabel={({ properties: d }) =>
            `<div style='font-size: 1.2rem'><b>Country:</b> ${d.ADMIN}<br/><b>Code:</b> ${d.ISO_A2}</div>`
          }
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
