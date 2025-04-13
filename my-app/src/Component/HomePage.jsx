import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ 
      backgroundColor: "black", 
      height: "100vh", 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center", 
      justifyContent: "center",
      color: "white"
    }}>
      <h1>Space Data Visualization</h1>
      <p>Explore meteorite impacts and space data with our interactive globe</p>
      
      <Link to="/visualizer" style={{
        backgroundColor: "#333",
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        textDecoration: "none",
        marginTop: "20px"
      }}>
        Launch Visualizer
      </Link>
    </div>
  );
};

export default HomePage;