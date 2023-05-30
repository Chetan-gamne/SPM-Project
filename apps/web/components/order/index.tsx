import React from "react";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { TfiLineDashed } from "react-icons/tfi";
import { AiFillCheckSquare } from "react-icons/ai";
import { BiDotsVertical } from "react-icons/bi";
import { GrMoreVertical } from "react-icons/gr";
const index = ({ src }) => {
  // console.log(src.trackOrder);
  let date = new Date(src.date);
  return (
    <div>
      <div className="flex">
        <h1>Thank You For Purchase 🙂 Your Order Will Be Delivered Soon !!!</h1>
        {/* <p>{src.email}</p>
        <p>{src.amount}</p> */}
      </div>
      <hr />
      {/* Track Order UI */}
      <div className="my-4">
        <div className="flex md:flex-row">
          <div className="flex-[0.5]">
            {src.trackOrder &&
              Object.keys(src?.trackOrder).map((track, index) => {
                const len = Object.keys(src.trackOrder).length;
                return (
                  <div className="">
                    <div className="flex items-center">
                      {src.trackOrder[track] ? (
                        <AiFillCheckSquare size={30} color="Green" />
                      ) : (
                        <AiOutlineCheckSquare size={30} />
                      )}
                      <p>{track}</p>
                    </div>
                    {index !== len - 1 && (
                      <div className="flex flex-col justify-center">
                        <GrMoreVertical size={30} />
                        <GrMoreVertical size={30} />
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
          <div className="flex-[0.5]">
            <h1>{src._id}</h1>
            <h1>{date.toLocaleDateString()}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
