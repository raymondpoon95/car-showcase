import { CarCard, CustomFilter, Hero, SearchBar } from "@/components";

import { fetchCars } from "@/utils";
import { fuels, yearsOfProduction } from "@/constants";

export default async function Home({ searchParams }: any) {
  const { manufacturer, year, fuel, model } = await searchParams;

  const { data: allCars, error } = await fetchCars({
    manufacturer: manufacturer || "",
    year: year || 2022,
    fuel: fuel || "",
    model: model || "",
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="padding-x padding-y max-width mt-12" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Card Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => <CarCard key={car.model} car={car} />)}
            </div>
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-xl font-bold text-black">Oops. No results</h2>
            <p>{error}</p>
          </div>
        )}
      </div>
    </main>
  );
}
