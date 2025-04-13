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
    <div style={{ position: "relative", height: "100vh" }}>
      {/* Home Button */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
        }}
      ></div>

      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ width: "25%" }}>
          {selectedCity && (
            <div>
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
          )}
        </div>
        <div style={{ width: "75%" }}>
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
              `<div><b>Country:</b> ${d.ADMIN}<br/><b>Code:</b> ${d.ISO_A2}</div>`
            }
            pointsData={allPoints}
            pointLat={(d) => d.lat}
            pointLng={(d) => d.lon || d.lng}
            pointColor={(d) => d.color}
            pointAltitude={0.01}
            pointLabel={(d) => {
              if (d.year) {
                return `<div><b>${d.name}</b><br/>Year: ${d.year}<br/>Class: ${d.class}<br/>Mass: ${d.mass} g</div>`;
              }
              return `<div><b>${d.name}</b></div>`;
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
    </div>
  );
};

export default ISS_MeteorVisualizer;
