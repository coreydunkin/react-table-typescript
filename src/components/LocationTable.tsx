import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {LocationDataContext} from "../App";
import {IlocationObj, IlocationsData, ItitleCol, ItitleCols} from "../lib/types";
import {toTitleCase} from "../utils/toTitleCase";

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
  position: relative;

  span {
    display: block;
    &:nth-child(1) {
      margin-bottom: 10px;
    }
  }

  &.ascending, &.descending {
    &:before {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 1.5em;
    }
  }

  &.ascending {
    background: #7fd2d2;

    &:before {
      content: "↑";
    }
  }

  &.descending {
    background: #eac4c4;

    &:before {
      content: "↓";
    }
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
  const [locations, setLocations] = useState<IlocationsData>([] as IlocationsData);
  const [sortedColState, setSortedColState] = useState<ItitleCols>([] as ItitleCols);
  const [sort, setSort] = useState({ colName: "", direction: "desc" });

  useEffect(() => {
    setLocations(data);
    getSorted(data[0]);
  }, []);

  // Filter the rows based on search value
  const getFilteredRows = (rows: IlocationsData, key: string) => {
    return rows.filter((row: IlocationObj) => JSON.stringify(row).toLowerCase().includes(String(key)));
  };

  // Build out the sorted/unsorted titles
  const getSorted = (header: IlocationObj) => {
    let sortedElems: ItitleCols = [];
    Object.keys(header).map((title) => {
      sortedElems.push({"title": title, "sorted": "unsorted"});
    });
    setSortedColState(sortedElems);
  }

  // Sort the column into descending or ascending order, and pass the sorted/unsorted text value
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
  function TitleItem(col: { Elems: ItitleCols }) {
    const elem = col.Elems;
    return <>
      {elem.map((titleElem: ItitleCol, i: number) =>
      <TableHeader className={titleElem.sorted} key={i} onClick={() => sortColumn(titleElem.title, i)}>
        <span>{toTitleCase(titleElem.title)}</span>
        <span>{titleElem.sorted.toUpperCase()}</span>
      </TableHeader>
      )}
    </>
  }

  return (
    <MainWrapper>
      <ResponsiveTable>
        <Table>
          <thead>
          <tr>
            <TitleItem Elems={sortedColState as ItitleCols} />
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
