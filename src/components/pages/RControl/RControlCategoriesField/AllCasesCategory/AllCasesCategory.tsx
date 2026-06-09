import dayjs from 'dayjs';
import Field from '../../../../ui/Field/Field';
import styles from './styles.module.scss';
import useAllCasesCategoryData from './useAllCasesCategoryData';

const AllCasesCategory = () => {

    const { data } = useAllCasesCategoryData();

    if (!data) {
        return (
            <div className={styles.warningBlock}>
                Не удалось получить данные по категории
            </div>
        );
    };

    return (
        <div className={styles.allCasesCategoryRoot}>

            <div className={styles.section}>

                <h2>Законченный случай</h2>

                <div className={styles.finishedCaseCard}>
                    <Field label="ЛПУ" value={data.lpu} />
                    <Field label="Направившая медицинская организация" value={data.nprMo ?? '-'} />
                    <Field label="Дата направления" value={data.nprDate ? dayjs(data.nprDate).format('DD.MM.YYYY') : '-'} />
                    <Field label="Условия оказания медицинской помощи" value={data.uslOk} />
                    <Field label="Вид медицинской помощи" value={data.vidPom} />
                    <Field label="Форма медицинской помощи" value={data.forPom} />
                    <Field label="Способы оплаты" value={data.idsp} />
                    <Field label="Лечение с" value={data.dateZ1 ? dayjs(data.dateZ1).format('DD.MM.YYYY') : '-'} />
                    <Field label="Лечение по" value={data.dateZ2 ? dayjs(data.dateZ2).format('DD.MM.YYYY') : '-'} />
                    <Field label="Койко- / пациенто- дни" value={data.kdZ ?? '-'} />
                    <Field label="Результат" value={data.rslt} />
                    <Field label="Признак внутрибольничного перевода" value={data.vbP ?? '-'} />
                    <Field label="Результат (дисп / мед)" value={data.rsltD ?? '-'} />
                    <Field label="Признак отказа (дисп / мед)" value={data.pOtk ?? '-'} />
                    <Field label="Признак мобильной бригады" value={data.vbr ?? '-'} />
                    <Field label="Исход" value={data.ishod} />
                </div>

            </div>

            <div className={styles.section}>

                <h2>Случай</h2>

                <div className={styles.caseCard}>
                    <Field label="Профиль" value={data.profil} />
                    <Field label="Подразделение" value={data.lpu1 ?? '-'} />
                    <Field label="Отделение" value={data.podr ?? '-'} />
                    <Field label="Специальность" value={data.prvs} />
                    <Field label='Признак "Детский"' value={data.det} />
                    <Field label="Цель посещения" value={data.pCel ?? '-'} />
                    <Field label="Профиль койки" value={data.profilK ?? '-'} />
                    <Field label="Номер истории" value={data.nHistory} />
                    <Field label="Поступление / перевод" value={data.pPer ?? '-'} />
                    <Field label="Признак реабилитации" value={data.reab ?? '-'} />
                    <Field label="Лечение с" value={data.date1 ? dayjs(data.date1).format('DD.MM.YYYY') : '-'} />
                    <Field label="Лечение по" value={data.date2 ? dayjs(data.date2).format('DD.MM.YYYY') : '-'} />
                    <Field label="Количество" value={data.pCel ?? '-'} />
                    <Field label="Койко- / пациенто- дни" value={data.kd ?? '-'} />
                    <Field label="Уровень ЛПУ" value={data.lpuLevel ?? '-'} />
                    <Field label="МКБ первоначальный" value={data.ds0 ?? '-'} />
                    <Field label="Подозрение на ЗНО" value={data.dsOnk ?? '-'} />
                    <Field label="ID врача" value={data.iddokt} />
                    <Field label="Масса тела (кг)" value={data.wei ?? '-'} />
                    <Field label="МКБ основное" value={data.ds1} />
                    <Field label="Характер основного заболевания" value={data.cZab ?? '-'} />
                    <Field label="Комментарий" value={data.comentsl ?? '-'} />
                </div>

            </div>

        </div>
    )
};

export default AllCasesCategory;