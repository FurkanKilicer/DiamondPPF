"use client";

import { useState } from "react";
import { ServicesCatalog } from "@/features/services/services-catalog";
import { ServicesHero } from "@/features/services/services-hero";
import { ServicesNav } from "@/features/services/services-nav";
import { ServicesQuote } from "@/features/services/services-quote";
import {
  brandVehicleValue,
  defaultServiceBrand,
  serviceBrands,
} from "@/lib/mock-data/services";

export function ServicesView() {
  const [brandId, setBrandId] = useState<string>(defaultServiceBrand.id);
  const [vehicle, setVehicle] = useState(brandVehicleValue(defaultServiceBrand));

  function onBrand(id: string) {
    const brand = serviceBrands.find((item) => item.id === id) ?? defaultServiceBrand;
    setBrandId(brand.id);
    setVehicle(brandVehicleValue(brand));
  }

  return (
    <>
      <ServicesHero brandId={brandId} onBrand={onBrand} />
      <ServicesNav />
      <ServicesCatalog />
      <ServicesQuote vehicle={vehicle} onVehicleChange={setVehicle} />
    </>
  );
}
