export interface PatientSmoCategoryDto {
    surname: string;
    name: string;
    patronymic: string;
    sex: number;
    birthday: Date;
    representativeSurname?: string | null;
    representativeName?: string | null;
    representativePatronymic?: string | null;
    representativeSex?: number | null;
    representativeBirthday?: Date | null;
    documentType?: string | null;
    documentSeries?: string | null;
    documentNumber?: string | null;
    issueDate?: Date | null;
    issuedBy?: string | null;
    smoCode?: string | null;
    smoOGRN?: string | null;
    smoOKATO?: string | null;
    smoName?: string | null;
    polisSeries?: string | null;
    polisNumber: string;
    polisType: number;
    enp?: string | null;
}

export interface AllCasesDto {
    lpu: string;
    nprMo?: string | null;
    nprDate?: Date | null;
    uslOk: number;
    vidPom: number;
    idsp: number;
    forPom: number;
    dateZ1: Date;
    dateZ2: Date;
    kdZ?: number | null;
    rslt: number;
    vbP?: number | null;
    rsltD?: number | null;
    pOtk?: number | null;
    vbr?: number | null;
    ishod: number;

    profil: number;
    lpu1?: string | null;
    podr?: number | null;
    prvs: number;
    det: number;
    pCel?: string | null;
    profilK?: number | null;
    nHistory: string;
    pPer?: number | null;
    reab?: number | null;
    date1: Date;
    date2: Date;
    edCol?: number | null;
    kd?: number | null;
    lpuLevel?: string | null;
    ds0?: string | null;
    dsOnk?: number | null;
    iddokt: string;
    wei?: number | null;
    ds1: string;
    cZab?: number | null;
    comentsl?: string | null;
}