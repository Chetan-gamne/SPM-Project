import axios from "axios";
import type { NextPage } from "next";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import jsCookie from "js-cookie";
import EnteringBox from "../components/entering/EnteringBox";
import { IUser, IUserInfoRootState } from "../lib/types/user";
import { userInfoActions } from "../store/user-slice";
import { getError } from "../utilities/error";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth, signInWithEmailAndPassword } from "../services/firebase";
import { UserCredential } from "firebase/auth";
import { gql } from "@apollo/client";
import client from "../services/apollo-client";
const meQuery = gql`
  query {
    me {
      email
      uid
      email_verified
      phone_number
      dbID
    }
  }
`;
const Login: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const userInfo = useSelector((state: IUserInfoRootState) => {
    return state.userInfo.userInformation;
  });
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [userInfo, router, dispatch]);
  async function LoginHandler(user: IUser) {
    const { email, password } = user;
    try {
      const result: any = await signInWithEmailAndPassword(
        auth,
        email,
        password as string
      );
      const token = (await result.user?.accessToken!) ?? "";
      await fetch("http://localhost:3001/auth/login", {
        method: "post",
        headers: {
          authorization: token,
        },
        credentials: "include",
      });
      const { error, data, loading } = await client.query({ query: meQuery });
      if (data) {
        dispatch(userInfoActions.userLogin(data));
      }
      router.replace("/");
    } catch (err: any) {
      setErrorMessage(getError(err));
      console.log(getError(err));
    }
  }
  return (
    <EnteringBox
      title="login"
      submitHandler={LoginHandler}
      errorMessage={errorMessage}
    />
  );
};

export default Login;
