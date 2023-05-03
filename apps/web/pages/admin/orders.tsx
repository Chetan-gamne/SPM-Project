import type { GetServerSideProps, NextPage } from "next";
import { Orders } from "../../lib/types/products";
import client from "../../services/apollo-client";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from 'next/link';

const Orders_QUERY = gql`
query{
    orders{
      user_id
      address
      contact_info
      amount
      transaction_id
    }
  }
`;
const hello: NextPage<{
  Orders: Orders[];
}> = ({ Orders }) => {
  const [OrdersData, setOrdersData] = useState(Orders);
  const filterState = useSelector((state: any) => state.filter);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await client.query({
        query: Orders_QUERY,
        variables: { options: filterState },
      });
      setOrdersData(data.orders);
      console.log(data);
    };
    fetchData();
  }, [filterState]);
  console.log(filterState);
  console.log(Orders);
  return (
  <div>
    
    < div >
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Contact Info
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {OrdersData.map((product) => (
                  <tr key={product.user_id}>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.user_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.contact_info}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${product.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div >
  </div>
  );
};

export default hello;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const Orders_QUERY = gql`
  query{
    orders{
      user_id
      address
      contact_info
      amount
      transaction_id
    }
  }
  `;
  try {
    const { loading, data, error } = await client.query({
      query: Orders_QUERY,
    });
    console.log(error)
    if (error || !data) {
      return { notFound: true };
    }
    return {
      props: {
        Orders: data.orders,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};
