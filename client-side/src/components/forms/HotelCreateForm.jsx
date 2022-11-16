/* This is a part of dashboard/seller page for hotel owners to add new hotels*/

import { DatePicker, Select } from "antd";
import moment from "moment";

export default function HotelCreateForm(props) {
  //destructure from props:
  const { values, setValues, handleChange, handleImageChange, handleSubmit } =
    props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          Add Image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </label>

        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={values.title}
        />

        <textarea
          name="content"
          onChange={handleChange}
          placeholder="Cotent"
          className="form-control m-2"
          value={values.content}
        />

        <input
          type="text"
          name="location"
          onChange={handleChange}
          placeholder="Location"
          className="form-control m-2"
          value={values.location}
        />

        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="form-control m-2"
          value={values.price}
        />

        <Select
          onChange={(value) => setValues({ ...values, bed: value })}
          className="w-100 m-2"
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
      </div>

      <DatePicker
        placeholder="From date"
        className="form-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, from: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />

      <DatePicker
        placeholder="To date"
        className="form-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, to: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />

      <button className="btn btn-outline-primary m-2">Save</button>
    </form>
  );
}
