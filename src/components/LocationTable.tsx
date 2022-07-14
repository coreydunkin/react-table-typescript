import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {LocationDataContext} from "../App";
import {IlocationObj, IlocationsData} from "../lib/types";

// Set up the table to be scrollable on smaller widths
const Table = styled.table`
  width: 100%;
  border-collapse: collapse; 
  td, th {
    border: 1px solid #cccccc;
    padding: 8px;
    font-size: 16px;
  }
`;

const TableHeader = styled.th`
  background: aliceblue;
  padding: 1em;
  cursor: pointer;
`;

const MainWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 0 30px;
  box-sizing: border-box;
`;

const ResponsiveTable = styled.div`
  display: inline-block;
  min-width: 100%;
  box-sizing: border-box;
`;



export default function LocationTable() {
  const locationFields = useContext(LocationDataContext);
  const [locations, setLocations] = useState<IlocationsData[]>([]);
  const [sortedText, setSortedText] = useState("UNSORTED");

  useEffect(() => {
    return setLocations(locationFields.data);
  }, []);
  const getFilteredRows = (rows: any, key: string) => {
    return rows.filter((row: any) => JSON.stringify(row).toLowerCase().includes(String(key)));
  };
  
  const sortColumn = (colName: any) => {
    const newLocations = [...locations];
    newLocations.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {
      const valueA = a[colName];
      const valueB = b[colName];

      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });
    setLocations(newLocations);
  };

  return (
    <MainWrapper>
      <ResponsiveTable>
        <Table>
          <thead>
          <tr>
            {
              locations[0] && Object.keys(locations[0]).map((title, i) => (
                <TableHeader key={i} onClick={() => sortColumn(title)}>
                  <span>{title}</span>
                  <span>{sortedText}</span>
                </TableHeader>
              ))
            }
          </tr>
          </thead>
          <tbody>
          {locations && getFilteredRows(locations, locationFields.searchValue).map((loc: IlocationObj, id: number) => (
            <tr key={id}>
              {Object.values(loc).map((locValue: string | number) => (
                <td>{locValue}</td>
              ))}
            </tr>
          ))}
          </tbody>
        </Table>
      </ResponsiveTable>
    </MainWrapper>
  );
}
