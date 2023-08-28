import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function TrainListPage() {
  const [trains, setTrains] = useState([]);

  const fetchTrainData = async () => {
    try {
      const response = await fetch("http://localhost:3001/trains");
      const data = await response.json();
      setTrains(data);
      console.log("Train data fetched successfully");
      console.log(data);
    } catch (error) {
      console.error("Error fetching train data:", error);
    }
  };

  useEffect(() => {
    fetchTrainData();
    const intervalId = setInterval(fetchTrainData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => {
    return `${time.Hours}:${time.Minutes}:${time.Seconds}`;
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Train Details
      </Typography>
      <Link to="/">
        <Button variant="contained" color="primary" sx={{ height: "100%" }}>
          Search for a train
        </Button>
      </Link>
      {trains.map((train) => (
        <Card key={train.trainNumber} className="mb-3">
          <CardContent>
            <Typography variant="h5">{train.trainName}</Typography>
            <Typography>Train Number: {train.trainNumber}</Typography>
            <Typography>
              Departure Time: {formatTime(train.departureTime)}
            </Typography>{" "}
            <Typography>Seats Available: {train.seatsAvailable.sleeper}</Typography>
            <Typography>Price: {train.price.sleeper}</Typography>
            <Typography>Delayed By: {train.delayedBy}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default TrainListPage;
