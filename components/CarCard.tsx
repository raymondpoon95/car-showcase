"use client";
import { useState } from "react";
import Image from "next/image";

import { CarCardProps } from "@/types";
import { calculateCarRent, generateCarImageUrl } from "@/utils";

import { CustomButton } from "./CustomButton";
import { CarDetails } from "./CarDetails";

export const CarCard = ({ car }: CarCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { cylinders, year, make, model, drive, fuel_type, transmission } = car;

  const carRent = calculateCarRent(cylinders, year);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>

      <p className="mt-6 flex text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">£</span>
        {carRent}
        <span className="self-end text-[14px] font-medium">/per day</span>
      </p>

      <div className="relative my-3 h-40 w-full object-contain">
        <Image
          src={generateCarImageUrl(car)}
          alt="car-model"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="relative mt-2 flex w-full">
        <div className="text-gray flex w-full justify-between group-hover:invisible">
          <div className="flex flex-col items-center justify-center gap-2">
            <Image
              src="/steering-wheel.svg"
              width={20}
              height={20}
              alt="steering-wheel"
            />
            <p className="text-[14px]">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <Image src="/tire.svg" width={20} height={20} alt="tire" />
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <Image src="/gas.svg" width={20} height={20} alt="gas" />
            <p className="text-[14px] capitalize">{fuel_type}</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full py-16 rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </div>
  );
};
