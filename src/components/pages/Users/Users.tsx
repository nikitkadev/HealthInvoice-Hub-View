import { useUsersData } from './useUsersData';
import UserCards from './UserCards/UserCards';
import UsersActionPanel from './UsersActionPanel';
import UsersFiltersPanel from './UsersFiltersPanel';

import styles from './styles.module.scss';

const Users = () => {

    const {
        users,
        totalUsers,
        onlineUsers,
        isLoading,
        isActive,
        refreshUsers,
        removeUser } = useUsersData();

    return (
        <div className={styles.usersRoot}>

            <UsersActionPanel
                refreshUsers={refreshUsers}
                activeUsers={onlineUsers}
                totalUsers={totalUsers}
            />

            <UsersFiltersPanel />

            <UserCards
                users={users}
                isLoading={isLoading}
                isActive={isActive}
                removeUser={removeUser}
            />
        </div>
    )
};

export default Users;