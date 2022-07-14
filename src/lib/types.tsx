
export interface IlocationsData extends Array<IlocationObj>{}

export interface IlocationObj {
  city: string,
  state: string,
  country: string,
  postcode: number,
  streetNumber: number,
  streetName: string,
  latitude: string,
  longitude: string
}

export interface ILocationDataContext {
  data: IlocationsData,
  searchValue: string;
  setSearchValue: Function
}

export interface ItitleCols extends Array<ItitleCol>{}

export interface ItitleCol {
  title: string,
  sorted: string
}
