import { useUsersData } from './useUsersData';
import UserCards from './UserCards/UserCards';
import UsersActionPanel from './UsersActionPanel';
import UsersFiltersPanel from './UsersFiltersPanel';

import styles from './styles.module.scss';

const Users = () => {

    const {
        users,
        isLoading,
        isActive,
        refreshUsers } = useUsersData();

    return (
        <div className={styles.usersRoot}>

            <UsersActionPanel
                refreshUsers={refreshUsers}
            />

            <UsersFiltersPanel />

            <UserCards
                users={users}
                isLoading={isLoading}
                isActive={isActive}
            />
        </div>
    )
};

export default Users;