import axios from "axios";
import React, { useEffect, useState } from "react";
import { debounce } from "../../../debounce";

const index = () => {
  const [searchStr, setSearchStr] = useState("");
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const fetchLocations = debounce(async () => {
      try {
        if (!searchStr) {
          return;
        }
        const res = await axios.get(
          `https://api.locationiq.com/v1/autocomplete?key=pk.48e8fd3524ebfeee9bb1971bda2e7995&q=${searchStr}&zoom=18&countrycodes=IN&matchquality=1&limit=5`
        );
        setLocations(res.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }, 1000);
    fetchLocations();
    () => {
      setSearchStr("");
      setLocations([]);
    };
  }, [searchStr]);
  return (
    <div>
      <input
        type="text"
        value={searchStr}
        className="border-2 border-gray-400 w-full my-3 rounded-md p-2"
        onChange={(e) => setSearchStr(e.target.value)}
        placeholder="Choose Your Location"
      />
      <div>
        {locations &&
          locations.map((location: any, index: number) => {
            return (
              <div
                className="w-full my-2 cursor-pointer"
                key={location.place_id}
              >
                {location?.display_name}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default index;
