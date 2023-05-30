import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { gql, useMutation } from "@apollo/client";
import { getError } from "../utilities/error";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";
import { Router, useRouter } from "next/dist/client/router";
import { ClipLoader } from "react-spinners";
const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      msg
    }
  }
`;

const forgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { theme } = useTheme();
  const [loader, setLoader] = useState(false);
  const [forgot, { data, loading, error }] = useMutation(
    FORGOT_PASSWORD_MUTATION
  );
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    try {
      if (
        email.length == 0 ||
        !email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        throw new Error("Enter Valid Email Address");
      }
      const { data, errors } = await forgot({ variables: { email: email } });
      if (errors) {
        throw new Error("Unable To Send Email at this Moment!");
      }
      setLoader(false);
      toast.success(
        "Email Has Been Sent Successfully! Reset Your Password & Login Again.",
        { theme: "light", autoClose: 10000 }
      );
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      setLoader(false);
      setErrorMessage(getError(new Error("Unable To Send E-mail Now!")));
    }
    setLoader(false);
  };
  return (
    <div className="flex items-center justify-center">
      <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
        <div className="px-8 mb-4 text-center">
          <h3 className="pt-4 mb-2 text-2xl font-semibold">
            Forgot Your Password?
          </h3>
          <p className="mb-4 text-sm text-gray-700">
            We get it, stuff happens. Just enter your email address below and
            we'll send you a link to reset your password!
          </p>
        </div>
        <form
          className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
          onSubmit={submitHandler}
        >
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address..."
            />
          </div>
          <div className="mb-6 text-center">
            <button
              className="w-full bg-palette-primary py-2 rounded-lg text-palette-side text-base shadow-lg"
              type="submit"
            >
              {loader ? (
                <ClipLoader
                  color={"white"}
                  loading={loader}
                  size={30}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Forgot Password"
              )}
            </button>
          </div>
          {errorMessage && (
            <span className="text-rose-600 block -mt-4 mb-4">
              {errorMessage}
            </span>
          )}
          <hr className="mb-6 border-t" />
          <Link href={`/signUp`}>
            <div className="text-center">
              <span className="inline-block text-sm text-cyan-500 align-baseline hover:text-blue-800 cursor-pointer">
                Create an Account!
              </span>
            </div>
          </Link>
          <Link href={`/login`}>
            <div className="text-center">
              <span className="inline-block text-sm text-cyan-500 align-baseline hover:text-blue-800 cursor-pointer">
                Already have an account? Login!
              </span>
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default forgotPassword;
