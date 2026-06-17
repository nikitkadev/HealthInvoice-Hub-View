import { create } from "zustand";
import type { DefectDto, KsgHmpCategoryDataDto, MedDevs, NazNaprCategoryDto, OnkAdditionalData, OnkSluchDto, SankDto, ServicesDto } from "./types";

interface RControlCategoriesStore {
    selectedService: ServicesDto | null;
    services: ServicesDto[];
    medDevs: MedDevs[];
    ksgHmpCategoryData: KsgHmpCategoryDataDto | null;
    nazNaprCategoryData: NazNaprCategoryDto | null;
    onkSluch: OnkSluchDto | null;
    defects: DefectDto[];
    sanks: SankDto[];
    onkAdditionalInformation: OnkAdditionalData | null;

    defectsTablePagination: {
        currentPage: number;
        pageSize: number;
        totalPages: number;
        totalItems: number;
    },

    isLoading: {
        defects: boolean;
        sanks: boolean;
        additional: boolean;
    };

    setSelectedService: (service: ServicesDto) => void;
    setServices: (services: ServicesDto[]) => void;
    setMedDevs: (medDevs: MedDevs[]) => void;
    setKsgHmpData: (data: KsgHmpCategoryDataDto) => void;
    setNazNaprCategoryData: (data: NazNaprCategoryDto) => void;
    setOnkSluch: (data: OnkSluchDto) => void;
    setDefects: (data: DefectDto[]) => void;
    setSanks: (data: SankDto[]) => void;
    setOnkAdditionalData: (data: OnkAdditionalData) => void;
    setDefectsTablePagination: (pagination: Partial<RControlCategoriesStore['defectsTablePagination']>) => void;
    resetPagination: () => void;
    defectsTableGoToPage: (page: number) => void;
    setLoading: (key: keyof RControlCategoriesStore['isLoading'], value: boolean) => void;
}

export const useRControlCategoriesStore = create<RControlCategoriesStore>((set) => ({
    selectedService: null,
    services: [],
    medDevs: [],
    ksgHmpCategoryData: null,
    nazNaprCategoryData: null,
    onkSluch: null,
    defects: [],
    sanks: [],
    onkAdditionalInformation: null,

    defectsTablePagination: {
        currentPage: 1,
        pageSize: 20,
        totalItems: 0,
        totalPages: 1
    },

    isLoading: {
        defects: false,
        sanks: false,
        additional: false
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

    setOnkSluch: (data) => set({
        onkSluch: data
    }),

    setDefects: (data) => set({
        defects: data
    }),

    setSanks: (data) => set({
        sanks: data
    }),

    setOnkAdditionalData: (data) => set({
        onkAdditionalInformation: data
    }),

    setDefectsTablePagination: (newPaginationState) => set((state) => ({
        defectsTablePagination: { ...state.defectsTablePagination, ...newPaginationState }
    })),

    resetPagination: () => set({
        defectsTablePagination: {
            currentPage: 1,
            pageSize: 20,
            totalItems: 0,
            totalPages: 1
        }
    }),

    defectsTableGoToPage: (page) => set((state) => ({
        defectsTablePagination: { ...state.defectsTablePagination, currentPage: page }
    })),

    setLoading: (key, value) => set((state) => ({
        isLoading: { ...state.isLoading, [key]: value }
    }))

}));