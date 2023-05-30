import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "../../hooks/useLanguage";
import { ICartRootState } from "../../lib/types/cart";
import ProductPrice from "../UI/ProductPrice";
import { changeNumbersFormatEnToFa } from "../../utilities/changeNumbersFormatEnToFa";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

const OrderSummaryBox = () => {
  const { t, locale } = useLanguage();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const userInfo = useSelector((state: IUserInfoRootState) => {
    return state.userInfo.userInformation;
  });
  const totalAmount = useSelector(
    (state: ICartRootState) => state.cart.totalAmount
  );
  const totalQuantity = useSelector(
    (state: ICartRootState) => state.cart.totalQuantity
  );

  const items = useSelector((state: ICartRootState) => state.cart.items);

  console.log(userInfo);

  const handleOrder = async () => {
    setLoader(true);
    if (!userInfo) {
      setLoader(false);
      toast.warning("Make Sure to login before to checkout", {
        theme: "light",
        autoClose: 4000,
      });
      setTimeout(() => {
        router.push("/login");
      }, 3000);
      return;
    }
    router.push("/cart/checkout");
  };

  return (
    <>
      {totalQuantity > 0 ? (
        <div className="flex-grow sticky bottom-0 left-0 right-0 md:top-36 shadow-lg bg-palette-card border-2 rounded-lg py-4 xl:py-12 px-4 xl:px-8 -mx-[1rem] md:mx-4 xl:mx-8 mt-2 w-[100vw] md:w-auto  md:min-w-[300px] md:max-w-[400px]">
          <h3 className="text-md sm:text-lg md:text-xl">{t.orderSummary}</h3>
          <div className="flex flex-col my-1 sm:my-2">
            <div className="flex items-center justify-between md:my-4">
              <p className="text-sm sm:text-base text-palette-mute md:text-palette-base">
                {t.totalQuantity}
              </p>
              <p className="rtl:ml-1 ltr:mr-1 font-bold">
                {locale === "en"
                  ? totalQuantity
                  : changeNumbersFormatEnToFa(totalQuantity)}
              </p>
            </div>
            <div className="flex flex-wrap items-baseline justify-between flex-grow md:my-4">
              <p className="text-sm sm:text-base text-palette-mute md:text-palette-base">
                {t.totalAmount}
              </p>
              <ProductPrice price={totalAmount} />
            </div>
          </div>
          <p onClick={handleOrder}>
            <a className="block bg-palette-primary md:mt-8 py-3 rounded-lg text-palette-side text-center cursor-pointer  shadow-lg">
              {loader ? (
                <ClipLoader color="white" size={25} />
              ) : (
                "Proceed to checkout"
              )}
            </a>
          </p>
        </div>
      ) : (
        <p className="text-palette-mute text-lg mx-auto mt-12">
          {t.cartIsEmpty}
        </p>
      )}
    </>
  );
};

export default OrderSummaryBox;
