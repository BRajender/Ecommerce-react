import React from "react";
import { ProductCard } from "../cards";

function OrdersTable(props) {
  return (
    <table className="table basic_table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {props.data &&
          props.data.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <ProductCard data={item} />
                </td>

                <td>{item.productDescription}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
              </tr>
            );
          })}
          <tr>

          </tr>
      </tbody>
    </table>
  );
}

export default OrdersTable;
