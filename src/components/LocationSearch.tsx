import {useContext, useState} from "react";
import {LocationDataContext} from "../App";

export default function LocationSearch() {
  const { searchValue, setSearchValue } = useContext(LocationDataContext);
  return (
    <input
      value={searchValue}
      onChange={(e) => {
        setSearchValue(() => e.target.value);
      }}
    />
  );
}