import { useEffect } from "react"
import { api } from "../api/ApiClient"

export const useHeartbeat = (intervalMs: number = 30000) => {

    useEffect(() => {
        const sendHeartbeat = async () => {
            try {
                await api.post('/auth/heartbeat');
            } catch (error: any) {
                if (location.pathname !== "/login") {
                    window.location.href = '/login';
                }
            }
        };

        sendHeartbeat();

        const interval = setInterval(sendHeartbeat, intervalMs);

        return () => {
            clearInterval(interval);
        };
    }, [intervalMs])
}