import axios from "axios";
import React, { useState } from "react";

const index: React.FC<any> = ({ address, setAddress }) => {
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setError("");
    const { name, value } = e.target;
    setAddress((prevAddress: any) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const autoFill = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const res = await axios.get(
          `https://us1.locationiq.com/v1/reverse?key=pk.48e8fd3524ebfeee9bb1971bda2e7995&lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&namedetails=1`
        );
        console.log(res);
        Object.keys(res.data.address).map((key) => {
          setAddress((prev: any) => ({
            ...prev,
            [key]: res.data.address[key],
          }));
        });
      },
      (error) => {
        setError("Unable to retrieve your location");
      }
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Enter Your Address</h1>
      <div className="bg-[#e4fafe] px-3 py-2 rounded-md shadow-md mb-4 flex items-center justify-between border-2 border-blue-300">
        <p className="text-md font-bold">Autofill your current location.</p>
        <button
          className="bg-white px-3 rounded-md shadow-md text-md py-1 font-medium"
          onClick={autoFill}
        >
          AutoFill
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <form action="">
        <div className="mb-4">
          <label htmlFor="country" className="block mb-2 font-medium">
            Country/Region
          </label>
          <input
            type="text"
            name="country"
            value={address.country}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="uname" className="block mb-2 font-medium">
            Full name (First and Last name)
          </label>
          <input
            type="text"
            name="uname"
            value={address.uname}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block mb-2 font-medium">
            Mobile number
          </label>
          <input
            name="phoneNumber"
            type="tel"
            value={address.phoneNumber}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pincode" className="block mb-2 font-medium">
            Pincode
          </label>
          <input
            type="text"
            name="postcode"
            value={address.postcode}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="flatNumber" className="block mb-2 font-medium">
            Flat, House no., Building, Company, Apartment
          </label>
          <input
            type="text"
            name="flatNumber"
            value={address.flatNumber}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="village" className="block mb-2 font-medium">
            Area, Street, Sector, Village
          </label>
          <input
            type="text"
            name="village"
            value={address.village}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="landMark" className="block mb-2 font-medium">
            Landmark
          </label>
          <input
            type="text"
            name="landMark"
            value={address.landMark}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block mb-2 font-medium">
            Town/City
          </label>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="state" className="block mb-2 font-medium">
            State
          </label>
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default index;
