import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../components/AppContext";
import Log from "../components/Log";
import SimpleMap from "../components/SimpleMap";
import EventsDetails from "./EventsDetails";
import "./style.css";
const Home = () => {
  const uid = useContext(UidContext);

  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [category, setCategory] = useState("");
  const [modal, setModal] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [ItemId, setItemId] = useState("");
  
  const [pointTitle,setPointTitle]=useState({})
  const [pointType,setPointType]=useState({})
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (!latitude || !longitude) return;
    const fetchEvents = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}api/events?long=${longitude}&lat=${latitude}`
        )
        .then((res) => {
          setEvents(res.data);
        })
        .catch((err) => console.log("No Events"));
    };
    fetchEvents();
  }, [latitude, longitude]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("posterId", uid);
    data.append("title", title);
    data.append("description", description);
    data.append("picture", picture);
    data.append("category", category);
    const location={"title":'club sportif',"type":10.80}
    data.append("location",location)
    console.log(location);
    axios
      .post(`${process.env.REACT_APP_API_URL}api/events/add`, data)
      .then((res) => {
        alert(res);
        console.log(res)
      })
      .catch((err) => alert("error", data));
  };

  const handleModal = (id) => {
    setModal(true);
    setItemId(id);
  };
  return (
    <>
      <div className="home">
        <div className="main">
          <div className="home-header">
            {uid ? (
              <div>
                <form onSubmit={handleSubmit} type="multipart/form-data">
                  <div className="row">
                    <div className="col-lg-4 mb-3">
                      <label for="tite" className="form-label">
                        titre de l'evenement
                      </label>
                      <input
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                        type="text"
                        className="form-control"
                        name="title"
                        id="title"
                        placeholder="title"
                      />
                      <label for="descrption" className="form-label">
                        description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        placeholder="...."
                      />
                      <label for="type" className="form-label">
                        type
                      </label>
                      <input
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                        type="text"
                        className="form-control"
                        name="category"
                        id="category"
                        placeholder="type"
                      />

                      <label for="picture" className="form-label">
                        image
                      </label>
                      <input
                        value={picture}
                        onChange={(e) => {
                          setPicture(e.target.value);
                        }}
                        type="file"
                        className="form-control"
                        name="picture"
                        id="picture"
                        placeholder="image"
                      />
                    </div>
                    <div className="col-lg-6">
                      <SimpleMap />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    ajouter
                  </button>
                </form>
              </div>
            ) : (
              <>
                <Log signin={true} signup={false} />
                <br />
                <div className="container-fluid events-style">
                  <div className="row">
                    <h3 className="col-lg-9">evenements</h3>
                    <button className="col-lg-1 btn" value="sport">
                      sport
                    </button>
                    <button className="col-lg-1 btn" value="culturel">
                      culturel
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="section">
            <div className="row">
              {modal && <EventsDetails id={ItemId} />}
              {!!latitude && !!longitude && (
                <SimpleMap
                  center={{ lat: latitude, long: longitude }}
                  items={events}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
