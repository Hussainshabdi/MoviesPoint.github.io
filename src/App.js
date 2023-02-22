import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [endPoint, setEndPoint] = useState("");
  const [container, setContainer] = useState([]);
  const[finalPoint,setFinalPoint] = useState('');
  const [err,setErr]=useState('');
  useEffect(() => { 
    fetchMe();
  }, [finalPoint]);

  const fetchMe = () => {
    fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=${endPoint}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
        "X-RapidAPI-Key": "549bcdd591mshcd0fd15d114e181p13c24fjsn6fdce6173e75",
      },
    })
      .then((response) => response.json())
      .then((data) => setContainer(data.d))
      .catch((err) => setErr(err));
  };
  const changeMe = (e) => {
    setEndPoint(e.target.value);
  };
  const submit = (e) => {
    e.preventDefault();
    setFinalPoint(endPoint);
  };
  return (
    <div className="App">
      <div className="input">
        <h2 className="logo">MoviesPoint</h2>
        <form onSubmit={submit}>
          <input type="text" id="inp" placeholder="Search Movies" value={endPoint} onChange={changeMe} />
          <button>GO</button>
        </form>
      </div>
      <div className="container">

      
        {container.map((item, ind) => {
        return (
          <div className="mapping" >
            <div className="map" key={ind}>
              <img src={item.i.imageUrl} id="inpmain" />
              <p id="list">{item.l}</p>
              <p>{item.s}</p>
              <br />
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default App;
