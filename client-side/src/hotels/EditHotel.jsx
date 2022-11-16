import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DatePicker, Select } from "antd";
import { read, updateHotel } from "../actions/hotel.js";
import { useSelector } from "react-redux";
import HotelEditForm from "../components/forms/HotelEditForm.jsx";

const { Option } = Select;

export default function EditHotel({ match }) {
  //state
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });

  const [image, setImage] = useState("");

  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );

  //redux state
  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSellerHotel();
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
    setValues({ ...values, ...res.data });
    setPreview(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
  };

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
    if (image) {
      hotelData.append("image", image);
    }

    try {
      let res = await updateHotel(auth.token, hotelData, match.params.hotelId);
      console.log("HOTEL Update RES ===> ", res);
      toast.success("Success. hotel has been updated");

      //   //after the hotel has benn posted successfully, reload the page
      //   setTimeout(() => {
      //     window.location.reload();
      //   }, 1000);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleImageChange = (event) => {
    setPreview(URL.createObjectURL(event.target.files[0]));
    setImage(event.target.files[0]);
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  //-------------------------return--------------------------------------------//

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Edit Hotel</h2>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <HotelEditForm
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

/* match :
{path: '/hotel/edit/:hotelId', url: '/hotel/edit/6371e8cc406f2e518b1523f9', isExact: true, params: {…}}
    isExact: true
    params: 
        hotelId: "6371e8cc406f2e518b1523f9"
    path: "/hotel/edit/:hotelId"
    url: "/hotel/edit/6371e8cc406f2e518b1523f9"
*/
