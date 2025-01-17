import React from "react";
import { Button, Stack } from "react-bootstrap";
import storeItems from "../data/items.json";
import formatCurrency from "./FormatCurrency";
import { useShoppingCart } from "../context/shoppingCartContext";
export default function CartItem({ id, quantity }) {
  const { removeItem } = useShoppingCart();
  const item = storeItems.find((item) => item.id === id);
  if (item == null) {
    return null;
  }
  return (
    <>
      <Stack
        direction="horizontal"
        gap={2}
        className="d-flex align-items-center"
      >
        <img
          src={item.imgUrl}
          alt="img not found"
          style={{ width: "125px", height: "75px", objectFit: "cover" }}
        />
        <div className="me-auto">
          <div>
            {item.name}
            {quantity > 1 && (
              <span className="text-muted" style={{ fontSize: "0.65rem" }}>
                x{quantity}
              </span>
            )}
          </div>
          <div className="text-muted" style={{ fontSize: "0.75rem" }}>
            {formatCurrency(item.price)}
          </div>

          <div>{formatCurrency(item.price * quantity)}</div>
        </div>

        <Button
          className="d-flex justify-content-center align-items-center"
          variant="outline-danger"
          size="sm"
          onClick={() => {
            removeItem(id);
          }}
        >
          x
        </Button>
      </Stack>
    </>
  );
}
