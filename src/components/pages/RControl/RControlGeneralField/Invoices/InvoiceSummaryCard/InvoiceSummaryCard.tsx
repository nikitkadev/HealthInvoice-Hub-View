import dayjs from 'dayjs';
import OverlayLoader from '../../../../../ui/Loaders/OverlayLoader';
import GorizontalSeparator from '../../../../../ui/Seporators/GorizontalSeporator';
import { useRControlStore } from '../../../useRControlStore';
import styles from './styles.module.scss';
import useInvoiceSummaryData from './useInvoiceSummaryData';

const InvoiceSummaryCard = () => {

    const { selectedInvoice, isLoading } = useRControlStore();
    const { data } = useInvoiceSummaryData();

    return (
        <div className={styles.invoiceSummartCardRoot}>

            <div className={styles.header}>
                <h2 className={!selectedInvoice ? styles.waiting : ''}>
                    {selectedInvoice ? `Сводная информация по счету ${selectedInvoice?.nSchet}` : 'Ожидает выбора счета'}
                </h2>
            </div>

            {isLoading.invoiceSummary && (<OverlayLoader />)}

            {selectedInvoice && (
                <>
                    <div className={styles.section}>

                        <div className={styles.grid3}>

                            <div className={styles.card}>
                                <label>Предъявлено</label>
                                <span>{data?.summav} ₽</span>
                            </div>

                            <div className={styles.card}>
                                <label>Принято ТФОМС</label>
                                <span className={styles.success}>{data?.summap} ₽</span>
                            </div>

                            <div className={styles.card}>
                                <label>Принято СМО</label>
                                <span className={styles.success}>{data?.smoSummap} ₽</span>
                            </div>
                        </div>

                        <div className={styles.grid3}>
                            <div className={styles.card}>
                                <label>Снято МЭК ТФОМС</label>
                                <span>{data?.sankMek} ₽</span>
                            </div>

                            <div className={styles.card}>
                                <label>Снято МЭК СМО</label>
                                <span>{data?.smoSankMek} ₽</span>
                            </div>

                            <div className={styles.card}>
                                <label>Снято МЭЭ ТФОМС</label>
                                <span>{data?.sankMee} ₽</span>
                            </div>
                        </div>

                        <div className={styles.grid3}>
                            <div className={styles.card}>
                                <label>Снято МЭЭ СМО</label>
                                <span>{data?.smoSankMee} ₽</span>
                            </div>


                            <div className={styles.card}>
                                <label>Снято ЭКМР ТФОМС</label>
                                <span>{data?.sankEkmp} ₽</span>
                            </div>

                            <div className={styles.card}>
                                <label>Снято ЭКМР СМО</label>
                                <span>{data?.smoSankEkmp} ₽</span>
                            </div>
                        </div>

                    </div>
                    <GorizontalSeparator size='xs' type='line' />
                    <div className={styles.section}>

                        <div className={styles.grid3}>
                            <div className={styles.card}>
                                <label>Имя файла</label>
                                <span>{data?.filename} </span>
                            </div>


                            <div className={styles.card}>
                                <label>UID счета</label>
                                <span>{data?.schetUid}</span>
                            </div>

                            <div className={styles.card}>
                                <label>Дата загрузки</label>
                                <span>{dayjs(data?.uploadDate).format('DD.MM.YYYY HH:mm:ss')}</span>
                            </div>
                        </div>

                    </div>
                </>

            )}

        </div>
    )
};

export default InvoiceSummaryCard;