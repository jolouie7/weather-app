import React from 'react'
import Card from "react-bootstrap/Card";

const WeatherCard = ({temp, location, loading, city, defaultTemp, desc}) => {
  return (
    <div>
      {loading ? (
        <h1>Type in a location</h1>
      ) : (
        <Card className="my-3 py-3" style={{ width: "auto", textAlign: "center" }}>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Title>Current Temperature in {location || city}</Card.Title>
            <Card.Text>
              {temp || defaultTemp || "loading..."} <span>&#8457;</span>
            </Card.Text>
            <Card.Text>{desc || "loading..."}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default WeatherCard;
