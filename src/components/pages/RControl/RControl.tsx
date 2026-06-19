import RControlFiltersPanel from './RControlFiltersPanel';

import { useEffect } from 'react';
import { useRControlStore } from './useRControlStore';
import RControlGeneralField from './RControlGeneralField';
import styles from './styles.module.scss';
import RControlActionPanel from './RControlActionPanel/RControlActionPanel';

const RControl = () => {

    const {
        resetFilters,
        resetPagination,
        resetSelected,
        setCategory } = useRControlStore();

    useEffect(() => {
        resetFilters();
        resetPagination();
        resetSelected();
        setCategory('default');

        return () => {
            resetFilters();
            resetPagination();
            resetSelected();
            setCategory('default');
        };

    }, []);

    return (

        <div className={styles.rControlRoot}>

            <RControlFiltersPanel
            />

            <RControlActionPanel
            />

            <RControlGeneralField
            />

        </div>
    )
};

export default RControl;