export interface LogicControlJournalRecord {
    uid: number;
    schetUid: number;
    uploadDate: Date;
    uploader: string;
    fileName: string;
    codeMO: string;
    nSchet: string;
    dSchet: Date;
    countSdZ: number;
    countError: number;
    status: number;
}

export interface LogicControlJournalResponse {
    items: LogicControlJournalRecord[];
    total: number;
    page: number;
    pageSize: number;
}

export interface LogicControlJournalFilters {
    globalFilterTarget: string;
}

export type SortDiraction = 'asc' | 'desc' | null;

export interface SortState {
    column: string;
    direction: SortDiraction;
}

export interface InvoiceSummaryValidationResult {
    isSuccess: boolean;
    willRewrite: boolean;
    uploadArchiveFilename: string;
    uploadArchiveFilePath: string;
    fileSize: number;
    schetUid?: number;
    errorMessage: string;
}