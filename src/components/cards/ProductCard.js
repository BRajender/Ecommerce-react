import React from "react";
import { Card } from "react-bootstrap";

function ProductCard({ data }) {
  
  return (
    <Card>
      <Card.Img
        variant="top"
        src={`http://localhost:3200/uploads/${data.productImage}`}
      />
      <Card.Body>
        <Card.Title>{data.productName}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
