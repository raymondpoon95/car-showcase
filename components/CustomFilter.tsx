"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CustomFilterProps } from "@/types";
import { updateSearchParams } from "@/utils";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";

export const CustomFilter = ({ title, options }: CustomFilterProps) => {
  const [selected, setSelected] = useState(options[0]);
  const router = useRouter();

  const handleUpdatedParams = (e: { title: string; value: string }) => {
    console.log(title);
    const newPathName = updateSearchParams(title, e.value);

    router.push(newPathName, { scroll: false });
  };

  return (
    <div className="w-fit">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          handleUpdatedParams(e);
        }}
      >
        <div className="relative z-10 w-fit">
          <ListboxButton className="custom-filter__btn">
            <span className="block truncate">{selected.title}</span>
            <Image
              src="/chevron-up-down.svg"
              alt="chevron"
              width={20}
              height={20}
              className="ml-4 object-contain"
            />
          </ListboxButton>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="custom-filter__options">
              {options.map((option) => (
                <ListboxOption
                  key={option.title}
                  value={option}
                  className={({ focus }) =>
                    `relative cursor-default px-4 py-2 select-none ${focus ? "bg-primary-blue text-white" : "text-gray-900"}`
                  }
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                    >
                      {option.title}
                    </span>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
