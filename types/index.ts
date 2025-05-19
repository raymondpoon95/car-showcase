import { Dispatch, MouseEventHandler, SetStateAction } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  textStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  rightIcon?: string;
  isDisabled?: boolean;
}

export interface CustomFilterProps {
  title: string;
  options: {
    title: string;
    value: string;
  }[];
}

export interface SearchManufacturerProps {
  manufacturer: string;
  setManufacturer: (manufacturer: string) => void;
}

export interface CarProps {
  city_mpg: number;
  class: string;
  combination_mpg: string;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: string;
  make: string;
  model: string;
  transmission: string;
  year: number;
  message?: string;
}

export interface CarCardProps {
  car: CarProps;
}

export interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

export interface FilterProps {
  manufacturer?: string;
  year?: string;
  model?: string;
  fuel?: string;
}
