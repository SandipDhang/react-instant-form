# react-instant-form

This library is to create a form in React.js through a JSON format

# Usage

```
import InstantForm from "react-instant-form";
import * as Yup from "yup";

const Mycomponent = () => {
     const formObject = {
    onSubmit: (values) => console.log(values, "Submitted from InstantForm"),
    fields: {
      firstName: {
        type: "text",
        label: "First Name",
        validator: Yup.string(),
        width: 6,
        callback: (val) => console.log(val, "custom callback from fname"),
        component: ({ value, handleChange }) => (
          <CustomInput value={value} handleChange={handleChange} />
        ),
        inputContainerClass: "my_container",
        inputLabelClass: "my_label",
        inputClass: "my_input",
      },
      password: {
        type: "password",
        label: "Password",
        validator: Yup.string(),
        width: 6,
        callback: (val) => console.log(val, "custom callback from password"),
        component: ({ value, handleChange }) => (
          <CustomInput value={value} handleChange={handleChange} />
        ),
        passwordVisibleIcon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-target"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="6"></circle>
            <circle cx="12" cy="12" r="2"></circle>
          </svg>
        ),
        passwordHideIcon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-target"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="6"></circle>
            <circle cx="12" cy="12" r="2"></circle>
          </svg>
        ),
        inputContainerClass: "my_container",
        inputLabelClass: "my_label",
        inputClass: "my_input",
      },
      lastName: {
        type: "text",
        label: "Last Name",
        validator: Yup.number(),
        width: 6,
      },
      options: {
        type: "select",
        label: "Select an option",
        validator: Yup.string(),
        width: 6,
        optionArray: [
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" },
          { label: "Option 3", value: "option3" },
          { label: "Option 4", value: "option4" },
        ],
        callback: (value) => console.log(value, "ccb from options"),
      },
      description: {
        type: "textarea",
        label: "Description",
        validator: Yup.string(),
        width: 6,
      },
      gender: {
        type: "checkbox",
        label: "Gender",
        validator: Yup.string(),
        width: 6,
        optionArray: ["Female", "Male", "Others"],
        limit: 1,
      },
      addressType: {
        type: "radio",
        label: "Address Type",
        validator: Yup.string(),
        width: 6,
        optionArray: ["Home", "Office", "Others"],
        limit: 1,
      },
    },
  };
    return <InstantForm formObject={formObject} />
}
```
