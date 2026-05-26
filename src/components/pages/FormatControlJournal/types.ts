export interface FormatControlJournalRecord {
    uid: number;
    uploadDate: Date;
    sourceArchiveFilename: string;
    organizationCode: string;
    status: number;
}

export interface FormatControlJournalRecordResponse {
    items: FormatControlJournalRecord[];
    total: number;
    page: number;
    pageSize: number;
}