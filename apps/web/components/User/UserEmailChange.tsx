import React, { useEffect, useState } from "react";
import client from "../../services/apollo-client";
import { gql, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { IUserInfoRootState } from "../../lib/types/user";
import { useRouter } from "next/router";

const GET_USER = gql`
  query ($email: String!) {
    getUserByEmail(email: $email) {
      _id
    }
  }
`;

const CHANGE_IDP_EMAIL = gql`
  mutation updateEmail($email: String!) {
    updateEmail(email: $email) {
      msg
    }
  }
`;
const CHANGE_DB_EMAIL = gql`
  mutation updateUser($id: String!, $updateUserData: UpdateUserInput!) {
    updateUser(id: $id, updateUserData: $updateUserData) {
      _id
      email
      name
    }
  }
`;

const UserEmailChange = () => {
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const userInfo = useSelector((state: IUserInfoRootState | any) => {
    return state.userInfo.userInformation;
  });
  const [changeIDPEmail] = useMutation(CHANGE_IDP_EMAIL);
  const [changeDBEmail] = useMutation(CHANGE_DB_EMAIL);
  const router = useRouter();
  useEffect(() => {
    const fetchId = async () => {
      try {
        const { data } = await client.query({
          query: GET_USER,
          variables: { email: userInfo?.me?.email },
        });
        const id = data.getUserByEmail._id;
        setUserId(id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchId();
  }, []);

  const changeIDPEmailCall = async () => {
    try {
      const { data } = await changeIDPEmail({
        variables: {
          email: newEmail,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const changeDBEmailCall = async () => {
    try {
      const { data } = await changeDBEmail({
        variables: {
          id: userId,
          updateUserData: { email: newEmail },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserEmail = async () => {
    try {
      if (!newEmail) {
        setError("Enter Valid Email Address");
        return;
      }
      await changeIDPEmailCall();
      await changeDBEmailCall();
      await router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-5">Change your email address</h1>

      <div className="flex flex-col items-start justify-start">
        <p className="font-semibold">New email address</p>
        <input
          type="text"
          value={newEmail}
          onChange={(e) => {
            setNewEmail(e.target.value);
            setError("");
          }}
          className="border-2 rounded-md mb-5 p-1 border-gray-400 w-full"
        />
        {error && (
          <div>
            <h1 className="text-red-500">{error}</h1>
          </div>
        )}
      </div>

      <button
        className="bg-yellow-300 px-3 py-1 shadow-md rounded-md"
        onClick={() => updateUserEmail()}
      >
        Save Changes
      </button>
    </div>
  );
};

export default UserEmailChange;
