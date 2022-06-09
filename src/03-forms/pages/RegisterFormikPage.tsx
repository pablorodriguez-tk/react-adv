import { Form, Formik } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../components";

import "../styles/styles.css";

export const RegisterFormikPage = () => {
  return (
    <div>
      <h1>Register Formik Page</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password1: "",
          password2: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("Required")
            .min(2, "Must be 2 characters or more")
            .max(15, "Must be 15 characters or less"),
          email: Yup.string()
            .required("Required")
            .email("Invalid email address"),
          password1: Yup.string()
            .required("Required")
            .min(6, "Must be 6 characters or more"),
          password2: Yup.string()
            .required("Required")
            .oneOf([Yup.ref("password1")], "Passwords must match"),
        })}
      >
        {({ handleReset }) => (
          <Form>
            <MyTextInput name="name" label="Name" placeholder="Pablo" />
            <MyTextInput
              name="email"
              type="email"
              label="Email"
              placeholder="pablo@gmail.com"
            />
            <MyTextInput
              name="password1"
              type="password"
              label="******"
              placeholder="Password"
            />
            <MyTextInput
              name="password2"
              type="password"
              label="******"
              placeholder="Confirm password"
            />
            <button type="submit">Create</button>
            <button type="button" onClick={handleReset}>
              Reset Form
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
