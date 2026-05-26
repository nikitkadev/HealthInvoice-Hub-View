import { useJournal } from '../../../app_lk_journal/general/JournalContext';

import Button from '../../../ui/Button/Button';
import styles from './styles.module.scss';
import JournalTypeToggle from '../../../ui/JournalTypeToggle';

interface FormatControlJournalActionPanelProps {
    refreshData: () => void;
}

const FormatControlJournalActionPanel = ({
    refreshData
}: FormatControlJournalActionPanelProps) => {

    const { journalType, setJournalType } = useJournal();


    return (
        <div className={styles.journalPanelRoot}>
            <div className={styles.action}>
                <div className={styles.toggle}>
                    <p>Тип журнала:</p>
                    <JournalTypeToggle
                        value={journalType}
                        onChange={setJournalType} />
                </div>
                <div className={styles.buttons}>

                    <Button
                        variant='secondary'
                        fullWidth={false}
                        onClick={refreshData}>
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
                                stroke-width="1.5"
                                d="M14 16h5v5M10 8H5V3m14.418 6.003A8 8 0 0 0 5.086 7.976m-.504 7.021a8 8 0 0 0 14.331 1.027" />
                        </svg>
                        Обновить журнал
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default FormatControlJournalActionPanel;