import * as actionConstants from './actionConstants'
import axios from "axios"
import {AUTHENTICATE_URL, REGISTRATION_URL} from "../../constants";


export const authStart = () => {
    return {
        type: actionConstants.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionConstants.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionConstants.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem("is_admin")
    localStorage.removeItem("username")
    localStorage.removeItem("token")
    return {
        type: actionConstants.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(AUTHENTICATE_URL, {
            username: username,
            password: password
        })
            .then(res => {
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600000);
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem("username", username)
                localStorage.setItem("is_admin", res.data.is_admin)
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
            })
            .catch(error => {
                dispatch(authFail(error))
            })
        ;
    }
}

export const authSignup = (username, email, password, passwordRepeat) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(REGISTRATION_URL, {
            username: username,
            email: email,
            password1: password,
            password2: passwordRepeat
        })
            .then(res => {
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600000);
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('username', res.data.username)
                localStorage.setItem("is_admin", res.data.isStaff)
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
            })
            .catch(error => {
                dispatch(authFail(error))
            })
        ;
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}