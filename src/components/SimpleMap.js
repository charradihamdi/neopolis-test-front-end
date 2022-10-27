import { Wrapper } from "@googlemaps/react-wrapper";
import GoogleMapReact from 'google-map-react';
import React from "react";


const AnyReactComponent = ({ text }) => <div>{text}</div>;

const render = (status) => {
  return <h1>{status}</h1>;
};


export default function SimpleMap({ center, items }) {
  const defaultProps = {
    center: center || {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };



  return (
    <Wrapper apiKey={"YOUR_API_KEY"} render={render}>


      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        
        >
          {items&&!!items.length >= 0 && items.map(({ _id, location, title }) => (
            <AnyReactComponent
              key={_id}
              lat={location.coordinates[1]}
              lng={location.coordinates[0]}
              text={title}
            />
          ))}

        </GoogleMapReact>
      </div>
    </Wrapper>
  );
}