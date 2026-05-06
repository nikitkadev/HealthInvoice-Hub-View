import { createBrowserRouter } from "react-router";

import { App } from "./App";
import { AppMainPage } from "./components/app_mainpage/AppMainPage";
import { ProfilePage } from "./components/app_profile/ProfilePage";
import { ProtectedRoute } from "./components/app_protectedroutes/ProtectedRoute";
import { PublicOnlyRoute } from "./components/app_protectedroutes/PublicOnlyRoute";
import { RControlPage } from "./components/app_admin/rcontrol/RControlPage";
import { JournalPage } from "./components/app_lk_journal/general/JournalPage";
import { UserControlPage } from "./components/app_admin/users/UserControlPage";
import { PersonalDataPage } from "./components/app_personal/PersonalDataPage";
import { AdminOnlyRoute } from "./components/app_protectedroutes/AdminOnlyRoute";
import { Docs } from "./components/app_docs/Docs";
import { LoginPage } from "./components/app_auth/login/LoginPage";
import { LkJournalErrorsPage } from "./components/errors/LkJournalErrorsPage";

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
                            <AppMainPage />
                        </ProtectedRoute>
                    )
                },
                {
                    path: 'login',
                    element: (
                        <PublicOnlyRoute>
                            <LoginPage />
                        </PublicOnlyRoute>),
                },
                {
                    path: 'profile',
                    element: (
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    )
                },
                {
                    path: 'journal',
                    element: (
                        <ProtectedRoute>
                            <JournalPage />
                        </ProtectedRoute>
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