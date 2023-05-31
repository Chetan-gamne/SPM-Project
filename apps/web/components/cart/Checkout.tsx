import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { IUserInfoRootState } from "../../lib/types/user";
import { ICartRootState } from "../../lib/types/cart";
import { cartActions } from "../../store/cart-slice";
import { StripeCardElement } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { BsCurrencyRupee } from "react-icons/bs";
import Address from "../Address";
const CARD_OPTIONS = {
  iconStyle: "solid" as const,
  hidePostalCode: true,
  style: {
    base: {
      // iconColor: "#c4f0ff",
      color: "black",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        // color: "#87bbfd",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};
const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const userInfo: any = useSelector((state: IUserInfoRootState) => {
    return state.userInfo.userInformation;
  });
  const totalAmount = useSelector(
    (state: ICartRootState) => state.cart.totalAmount
  );
  const totalQuantity = useSelector(
    (state: ICartRootState) => state.cart.totalQuantity
  );

  const items = useSelector((state: ICartRootState) => state.cart.items);
  const [address, setAddress] = useState({
    country: "",
    uname: "",
    phoneNumber: "",
    postcode: "",
    flatNumber: "",
    village: "",
    landMark: "",
    city: "",
    state: "",
  });

  function isObjectFilled(obj: {}) {
    for (let key in obj) {
      if (
        obj.hasOwnProperty(key) &&
        (obj[key] === "" || obj[key] === null || obj[key] === undefined)
      ) {
        return false;
      }
    }
    return true;
  }

  const handleOrder = async () => {
    setLoader(true);
    const isAddressFilled = isObjectFilled(address);

    if (!userInfo) {
      setLoader(false);
      toast.warning("Make Sure to login before to checkout", {
        theme: "light",
        autoClose: 4000,
      });
      router.push("/login");
      return;
    }
    if (!isAddressFilled) {
      toast.warning("Make Sure To Enter All Address Details!!", {
        theme: "light",
        autoClose: 4000,
      });
      setLoader(false);
      return;
    }
    let productData = items.map((product) => {
      return {
        product_id: product._id,
        quantity: product.quantity,
      };
    });
    if (!stripe || !elements) {
      setLoader(false);
      return;
    }
    let orderData = {
      productData,
      user_id: userInfo.me?.dbID,
      email: userInfo.me.email,
      phone: userInfo.me?.phone,
      date: Date.now(),
      address: address,
    };
    try {
      console.log(orderData);
      const cardElement = elements.getElement(CardElement);
      const res = await fetch("http://localhost:3001/stripe/payment-intent", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          amount: totalAmount ?? 0,
          orderData: JSON.stringify(orderData),
        }),
      });
      const data = await res.json();
      console.log(data);
      let paymentMethod;
      if (cardElement && cardElement) {
        paymentMethod = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });
      }
      if (paymentMethod?.error) {
        throw new Error("Incomplete Number");
      }
      console.log(paymentMethod);
      const result = await stripe.confirmCardPayment(
        data.clientSecret.client_secret,
        {
          payment_method: paymentMethod?.paymentMethod?.id,
        }
      );
      console.log(result);
      const response = await fetch(
        "http://localhost:3001/stripe/verify-payment",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: result?.paymentIntent?.id }),
        }
      );
      const op = await response.json();
      dispatch(cartActions.clearCart());
      alert("Payment Successfult! Your Order Will Be Delivered Soon!");
      console.log(op);
      router.push("/orders");
    } catch (error) {
      setLoader(false);
      alert("Payment Not Successfult! Make Sure You Enter Valid Card Number");
      console.log(error);
    }
    setLoader(false);
  };

  return (
    <div className="max-w-5xl m-auto bg-white px-3 py-2 rounded-md shadow-md">
      <h1 className="text-center text-3xl font-bold mb-5">Checkout</h1>
      <div className="flex flex-col md:flex-row justify-between ">
        <div className="flex justify-between  mb-2">
          <Address address={address} setAddress={setAddress} />
        </div>
        <div className="h-fit flex-grow sticky bottom-0 left-0 right-0 md:top-36 shadow-lg bg-palette-card border-2 rounded-lg py-4 xl:py-12 px-4 xl:px-8 -mx-[1rem] md:mx-4 xl:mx-8 mt-2 w-[100vw] md:w-auto  md:min-w-[300px] md:max-w-[400px]">
          <div className="mt-5">
            <h1 className="text-xl font-semibold">Payment</h1>
          </div>
          <div className="my-4">
            <CardElement options={CARD_OPTIONS} />
          </div>
          <div className="flex justify-between items-center mt-8">
            <div className="flex flex-col">
              <p>Total Amount:</p>
              <div className="flex items-center">
                <BsCurrencyRupee />
                <p>{totalAmount}</p>
              </div>
            </div>
            <div className="flex-[0.5]">
              <p className="w-full" onClick={handleOrder}>
                <a className="w-full block bg-palette-primary py-3 rounded-lg text-palette-side text-center cursor-pointer  shadow-lg">
                  {loader ? <ClipLoader color="white" size={25} /> : "Order"}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
