import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { register } from "../services/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
    const navigate = useNavigate();
    const[loading, setLoading] = useState(false);

  const initialValues: RegisterValues = { name: "", email: "", password: "" };

  const registerSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (
    values: RegisterValues,
    { setSubmitting }: FormikHelpers<RegisterValues>
  ) => {
    try {
        setLoading(true)
        const response = await register (values)
        console.log(response)
        navigate("/login")
        
    } catch (error) {
        console.log(error)
    }
    finally{   
        setLoading(false)
         setSubmitting(false);
    }
   
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={registerSchema}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <h1 className="text-3xl font-bold ">Register</h1>
              <div className="name">
                <label className="block mb-1 text-sm font-medium">Name</label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-600"
                />
              </div>

              <div className="email">
                <label className="block mb-1 text-sm font-medium">Email</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <div className="password">
                <label className="block mb-1 text-sm font-medium">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-700 py-3 text-white rounded-xl hover:bg-purple-800 transition font-medium  "
                disabled={isSubmitting || loading}
              >
                {loading ? "Loading..." : "Signup"}
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-700 font-medium">
            Log In
          </Link>
        </p>
      </div>
      <div className="bg-purple-700 text-white hidden md:flex items-center justify-center w-1/2 p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
          <p className="text-lg opacity-90">
            Get Started by creating an account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
