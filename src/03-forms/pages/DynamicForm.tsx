import formJson from "../data/custom-form.json";
import { Formik, Form } from "formik";
import { MyTextInput } from "../components";
import MySelect from "../components/MySelect";
import * as Yup from "yup";

const initialValues: { [key: string]: any } = {};
const requiredFields: { [key: string]: any } = {};

for (const input of formJson) {
  initialValues[input.name] = input.value;
  if (!input.validation) continue;

  let schema = Yup.string();

  for (const rule of input.validation) {
    if (rule.type === "required") {
      schema = schema.required("Este campo de requerido");
    }
    if (rule.type === "minLength") {
      schema = schema.min(
        (rule as any).value,
        `Este campo debe tener un minimo de ${(rule as any).value}`
      );
    }
    if (rule.type === "email") {
      schema = schema.email(`Revise el formato del email`);
    }
  }

  requiredFields[input.name] = schema;
}

const validationSchema = Yup.object({ ...requiredFields });

export const DynamicForm = () => {
  return (
    <div>
      <h1>DynamicForm</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(_formik) => (
          <Form noValidate>
            {formJson.map(({ label, name, placeholder, type, options }) => {
              if (type === "input" || type === "password" || type === "email") {
                return (
                  <MyTextInput
                    key={name}
                    label={label}
                    name={name}
                    type={type as any}
                    placeholder={placeholder}
                  />
                );
              } else if (type === "select") {
                return (
                  <MySelect key={name} label={label} name={name}>
                    {options?.map(({ id, label: optionLabel }) => (
                      <option key={id} value={id}>
                        {optionLabel}
                      </option>
                    ))}
                  </MySelect>
                );
              }

              throw new Error(`Type: ${type} no es soportado`);
            })}

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
