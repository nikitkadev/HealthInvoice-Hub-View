import { useState } from 'react';

import styles from './styles.module.scss';
import MiniPagination from '../../../../../ui/MiniPagination';
import { useRControlStore } from '../../../useRControlStore';


const FinishedCasesActionPanel = () => {

    const [localGlobalString, setLocalGlobalString] = useState('');
    const { setGlobalSearchString,
        finishedCasesTablePagination,
        setFinishedCasesTablePagination,
        goToFinishedTablePage
    } = useRControlStore();

    return (
        <div className={styles.finishedCasesActionPanelRoot}>
            <div className={styles.filters}>
                <div className={`${styles.filter}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                        <g fill="none" stroke="var(--gray-400)" stroke-width="2">
                            <circle cx="10.5" cy="10.5" r="5.5" />
                            <path stroke-linecap="round" d="M15.414 15L19 18.586" />
                        </g>
                    </svg>

                    <input
                        placeholder='Поиск по законченным случаям'
                        value={localGlobalString}
                        onChange={(e) => setLocalGlobalString(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setFinishedCasesTablePagination({
                                    currentPage: 1
                                });
                                setGlobalSearchString('finishedCases', localGlobalString);
                            }
                        }}
                    />
                </div>
            </div>
            <MiniPagination
                pagination={finishedCasesTablePagination}
                onPageChange={goToFinishedTablePage}
            />
        </div>

    );
};

export default FinishedCasesActionPanel;