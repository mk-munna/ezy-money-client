import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';

const UserDashboard = () => {
    const { auth, logout } = useContext(AuthContext);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const { data } = await axios.get('/api/balance', {
                    headers: { Authorization: `Bearer ${auth}` }
                });
                setBalance(data.balance);
            } catch (err) {
                console.error(err);
            }
        };
        fetchBalance();
    }, [auth]);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Balance: {balance} Taka</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
export default UserDashboard;