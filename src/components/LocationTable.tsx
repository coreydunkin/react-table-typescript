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
  span {
    display: block;
  }
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
  const { data, searchValue } = useContext(LocationDataContext);
  const [locations, setLocations] = useState<IlocationsData[]>([]);
  const [sortedColState, setSortedColState] = useState<any>([]);
  const [sort, setSort] = useState({ colName: "", direction: "desc" });


  useEffect(() => {
    setLocations(data);
    getSorted(data[0]);
  }, []);

  // Filter the rows based on search value
  const getFilteredRows = (rows: any, key: string) => {
    return rows.filter((row: any) => JSON.stringify(row).toLowerCase().includes(String(key)));
  };

  // Build out the sorted/unsorted titles
  const getSorted = (header: any) => {
    let sortedElems: any[] = [];
    Object.keys(header).map((title) => {
      sortedElems.push({"title": title, "sorted": "unsorted"});
    });
    setSortedColState(sortedElems);
  }

  const sortColumn = (colName: string, colIndex: number) => {
    const newLocations = [...locations];
    // Sort the direction of the column
    const direction = sort.colName ? sort.direction === "ascending"
        ? "descending"
        : "ascending"
      : "descending";
    newLocations.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {
      const valueA = a[colName];
      const valueB = b[colName];

      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });
    // If the direction is already descending, reverse it
    if (direction === "descending") {
      newLocations.reverse();
    };
    setLocations(newLocations);
    setSort({ colName, direction });
    // Finally, set the sorted column title in descending/ascending
    let newSortedCol = sortedColState;
    newSortedCol.forEach((col: { sorted: string; }) => {
      col.sorted = "unsorted";
    });
    newSortedCol[colIndex].sorted = direction;
    setSortedColState(newSortedCol)
  };

  // Build out the title item
  function TitleItem(col: any) {
    const elem = col.Elems;
    const colItems = elem.map((titleElem: any, i: number) =>
      <TableHeader key={i} onClick={() => sortColumn(titleElem.title, i)}>
        <span>{titleElem.title}</span>
        <span>{titleElem.sorted}</span>
      </TableHeader>
    );
    return colItems;
  }

  return (
    <MainWrapper>
      <ResponsiveTable>
        <Table>
          <thead>
          <tr>
            <TitleItem Elems={sortedColState} />
          </tr>
          </thead>
          <tbody>
          {locations && getFilteredRows(locations, searchValue).map((loc: IlocationObj, id: number) => (
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
