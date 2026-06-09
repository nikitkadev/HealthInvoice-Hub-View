import dayjs from 'dayjs';
import Field from '../../../../ui/Field/Field';
import usePatientSmoCategoryData from './usePatientSmoCategoryData';
import styles from './styles.module.scss';

const PatientCard = () => {

    const { data } = usePatientSmoCategoryData();

    const convertSex = (sex: number): string => {

        const dict: Record<number, string> = {
            1: 'Мужской',
            2: 'Женский'
        };

        return dict[sex];
    };

    if (!data) {

        return (
            <div className={styles.warningBlock}>
                Не удалось получить данные по категории
            </div>
        )
    }

    return (

        <div className={styles.patientSmoCategoryRoot}>

            <div className={styles.section}>
                <h2>Пациент</h2>

                <div className={styles.patientCard}>
                    <Field label="Фамилия" value={data.surname} />
                    <Field label="Имя" value={data?.name} />
                    <Field label='Отчество' value={data.patronymic} />
                    <Field label="Пол" value={convertSex(data.sex)} />
                    <Field label="День рождения" value={dayjs(data.birthday).format('DD.MM.YYYY')} />
                </div>
            </div>

            <div className={styles.section}>
                <h2>Документ</h2>

                <div className={styles.documentCard}>
                    <Field label="Тип" value={data?.documentType ?? '-'} />
                    <Field label="Серия" value={data?.documentSeries ?? '-'} />
                    <Field label="Номер" value={data?.documentNumber ?? '-'} />
                    <Field label="Дата выдачи" value={data?.issueDate ? dayjs(data?.issueDate).format('DD.MM.YYYY') : '-'} />
                    <Field label="Кем выдан" value={data?.issuedBy ?? '-'} />
                </div>
            </div>

            <div className={styles.section}>

                <h2>Представитель</h2>

                <div className={styles.representativeCard}>
                    <Field label="Фамилия" value={data?.representativeSurname ?? '-'} />
                    <Field label="Имя" value={data?.representativeName ?? '-'} />
                    <Field label="Отчество" value={data?.representativePatronymic ?? '-'} />
                    <Field label="Пол" value={data?.representativeSex ?? '-'} />
                    <Field label="День рождения" value={data?.representativeBirthday ? dayjs(data?.representativeBirthday).format('DD.MM.YYYY') : '-'} />
                </div>
            </div>

            <div className={styles.section}>

                <h2>СМО</h2>

                <div className={styles.smoCard}>
                    <Field label="Код СМО" value={data?.smoCode ?? '-'} />
                    <Field label="ОГРН СМО" value={data?.smoOGRN ?? '-'} />
                    <Field label="ОКАТО СМО" value={data?.smoOKATO ?? '-'} />
                    <Field label="Наименование СМО" value={data?.smoName ?? '-'} />
                    <Field label="Серия полиса" value={data?.polisSeries ?? '-'} />
                    <Field label="Номер полиса" value={data?.polisNumber ?? '-'} />
                    <Field label="Тип" value={data?.polisType ?? '-'} />
                    <Field label="ЕНП" value={data?.enp ?? '-'} />
                </div>

            </div>



        </div >
    );
};

export default PatientCard;