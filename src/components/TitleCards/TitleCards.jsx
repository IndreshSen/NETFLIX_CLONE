// // TitleCards.jsx
// import React, { useEffect, useRef, useState } from "react";
// import "./TitleCards.css";;
// import cards_data from "../../assets/cards/Cards_data";

// const TitleCards = ({title,category}) => {
//   const [apiData,setApiData] = useState([]);
//   const cardsRef = useRef(null);
//   const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmEzNzcyNWE1NjgwZjlmY2VhMDEwMmJjMjUyNDRlMiIsIm5iZiI6MTc2NDA3NzY4NS41NzcsInN1YiI6IjY5MjViMDc1ZmRlZDY4YzQwZTMwYzhlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._K25PQBKU0yeo9ZmRW4VHJanLejo1-zWX_Wm_qPENB0'
//   }
// };


//   const handleWheel = (e) => {
//     if (!cardsRef.current) return;
//     cardsRef.current.scrollLeft += e.deltaY;
//   };

// useEffect(() => {
//   fetch(
//     `https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`,
//     options
//   )
//     .then((res) => res.json())
//     .then((data) => setApiData(data.results || []))
//     .catch((err) => console.error(err));
// }, []);



//   return (
//     <div className="title-cards">
//       <h2 >{title?title:"Popular on Netflex"}</h2>
//       <div className="card-list" ref={cardsRef} onWheel={handleWheel}>
//         {apiData.map((card, index) => (
//           <div className="card" key={index}>
//             <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt={card.name} />
//             <p>{card.original_title}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };



import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";

const TitleCards = ({ title = "Popular on Netflex", category = "now_playing" }) => {
  // 🔹 Start with LOCAL cards, but mark them as local
  const [cards, setCards] = useState(
    cards_data.map((c) => ({ ...c, source: "local" }))
  );

  const cardsRef = useRef(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmEzNzcyNWE1NjgwZjlmY2VhMDEwMmJjMjUyNDRlMiIsIm5iZiI6MTc2NDA3NzY4NS41NzcsInN1YiI6IjY5MjViMDc1ZmRlZDY4YzQwZTMwYzhlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._K25PQBKU0yeo9ZmRW4VHJanLejo1-zWX_Wm_qPENB0",
    },
  };

  const handleWheel = (e) => {
    if (!cardsRef.current) return;
    cardsRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    let cancelled = false;

    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
          options
        );

        if (!res.ok) {
          console.warn("TMDB not ok, using local cards");
          return; // ❌ no change → local remains
        }

        const data = await res.json();
        if (cancelled) return;

        const results = Array.isArray(data.results) ? data.results : [];
        if (results.length === 0) {
          console.warn("TMDB empty, using local cards");
          return;
        }

        const normalized = results
          .filter((m) => m.backdrop_path)
          .map((m) => ({
            id: m.id,
            image: `https://image.tmdb.org/t/p/w500${m.backdrop_path}`,
            name: m.original_title || m.title,
            source: "api",            // 🔹 mark as API
          }));

        if (normalized.length > 0) {
          setCards(normalized);       // ✅ replace local with API
        }
      } catch (err) {
        console.error("TMDB error, using local cards:", err);
        // ❌ error → do nothing, local already set
      }
    };

    fetchMovies();

    return () => {
      cancelled = true;
    };
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title}</h2>
      <div className="card-list" ref={cardsRef} onWheel={handleWheel}>
        {cards.map((card, index) => (
          <div
            className={`card ${card.source === "api" ? "card-api" : "card-local"}`}
            key={card.id || index}
          >
            <img src={card.image} alt={card.name} />
            <p>{card.name}</p>

            {/* 🔹 small badge to show source */}
            <span className="source-badge">
              {card.source === "api" ? "API" : "LOCAL"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
