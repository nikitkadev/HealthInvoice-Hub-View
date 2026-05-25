import type { InvoiceSummaryValidationResult } from '../../app_lk_journal/general/UploadJournalTypes';
import Button from '../../ui/Button/Button';
import GorizontalSeparator from '../../ui/Seporators/GorizontalSeporator';
import Status from '../../ui/Status';
import styles from './styles.module.scss';

interface FormatCheckReportProps {
    isFormatCheck: boolean;
    checkedFiles: InvoiceSummaryValidationResult[];
}

const FormatCheckReport = ({
    checkedFiles,
    isFormatCheck }: FormatCheckReportProps) => {

    if (isFormatCheck) {
        return (
            <div className={styles.loader}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                    <path fill="none" stroke="var(--gray-400)" stroke-linecap="round" stroke-width="2" d="M12 6.99998C9.1747 6.99987 6.99997 9.24998 7 12C7.00003 14.55 9.02119 17 12 17C14.7712 17 17 14.75 17 12">
                        <animateTransform attributeName="transform" attributeType="XML" dur="400ms" from="0,12,12" repeatCount="indefinite" to="360,12,12" type="rotate" />
                    </path>
                </svg>
            </div>
        )
    }

    if (checkedFiles.length === 0) {
        return null;
    }

    const successCount = checkedFiles.filter(f => (f.isSuccess && !f.willRewrite)).length;
    const errorCount = checkedFiles.filter(f => (!f.isSuccess && f.errorMessage === '')).length;
    const rewriteCount = checkedFiles.filter(f => f.willRewrite).length;
    const fatalErrorCount = checkedFiles.filter(f => f.errorMessage !== '').length;

    const getStatus = (record: InvoiceSummaryValidationResult) => {

        if (record.errorMessage !== '') {
            return -3;
        }

        if (record.willRewrite) {
            return 3;
        }

        if (record.isSuccess) {
            return 1;
        }

        if (!record.isSuccess) {
            return -1;
        }

        return 0;
    }

    return (
        <div className={styles.formatCheckReportRoot}>
            <div className={styles.summary}>
                <Button variant='primary' fullWidth={false}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24">
                        <path
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.8"
                            d="M14.667 13.667L18 10.333L14.667 7M18 10.333H8.833a3.333 3.333 0 0 0 0 6.667h.834" /></svg>
                    Отправить счета</Button>
                <div className={styles.summaryInfo}>
                    {successCount !== 0 && (
                        <span className={styles.spanSuccess}>{successCount}</span>
                    )}

                    {errorCount !== 0 && (
                        <span className={styles.spanError}>{errorCount}</span>
                    )}

                    {rewriteCount !== 0 && (
                        <span className={styles.spanRewrite}>{rewriteCount}</span>
                    )}

                    {fatalErrorCount !== 0 && (
                        <span className={styles.fatalErrorSuccess}>{fatalErrorCount}</span>
                    )}
                </div>
            </div>
            <GorizontalSeparator size='xs' type='line' />
            <div className={styles.cards}>
                {checkedFiles.map((cf) => (
                    <div className={styles.card}>
                        <div className={styles.static}>
                            <div className={styles.fileIcon}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="none"
                                        stroke="var(--black)"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.5"
                                        d="M13 3H8.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C5 4.52 5 5.08 5 6.2v11.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h7.606c1.118 0 1.677 0 2.104-.218c.377-.192.683-.498.875-.874c.218-.428.218-.986.218-2.104V9m-6-6c.286.003.466.014.639.055q.308.075.578.24c.202.124.375.297.72.643l3.126 3.125c.346.346.518.518.642.72q.165.271.24.578c.04.173.051.354.054.639M13 3v2.8c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h2.802m0 0H19" />
                                </svg>
                            </div>
                            <div className={styles.fileInfo}>
                                <span>{cf.uploadArchiveFilename}</span>
                                <span className={styles.size}>{(cf.fileSize / 1024 / 1024).toFixed(2)} МБ</span>
                            </div>
                        </div>
                        <div className={styles.fileStatus}>
                            <Status status={getStatus(cf)} />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
};

export default FormatCheckReport;