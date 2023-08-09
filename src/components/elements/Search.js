import React, { useCallback } from "react";
import { Form } from "react-bootstrap";
import { debounce } from "lodash";

function Search(props) {
  const debouncedSave = useCallback(
    debounce((value) => props.handlesearch(value), 300),
    []
  );

  const handleChange = (e) => {
    const { value } = e.target;

    debouncedSave(value);
  };

  return (
    <Form.Control className="search_input" onChange={(e) => handleChange(e)} />
  );
}

export default Search;
