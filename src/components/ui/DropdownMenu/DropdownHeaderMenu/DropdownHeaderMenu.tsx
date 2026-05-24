import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import GorizontalSeporator from "../../Seporators/GorizontalSeporator";
import styles from "./styles.module.scss";
import Button from "../../Button/Button";

interface Props {
    logout: () => void;
}

const DropdownHeaderMenu = ({ logout }: Props) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownHeaderMenuRef = useRef<HTMLDivElement>(null);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownHeaderMenuRef.current && !dropdownHeaderMenuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleClickEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            };
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleClickEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleClickEscape);
        }
    }, [isOpen]);

    return (

        <div className={styles.dropdownHeaderMenuRoot}>

            <Button
                variant="icon"
                fullWidth={false}
                onClick={toggleOpen}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24">
                    <path
                        fill="none"
                        stroke="black"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2" d="M5 17h14M5 12h14M5 7h8" />
                </svg>
            </Button>

            {isOpen && (
                <div
                    ref={dropdownHeaderMenuRef}
                    className={styles.menuRoot}
                    onClick={toggleOpen}>
                    <ul>

                        <div className={styles.menuItem}>
                            <span className={styles.menuTitle}>Мой аккаунт</span>
                        </div>

                        <li>
                            <Link
                                to='/profile'
                                className={styles.linkItem}>
                                <span>Профиль</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="none"
                                        stroke="var(--black)"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M18 19c0-2.21-2.686-4-6-4s-6 1.79-6 4m6-7a4 4 0 1 1 0-8a4 4 0 0 1 0 8" />
                                </svg>
                            </Link>
                        </li>

                        <li>
                            <Link
                                to='/docs'
                                className={styles.linkItem}
                                onClick={toggleOpen}>
                                <span>Инструкция</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="none"
                                        stroke="var(--black)"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2" d="M5 14h5v5m9-9h-5V5" />
                                </svg>
                            </Link>
                        </li>

                        <li>
                            <button
                                onClick={logout}>
                                <span className={styles.exitSpan}>Выйти</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="none"
                                        stroke="var(--error)"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.7"
                                        d="m12 15l3-3m0 0l-3-3m3 3H4m5-4.751V7.2c0-1.12 0-1.68.218-2.108c.192-.377.497-.682.874-.874C10.52 4 11.08 4 12.2 4h4.6c1.12 0 1.68 0 2.107.218c.377.192.683.497.875.874c.218.427.218.987.218 2.105v9.607c0 1.118 0 1.677-.218 2.104a2 2 0 0 1-.875.874c-.427.218-.986.218-2.104.218h-4.606c-1.118 0-1.678 0-2.105-.218a2 2 0 0 1-.874-.874C9 18.48 9 17.92 9 16.8v-.05" />
                                </svg>
                            </button>
                        </li>

                        <GorizontalSeporator size="xs" type="line" color="var(--gray-200)" />

                        <div className={styles.menuItem}>
                            <span className={styles.menuTitle}>Работа со счетами</span>
                        </div>

                        <li>
                            <Link
                                to='/journal'
                                className={styles.linkItem}
                                onClick={toggleOpen}>
                                <span>Журнал реестров</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="none"
                                        stroke="var(--black)"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.6"
                                        d="M7 17L17 7m0 0H9m8 0v8" />
                                </svg>
                            </Link>
                        </li>

                        <GorizontalSeporator size="xs" type="line" color="var(--gray-200)" />

                        <div className={styles.menuItem}>
                            <span className={styles.menuTitle}>Администрация</span>
                        </div>

                        <li>
                            <Link
                                to='/admin/rcontrol'
                                className={styles.linkItem}
                                onClick={toggleOpen}>
                                <span>RControl Веб</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="none"
                                        stroke="var(--black)"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.8"
                                        d="M11.235 2.374c-.368.152-.697.482-1.356 1.14c-.659.66-.989.989-1.14 1.356a2 2 0 0 0 0 1.531c.151.368.48.697 1.14 1.356c.658.659.988.989 1.356 1.14a2 2 0 0 0 1.53 0c.368-.151.697-.48 1.356-1.14s.988-.988 1.14-1.356a2 2 0 0 0 0-1.53c-.152-.368-.48-.697-1.14-1.356s-.988-.989-1.356-1.141a2 2 0 0 0-1.53 0M4.87 8.738c-.367.152-.697.481-1.355 1.14c-.66.66-.989.989-1.141 1.356a2 2 0 0 0 0 1.531c.152.368.482.697 1.14 1.356c.66.659.989.988 1.356 1.14a2 2 0 0 0 1.531 0c.368-.152.697-.481 1.356-1.14s.988-.988 1.14-1.356a2 2 0 0 0 0-1.53c-.152-.368-.48-.698-1.14-1.357s-.988-.988-1.356-1.14a2 2 0 0 0-1.53 0m11.372 1.14c-.659.66-.988.989-1.14 1.356a2 2 0 0 0 0 1.531c.152.368.481.697 1.14 1.356s.989.988 1.356 1.14a2 2 0 0 0 1.53 0c.368-.152.698-.481 1.357-1.14s.987-.988 1.14-1.356a2 2 0 0 0 0-1.53c-.153-.368-.481-.698-1.14-1.357c-.66-.659-.989-.988-1.356-1.14a2 2 0 0 0-1.531 0c-.367.152-.697.481-1.356 1.14m-5.008 5.224c-.368.152-.697.482-1.356 1.14c-.659.66-.989.989-1.14 1.357a2 2 0 0 0 0 1.53c.151.368.48.697 1.14 1.356c.658.659.988.989 1.356 1.14a2 2 0 0 0 1.53 0c.368-.151.697-.48 1.356-1.14s.988-.988 1.14-1.356c.203-.49.203-1.04 0-1.53c-.152-.368-.48-.698-1.14-1.356c-.659-.66-.988-.989-1.356-1.141a2 2 0 0 0-1.53 0" />
                                </svg>
                            </Link>
                        </li>

                        <li>
                            <Link
                                to='/admin/users_control'
                                className={styles.linkItem}
                                onClick={toggleOpen}>
                                <span>Пользователи</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="none"
                                        stroke="var(--black)"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.8"
                                        d="M17 20c0-1.657-2.239-3-5-3s-5 1.343-5 3m14-3c0-1.23-1.234-2.287-3-2.75M3 17c0-1.23 1.234-2.287 3-2.75m12-4.014a3 3 0 1 0-4-4.472m-8 4.472a3 3 0 0 1 4-4.472M12 14a3 3 0 1 1 0-6a3 3 0 0 1 0 6" />
                                </svg>
                            </Link>
                        </li>
                    </ul>
                </div>
            )
            }
        </div >
    )
}

export default DropdownHeaderMenu;