import React from "react";
import { Button, Card } from "react-bootstrap";
import formatCurrency from "./FormatCurrency";
import { useShoppingCart } from "../context/shoppingCartContext";

export default function StoreItem({ id, price, name, imgUrl }) {
  const {
    getItemsQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItem,
  } = useShoppingCart();
  const quantity = getItemsQuantity(id);
  return (
    <>
      <Card className="h-100">
        <Card.Img
          src={imgUrl}
          style={{ height: "200px", objectFit: "cover" }}
        ></Card.Img>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            <span className="fs-2">{name}</span>
            <span className="text-muted me-2">{formatCurrency(price)}</span>
          </Card.Title>
          <div className="mt-auto">
            {quantity === 0 ? (
              <Button
                className="w-100 "
                onClick={() => {
                  increaseItemQuantity(id);
                }}
              >
                Add To Cart
              </Button>
            ) : (
              <div
                className="d-flex align-items-center flex-column "
                style={{ gap: "0.5rem" }}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ gap: "0.5rem" }}
                >
                  <Button
                    onClick={() => {
                      decreaseItemQuantity(id);
                    }}
                  >
                    -
                  </Button>
                  <span className="fs-3"> {quantity}in cart</span>
                  <Button
                    onClick={() => {
                      increaseItemQuantity(id);
                    }}
                  >
                    +
                  </Button>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    removeItem(id);
                  }}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
