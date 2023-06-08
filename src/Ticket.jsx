import React, { useState,useEffect } from 'react';
import './SeatReservation.css';

const SeatReservation = () => {
  const TOTAL_ROWS = 11;
  const ROW_SIZE = 7;
  const LAST_ROW_SIZE = 3;
  const EMPTY_SEAT = 'O';
  const BOOKED_SEAT = 'X';

  const [coach, setCoach] = useState([]);

  const initializeCoach = () => {
    const newRow = [];
    let seatNumber = 1;

    for (let i = 0; i < TOTAL_ROWS; i++) {
      const row = [];
      const rowSize = i === TOTAL_ROWS - 1 ? LAST_ROW_SIZE : ROW_SIZE;
      for (let j = 0; j < rowSize; j++) {
        row.push({ id: seatNumber++, status: EMPTY_SEAT });
      }
      newRow.push(row);
    }
    setCoach(newRow);
  };

  const reserveSeats = (numSeats) => {
    const newRow = [...coach];
    let seatsRemaining = numSeats;

    for (let i = 0; i < TOTAL_ROWS; i++) {
      const row = newRow[i];
      for (let j = 0; j < row.length; j++) {
        if (row[j].status === EMPTY_SEAT) {
          row[j].status = BOOKED_SEAT;
          seatsRemaining--;
          if (seatsRemaining === 0) {
            setCoach(newRow);
            return;
          }
        }
      }
    }
  };

  const handleReservationSubmit = (e) => {
    e.preventDefault();

    const numSeats = parseInt(e.target.numSeats.value, 10);

    if (numSeats <= 0 || numSeats > 7) {
      alert('Invalid number of seats. Please try again.');
      return;
    }

    reserveSeats(numSeats);
  };

  const handleClick=(seatId,row)=>{
    const newRow = [...coach];
    let seat=newRow[row][seatId%7-1];
    if(seat.status === 'O'){
      seat.status='X';
    }
    setCoach(newRow);
  }
  const renderSeatGrid = () => {
    return coach.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((seat) => (
          <div
            key={seat.id}
            className={`seat ${seat.status === BOOKED_SEAT ? 'reserved' : ''}`}
            onClick={()=>handleClick(seat.id,rowIndex)}
          >
            {seat.id}
          </div>
        ))}
      </div>
    ));
  };
  useEffect(()=>{
    initializeCoach();
  },[]);
  return (
    <div className="seat-reservation">
      <h2>Seat Reservation</h2>
      <form onSubmit={handleReservationSubmit}>
        <label htmlFor="numSeats">Number of Seats:</label>
        <input type="number" id="numSeats" name="numSeats" min="1" max="7" />
        <button type="submit">Reserve Seats</button>
      </form>
      <div className="seat-grid">{renderSeatGrid()}</div>
    </div>
  );
};

export default SeatReservation;
