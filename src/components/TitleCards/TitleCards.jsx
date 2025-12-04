import React, { useEffect, useRef, useState } from 'react';
import './titlecards.css';
import cards_data from '../../assets/cards/Cards_data';

const TitleCards = ({ title, category }) => {
  const[apiData,setApiData] =useState([]);
  const cardsRef = useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmEzNzcyNWE1NjgwZjlmY2VhMDEwMmJjMjUyNDRlMiIsIm5iZiI6MTc2NDA3NzY4NS41NzcsInN1YiI6IjY5MjViMDc1ZmRlZDY4YzQwZTMwYzhlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._K25PQBKU0yeo9ZmRW4VHJanLejo1-zWX_Wm_qPENB0'
  }
};





  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

    const container = cardsRef.current;
    container.addEventListener('wheel', handleWheel);

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="titlecards">
      <h2>{title ? title : "Popular on Netflix"}</h2>

      <div className="card-list" ref={cardsRef}>
        {cards_data.map((card, index) => {
          return (
            <div className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.
                backdrop_path} alt={card.name} />
              <p>{card.original_titl}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
