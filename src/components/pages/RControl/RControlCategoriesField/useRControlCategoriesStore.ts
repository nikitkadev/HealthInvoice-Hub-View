import { create } from "zustand";
import type { KsgHmpCategoryDataDto, MedDevs, ServicesDto } from "./types";

interface RControlCategoriesStore {
    selectedService: ServicesDto | null;
    services: ServicesDto[];
    medDevs: MedDevs[];
    ksgHmpCategoryData: KsgHmpCategoryDataDto | null;

    setSelectedService: (service: ServicesDto) => void;
    setServices: (services: ServicesDto[]) => void;
    setMedDevs: (medDevs: MedDevs[]) => void;
    setKsgHmpData: (data: KsgHmpCategoryDataDto) => void;
}

export const useRControlCategoriesStore = create<RControlCategoriesStore>((set) => ({
    selectedService: null,
    services: [],
    medDevs: [],
    ksgHmpCategoryData: null,

    setSelectedService: (service) => set({
        selectedService: service
    }),


    setServices: (services) => set({
        services: services
    }),

    setMedDevs: (medDevs) => set({
        medDevs: medDevs
    }),

    setKsgHmpData: (ksgHmpCategoryData) => set({
        ksgHmpCategoryData: ksgHmpCategoryData
    })

}));
