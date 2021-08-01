import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//impotying custom components
import Login from './login/login.component';
import Signup from './signup/signup.component';

const Auth = () => {
    const [form, setForm] = useState('login');
    const email = useSelector(state => state?.currentUser?.email);
    const history = useHistory();

    useEffect(() => {
        if (email) {
            history.push('/');
        }
    }, [email, history]);

    return form === 'login'
        ? <Login setForm={setForm} />
        : <Signup setForm={setForm} />
}

export default Auth;