import { useJournal } from '../../app_lk_journal/general/JournalContext';
import Button from '../../ui/Button/Button';
import JournalTypeToggle from '../../ui/JournalTypeToggle';
import styles from './styles.module.scss';

const JournalActionPanel = () => {

    const { journalType, setJournalType } = useJournal();

    return (
        <div className={styles.journalPanelRoot}>
            <div className={styles.action}>
                <div className={styles.toggle}>
                    <p>Тип реестров:</p>
                    <JournalTypeToggle
                        value={journalType}
                        onChange={setJournalType} />
                </div>
                <div className={styles.buttons}>

                    <Button variant='secondary' fullWidth={false}>
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

                    <Button variant='primary' fullWidth={false}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24">
                            <path
                                fill="none"
                                stroke="var(--white)"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 12h6m0 0h6m-6 0v6m0-6V6" />
                        </svg>
                        Добавить счета
                    </Button>

                </div>
            </div>
            <div className={styles.filters}>

            </div>
        </div>
    )
};

export default JournalActionPanel;