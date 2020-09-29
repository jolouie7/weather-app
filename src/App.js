import React, {useState, useEffect} from 'react';
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

import WeatherCard from "./components/WeatherCard";

function App() {
  // Initial page load
  const [city, setCity] = useState("San Francisco");
  const [defaultTemp, setDefaultTemp] = useState(null);
  const [desc, setDesc] = useState("");

  // Data from user input
  const [location, setLocation] = useState("");
  const [googleLocation, setGoogleLocation] = useState("")
  const [weatherMain, setWeatherMain] = useState("");
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1429667947446-3c93a979b7e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
  );
  const [temp, setTemp] = useState(null)
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchAPI = async () => {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );

      const longitude = res.data.results[0].geometry.location.lng;
      const latitude = res.data.results[0].geometry.location.lat;

      if (longitude && latitude) {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}`
        );

        setDefaultTemp(Math.round(res.data.current.temp));
        setDesc(res.data.current.weather[0].description);
      }
    };
    fetchAPI();
  }, []);

  const handleClick = async (e) => {
    if (location === "") {
      return (
        <div>
          <Alert variant="danger">This is a danger alert—check it out!</Alert>
        </div>
      );
    } else {
      // get long and lat
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );

      setLoading(true)
      // Set the offical name of the location
      setGoogleLocation(res.data.results[0].address_components[0].long_name);
      // console.log(res.data.results[0].address_components[0].long_name);
      // console.log(res.data.results[0].geometry.location.lng);
      // console.log(res.data.results[0].geometry.location.lat);

      const longitude = res.data.results[0].geometry.location.lng;
      const latitude = res.data.results[0].geometry.location.lat;

      if (longitude && latitude) {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}`
        );

        // console.log(res.data.current.temp)
        setTemp(Math.round(res.data.current.temp))
        setDesc(res.data.current.weather[0].description);
        setWeatherMain(res.data.current.weather[0].main);
        setLocation("");
        switch (weatherMain) {
          case "Thunderstorm":
            setImage("https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80")
            break

          case "Drizzle":
            setImage(
              "https://images.unsplash.com/photo-1508873760731-9c3d0bb6b961?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            );
            break

          case "Rain":
            setImage(
              "https://images.unsplash.com/photo-1428592953211-077101b2021b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
            );
            break

          case "Snow":
            setImage(
              "https://images.unsplash.com/photo-1517299321609-52687d1bc55a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            );
            break

          case "Clear":
            setImage(
              "https://images.unsplash.com/photo-1516571999955-7ef6c7885017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
            );
            break

          case "Clouds":
            setImage(
              "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            );
            break

          default:
            setLoading(false)
            return "https://images.unsplash.com/photo-1429667947446-3c93a979b7e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80";
        }
        setLoading(false)
      }
    }
  }

  const handleChange = (e) => {
    setLocation(e.target.value)
  }

  return (
    <div>
      <Container>
        <div>
          <InputGroup className="my-5">
            <FormControl
              placeholder="Location"
              aria-label="Location"
              aria-describedby="basic-addon2"
              onChange={handleChange}
              value={location}
              name="location"
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={handleClick}>
                Find Weather
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
        {!loading ? (
          <div>
            <WeatherCard
              temp={temp}
              location={googleLocation}
              loading={loading}
              city={city}
              defaultTemp={defaultTemp}
              desc={desc}
            />
            <Container fluid>
              <img style={{maxWidth:"100%"}} src={image} alt="weather" />
            </Container>
          </div>
        ) : (
          <div>loading...</div>
        )}
      </Container>
    </div>
  );
}

export default App;
