export enum InvoiceStatus {
    NotAllowed = -3,
    Fatal = -2,
    LogicControlError = -1,
    FormatControlError = 0,
    Success = 1,
    Pending = 2,
    Rewrite = 3,
    Processing = 4,
    Unknown = 100
}