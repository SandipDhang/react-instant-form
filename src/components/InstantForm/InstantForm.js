import React, { useEffect, useState } from "react";
import { Row } from "reactstrap";
import PropTypes from "prop-types";
import * as Yup from "yup";
import FormInput from "../FormInputs/FormInput";

const InstantForm = ({ formObject }) => {
  const [values, setValues] = useState({});

  const handleChange = (key, value) => {
    // console.log(value, key, "value");
    const updatedValues = { ...values };
    updatedValues[key] = value;
    setValues({ ...updatedValues });
  };

  useEffect(() => {
    const formValues = {};
    for (let field of Object.keys(formObject.fields)) {
      if (
        formObject.fields[field].type !== "checkbox" ||
        formObject.fields[field].type !== "radio"
      ) {
        formValues[field] = { isError: false, value: "" };
      } else {
        formValues[field] = { isError: false, value: [] };
      }
    }
    setValues({ ...formValues });
  }, [formObject]);

  useEffect(() => {
    console.log(values);
  }, [values]);
  return (
    <Row>
      {!formObject.fields ? (
        <p>formObject must have a fields object</p>
      ) : (
        Object.keys(formObject.fields).map((obj) => (
          <FormInput
            key={obj}
            inputObj={formObject.fields[obj]}
            id={obj}
            value={values[obj]}
            handleChange={handleChange}
          />
        ))
      )}
    </Row>
  );
};

InstantForm.propTypes = {
  formObject: PropTypes.object,
};

InstantForm.defaultProps = {
  formObject: {
    onSubmit: (values) => console.log(values, "Submitted from InstantForm"),
    fields: {
      firstName: {
        type: "text",
        label: "First Name",
        validator: Yup.number(),
        width: 6,
        callback: (val) => console.log(val, "custom callback from fname"),
      },
      lastName: {
        type: "text",
        label: "Last Name",
        validator: Yup.string(),
        width: 6,
        // callback: (val) => console.log(val, "custom callback from lname"),
      },
    },
  },
};

export default InstantForm;
