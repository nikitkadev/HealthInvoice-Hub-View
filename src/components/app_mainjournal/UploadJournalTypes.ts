export interface InvoiceSummaryValidationResult {
    isSuccess: boolean;
    willRewrite: boolean;
    uploadArchiveFilename: string;
    uploadArchiveFilePath: string;
    fileSize: number;
    schetUid?: number;
    errorMessage: string;
}
