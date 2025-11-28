// TitleCards.jsx
import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import {Link} from 'react-router-dom'

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer YOUR_TMDB_TOKEN_HERE",
    },
  };

  const handleWheel = (e) => {
    if (!cardsRef.current) return;
    cardsRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((data) => setApiData(data.results || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef} onWheel={handleWheel}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`}className="card" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
              alt={card.original_title || card.title}
            />
            <p>{card.original_title || card.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;

