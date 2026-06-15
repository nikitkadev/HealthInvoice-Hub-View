import { create } from "zustand";
import type { DeffectDto, KsgHmpCategoryDataDto, MedDevs, NazNaprCategoryDto, SankDto, ServicesDto } from "./types";

interface RControlCategoriesStore {
    selectedService: ServicesDto | null;
    services: ServicesDto[];
    medDevs: MedDevs[];
    ksgHmpCategoryData: KsgHmpCategoryDataDto | null;
    nazNaprCategoryData: NazNaprCategoryDto | null;
    deffects: DeffectDto[];
    sanks: SankDto[];

    deffectsTablePagination: {
        currentPage: number;
        pageSize: number;
        totalPages: number;
        totalItems: number;
    },

    isLoading: {
        deffects: boolean;
        sanks: boolean;
    };

    setSelectedService: (service: ServicesDto) => void;
    setServices: (services: ServicesDto[]) => void;
    setMedDevs: (medDevs: MedDevs[]) => void;
    setKsgHmpData: (data: KsgHmpCategoryDataDto) => void;
    setNazNaprCategoryData: (data: NazNaprCategoryDto) => void;
    setDeffects: (data: DeffectDto[]) => void;
    setSanks: (data: SankDto[]) => void;
    setDeffectsTablePagination: (pagination: Partial<RControlCategoriesStore['deffectsTablePagination']>) => void;
    resetPagination: () => void;
    deffectsTableGoToPage: (page: number) => void;
    setLoading: (key: keyof RControlCategoriesStore['isLoading'], value: boolean) => void;
}

export const useRControlCategoriesStore = create<RControlCategoriesStore>((set) => ({
    selectedService: null,
    services: [],
    medDevs: [],
    ksgHmpCategoryData: null,
    nazNaprCategoryData: null,
    deffects: [],
    sanks: [],

    deffectsTablePagination: {
        currentPage: 1,
        pageSize: 20,
        totalItems: 0,
        totalPages: 1
    },

    isLoading: {
        deffects: false,
        sanks: false
    },

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
    }),

    setNazNaprCategoryData: (data) => set({
        nazNaprCategoryData: data
    }),

    setDeffects: (data) => set({
        deffects: data
    }),

    setSanks: (data) => set({
        sanks: data
    }),

    setDeffectsTablePagination: (newPaginationState) => set((state) => ({
        deffectsTablePagination: { ...state.deffectsTablePagination, ...newPaginationState }
    })),

    resetPagination: () => set({
        deffectsTablePagination: {
            currentPage: 1,
            pageSize: 20,
            totalItems: 0,
            totalPages: 1
        }
    }),

    deffectsTableGoToPage: (page) => set((state) => ({
        deffectsTablePagination: { ...state.deffectsTablePagination, currentPage: page }
    })),

    setLoading: (key, value) => set((state) => ({
        isLoading: { ...state.isLoading, [key]: value }
    }))

}));