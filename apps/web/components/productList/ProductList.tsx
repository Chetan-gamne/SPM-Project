import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { SProduct } from "../../lib/types/products";
import Card from "../UI/card/Card";
import Sort from "./Sort";
interface Props {
  productList: SProduct[];
}
const ProductList: React.FC<Props> = ({ productList }) => {
  const { t } = useLanguage();
  return (
    <div>
      <div className="w-full xl:max-w-[2100px] mx-auto">
        <Sort />
        {productList && productList.length ? (
          <div>
            <div className="grid gap-4 md:gap-2 grid-cols-6 md:grid-cols-12">
              {productList.map((product: any, index) => {
                return <Card key={`index-${index}`} product={product} />;
              })}
            </div>
          </div>
        ) : (
          <p className="text-palette-mute text-center mt-8">{t.noProduct}</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
