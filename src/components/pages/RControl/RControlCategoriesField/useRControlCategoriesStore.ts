import { create } from "zustand";
import type { DefectDto, InjData, KsgHmpCategoryDataDto, LekPrDto, MedDevs, NazNaprCategoryDto, OnkAdditionalData, OnkSluchDto, OnkUslDto, SankDto, ServicesDto } from "./types";

interface RControlCategoriesStore {
    selectedService: ServicesDto | null;
    selectedOnkService: OnkUslDto | null;
    selectedLekPr: LekPrDto | null;
    services: ServicesDto[];
    medDevs: MedDevs[];
    ksgHmpCategoryData: KsgHmpCategoryDataDto | null;
    nazNaprCategoryData: NazNaprCategoryDto | null;
    onkSluch: OnkSluchDto | null;
    defects: DefectDto[];
    sanks: SankDto[];
    onkAdditionalInformation: OnkAdditionalData | null;
    lekPrs: LekPrDto[];
    InjData: InjData | null;

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
        lekPr: boolean;
        inj: boolean;
    };

    setSelectedService: (service: ServicesDto) => void;
    setSelectedOnkService: (service: OnkUslDto) => void;
    setSelectedLekPr: (lekPr: LekPrDto) => void;
    setServices: (services: ServicesDto[]) => void;
    setMedDevs: (medDevs: MedDevs[]) => void;
    setKsgHmpData: (data: KsgHmpCategoryDataDto) => void;
    setNazNaprCategoryData: (data: NazNaprCategoryDto) => void;
    setOnkSluch: (data: OnkSluchDto) => void;
    setDefects: (data: DefectDto[]) => void;
    setSanks: (data: SankDto[]) => void;
    setOnkAdditionalData: (data: OnkAdditionalData) => void;
    setLekPrs: (data: LekPrDto[]) => void;
    setInjData: (data: InjData) => void;
    setDefectsTablePagination: (pagination: Partial<RControlCategoriesStore['defectsTablePagination']>) => void;
    resetPagination: () => void;
    defectsTableGoToPage: (page: number) => void;
    setLoading: (key: keyof RControlCategoriesStore['isLoading'], value: boolean) => void;
}

export const useRControlCategoriesStore = create<RControlCategoriesStore>((set) => ({
    selectedService: null,
    selectedOnkService: null,
    selectedLekPr: null,
    services: [],
    medDevs: [],
    ksgHmpCategoryData: null,
    nazNaprCategoryData: null,
    onkSluch: null,
    defects: [],
    sanks: [],
    onkAdditionalInformation: null,
    lekPrs: [],
    InjData: null,

    defectsTablePagination: {
        currentPage: 1,
        pageSize: 20,
        totalItems: 0,
        totalPages: 1
    },

    isLoading: {
        defects: false,
        sanks: false,
        additional: false,
        lekPr: false,
        inj: false
    },

    setSelectedService: (service) => set({
        selectedService: service
    }),

    setSelectedOnkService: (onkService) => set({
        selectedOnkService: onkService
    }),

    setSelectedLekPr: (lekPr) => set({
        selectedLekPr: lekPr
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

    setLekPrs: (data) => set({
        lekPrs: data
    }),

    setInjData: (data) => set({
        InjData: data
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