import { useEffect, useState } from "react";
import axios from "axios";

interface Reservation {
  reservation_id: number;
  student_id: string;
  seat_id: number;
  timeslot_id: number;
  create_time: string;
}

const API_URL = "http://localhost:2083/reservations"; 

function App() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container">
      <h1>預約紀錄</h1>
      <table>
        <thead>
          <tr>
            <th>預約編號</th>
            <th>學生編號</th>
            <th>座位編號</th>
            <th>時段編號</th>
            <th>創建時間</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.reservation_id}>
              <td>{r.reservation_id}</td>
              <td>{r.student_id}</td>
              <td>{r.seat_id}</td>
              <td>{r.timeslot_id}</td>
              <td>{new Date(r.create_time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
