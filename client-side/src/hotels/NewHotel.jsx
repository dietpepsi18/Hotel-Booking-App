/* This is a page for hotel owners to add new hotels*/

import { useState } from "react";
import { toast } from "react-toastify";
import { createHotel } from "../actions/hotel.js";
import { useSelector } from "react-redux";
import HotelCreateForm from "../components/forms/HotelCreateForm.jsx";

export default function NewHotel() {
  //state
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });

  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );

  //redux state
  const { auth } = useSelector((state) => ({ ...state }));

  const handleSubmit = async (event) => {
    event.preventDefault(); //so the page will not reload when you submit the form

    //need to create a form data, because json can't have a file appended to it
    let hotelData = new FormData();
    hotelData.append("title", values.title);
    hotelData.append("content", values.content);
    hotelData.append("location", values.location);
    hotelData.append("price", values.price);
    hotelData.append("from", values.from);
    hotelData.append("to", values.to);
    hotelData.append("bed", values.bed);

    //need to make sure there is image in the state, before add image into the form data
    if (values.image) {
      hotelData.append("image", values.image);
    }

    try {
      let res = await createHotel(auth.token, hotelData);
      toast.success("Success. New hotel has been posted");

      //after the hotel has benn posted successfully, reload the page
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleImageChange = (event) => {
    setPreview(URL.createObjectURL(event.target.files[0]));
    setValues({ ...values, image: event.target.files[0] });
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  //-------------------------return--------------------------------------------//
  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Add Hotel</h2>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <HotelCreateForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
          </div>
        </div>
      </div>
    </>
  );
}
