import { createBrowserRouter } from "react-router";

import { App } from "./App";
import { ProtectedRoute } from "../components/app_protectedroutes/ProtectedRoute";
import { PublicOnlyRoute } from "../components/app_protectedroutes/PublicOnlyRoute";
import { RControlPage } from "../components/app_admin/rcontrol/main_field/RControlPage";
import { AdminOnlyRoute } from "../components/app_protectedroutes/AdminOnlyRoute";

import Login from "../components/pages/Login";
import Home from "../components/pages/Home";
import Profile from "../components/pages/Profile";
import LogicControlJournal from "../components/pages/LogicControlJournal";
import FormatControlJournal from "../components/pages/FormatControlJournal/FormatControlJournal";
import LogicControlErrors from '../components/pages/LogicControlErrors/LogicControlErrors';
import Manual from "../components/pages/Manual";
import Users from "../components/pages/Users";

export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            errorElement: <div>404 - страница не найдена</div>,
            children: [
                {
                    index: true,
                    element: (
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    )
                },
                {
                    path: 'login',
                    element: (
                        <PublicOnlyRoute>
                            <Login />
                        </PublicOnlyRoute>),
                },
                {
                    path: 'profile',
                    element: (
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    )
                },
                {
                    path: 'journal-lc',
                    element: (
                        <ProtectedRoute>
                            <LogicControlJournal />
                        </ProtectedRoute>
                    )
                },
                {
                    path: 'journal-fc',
                    element: (
                        <ProtectedRoute>
                            <FormatControlJournal />
                        </ProtectedRoute>
                    )
                },
                {
                    path: 'manual',
                    element: (
                        <ProtectedRoute>
                            <Manual />
                        </ProtectedRoute>
                    )
                },
                {
                    path: 'admin/rcontrol',
                    element: (
                        <AdminOnlyRoute>
                            <ProtectedRoute>
                                <RControlPage />
                            </ProtectedRoute>
                        </AdminOnlyRoute>
                    )
                },
                {
                    path: 'admin/users',
                    element: (
                        <AdminOnlyRoute>
                            <ProtectedRoute>
                                <Users />
                            </ProtectedRoute>
                        </AdminOnlyRoute>
                    )
                },
                {
                    path: 'errors/:schetUid',
                    element: <LogicControlErrors />
                }
            ]
        }
    ]
)