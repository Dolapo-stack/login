import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const initialValues: RegisterValues = { name: "", email: "", password: "" };

  const registerSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (
    values: RegisterValues,
    { setSubmitting }: FormikHelpers<RegisterValues>
  ) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={registerSchema}
        >
          <Form>
            <h1>Register</h1>
            <div className="email">
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" cl />
              <ErrorMessage name="name" />
            </div>

            <div className="email">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" />
            </div>

            <div className="password">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" />
            </div>

            <button type="submit">Register</button>
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </Form>
        </Formik>
      </div>
      <div className="bg-purple-700  text-white w-1/2">
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg opacity-90">
            Log in to continue to your dashboard.
          </p>
        </div>  
      </div>
    </div>
  );
};

export default Register;
