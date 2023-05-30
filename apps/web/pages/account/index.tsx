import Link from "next/link";
import { AiFillLock } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { FaBoxOpen } from "react-icons/fa";
const index = () => {
  return (
    <div className="max-w-4xl m-auto">
      <h1 className="text-3xl font-bold">Your Account</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]">
        <Link href={`/account/user`}>
          <div className="p-3 flex m-2 max-w-md items-center border-2 border-gray-300 rounded-md bg-white cursor-pointer hover:bg-gray-50">
            <div className="mr-2">
              <AiFillLock size={30} />
            </div>
            <div>
              <p className="text-lg font-bold">Login & Security</p>
              <p className="text-sm">Edit login, name, mobile number</p>
            </div>
          </div>
        </Link>
        <Link href={`/account/address`}>
          <div className="p-3 flex m-2 max-w-md items-center border-2 border-gray-300 rounded-md bg-white cursor-pointer hover:bg-gray-50">
            <div className="mr-2">
              <IoLocationSharp size={30} />
            </div>
            <div>
              <p className="text-lg font-bold">Your Address</p>
              <p className="text-sm">Edit address for orders</p>
            </div>
          </div>
        </Link>
        <Link href={`/orders`}>
          <div className="p-3 flex  m-2 max-w-md items-center border-2 border-gray-300 rounded-md bg-white cursor-pointer hover:bg-gray-50">
            <div className="mr-2">
              <FaBoxOpen size={30} />
            </div>
            <div>
              <p className="text-lg font-bold">Your Orders</p>
              <p className="text-sm ">Track, return, or buy things again</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default index;
