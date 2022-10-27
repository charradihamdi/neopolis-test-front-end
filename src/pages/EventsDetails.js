import React,{useEffect, useState} from "react";
import axios from "axios";
export default function EventsDetails({id}) {
    console.log(id)
    const [event,setEvent]=useState('')
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/events/${id}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => console.log("No Events"));
  }, []);
  console.log(event)
  return (
    <div className="popup-profil-container">
      <div className="modal">
        <h3>{event.title}</h3>
        <span className="cross">&#10005;</span>
        <ul>
          <li>
            <div style={{width:"40rem"}}>description:{event.description}</div>
          </li>
          <li>
            <p>categorie:{event.category}</p>
          </li>
          <li>
            <p>location</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
