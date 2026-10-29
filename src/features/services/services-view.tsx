"use client";

import { useState } from "react";
import { ServicesHero } from "@/features/services/services-hero";
import { ServicesQuote } from "@/features/services/services-quote";
import {
  brandVehicleValue,
  defaultServiceBrand,
  serviceBrands,
} from "@/lib/mock-data/services";

export function ServicesView({ children }: { children: React.ReactNode }) {
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
      {children}
      <ServicesQuote vehicle={vehicle} onVehicleChange={setVehicle} />
    </>
  );
}
