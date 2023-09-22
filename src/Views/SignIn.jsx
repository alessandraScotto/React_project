import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { supabase } from "../Supabase/Client";
import useAuthStore from "../Store/authStore";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Components/Input";
import { useState } from "react";
import Button from "../Components/Button";

export default function SignIn() {
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const submit = async (values) => {
    console.log(values);

    const form = {
      email: values.email,
      password: values.password,
      confirm_password: values.confirm_password,
      options: {
        data: {
          username: values.username,
          first_name: values.first_name,
          last_name: values.last_name,
        },
      },
    };

    try {
      const { data, error } = await supabase.auth.signUp(form);
      console.log("DATA", data, "EERORR", error);
      if (!error) {
        setMessage(() => data.user.email);
      }

      if (error) {
        console.log(error.message.message);
      }

      if (data.session !== null) {
        setLoggedIn(data.session);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen pt-24">
      <Formik
        initialValues={{
          password: "",
          confirm_password: "",
          email: "",
          username: "",
          first_name: "",
          last_name: "",
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(6, "Must be 6 characters or more")
            .required("Required"),
          username: Yup.string()
            .min(6, "Must be 6 characters or more")
            .required("Required"),
          confirm_password: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Required"),
          first_name: Yup.string()
            .min(3, "Must be 3 characters or more")
            .required("Required"),
          last_name: Yup.string()
            .min(3, "Must be 3 characters or more")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={(values) => submit(values)}
      >
        <Form className="mx-auto flex w-4/5 flex-wrap rounded bg-slate-50 bg-opacity-90 py-8 text-black shadow dark:bg-[rgba(29,26,70,0.58)] md:w-2/5">
          <div className="w-full text-center">
            <h1 className="font-main bg-gradient-to-r from-violet-500 to-slate-600 bg-clip-text text-2xl font-semibold tracking-normal text-transparent dark:text-white">
              Register
            </h1>
          </div>
          <div className="mb-8 w-full px-2">
            <Field
              name="first_name"
              component={Input}
              label="First Name"
              type="text"
            />
          </div>

          <div className="mb-8 w-full px-2 md:w-1/2">
            <Field
              component={Input}
              name="last_name"
              label="Last Name"
              type="text"
            />
          </div>

          <div className="mb-8 w-full px-2 md:w-1/2">
            <Field
              component={Input}
              name="username"
              label="Username"
              type="text"
            />
          </div>

          <div className="mb-8 w-full px-2">
            <Field component={Input} name="email" label="Email" type="email" />
          </div>

          <div className="mb-8 w-full px-2 md:w-1/2">
            <Field
              component={Input}
              name="password"
              label="Password"
              type="password"
            />
          </div>

          <div className="mb-8 w-full px-2 md:w-1/2">
            <Field
              component={Input}
              name="confirm_password"
              label="Confirm Password"
              type="password"
            />
          </div>

          <div className="flex w-full justify-center">
            <Button label="Rgister now" type="submit" />
          </div>
        </Form>
      </Formik>
      {message && (
        <div className="font-main mx-auto mt-12 block text-center text-white">
          <p>Abbiamo inviato una mail di conferma a {message}.</p>
          <p>Clicca sul link per completare la registrazione.</p>
          <p>Puoi chiudere questa pagina.</p>
        </div>
      )}
      <Link
        to="/login"
        className="font-main text-l mx-auto mb-10 mt-12 block text-center text-white"
      >
        Già registrato ?
      </Link>
    </div>
  );
}
