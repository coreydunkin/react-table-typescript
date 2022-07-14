import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import LocationTable from "./components/LocationTable";
import LocationSearch from "./components/LocationSearch";
import {getLocations} from "./utils/getLocations";
import {IlocationsData} from "./lib/types";

export const LocationDataContext = React.createContext({
  data: [] as IlocationsData[],
  searchValue: "",
  setSearchValue: (p: () => string) => {}
});

function App() {
  const [data, setData] = useState<IlocationsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const value = {data, searchValue, setSearchValue};

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await axios("https://randomuser.me/api/?results=20")
      .then((response) => {
        // @ts-ignore
        return setData(getLocations(response.data.results.map(({location}) => location)));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <LocationDataContext.Provider value={value}>
      {!loading &&
        <>
          <LocationSearch />
          <LocationTable />
        </>
      }
    </LocationDataContext.Provider>
  );
}

export default App;
