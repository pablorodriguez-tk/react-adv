import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MySelect, MyTextInput, MyCheckbox } from "../components";

import "../styles/styles.css";

export const FormikAbstraction = () => {
  return (
    <div>
      <h1>Formik Components</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          terms: false,
          jobType: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .required("Required")
            .max(15, "Must be 15 characters or less"),
          lastName: Yup.string()
            .required("Required")
            .max(10, "Must be 10 characters or less"),
          email: Yup.string()
            .required("Required")
            .email("Invalid email address"),
          terms: Yup.boolean().oneOf([true], "Must accept terms"),
          jobType: Yup.string()
            .required("Required")
            .notOneOf(["it-jr"], "This option is not available"),
        })}
      >
        {(_formik) => (
          <Form>
            <MyTextInput
              label="First Name"
              name="firstName"
              placeholder="Pablo"
            />
            <MyTextInput
              label="Last Name"
              name="lastName"
              placeholder="Rodriguez"
            />
            <MyTextInput
              label="Email Address"
              name="email"
              placeholder="pablorodriguez@gmail.com"
              type="email"
            />

            <MySelect name="jobType" label="Job Type<">
              <option value="">Pick something</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="it-senior">It-senior</option>
              <option value="it-jr">It-jr</option>
            </MySelect>

            <MyCheckbox label="Terms & Conditions" name="terms" />

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikAbstraction;
