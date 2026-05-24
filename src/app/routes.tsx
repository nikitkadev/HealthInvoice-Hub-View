import { createBrowserRouter } from "react-router";

import { App } from "./App";
import { ProtectedRoute } from "../components/app_protectedroutes/ProtectedRoute";
import { PublicOnlyRoute } from "../components/app_protectedroutes/PublicOnlyRoute";
import { RControlPage } from "../components/app_admin/rcontrol/main_field/RControlPage";
import { UserControlPage } from "../components/app_admin/users/UserControlPage";
import { PersonalDataPage } from "../components/app_personal/PersonalDataPage";
import { AdminOnlyRoute } from "../components/app_protectedroutes/AdminOnlyRoute";
import { Docs } from "../components/app_docs/Docs";
import { LkJournalErrorsPage } from "../components/errors/LkJournalErrorsPage";

import Login from "../components/pages/Login";
import Home from "../components/pages/Home";
import Profile from "../components/pages/Profile";
import Journal from "../components/pages/Journal";

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
                    path: 'journal',
                    element: (
                        <Journal />
                    )
                },
                {
                    path: 'docs',
                    element: (
                        <ProtectedRoute>
                            <Docs />
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
                    path: 'admin/users_control',
                    element: (
                        <AdminOnlyRoute>
                            <ProtectedRoute>
                                <UserControlPage />
                            </ProtectedRoute>
                        </AdminOnlyRoute>
                    )
                },
                {
                    path: 'errors/:schetUid',
                    element: <LkJournalErrorsPage />
                }
            ]

        },
        {
            path: '/consent',
            element: (
                <PersonalDataPage />
            )
        }
    ]
)