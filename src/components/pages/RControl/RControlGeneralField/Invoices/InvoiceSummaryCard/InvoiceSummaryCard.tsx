import dayjs from 'dayjs';
import OverlayLoader from '../../../../../ui/Loaders/OverlayLoader';
import GorizontalSeparator from '../../../../../ui/Seporators/GorizontalSeporator';
import { useRControlStore } from '../../../useRControlStore';
import styles from './styles.module.scss';
import useInvoiceSummaryData from './useInvoiceSummaryData';

const InvoiceSummaryCard = () => {

    const {
        selectedInvoice,
        isLoading,
        invoiceSummary } = useRControlStore();

    useInvoiceSummaryData();

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

                        <div className={styles.grid1}>

                            <div className={styles.card}>
                                <label>Предъявлено</label>
                                <span>{invoiceSummary?.summav} ₽</span>
                            </div>
                        </div>

                        <div className={styles.grid2}>

                            <div className={styles.card}>
                                <label>Принято ТФОМС</label>
                                <span className={styles.success}>{invoiceSummary?.summap} ₽</span>
                            </div>

                            <div className={styles.card}>
                                <label>Принято СМО</label>
                                <span className={styles.success}>{invoiceSummary?.smoSummap} ₽</span>
                            </div>
                        </div>



                        <div className={styles.grid3}>
                            <div className={styles.card}>
                                <label>Снято МЭК ТФОМС</label>
                                <span>{invoiceSummary?.sankMek} ₽</span>
                            </div>

                            <div className={styles.card}>
                                <label>Снято МЭЭ ТФОМС</label>
                                <span>{invoiceSummary?.sankMee} ₽</span>
                            </div>

                            <div className={styles.card}>
                                <label>Снято ЭКМР ТФОМС</label>
                                <span>{invoiceSummary?.sankEkmp} ₽</span>
                            </div>

                        </div>



                        <div className={styles.grid3}>

                            <div className={styles.card}>
                                <label>Снято МЭК СМО</label>
                                <span>{invoiceSummary?.smoSankMek} ₽</span>
                            </div>

                            <div className={styles.card}>
                                <label>Снято МЭЭ СМО</label>
                                <span>{invoiceSummary?.smoSankMee} ₽</span>
                            </div>

                            <div className={styles.card}>
                                <label>Снято ЭКМР СМО</label>
                                <span>{invoiceSummary?.smoSankEkmp} ₽</span>
                            </div>

                        </div>

                    </div>
                    <GorizontalSeparator size='xs' type='line' />
                    <div className={styles.section}>

                        <div className={styles.grid3}>
                            <div className={styles.card}>
                                <label>Имя файла</label>
                                <span>{invoiceSummary?.filename} </span>
                            </div>


                            <div className={styles.card}>
                                <label>UID счета</label>
                                <span>{invoiceSummary?.schetUid}</span>
                            </div>

                            <div className={styles.card}>
                                <label>Дата загрузки</label>
                                <span>{dayjs(invoiceSummary?.uploadDate).format('DD.MM.YYYY HH:mm:ss')}</span>
                            </div>
                        </div>

                    </div>
                </>

            )}

        </div>
    )
};

export default InvoiceSummaryCard;