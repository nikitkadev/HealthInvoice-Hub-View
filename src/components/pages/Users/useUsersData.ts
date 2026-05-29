import type { UserInfo } from "../../app_auth/auth_service/AuthDtos"

import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { api } from "../../../shared/api/ApiClient";
import dayjs from "dayjs";

export const useUsersData = () => {
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const isActive = (lastActivity: Date | null): boolean => {
        if (!lastActivity) return false;

        const last = dayjs(lastActivity);
        const now = dayjs();

        const diffMinutes = now.diff(last, 'minutes');
        return diffMinutes < 5;
    }

    const fetchUsers = async () => {

        setIsLoading(true);

        try {
            const users = await api.get<UserInfo[]>("/admin/users/get");
            if (!users) {
                toast.error("Не удалось получить пользователей приложения")
                return;
            }

            setUsers(users);
        }
        catch (error) {
            toast.error("Ошибка при попытке получить пользователей приложения")
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return {
        users,
        isLoading,
        totalUsers: users.length,
        onlineUsers: users.filter(user => isActive(user.lastActivity)),
        isActive,
        refreshUsers: fetchUsers
    };

}