import { Link, useNavigate } from "react-router";
import { useAuth } from "../app_auth/auth_service/AuthProvider";
import { useEffect, useRef, useState } from "react";
import { Separator } from "../../shared/ui/seporator/Separator";
import style from './AppHeader.module.css';

export const AppHeader = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [openAdminSubMenu, setOpenAdminSubMenu] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();


    const dropdownRef = useRef<HTMLDivElement>(null);
    const isLoggedIn = !!user;
    const isAdmin = user?.organizationCode === '19000'

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    }

    const toggleSubAdminMenu = () => {
        setOpenAdminSubMenu(perv => !perv);
    }

    const closeDropdown = () => {
        setIsDropdownOpen(false);
        setOpenAdminSubMenu(false);
    }

    const handleExitButton = async () => {
        await logout();
        closeDropdown();
        navigate("/login");
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeDropdown();
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') closeDropdown();
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isDropdownOpen]);

    return (
        <header className={style.app_header}>
            <div className={style.container}>
                <div
                    className={style.logo}>
                    <Link
                        to="/"
                        className={style.logo_link}>
                        <span>HealthInvoice Hub V1.0.0</span>
                    </Link>
                </div>
                {isLoggedIn && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                    }} ref={dropdownRef}>
                        <button
                            className="dropdown_menu_button"
                            onClick={toggleDropdown}
                            aria-expanded={isDropdownOpen}
                            aria-label="Меню"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24">
                                <path
                                    fill="none"
                                    stroke="black"
                                    stroke-linecap="round"
                                    stroke-width="2"
                                    d="M18 7H6m12 10H6m12-5H6" />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <div className="dropdown_menu_content">
                                <ul>
                                    {isLoggedIn && (
                                        <>
                                            <li>
                                                <Link to="/profile" onClick={closeDropdown}>
                                                    <div style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between'
                                                    }}>
                                                        Профиль
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M11.5 17.5L5 11m0 0v4.5M5 11h4.5m3-4.5L19 13m0 0V8.5m0 4.5h-4.5" />
                                                        </svg>

                                                    </div>
                                                </Link>

                                            </li>
                                            <li>
                                                <Link to="/journal" onClick={closeDropdown}>
                                                    <div style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between'
                                                    }}>
                                                        Журнал ФЛК
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24">
                                                            <circle
                                                                cx="12"
                                                                cy="12"
                                                                r="4"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                stroke-width="1.5" />
                                                        </svg>
                                                    </div>
                                                </Link>
                                            </li>

                                            {isAdmin && (
                                                <>
                                                    <Separator type='line' orientation='horizontal' size='xs' color="var(--border-light-menu-context)" />
                                                    <li>
                                                        <button
                                                            className={openAdminSubMenu ? "focus_category" : ""}
                                                            style={{
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                fontWeight: '500'
                                                            }}
                                                            onClick={() => toggleSubAdminMenu()}>
                                                            Админ панель
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24">
                                                                <path
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    stroke-linecap="round"
                                                                    stroke-width="2"
                                                                    d="m9.583 17.5l4.858-4.859a.2.2 0 0 0 0-.282L9.583 7.5" />
                                                            </svg>
                                                        </button>
                                                    </li>

                                                </>
                                            )}
                                            <li>
                                                <Separator type='line' orientation='horizontal' size='xs' color="var(--border-light-menu-context)" />
                                            </li>
                                            <li>
                                                <Link to="/docs" onClick={closeDropdown}>
                                                    <div style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between'
                                                    }}>
                                                        Инструкция
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                            <g fill="none" stroke="currentColor" stroke-width="1.5">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.429 7H7.714c-.454 0-.89.158-1.212.44A1.41 1.41 0 0 0 6 8.5v9c0 .398.18.78.502 1.06c.322.282.758.44 1.212.44h8.572c.454 0 .89-.158 1.212-.44A1.41 1.41 0 0 0 18 17.5v-9c0-.398-.18-.78-.502-1.06A1.85 1.85 0 0 0 16.286 7H14.57" />
                                                                <rect width="5.158" height="3.368" x="9.421" y="5" rx="1.5" />
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </Link>
                                            </li>
                                            {/* <li>
                                                <Link to="/links" onClick={closeDropdown}>
                                                    <div style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between'
                                                    }}>
                                                        Связь с нами
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24">
                                                            <g
                                                                fill="none"
                                                                stroke="currentColor"
                                                                stroke-linecap="round"
                                                                stroke-width="1.5">
                                                                <path d="m7.7 12.6l-.021.02a2.795 2.795 0 0 0-.044 4.005v0a2.795 2.795 0 0 0 3.936.006l1.455-1.438a3 3 0 0 0 .34-3.866l-.146-.207" />
                                                                <path d="m16.22 11.12l.136-.14c.933-.953.992-2.46.135-3.483v0a2.597 2.597 0 0 0-3.664-.32L11.39 8.386a3 3 0 0 0-.301 4.3l.031.034" />
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </Link>
                                            </li> */}
                                            <li>
                                                <Separator type='line' orientation='horizontal' size='xs' color="var(--border-light-menu-context)" />
                                            </li>
                                            <li>
                                                <button
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        fontWeight: '500'
                                                    }}
                                                    onClick={handleExitButton}>
                                                    Выйти
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.333 13.667L6 10.333L9.333 7M6 10.333h9.167a3.333 3.333 0 0 1 0 6.667h-.834" />
                                                    </svg>
                                                </button>
                                            </li>
                                        </>
                                    )}
                                    {!isLoggedIn && (
                                        <li><Link to="/login" onClick={closeDropdown}>Войти</Link></li>
                                    )}
                                </ul>

                            </div>
                        )}
                        {openAdminSubMenu && (
                            <div className="admin_sub_menu_content">
                                <ul>
                                    <li>
                                        <Link to="/admin/users_control" onClick={closeDropdown}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}>
                                                Пользователи
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <g
                                                        fill="none"
                                                        stroke="currentColor"
                                                        stroke-width="1.5">
                                                        <path d="M10 10c.714 0 1.239-.434 1.54-.885c.304-.457.46-1.03.46-1.615c0-.584-.156-1.158-.46-1.615C11.238 5.435 10.714 5 10 5s-1.239.434-1.54.885C8.157 6.342 8 6.915 8 7.5c0 .584.156 1.158.46 1.615c.301.45.825.885 1.54.885Z" />
                                                        <ellipse cx="10" cy="16" rx="3" ry="5" transform="rotate(-90 10 16)" />
                                                        <path stroke-linecap="round" d="M15.556 10.222a1.778 1.778 0 1 0 0-3.555M17.5 13c3.5 1.5 3 5 .5 5.5" />
                                                    </g>
                                                </svg>

                                            </div>
                                        </Link>

                                    </li>
                                    <li>
                                        <Link to="/admin/rcontrol" onClick={closeDropdown}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}>
                                                RContol Веб
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24">
                                                    <g fill="none" stroke="currentColor" stroke-width="1.5">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M18.992 9.5h.01M14.5 5h.01" />
                                                        <path stroke-linecap="round" d="M14.625 5H15a4 4 0 0 1 4 4v.375" />
                                                        <path d="M9.375 5H9a4 4 0 0 0-4 4v.375" />
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.373 5h.01M5 9.5h.01" />
                                                        <path d="M9.375 19H9a4 4 0 0 1-4-4v-.375" />
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.373 19h.01M5 14.55h.01" />
                                                        <path stroke-linecap="round" d="M16 13v3m0 3v-3m3 0h-3m0 0h-3" />
                                                    </g>
                                                </svg>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};