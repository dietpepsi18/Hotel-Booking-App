import React from "react";
import { useState, useEffect } from "react";
import queryString from "query-string"; // for querying parameters from url(XXX?a=0&b=1&c=2)
import { Link } from "react-router-dom";
import Search from "../components/forms/Search";
import { searchListings } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";

export default function SearchResult() {
  //state:
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchBed, setSearchBed] = useState("");
  const [hotels, setHotels] = useState([]); //for store all the filtered hotels

  //when component mounts, get search params from url and use to send search query to backend
  useEffect(() => {
    const { location, date, bed } = queryString.parse(window.location.search);
    searchListings({ location, date, bed }).then((res) => {
      setHotels(res.data);
    });
  }, [window.location.search]);

  return (
    <>
      <div className="col">
        <br />
        <Search />
      </div>
      <div className="container">
        <div className="row">
          {hotels.map((h) => {
            return <SmallCard key={h._id} h={h} />;
          })}
        </div>
      </div>
    </>
  );
}
