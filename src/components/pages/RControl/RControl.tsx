import RControlFiltersPanel from './RControlFiltersPanel';

import { useEffect } from 'react';
import { useRControlStore } from './useRControlStore';
import RControlGeneralField from './RControlGeneralField';
import styles from './styles.module.scss';

const RControl = () => {

    const { resetFilters, resetPagination, resetSelected } = useRControlStore();

    useEffect(() => {
        resetFilters();
        resetPagination();
        resetSelected();

        return () => {
            resetFilters();
            resetPagination();
            resetSelected();
        };

    }, []);

    return (

        <div className={styles.rControlRoot}>

            <RControlFiltersPanel
            />

            <RControlGeneralField
            />

        </div>
    )
};

export default RControl;