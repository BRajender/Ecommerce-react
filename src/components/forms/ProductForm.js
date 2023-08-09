import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useUserState } from "../../context/user-context";
import { Report } from "notiflix/build/notiflix-report-aio";
//service
import { addProduct, updateProduct } from "../../services/products";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function ProductForm(props) {
  const state = useUserState();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [options, setOptions] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    // console.log(state.product_categories);
    // console.log(options);
    // console.log(props.productdetails);
    if (props.productdetails !== null) {
      const filter_op = options.filter(
        (item) => props.productdetails.categoryId === item.value
      );
      // console.log(filter_op);
      setProduct({
        ...props.productdetails,
        categoryId: filter_op[0],
        productImage: `http://localhost:3200/uploads/${props.productdetails.productImage}`,
      });
    }
  }, [props.productdetails]);

  useEffect(() => {
    setProduct({});
  }, [props.edit]);

  useEffect(() => {
    const productOptions = state.product_categories.map((d) => ({
      value: d.id,
      label: d.name,
    }));
    setOptions(productOptions);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSelect = (e) => {
    setProduct({
      ...product,
      categoryId: e,
    });
  };

  const handleFile = (e) => {
    var reader = new FileReader();
    setProduct({
      ...product,
      productImage: e.target.files[0],
    });

    reader.onload = function () {
      let base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      setImage(base64String);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(product).length >= 4) {
      if (props.edit) {
        let formdata = new FormData();
        formdata.append("productId", product.id);
        formdata.append("productName", product.productName);
        formdata.append("categoryId", product.categoryId.value);
        formdata.append("productDescription", product.productDescription);
        formdata.append("price", product.price);
        formdata.append("productImage", product.productImage);
        const response = await updateProduct(formdata);

        if (response.status === 200) {
          props.handleclose();
          props.seteditmode(false);
          setProduct({});
          Notify.success("Product updated successfully");
          setImage(null);
          props.fetchproducts();
        } else if (response.status === 401) {
          logout();
        } else {
          Notify.failure(response.statusText);
        }
      } else {
        let formdata = new FormData();
        formdata.append("productName", product.productName);
        formdata.append("categoryId", product.categoryId.value);
        formdata.append("productDescription", product.productDescription);
        formdata.append("price", product.price);
        formdata.append("productImage", product.productImage);

        const response = await addProduct(formdata);
        if (response.status === 201) {
          props.handleclose();
          setProduct({});
          Notify.success("Product added successfully");
          setImage(null);
          props.fetchproducts();
        } else if (response.status === 401) {
          logout();
        } else {
          Notify.failure(response.statusText);
        }
      }
    } else {
      Report.info("", "All the fields mandatory", "Okay");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Name"
          name="productName"
          value={product.productName}
          onChange={(e) => handleChange(e)}
          autoComplete="off"
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Control
          type="text"
          placeholder="Price"
          name="price"
          value={product.price}
          onChange={(e) => handleChange(e)}
          autoComplete="off"
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Select
          name="categoryId"
          placeholder="Select Category"
          value={product.categoryId}
          options={options}
          onChange={(e) => handleSelect(e)}
        />
      </Form.Group>
      <Form.Group className="mt-3">
        {props.edit &&
          (image !== null ? (
            <div className="py-2">
              <img src={image} className="img-fluid" />
            </div>
          ) : (
            <div className="py-2">
              <img src={product.productImage} className="img-fluid" />
            </div>
          ))}
        <Form.Control
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={(e) => handleFile(e)}
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Control
          as="textarea"
          rows="4"
          placeholder="Description"
          name="productDescription"
          value={product.productDescription}
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>
      <Form.Group className="mt-3 text-center">
        <Button type="submit" className="dn-btn">
          SAVE
        </Button>
      </Form.Group>
    </Form>
  );
}

export default ProductForm;
