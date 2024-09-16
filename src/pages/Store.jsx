import React from "react";
import { Col, Row } from "react-bootstrap";
import items from "../data/items.json";
import StoreItem from "../components/StoreItem";
export default function Store() {
  return (
    <>
      <h1>store</h1>

      <Row md={2} xs={1} lg={3} className="g-3">
        {items.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
