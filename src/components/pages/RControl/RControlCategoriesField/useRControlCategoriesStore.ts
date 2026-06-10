import { create } from "zustand";
import type { MedDevs, ServicesDto } from "./types";

interface RControlCategoriesStore {
    selectedService: ServicesDto | null;
    services: ServicesDto[];
    medDevs: MedDevs[];

    setSelectedService: (service: ServicesDto) => void;
    setServices: (services: ServicesDto[]) => void;
    setMedDevs: (medDevs: MedDevs[]) => void;
}

export const useRControlCategoriesStore = create<RControlCategoriesStore>((set) => ({
    selectedService: null,
    services: [],
    medDevs: [],

    setSelectedService: (service) => set({
        selectedService: service
    }),

    setServices: (services) => set({
        services: services
    }),

    setMedDevs: (medDevs) => set({
        medDevs: medDevs
    })

}));
