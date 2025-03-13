import { useState, useEffect } from "react";
import axios from "axios";
import { BE_URL } from "../../utils/Constants";


interface Boarding {
  board_id: number;
  board_name: string;
}

interface Room {
  room_id: number;
  board_id: number;
  room_image: string;
}

const Booking = () => {
  const [boardings, setBoardings] = useState<Boarding[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedBoarding, setSelectedBoarding] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    axios.get(`${BE_URL}/boarding`).then((res) => setBoardings(res.data));
  }, []);

  useEffect(() => {
    if (selectedBoarding) {
      axios.get(`${BE_URL}/rooms/${selectedBoarding}`).then((res) => setRooms(res.data));
    }
  }, [selectedBoarding]);

  const handleBooking = async () => {
    if (!selectedBoarding || !selectedRoom || !startDate || !endDate || amount <= 0) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`${BE_URL}/bookings`, {
        user_id: 1, // Hardcoded for now; replace with authenticated user ID
        board_id: selectedBoarding,
        room_id: selectedRoom,
        start_date: startDate,
        end_date: endDate,
        amount,
        payment_status: "Pending",
      });

      alert("Booking successful! Redirecting to payment.");
      console.log(response.data);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking failed. Try again.");
    }
  };

  return (
    <div className="container">
      <h2>Book Your Stay</h2>
      <label>Boarding:</label>
      <select onChange={(e) => setSelectedBoarding(Number(e.target.value))}>
        <option value="">Select Boarding</option>
        {boardings.map((b) => (
          <option key={b.board_id} value={b.board_id}>
            {b.board_name}
          </option>
        ))}
      </select>

      {selectedBoarding && (
        <>
          <label>Room:</label>
          <select onChange={(e) => setSelectedRoom(Number(e.target.value))}>
            <option value="">Select Room</option>
            {rooms.map((r) => (
              <option key={r.room_id} value={r.room_id}>
                Room {r.room_id}
              </option>
            ))}
          </select>
        </>
      )}

      <label>Start Date:</label>
      <input type="date" onChange={(e) => setStartDate(e.target.value)} />

      <label>End Date:</label>
      <input type="date" onChange={(e) => setEndDate(e.target.value)} />

      <label>Amount:</label>
      <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />

      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
};

export default Booking;
