import React from "react";
import { ProductCard } from "../cards";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";

function AdminTable(props) {
  const handleEdit = (id) => {
    props.handleedit(id);
  };
  const handleDelete = (id) => {
    Confirm.show(
      "",
      "Do you want to Delete this Product ?",
      "Yes",
      "No",
      () => {
        props.removeproduct(id)
      },
      () => {}
    );
  };
  return (
    
    <table className="table basic_table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Description</th>
          <th>Price</th>
          <th>Edit</th>
          <th>Delete</th>
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
                <td>{item.price}</td>

                <td>
                  <button
                    className="edit_product_btn"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="delete_product_btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default AdminTable;
