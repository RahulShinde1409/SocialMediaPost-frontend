import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { register } from "../../store/action/register.action";
import { resetAuth } from "../../store/slice/register.slice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { message, success, error, loading } = useSelector(
    (state) => state.register
  );

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    contact: Yup.string()
      .matches(/^[0-9]{10}$/, "Contact must be a valid 10-digit number")
      .required("Contact is required"),
  });

 
  const handleSubmit = (values, { setSubmitting }) => {
  const payload = {
    name: values.name,
    email: values.email,
    password: values.password,
    contact: values.contact,
  };

  dispatch(register(payload))
    .unwrap()
    .then(() => {
     
      dispatch({
        type: "register/setMessage",
        payload: { message: "Register successfully ", success: true },
      });

      
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    })
    .catch((error) => {
      console.error("Registration error:", error);
    })
    .finally(() => {
      setSubmitting(false);
    });
};


  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(resetAuth());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center rounded-lg h-screen bg-[#eff6e0]">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          contact: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => ( 
          <Form className="p-12 rounded shadow-md w-96 bg-gray-800 mt-12">
            <h2 className="font-bold text-[24px] mb-4 text-center text-white">
              Register
            </h2>

            <div className="mb-2">
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="border p-2 w-full text-white"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-2">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="border border-white p-2 w-full text-white"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-2">
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="border border-white p-2 w-full text-white"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-2">
              <Field
                type="text"
                name="contact"
                placeholder="Contact Number"
                className="border border-white p-2 w-full text-white"
              />
              <ErrorMessage
                name="contact"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading || isSubmitting}
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
            >
              {loading || isSubmitting ? "Registering..." : "Register"}
            </button>

            <p className="mt-3 text-white tracking-wider text-center">
              Already have an account?
              <Link
                to="/login"
                className="hover:text-blue-500 cursor-pointer ml-1"
              >
                Login
              </Link>
            </p>
          </Form>
        )}
      </Formik>

      {message && (
        <p
          className={`mt-3 ${
            success ? "text-green-600" : "text-red-600"
          } font-medium`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
