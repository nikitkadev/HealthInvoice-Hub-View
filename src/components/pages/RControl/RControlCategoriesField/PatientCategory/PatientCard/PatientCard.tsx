import Field from '../../../../../ui/Field/Field';
import GorizontalSeparator from '../../../../../ui/Seporators/GorizontalSeporator';
import styles from './styles.module.scss';

const PatientCard = () => {

    const patientData = {
        surname: "Павлов",
        name: "Никита",
        patronymic: "Романович",
        gender: "Мужской",
        birthday: "20.07.2001",
        representative: {
            surname: "Павлов",
            name: "Никита",
            patronymic: "Романович",
            gender: "Мужской",
            birthday: "20.07.2001"
        },
        document: {
            type: "Паспорт гражданина Российской Федерации",
            series: "0000",
            number: "0000000",
            issueDate: "01.01.2001",
            issuedBy: "МВД по р. Хакасия"
        },
        status: "1"
    };

    return (
        <div className={styles.patientCardRoot}>

            <div className={styles.section}>
                <h2>Пациент</h2>
                <div className={styles.grid2}>
                    <Field label="Фамилия" value={patientData.surname} />
                    <Field label="Имя" value={patientData.name} />

                </div>
                <Field label='Отчество' value={patientData.patronymic} />
                <div className={styles.grid2}>
                    <Field label="Фамилия" value={patientData.gender} />
                    <Field label="Имя" value={patientData.birthday} />
                </div>
            </div>

            <GorizontalSeparator size='xs' type='line' color="var(--gray-200)" />

            <div className={styles.section}>
                <h3>Представитель</h3>
                <div className={styles.grid2}>
                    <Field label="Фамилия" value={patientData.representative.surname} />
                    <Field label="Имя" value={patientData.representative.name} />
                </div>
                <Field label="Отчество" value={patientData.representative.patronymic} />
                <div className={styles.grid2}>
                    <Field label="Фамилия" value={patientData.representative.gender} />
                    <Field label="Имя" value={patientData.representative.birthday} />
                </div>
            </div>

            <GorizontalSeparator size='xs' type='line' color="var(--gray-200)" />


            <div className={styles.section}>
                <h3>Документ</h3>
                <Field label="Тип" value={patientData.document.type} />
                <div className={styles.grid2}>
                    <Field label="Серия" value={patientData.document.series} />
                    <Field label="Номер" value={patientData.document.number} />
                </div>
                <div className={styles.grid2}>
                    <Field label="Дата выдачи" value={patientData.document.issueDate} />
                    <Field label="Кем выдан" value={patientData.document.issuedBy} />
                </div>
                <Field label="Статус" value={patientData.status} />
            </div>


        </div>
    );
};

export default PatientCard;