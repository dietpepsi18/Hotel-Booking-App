/* Show all the hotels you have posted and a button to add new */

import { useState, useEffect } from "react";
import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import { createConnectAccount } from "../actions/stripe";
import { sellerHotels, deleteHotel } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";
import { toast } from "react-toastify";

export default function DashboardSeller() {
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState([]);
  //get auth state from redux:
  const { auth } = useSelector((state) => ({ ...state }));

  // after the component just mount, make request to backend to get all the hotels posted by this user
  useEffect(() => {
    loadSellersHotels();
  }, []);

  const loadSellersHotels = async () => {
    let res = await sellerHotels(auth.token);
    setHotels(res.data);
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token); //wait for server to send back response(include a link)
      window.location.href = res.data; //redirect to the link page
    } catch (error) {
      console.log(error);
      toast.error("Stripe connect failed. Try again");
      setLoading(false);
    }
  };

  const handleHotelDelete = async (hotelId) => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) return;

    deleteHotel(auth.token, hotelId).then((res) => {
      toast.success("Hotel Deleted");
      loadSellersHotels(); //after delete a hotel, we make request to get the newest list
    });
  };

  //this function is for showing connected stripe user's page:
  const connected = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h2>Your Hotels</h2>
          </div>
          <div className="col-md-2">
            <Link className="btn btn-primary" to="/hotels/new">
              + Add Hotels
            </Link>
          </div>
        </div>

        <div className="row">
          {hotels.map((h) => (
            <SmallCard
              key={h._id}
              h={h}
              showViewMoreButton={false}
              owner={true}
              handleHotelDelete={handleHotelDelete}
            />
          ))}
        </div>
      </div>
    );
  };

  //this function is for showing not connected stripe user's page:
  const notConnected = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="p-5 pointer">
              <HomeOutlined className="h1" />
              <h4>Setup payouts to post hotel rooms</h4>
              <p className="lead">
                MERN partners with stripe to transfer earningas to your bank
                account
              </p>
              <button
                className="btn btn-primary mb-3"
                onClick={handleClick}
                disabled={loading}
              >
                {loading ? "Processing..." : "Setup Payouts"}
              </button>
              <p className="text-muted">
                <small>
                  You'll be redirected to Stripe to complete the onboarding
                  process.
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      {auth &&
      auth.user &&
      auth.user.stripe_seller &&
      auth.user.stripe_seller.charges_enabled
        ? connected()
        : notConnected()}
    </>
  );
}

/*
hotels = [
  {
    _id: 6371e90c406f2e518b1523fb,
    title: 'hotel in Japna 3 (posted by CC)',
    content: "Guesthouse and adjoining forest including hid....",
    location: 'Kyoto',
    price: 560,
    from: 2023-01-25T00:00:00.000Z,
    to: 2023-05-25T00:00:00.000Z,
    bed: 5,
    postedBy: { _id: 637113d15696b94c31642aa4, name: 'CC' },
    createdAt: 2022-11-14T07:06:52.834Z,
    updatedAt: 2022-11-14T07:06:52.834Z,
    __v: 0
  },
  {....},
  {....}
]


*/
