import React from "react";
import { Modal } from "antd";
import { currencyFormatter } from "../../actions/stripe";

export default function OrderModal({
  session,
  orderedBy,
  showModal,
  setShowModal,
}) {
  return (
    <Modal
      visible={showModal}
      title="Order Payment Details"
      onCancel={() => setShowModal(!showModal)}
    >
      <p>Payment Intent: {session.payment_intent}</p>
      <p>Payment Status: {session.payment_status}</p>
      <p>
        Total Amount: {session.currency.toUpperCase()}{" "}
        {session.amount_total / 100}
      </p>
      <p>Stripe Customer ID: {session.customer}</p>
      <p>Customer: {orderedBy.name}</p>
    </Modal>
  );
}
