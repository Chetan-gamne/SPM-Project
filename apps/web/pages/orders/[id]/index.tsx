import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext, NextPage } from "next";
import axios from "axios";
import OrderCMP from "../../../components/order";

const index = ({ id }) => {
  const [order, setOrder] = useState({});
  useEffect(() => {
    const fetchOrder = async () => {
      const response = await axios.get(`http://localhost:3001/order/${id}`);
      console.log(response.data);
      setOrder(response.data);
    };
    fetchOrder();
  }, []);

  if (!order) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <OrderCMP src={order} />
    </div>
  );
};

export default index;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params;
  return {
    props: {
      id,
    },
  };
}
