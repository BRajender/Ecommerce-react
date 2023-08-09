import React from 'react';
import {Form} from "react-bootstrap";


function SubscribeForm(props) {
    return (
      <Form>
        <Form.Group className="mt-3">
          <Form.Label className="text-white">Email adress</Form.Label>
          <Form.Control type="text" placeholder="Enter email" />
        </Form.Group>
      </Form>
    );
}

export default SubscribeForm;