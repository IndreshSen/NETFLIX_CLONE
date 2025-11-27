import React, { use, useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
const Player = () => {

 const [apiData,setApiData] =useState({
  name:'',
  key : '',
  published_at:'',
  typeof:''
 })

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmEzNzcyNWE1NjgwZjlmY2VhMDEwMmJjMjUyNDRlMiIsIm5iZiI6MTc2NDA3NzY4NS41NzcsInN1YiI6IjY5MjViMDc1ZmRlZDY4YzQwZTMwYzhlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._K25PQBKU0yeo9ZmRW4VHJanLejo1-zWX_Wm_qPENB0'
  }
};


useEffect(()=>{
fetch('https://api.themoviedb.org/3/movie/1419406/videos?language=en-US', options)
  .then(response => response.json())
  .then(response => setApiData(response.results[0]))
  .catch(err => console.error(err));
},[])


  
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" />
      <iframe width="90%" height="90%" 
      src={`https://www.youtube.com/embed/${apiData.key}` }
      title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player


