import type { GetServerSideProps, NextPage } from "next";
//import { client } from "../../lib/client";
import { IUser } from "../../lib/types/user";
import client from "../../services/apollo-client";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const USER_QUERY = gql`
query  {
    users {
      name
      email
      phone

    }
  }
`;
const users: NextPage<{
  users: IUser[];
}> = ({ users }) => {
  const [usersData, setusersData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await client.query({
        query: USER_QUERY,
     
      });
      setusersData(data.getUsers);
      console.log(data);
    };
    fetchData();
  }, []);
  console.log(users);
  return (
    <div>
      {/* <ProductList productList={usersData} />{" "} */}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
          {users.map((item) => (
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.name}
              </th>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.email}
              </th>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.phone}
              </th>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default users;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const USER_QUERY = gql`
  query  {
    users{
      name
      email
      phone
    }
  }
  `;
  try {
    const { loading, data, error } = await client.query({
      query: USER_QUERY,
    });
    console.log(error)
    if (error || !data) {
      return { notFound: true };
    }
    return {
      props: {
        users: data.users,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};