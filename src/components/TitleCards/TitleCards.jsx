// TitleCards.jsx
import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";
import cards_data from "../../assets/cards/Cards_data";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef(null);

  const TMDB_BEARER = import.meta.env.VITE_TMDB_TOKEN;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: TMDB_BEARER,
    },
  };

  const handleWheel = (e) => {
    if (!cardsRef.current) return;
    cardsRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    const endpoint = category ? category : "now_playing";
    const url = `https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&page=1`;

    setLoading(true);

    fetch(url, options)
      .then((res) => {
        if (!res.ok) throw new Error("API Error " + res.status);
        return res.json();
      })
      .then((data) => {
        if (data.results?.length > 0) {
          setApiData(data.results);
        } else {
          throw new Error("Empty API");
        }
      })
      .catch(() => {
        // fallback to local cards
        setApiData(cards_data);
      })
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>

      {loading ? (
        // ⭐ SKELETON LOADING SECTION ⭐
        <div className="skeleton-list">
          {[...Array(10)].map((_, i) => (
            <div className="skeleton-card" key={i}></div>
          ))}
        </div>
      ) : (
        <div className="card-list" ref={cardsRef} onWheel={handleWheel}>
          {apiData.map((card, index) => (
            <Link
              to={`/player/${card.id || index}`}
              className="card"
              key={index}
            >
              <img
                src={
                  card.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}`
                    : card.image
                }
                alt={card.original_title || card.name || card.title}
              />
              <p>{card.original_title || card.name || card.title}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TitleCards;
