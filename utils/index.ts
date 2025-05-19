import axios, { isAxiosError } from "axios";

import { CarProps, FilterProps } from "@/types";

type FetchCarsResult =
  | { data: CarProps[]; error: null }
  | { data: null; error: string };

export const fetchCars = async (
  filters: FilterProps,
): Promise<FetchCarsResult> => {
  const { manufacturer, model, year, fuel } = filters;

  const headers = {
    "x-rapidapi-key": "abac2104b5mshd1e2b80d25426bap195196jsna3a4c6200b15",
    "x-rapidapi-host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const params = {
    make: manufacturer,
    model,
    year,
    fuel_type: fuel,
  };

  const url = "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars";

  try {
    const response = await axios.get<CarProps[]>(url, {
      headers,
      params,
    });

    return { data: response.data, error: null };
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.message);
      return { data: null, error: error.message };
    }

    return { data: null, error: "Unexpected error occurred" };
  }
};

export const calculateCarRent = (cylinders: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = cylinders * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("http://cdn.imagin.studio/getImage");

  const { make, year, model } = car;

  url.searchParams.append("customer", "img");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathName;
};
