export interface InvoiceShortly {
    status: number;
    nSchet: string;
    dSchet: Date;
    summav: number;
    sdZ?: number;
    schetUid: number;
}

export interface FinishedCase {
    persUid: number,
    pacientUid: number,
    zSlUid: number;
    positionNumber: number;
    recordNumber: number;
    surname: string;
    name: string;
    patronymic: string;
    uslOk: number;
    sPolis: string;
    nPolis: string;
    sumv: number;
    sump: number;
    smoSump: number;
}

export interface Case {
    profil: number,
    det: number,
    prvs: number;
    startingAt: Date;
    endingAt: Date;
    ds1: string;
    edCol: number;
    tarif: number;
    sumM: number;
    sump: number;
    smoSump: number;
}