import { useEffect, useState } from "react";
import { read, diffDays, isAlreadyBooked } from "../actions/hotel.js";
import { getSessionId } from "../actions/stripe.js";
import moment from "moment";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

export default function ViewHotel({ match, history }) {
  //state
  const [hotel, setHotel] = useState({});
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  //redux state
  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSellerHotel();
  }, []);

  useEffect(() => {
    if (auth && auth.token) {
      isAlreadyBooked(auth.token, match.params.hotelId).then((res) => {
        if (res.data.ok) setAlreadyBooked(true);
      });
    }
  }, []);

  const loadSellerHotel = async () => {
    let res = await read(match.params.hotelId);
    /*
        res.data = {
            bed: 4
            content: "Guesthouse and ....."
            createdAt: "2022-11-14T07:05:48.470Z"
            from: "2022-11-24T00:00:00.000Z"
            image: {contentType: 'image/png'}
            location: "tokyo"
            postedBy: "637113d15696b94c31642aa4"
            price: 436
            title: "hotel in Japna 1 (posted by CC)"
            to: "2023-03-23T00:00:00.000Z"
            updatedAt: "2022-11-14T07:05:48.470Z"
            __v: 0
            _id: "6371e8cc406f2e518b1523f9"
        }
    */
    setHotel(res.data);
    setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
  };

  const handleClick = async (event) => {
    event.preventDefault();

    if (!auth || !auth.token) {
      history.push("/login");
      return;
    }

    setLoading(true);

    if (!auth) {
      //if not login yet
      history.push("/login");
    } else {
      let res = await getSessionId(auth.token, match.params.hotelId);
      /* we need to get this sessionId from stripe, so the user can securely enter their card information
         after user finish the checkout process in stripe, they will be redirected to '/stripe/success' page */
      //console.log("GET SESSION ID Response ===> ", res.data.sessionId);

      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
      stripe
        .redirectToCheckout({
          sessionId: res.data.sessionId,
        })
        .then((result) => console.log(result));
    }
  };

  //-------------------------return--------------------------------------------//

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>{hotel.title}</h2>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <br />
            <img src={image} alt={hotel.title} className="img img-fluid m-2" />
          </div>

          <div className="col-md-6">
            <br />
            <b>{hotel.content}</b>
            <p className="alert alert-info mt-3">${hotel.price}</p>
            <p className="card-text">
              <span className="float-right text-primary">
                for {diffDays(hotel.from, hotel.to)}{" "}
                {diffDays(hotel.from, hotel.to) <= 1 ? "day" : "days"}
              </span>
            </p>
            <p>
              From <br />
              {moment(new Date(hotel.from)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <p>
              To <br />
              {moment(new Date(hotel.to)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i>
            <br />

            <button
              className="btn btn-block btn-lg btn-primary mt-3"
              onClick={handleClick}
              disabled={loading}
            >
              {loading
                ? "Loading..."
                : alreadyBooked
                ? "Already Booked"
                : auth && auth.token
                ? "Book Now"
                : "Login to Book"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
