import axios from "axios";

export const createHotel = async (token, data) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-hotel`,
    data, //sending data
    {
      //sending in HTTP headers
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const allHotels = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/hotels`);
};

export const diffDays = (from, to) => {
  const day = 24 * 60 * 60 * 1000;
  const start = new Date(from);
  const end = new Date(to);
  const difference = Math.round(Math.abs((start - end) / day));
  return difference;
};

export const sellerHotels = async (token) => {
  return await axios.get(`${process.env.REACT_APP_API}/seller-hotels`, {
    //sending in HTTP headers
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteHotel = async (token, hotelId) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/delete-hotel/${hotelId}`,
    {
      //sending in HTTP headers
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const read = async (hotelId) => {
  return await axios.get(`${process.env.REACT_APP_API}/hotel/${hotelId}`);
};

export const updateHotel = async (token, data, hotelId) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/update-hotel/${hotelId}`,
    data, //sending data
    {
      //sending in HTTP headers
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const userHotelBookings = async (token) => {
  return await axios.get(`${process.env.REACT_APP_API}/user-hotel-bookings`, {
    //sending in HTTP headers
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const isAlreadyBooked = async (token, hotelId) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/is-already-booked/${hotelId}`,
    {
      //sending in HTTP headers
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const searchListings = async (query) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/search-listings`,
    query //sending data
  );
};
