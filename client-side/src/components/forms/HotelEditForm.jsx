/* This is a part of seller's edit page for hotel owners to edit exisiting hotels*/

import { DatePicker, Select } from "antd";
import moment from "moment";

export default function HotelEditForm(props) {
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
          value={values.bed}
        >
          <Select.Option key={1}>{1}</Select.Option>
          <Select.Option key={2}>{2}</Select.Option>
          <Select.Option key={3}>{3}</Select.Option>
          <Select.Option key={4}>{4}</Select.Option>
          <Select.Option key={5}>{5}</Select.Option>
          <Select.Option key={6}>{6}</Select.Option>
        </Select>
      </div>

      {values.from && (
        /* because <DatePicker> component is a third party component, it is delayed by a few ms
           so we need to make sure we have the (values.from) data first,
           then we try to show the component */
        <DatePicker
          defaultValue={moment(values.from, "YYYY-MM-DD")}
          placeholder="From date"
          className="form-control m-2"
          onChange={(date, dateString) =>
            setValues({ ...values, from: dateString })
          }
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
        />
      )}

      {values.to && (
        <DatePicker
          defaultValue={moment(values.to, "YYYY-MM-DD")}
          placeholder="To date"
          className="form-control m-2"
          onChange={(date, dateString) =>
            setValues({ ...values, to: dateString })
          }
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
        />
      )}

      <button className="btn btn-outline-primary m-2">Save</button>
    </form>
  );
}
