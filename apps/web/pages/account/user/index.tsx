import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import client from "../../../services/apollo-client";
import { useSelector } from "react-redux";
import { IUserInfoRootState } from "../../../lib/types/user";
import Modal from "../../../components/Modal";
import UserChange from "../../../components/User/UserChange";
import UserEmailChange from "../../../components/User/UserEmailChange";

const userQuery = gql`
  query ($email: String!) {
    getUserByEmail(email: $email) {
      _id
      name
      roles
      email
      idpId
      idpService
      phone
    }
  }
`;

const index = () => {
  const [user, setUser] = useState({});

  const userInfo = useSelector((state: IUserInfoRootState | any) => {
    return state.userInfo.userInformation;
  });
  useEffect(() => {
    const fetchData = async () => {
      console.log(userInfo?.me?.email);
      if (userInfo) {
        try {
          const { data, error } = await client.query({
            query: userQuery,
            variables: { email: userInfo?.me?.email },
          });
          if (error) {
            throw error;
          }
          setUser(data.getUserByEmail);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [userInfo]);
  if (!userInfo) {
    return <div>Loading...</div>;
  }
  return (
    <div className="max-w-3xl m-auto ">
      <div className="">
        <h1 className="text-2xl">Login & Security </h1>
      </div>
      <div className="bg-white rounded-lg">
        <div className="flex justify-between items-center p-3 border-2 border-gray-200">
          <div>
            <label className="text-md font-bold">Name:</label>
            <p className="text-sm">{user?.name}</p>
          </div>
          <div>
            <Modal>
              <h1 className="">Edit</h1>
              <UserChange />
            </Modal>
          </div>
        </div>
        <div className="flex justify-between items-center p-3 border-2 border-gray-200">
          <div>
            <label className="text-md font-bold">Email:</label>
            <p className="text-sm">{user?.email}</p>
          </div>
          <div>
            <Modal>
              <h1>Edit</h1>
              <UserEmailChange />
            </Modal>
          </div>
        </div>
        <div className="flex justify-between items-center p-3 border-2 border-gray-200">
          <div>
            <label className="text-md font-bold">Primary Phone Number:</label>
            <p className="text-sm">{user?.phone}</p>
          </div>
          <div>
            <h1>Edit</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
