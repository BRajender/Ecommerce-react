import React from 'react';
import { Form,Button } from "react-bootstrap";

function ContactForm(props) {
    return (
      <Form>
        <Form.Group className="mt-2">
          <Form.Control type="text" placeholder="Enter name" />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Control type="text" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Control type="text" placeholder="Enter message" />
        </Form.Group>
        <Form.Group className="mt-3">
          <Button className="bg-white contact_submit_btn">submit</Button>
        </Form.Group>
      </Form>
    );
}

export default ContactForm;