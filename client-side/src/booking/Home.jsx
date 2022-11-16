import { useState, useEffect } from "react";
import { allHotels } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";
import Search from "../components/forms/Search";

const Home = () => {
  //state:
  const [hotels, setHotels] = useState([]);

  //after the conponent did mount, load all the hotels
  useEffect(() => {
    loadAllHotels();
  }, []);

  const loadAllHotels = async () => {
    let res = await allHotels();
    setHotels(res.data);
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1> All Hotels</h1>
      </div>

      <div className="col">
        <br />
        <Search />
      </div>

      <div className="container-fluid">
        <br />
        {hotels.map((h) => (
          <SmallCard key={h._id} h={h} />
        ))}
      </div>
    </>
  );
};

export default Home;

/*
    let res = await allHotels();
    setHotels(res.data);

    ===> res.data:

    {
    image: { contentType: 'image/png' },
    _id: 636d6ed6ab331e34ff213239,
    title: 'AA house',
    content: 'AA house',
    location: 'Seattle',
    price: 200,
    from: 2022-11-16T00:00:00.000Z,
    to: 2022-11-24T00:00:00.000Z,
    bed: 3,
    createdAt: 2022-11-10T21:36:22.494Z,
    updatedAt: 2022-11-10T21:36:22.494Z,
    __v: 0
    },
    {...}

*/
