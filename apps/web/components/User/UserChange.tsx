import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import client from "../../services/apollo-client";
import { useSelector } from "react-redux";
import { IUserInfoRootState } from "../../lib/types/user";
import { useRouter } from "next/router";

const USER_NAME_CHANGE = gql`
  mutation updateUser($id: String!, $updateUserData: UpdateUserInput!) {
    updateUser(id: $id, updateUserData: $updateUserData) {
      _id
      email
      name
    }
  }
`;

const GET_USER = gql`
  query ($email: String!) {
    getUserByEmail(email: $email) {
      _id
    }
  }
`;

const UserChange = () => {
  const [newName, setNewName] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const userInfo = useSelector((state: IUserInfoRootState | any) => {
    return state.userInfo.userInformation;
  });
  const [changeUserName] = useMutation(USER_NAME_CHANGE);
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
  const updateUserName = async () => {
    try {
      if (!newName) {
        setError("Enter Valid User Name");
        return;
      }
      const { data } = await changeUserName({
        variables: { id: userId, updateUserData: { name: newName } },
      });
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-5">Change Your Name</h1>

      <div className="flex flex-col items-start justify-start">
        <p className="font-semibold">New name</p>
        <input
          type="text"
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
            setError("");
          }}
          className="border-2 rounded-md mb-5 p-1 border-gray-400"
        />
        {error && (
          <div>
            <h1 className="text-red-500">{error}</h1>
          </div>
        )}
      </div>

      <button
        className="bg-yellow-300 px-3 py-1 shadow-md rounded-md"
        onClick={() => updateUserName()}
      >
        Save Changes
      </button>
    </div>
  );
};

export default UserChange;
