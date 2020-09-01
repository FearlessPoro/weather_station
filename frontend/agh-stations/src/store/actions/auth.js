import * as actionConstants from './actionConstants'
import {AxiosInstance as axios} from "axios";

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
        axios.post("http://localhost:8000/api-auth/login/", {
            username: username,
            password: password
        })
            .then(res => {
                const token =res.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600000);
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
            })
            .catch(error => {
                dispatch(authFail(error))
            })
        ;
    }
}

export const authSignup = (username, email,  password, passwordRepeat) => {
    return dispatch => {
        dispatch(authStart());
        axios.post("http://localhost:8000/api-auth/registration/", {
            username: username,
            email: email,
            password1: password,
            password2: passwordRepeat
        })
            .then(res => {
                const token =res.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600000);
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
            })
            .catch(error => {
                dispatch(authFail(error))
            })
        ;
    }
}