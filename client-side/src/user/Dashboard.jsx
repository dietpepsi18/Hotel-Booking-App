/* After logged in, this will be the first page to show
   In Dashboard page, show a navbar in dashboard, it will show 2 components:
        1)will show all your bookings and a button to browse hotel
        2)Show all the hotels you have posted and a button to add new
   Use tabs as nav */

import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import { Link } from "react-router-dom";
import { userHotelBookings } from "../actions/hotel";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import BookingCard from "../components/cards/BookingCard";

export default function Dashboard() {
  //state:
  const [booking, setBooking] = useState([]);

  //redux state:
  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserBookings();
  }, []);

  const loadUserBookings = async () => {
    const res = await userHotelBookings(auth.token);
    setBooking(res.data); // [{_id: , hotel: , orderedBy: , session: }, {....}]
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h2>Your Bookings</h2>
          </div>
          <div className="col-md-2">
            <Link className="btn btn-primary" to="/">
              Browse Hotels
            </Link>
          </div>
        </div>
      </div>

      <div className="row">
        {booking.map((b) => {
          return (
            <BookingCard
              key={b._id}
              hotel={b.hotel}
              session={b.session}
              orderedBy={b.orderedBy}
            />
          );
        })}
      </div>
    </>
  );
}
