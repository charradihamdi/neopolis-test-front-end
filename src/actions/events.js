import axios from "axios";

export const GET_EVENTS = "GET_EVENTS";

export const getEvents = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/events/getevents/`)
      .then((res) => {
        dispatch({ type: GET_EVENTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
