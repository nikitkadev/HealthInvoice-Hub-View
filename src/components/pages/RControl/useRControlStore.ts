import type { CategoryId } from "./RControlCategoriesField/CategoryRenderer/CategoryRenderer";
import type { Case, FinishedCase, InvoiceShortly, SummaryResponse } from "./types";
import { create } from "zustand";

interface RControlStore {

    invoicesData: InvoiceShortly[];
    finishedCasesData: FinishedCase[];
    casesData: Case[];
    invoiceSummary: SummaryResponse | null;

    setInvoiceData: (data: InvoiceShortly[]) => void;
    setFinishedCasesData: (data: FinishedCase[]) => void;
    setCasesData: (data: Case[]) => void;
    setInvoiceSummary: (data: SummaryResponse) => void;

    finishedCasesTablePagination: {
        currentPage: number;
        pageSize: number;
        totalPages: number;
        totalItems: number;
    };

    invoicesTablePagination: {
        currentPage: number;
        pageSize: number;
        totalPages: number;
        totalItems: number;
    };

    filters: { codeMo?: string; year?: number; month?: number };
    globalSearchString: {
        invoices: '',
        finishedCases: ''
    };
    selectedInvoice: InvoiceShortly | null;
    selectedFinishedCase: FinishedCase | null;
    selectedCase: Case | null;
    selectedCategory: CategoryId;

    isLoading: {
        invoices: boolean;
        invoiceSummary: boolean;
        finishedCases: boolean;
        cases: boolean;
        generalMek: boolean;
    };

    setCategory: (selectedCategory: CategoryId) => void;
    setFilters: (filters: Partial<RControlStore['filters']>) => void;
    setSelectedInvoice: (selectedInvoice: InvoiceShortly | null) => void;
    setSelectedFinishedCase: (selectedFinishedCase: FinishedCase | null) => void;
    setSelectedCase: (selectedCase: Case | null) => void;
    resetSelected: () => void;
    resetFilters: () => void;
    resetPagination: () => void;
    resetFinishedCasesTablePagination: () => void;
    resetInvoicesTablePagination: () => void;
    setInvoicesTablePagination: (pagination: Partial<RControlStore['invoicesTablePagination']>) => void;
    setFinishedCasesTablePagination: (pagination: Partial<RControlStore['finishedCasesTablePagination']>) => void;
    setLoading: (key: keyof RControlStore['isLoading'], value: boolean) => void;
    setGlobalSearchString: (key: keyof RControlStore['globalSearchString'], value: string) => void;
    goToInvoiceTablePage: (page: number) => void;
    goToFinishedTablePage: (page: number) => void;
}

export const useRControlStore = create<RControlStore>((set) => ({

    invoicesData: [],
    finishedCasesData: [],
    casesData: [],
    invoiceSummary: null,

    setInvoiceData: (data) => set({ invoicesData: data }),
    setFinishedCasesData: (data) => set({ finishedCasesData: data }),
    setCasesData: (data) => set({ casesData: data }),
    setInvoiceSummary: (data) => set({ invoiceSummary: data }),

    finishedCasesTablePagination: {
        currentPage: 1,
        pageSize: 10,
        totalPages: 1,
        totalItems: 0
    },

    invoicesTablePagination: {
        currentPage: 1,
        pageSize: 10,
        totalPages: 1,
        totalItems: 0,
    },

    filters: {
        codeMo: undefined,
        month: undefined,
        year: undefined
    },

    globalSearchString: {
        invoices: '',
        finishedCases: ''
    },

    selectedInvoice: null,
    selectedFinishedCase: null,
    selectedCase: null,
    selectedCategory: 'default',

    isLoading: {
        invoices: false,
        invoiceSummary: false,
        finishedCases: false,
        cases: false,
        generalMek: false
    },

    setCategory: (selectedCategory) => set({ selectedCategory: selectedCategory }),

    setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters }
    })),

    setGlobalSearchString: (key, value) => set((state) => ({
        globalSearchString: { ...state.globalSearchString, [key]: value }
    })),

    setSelectedInvoice: (selectedInvoice: InvoiceShortly | null) => set({ selectedInvoice: selectedInvoice }),

    setSelectedFinishedCase: (finishedCase: FinishedCase | null) => set({ selectedFinishedCase: finishedCase }),

    setSelectedCase: (selectedCase: Case | null) => set({ selectedCase: selectedCase }),

    resetSelected: () => set({
        selectedCase: null,
        selectedInvoice: null,
        selectedFinishedCase: null
    }),

    resetFilters: () => set({

        filters: {
            codeMo: undefined,
            year: undefined,
            month: undefined
        },

        globalSearchString: {
            finishedCases: '',
            invoices: ''
        },

        invoicesData: [],
        finishedCasesData: [],
        casesData: []
    }),

    resetPagination: () => set({

        invoicesTablePagination: {
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
            totalPages: 1
        },

        finishedCasesTablePagination: {
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
            totalPages: 1
        }
    }),

    resetInvoicesTablePagination: () => set({
        invoicesTablePagination: {
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
            totalPages: 1
        }
    }),

    resetFinishedCasesTablePagination: () => set({
        finishedCasesTablePagination: {
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
            totalPages: 1
        }
    }),

    setInvoicesTablePagination: (newPaginationState) => set((state) => ({
        invoicesTablePagination: { ...state.invoicesTablePagination, ...newPaginationState }
    })),

    setFinishedCasesTablePagination: (newPaginationState) => set((state) => ({
        finishedCasesTablePagination: { ...state.finishedCasesTablePagination, ...newPaginationState }
    })),

    setLoading: (key, value) => set((state) => ({
        isLoading: { ...state.isLoading, [key]: value }
    })),

    goToInvoiceTablePage: (page) => set((state) => ({
        invoicesTablePagination: { ...state.invoicesTablePagination, currentPage: page }
    })),

    goToFinishedTablePage: (page) => set((state) => ({
        finishedCasesTablePagination: { ...state.finishedCasesTablePagination, currentPage: page }
    })),

}));