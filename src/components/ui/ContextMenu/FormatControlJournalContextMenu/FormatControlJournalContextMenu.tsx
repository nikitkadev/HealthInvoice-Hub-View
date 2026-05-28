import styles from './styles.module.scss';

interface FormatControlJournalContextMenuProps {
    visiable: boolean;
    posX: number;
    posY: number;
    selectedFilename: string;
    downloadReport: () => void;
};

const FormatControlJournalContextMenu = ({
    visiable,
    posX,
    posY,
    downloadReport,
    selectedFilename
}: FormatControlJournalContextMenuProps) => {

    if (!visiable) {
        return null;
    }

    return (
        <div
            className={styles.formatCheckReportContextMenuRoot}
            style={{
                top: posY,
                left: posX
            }}>

            <ul>
                <div className={styles.menuItem}>
                    <span className={styles.menuTitle}>{selectedFilename}</span>
                </div>
                <li>
                    <button
                        onClick={downloadReport}>
                        <span>Скачать ответ ФК</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24">
                            <path
                                fill="none"
                                stroke="var(--black)"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 21h12M12 3v14m0 0l5-5m-5 5l-5-5" />
                        </svg>
                    </button>
                </li>

            </ul>
        </div>
    )
};

export default FormatControlJournalContextMenu;