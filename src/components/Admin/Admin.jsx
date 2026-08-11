import React, { useState, useEffect } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import './Admin.css';
import { API_URL } from '../../config/api';

function isJwtStillValid(token) {
    if (!token || typeof token !== 'string') return false;
    try {
        const parts = token.split('.');
        if (parts.length < 2) return false;
        const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
        if (payload.exp && payload.exp * 1000 <= Date.now()) return false;
        return true;
    } catch {
        return false;
    }
}

const Admin = () => {
    const [authState, setAuthState] = useState('checking'); // checking | guest | authenticated
    const [token, setToken] = useState(() => localStorage.getItem('adminToken'));

    useEffect(() => {
        const restoreSession = async () => {
            const stored = localStorage.getItem('adminToken');

            // No token => login page
            if (!stored || !isJwtStillValid(stored)) {
                localStorage.removeItem('adminToken');
                setToken(null);
                setAuthState('guest');
                return;
            }

            // Keep logged in on refresh until Logout / token expiry
            setToken(stored);
            setAuthState('authenticated');

            // Soft server check — only force logout on clear auth failure
            try {
                const res = await fetch(`${API_URL}/me`, {
                    headers: { Authorization: `Bearer ${stored}` }
                });

                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('adminToken');
                    setToken(null);
                    setAuthState('guest');
                }
            } catch {
                // Network / API down: keep local session so refresh does not kick to login
            }
        };

        restoreSession();
    }, []);

    const handleLogin = (receivedToken) => {
        localStorage.setItem('adminToken', receivedToken);
        setToken(receivedToken);
        setAuthState('authenticated');
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setToken(null);
        setAuthState('guest');
    };

    if (authState === 'checking') {
        return (
            <div className="admin-container">
                <div className="loading">Checking secure access…</div>
            </div>
        );
    }

    return (
        <div className="admin-container">
            {authState === 'authenticated' && token ? (
                <Dashboard onLogout={handleLogout} />
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </div>
    );
};

export default Admin;
