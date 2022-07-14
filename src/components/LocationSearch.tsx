import {useContext, useState} from "react";
import {LocationDataContext} from "../App";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
  input {
    width: 80%;
    padding: 1em;
    font-size: 20px;
  }
  button {
    margin-left: -120px;
    background: none;
    outline: none;
    border: none;
    font-weight: bold;
    font-size: 1em;
    cursor: pointer;
  }
`;

export default function LocationSearch() {
  const { searchValue, setSearchValue } = useContext(LocationDataContext);
  return (
    <InputContainer>
      <input
        value={searchValue}
        onChange={(e) => {
          setSearchValue(() => e.target.value.toLowerCase());
        }}
      />
      { searchValue.length > 0 &&
        <button onClick={() => setSearchValue(() => "")}>
          Clear search
        </button>
      }
    </InputContainer>
  );
}