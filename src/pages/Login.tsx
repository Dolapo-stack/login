import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { login} from "../services/api";
import { Link, useNavigate } from "react-router-dom";

interface LoginValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
    const[loading, setLoading] = useState(false);

  const initialValues: LoginValues = { email: "", password: "" };

  const loginSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>
  ) => {
    try {
        setLoading(true)
        const response = await login (values)
        if(response.status === 200){
            navigate("/dashboard")
        } 
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
          validationSchema={loginSchema}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <h1 className="text-3xl font-bold ">Login</h1>
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
                {loading ? "Loading..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-700 font-medium">
            Sign up
          </Link>
        </p>
      </div>
      <div className="bg-purple-700 text-white hidden md:flex items-center justify-center w-1/2 p-10">
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

export default Login;

