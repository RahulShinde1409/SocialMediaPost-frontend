import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/action/login.action";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.login);


  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });


  const initialValues = { email: "", password: "" };


  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(loginUser(values))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.data?.role === "admin") {
          navigate('/admin')
        } else {
          navigate("/view-post");
        }
      })
      .catch(() => { })
      .finally(() => setSubmitting(false));
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-[#eff6e0]">
        <div className="w-full max-w-sm bg-gray-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-center text-2xl font-bold text-white mb-6">
            Login
          </h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">

                <div>
                  <label className="block text-sm text-gray-200">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="mt-2 block w-full rounded-md border border-white  px-3 py-2 text-white"
                  />
                  <ErrorMessage
                    name="email"

                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>


                <div>
                  <label className="block text-sm text-gray-200">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className="mt-2 block w-full rounded-md border border-white px-3 py-2 text-white"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>


                {error && <p className="text-red-500">{typeof error === "string" ? error : error.message}</p>}


                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full rounded-md bg-indigo-500 py-2 text-white font-semibold hover:bg-indigo-400"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </Form>
              
            )}
          </Formik>
          <p className="text-white text-center mt-3">Don't have an account? <Link className="hover:text-blue-500" to="/register">Register</Link></p>
        </div>
      </div>
    </>
  );
}
