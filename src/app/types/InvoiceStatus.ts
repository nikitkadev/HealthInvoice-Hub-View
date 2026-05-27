export enum InvoiceStatus {
    NotAllowed = -3,
    Fatal = -2,
    Error = -1,
    Success = 1,
    Pending = 2,
    Rewrite = 3,
    Processing = 4,
    Unknown = 100
}