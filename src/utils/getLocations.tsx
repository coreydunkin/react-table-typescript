import {IlocationObj} from "../lib/types";
// Sort the location data into a readable array
export const getLocations = (locations: any) => {
  const data: IlocationObj[] = [];
  for (const locData of locations) {
    data.push({
      city: locData.city,
      state: locData.state,
      country: locData.country,
      postcode: locData.postcode,
      streetNumber: locData.street.number,
      streetName: locData.street.name,
      latitude: locData.coordinates.latitude,
      longitude: locData.coordinates.longitude
    });
  }
  return data;
};