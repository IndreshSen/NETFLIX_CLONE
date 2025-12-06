<<<<<<< Updated upstream
import React, { useEffect, useRef, useState } from 'react';
import './titlecards.css';
=======
// TitleCards.jsx
import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";
import cards_data from "../../assets/cards/Cards_data"; // <-- your local data
>>>>>>> Stashed changes

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmEzNzcyNWE1NjgwZjlmY2VhMDEwMmJjMjUyNDRlMiIsIm5iZiI6MTc2NDA3NzY4NS41NzcsInN1YiI6IjY5MjViMDc1ZmRlZDY4YzQwZTMwYzhlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._K25PQBKU0yeo9ZmRW4VHJanLejo1-zWX_Wm_qPENB0',
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
      options
    )
      .then((res) => res.json())
      .then((data) => setApiData(data.results))
      .catch((err) => console.error(err));

<<<<<<< Updated upstream
    const container = cardsRef.current;
    container.addEventListener('wheel', handleWheel);
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);
=======
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
          throw new Error("Empty API data");
        }
      })
      .catch((err) => {
        console.warn("API failed, using LOCAL DATA:", err.message);
        setApiData(cards_data); // <-- YOUR LOCAL DATA FALLBACK
      })
      .finally(() => setLoading(false));
  }, [category]);
>>>>>>> Stashed changes

  return (
    <div className="titlecards">
      <h2>{title ? title : 'Popular on Netflix'}</h2>

<<<<<<< Updated upstream
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <div className="card" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
              alt={card.title}
            />
            <p>{card.original_title}</p>
          </div>
        ))}
      </div>
=======
      {loading ? (
        <div className="tc-loading">Loading...</div>
      ) : (
        <div className="card-list" ref={cardsRef} onWheel={handleWheel}>
          {apiData.map((card, index) => (
            <Link
              to={`/player/${card.id || index}`} // local cards have no id
              className="card"
              key={index}
            >
              <img
                src={
                  card.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}`
                    : card.image // <--- LOCAL IMAGE SUPPORT
                }
                alt={card.original_title || card.name || card.title}
              />
              <p>{card.original_title || card.name || card.title}</p>
            </Link>
          ))}
        </div>
      )}
>>>>>>> Stashed changes
    </div>
  );
};

export default TitleCards;
