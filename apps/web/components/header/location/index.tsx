import React, { useEffect, useState } from "react";
import { GrLocation } from "react-icons/gr";
import Modal from "../../Modal/index";
import AutoFill from "./AutoFIll";
const Child1 = () => {
  return (
    <div className="flex cursor-pointer items-center mx-2 hover:border-2 border-black rounded-md p-2">
      <GrLocation size={25} />
      <div className="md:flex flex-col text-left ml-2 text-[0.7rem] hidden">
        <p>
          Deliver To <span className="font-extrabold">Chetan</span>
        </p>
        <p>Nashik 422009</p>
      </div>
    </div>
  );
};
const Child2 = () => {
  const [location, setLocation] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [address, setAddress] = useState<any>(null);
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        setError("Unable to retrieve your location");
      }
    );
  }, []);
  // pk.48e8fd3524ebfeee9bb1971bda2e7995
  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location;

      fetch(
        `https://us1.locationiq.com/v1/reverse?key=pk.48e8fd3524ebfeee9bb1971bda2e7995&lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&namedetails=1`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setAddress(data?.display_name);
        })
        .catch(() => {});
    }
  }, [location]);
  return (
    <div>
      {address && <p>{address}</p>}
      {error && <p>{error}</p>}
      <hr />
      <AutoFill />
    </div>
  );
};
const Location = () => {
  return (
    <div>
      <Modal>
        <Child1 />
        <Child2 />
      </Modal>
    </div>
  );
};

export default Location;
