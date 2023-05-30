import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IUserInfoRootState } from "../../../lib/types/user";
import UserAccountBtn from "./UserAccountBtn";
import LoginBtn from "./LoginBtn";
import { useDispatch } from "react-redux";
import { ApolloError, gql } from "@apollo/client";
import { userInfoActions } from "../../../store/user-slice";
import client from "../../../services/apollo-client";
import { useRouter } from "next/router";
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
const User = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector(
    (state: IUserInfoRootState) => state.userInfo.userInformation
  );

  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { error, data, loading } = await client.query({ query: meQuery });
        if (data) {
          dispatch(userInfoActions.userLogin(data));
          setUserLoading(false);
        }
        console.log("ME: ", data);
      } catch (error) {
        setUserLoading(false);
        if (error instanceof ApolloError && error.graphQLErrors.length > 0) {
          const message = error.graphQLErrors[0].message;
          if (message === "Not Authenticated") {
            dispatch(userInfoActions.userLogout());
            router.push("/");
          } else {
            console.error(error);
          }
        }
      }
    };
    fetchData();
  }, []);

  let condition = userInfo ? <UserAccountBtn /> : <LoginBtn />;

  return userLoading ? null : condition;
};

export default User;
