import Field from '../../../../../ui/Field/Field';
import styles from './styles.module.scss';

const SmoCard = () => {

    const smoData = {
        code: "83001: АО \"ГМСК\"ЗАПОЛЯРЬЕ\"",
        ogrn: "-",
        okato: "-",
        name: "-",
        polis: {
            series: "0000",
            number: "3851020821000587",
            type: "3",
            enp: "3851020821000587"
        },
        status: "1"
    };

    return (
        <div className={styles.smoCardRoot}>

            <div className={styles.section}>
                <h3>СМО</h3>
                <Field label='Код СМО' value={smoData.code} />
            </div>

            <div className={styles.section}>
                <div className={styles.grid2}>
                    <Field label="ОГРН СМО" value={smoData.ogrn} />
                    <Field label="ОКАТО СМО" value={smoData.okato} />
                </div>
            </div>

            <div className={styles.section}>
                <Field label='Наименование СМО' value={smoData.name} />
            </div>

            <div className={styles.section}>
                <div className={styles.grid2}>
                    <Field label="Серия полиса" value={smoData.polis.series} />
                    <Field label="Номер полиса" value={smoData.polis.number} />
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.grid2}>
                    <Field label="Тип" value={smoData.polis.type} />
                    <Field label="ЕНП" value={smoData.polis.enp} />
                </div>
            </div>

        </div>
    );
};

export default SmoCard;