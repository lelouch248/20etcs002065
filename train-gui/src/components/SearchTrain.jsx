import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Grid, Card, CardContent, Typography } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Link } from "react-router-dom";

function SearchTrainPage() {
  const [trainNumber, setTrainNumber] = useState("");
  const [trainDetails, setTrainDetails] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3001/trains/${trainNumber}`);
      if (response.status === 200) {
        const data = await response.json();
        setTrainDetails(data);
      } else {
        setTrainDetails(null);
      }
    } catch (error) {
      console.error("Error fetching train details:", error);
      setTrainDetails(null);
    }
  };

  return (
    <div className="outer-container">
      <Container className="search-header">
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <h3 className="mt-3">Search Train Details</h3>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Enter Train Number"
              variant="outlined"
              fullWidth
              value={trainNumber}
              onChange={(e) => setTrainNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSearch}
              sx={{ height: "100%" }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        <Link to="/trains">
          <Button variant="contained" color="primary" sx={{ height: "100%" }}>
            View All Trains
          </Button>
        </Link>
        {trainDetails ? (
          <Card className="mt-3">
            <CardContent>
              <Typography variant="h5">{trainDetails.trainName}</Typography>
              <Typography>Train Number: {trainDetails.trainNumber}</Typography>
              <Typography>Departure Time: {trainDetails.departureTime.Hours}:{trainDetails.departureTime.Minutes}:{trainDetails.departureTime.Seconds}</Typography>
              <Typography>Seats Available: {trainDetails.seatsAvailable.sleeper}</Typography>
              <Typography>Price: {trainDetails.price.sleeper}</Typography>
              <Typography>Delayed By: {trainDetails.delayedBy}</Typography>
            </CardContent>
          </Card>
        ) : (
          <Typography className="mt-3">No train found for the given number.</Typography>
        )}
      </Container>
    </div>
  );
}

export default SearchTrainPage;
