import { JournalToggle } from '../../../../shared/ui/toggle/JournalToggle'
import styles from './RControlControlPanel.module.css'
import { useJournal } from '../../../app_lk_journal/general/JournalContext';

export const RControlControlPanel = () => {
    const { journalType, setJournalType } = useJournal();
    return (
        <div className={styles.container}>
            <JournalToggle
                value={journalType}
                onChange={setJournalType} />
        </div>
    )
}