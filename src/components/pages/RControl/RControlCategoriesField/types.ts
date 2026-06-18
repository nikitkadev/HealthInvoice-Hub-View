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

export interface ServicesDto {
    uid: number;
    codeUsl: string;
    vidVme?: string | null;
    profil: number;
    prvs: number;
    det: number;
    dateIn: Date;
    dateOut: Date;
    ds: string;
    kolUsl: number;
    tarif?: number | null;
    sumvUsl: number;
    comentu?: string | null
}

export interface MedDevs {
    medDate: Date,
    codeMedDev: number;
    seriesNumber: string;
}

export interface KsgHmpCategoryDataDto {
    cardData: CardData;
    crits: CritEntity[];
    slKoefs: SlKoefEntity[];
}

interface CardData {
    ksgKpgUid: number;
    ksg?: string | null;
    nKsg: string;
    verKsg: number;
    ksgPg: number;
    nKpg?: string | null;
    koefZ: number;
    koefUp: number;
    bztsz: number;
    koefD: number;
    koefU: number;
    slK: number;
    itSl?: number | null;
    vidHmp?: string | null;
    metodHmp?: number | null;
    talD?: Date | null;
    talNum?: string | null;
    talP?: string | null;
}

interface CritEntity {
    uid: number;
    ksgKpgUid: number;
    crit: string;
}

interface SlKoefEntity {
    uid: number;
    ksgKpgUid: number;
    idSl: string;
    zSl: number;
}

export interface NazNaprCategoryDto {
    naprs: NaprEntity[];
    nazs: NazEntity[];
}

interface NaprEntity {
    uid: number;
    sluchUId: number;
    naprDate: Date;
    naprMo?: string | null;
    naprV: number;
    metIssl?: number | null;
    naprUsl?: string | null;
}

interface NazEntity {
    uid: number;
    sluchUId: number;
    nazN: number;
    nazR: number;
    nazIddokt: string;
    nazV?: number | null;
    nazUsl?: string | null;
    naprDate?: Date | null;
    naprMo?: string | null;
    nazPmp?: number | null;
    nazPk?: string | null;
}

export interface DefectDto {
    kod?: number;
    comment: string;
}

export interface SankDto {
    uid: number;
    sCode: string;
    sSum: number;
    sTip: string;
    sOsn: number;
    sEdCol: number;
    dateAct: Date;
    numAct: string;
    codeExp?: string | null;
    sCom?: string | null;
    filename?: string | null;
    year?: number | null;
    month?: number | null;
    uploaddate?: Date | null;
}

export interface ResponseWithPagination<T> {
    items: T;
    total: number;
    page: number;
    pageSize: number;
}

export interface OnkSluchDto {
    uid: number;
    ds1T?: number | null;
    stad?: number | null;
    onkT?: number | null;
    onkN?: number | null;
    onkM?: number | null;
    mtstz?: number | null;
    sod?: number | null;
    kFr?: number | null;
    wei?: number | null;
    hei?: number | null;
    bsa?: number | null;
}

export interface OnkAdditionalData {
    services: OnkUslDto[];
    bDiags: BDiagDto[];
    bProts: BProtDto[];
}

export interface OnkUslDto {
    uid: number;
    uslTip: number;
    hirTip?: number | null;
    lekTipL?: number | null;
    lekTipV?: number | null;
    pptR?: number | null;
    luchTip?: number | null;
}

interface BDiagDto {
    uid: number;
    diagDate?: Date | string | null;
    diagTip?: number | null;
    diagCode?: number | null;
    diagRslt?: number | null;
    recRslt?: number | null;
}

interface BProtDto {
    uid: number;
    prot: number;
    dProt: Date | string;
}

export interface LekPrDto {
    uid: number;
    regnum: string;
    regnumDop?: string | null;
    codeSh?: string | null;
}

export interface InjData {
    dateInjs: DateInjDto[];
    injs: InjDto[];
}

interface DateInjDto {
    uid: number;
    dateInj: Date;
}

interface InjDto {
    uid: number;
    dateinj: Date;
    kvInj?: number | null;
    kizInj?: number | null;
    sInj: number | null;
    svInj?: number | null;
    sizInj?: number | null;
    redInj?: number | null;
}