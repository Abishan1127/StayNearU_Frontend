import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import AdPopup from "../Popup/AdPopup";
import { BE_URL } from "../../utils/Constants";


const Home: React.FC = () => {
  const [universities, setUniversities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BE_URL}/universities`)
      .then(response => setUniversities(response.data))
      .catch(error => console.error("Error fetching universities:", error));
  }, []);

  const handleClick = (uni: any) => {
    navigate(`/roombooking`, { state: { uni_id: uni.uni_id, uni_name: uni.uni_name } });
  };

  return (
    <div className="home-container">
      <h1>Find Your Perfect Place - Anywhere In Sri Lanka!</h1> 
      <div className="grid-container">
        {universities.map((uni: any, index) => (
          <div key={index} className="card" onClick={() => handleClick(uni)}>
            <img src={`${BE_URL}${uni.uni_image}`} alt={uni.uni_name} />
            <p className="uni-name">{uni.uni_name}</p>
          </div>
        ))}
      </div>
      <AdPopup />
    </div>
  );
};

export default Home;
