export interface IlocationsData {
  data: IlocationObj[] | null
}

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
