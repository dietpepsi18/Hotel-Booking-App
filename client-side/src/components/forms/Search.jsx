import React from "react";
import { useState } from "react";
import { DatePicker, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { useHistory } from "react-router-dom";

const { RangePicker } = DatePicker;

export default function Search() {
  //state:
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [bed, setBed] = useState("");

  //route:
  const history = useHistory();

  const handleSubmit = () => {
    history.push(`/search-result?location=${location}&date=${date}&bed=${bed}`);
  };

  return (
    <div className="d-flex pb-4">
      <div className="w-100">
        <input
          type="text"
          name="location"
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          style={{
            height: "50px",
            width: "100%",
            padding: "4px 11px",
            border: "1px solid #d9d9d9",
            borderRadius: "2px",
            fontSize: "14px",
          }}
          value={location}
        />
      </div>

      <RangePicker
        className="w-100"
        onChange={(value, dateString) => setDate(dateString)}
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />

      <Select
        onChange={(value) => setBed(value)}
        className="w-100"
        size="large"
        placeholder="Number of Beds"
      >
        <Select.Option key={1}>{1}</Select.Option>
        <Select.Option key={2}>{2}</Select.Option>
        <Select.Option key={3}>{3}</Select.Option>
        <Select.Option key={4}>{4}</Select.Option>
        <Select.Option key={5}>{5}</Select.Option>
        <Select.Option key={6}>{6}</Select.Option>
      </Select>

      <SearchOutlined
        onClick={handleSubmit}
        className="btn btn-primary p-3 btn-square"
      />
    </div>
  );
}
