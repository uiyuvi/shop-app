import { AsyncStorage } from "react-native";

export const SIGN_UP = "SIGN_UP";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
let autoSignoutTimer;

export const signOut = () => {
    return async dispatch => {
        clearTimeout(autoSignoutTimer);
        AsyncStorage.removeItem('userData')
        dispatch({
            type: SIGN_OUT
        })
    }
}

export const signUp = (username, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDZo5XI6GrKW5w1Y6-eqSiqEFFKri5Qjvg', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: username,
                password: password,
                returnSecureToken: true
            })
        })

        let responseData = await response.json();
        if (!response.ok) {
            const error = responseData.error.message;
            let errorMessage = "Something went wrong!!!";
            if (error === 'EMAIL_EXISTS') {
                errorMessage = "Username already exists !!!"
            }
            if (error === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
                errorMessage = "Exceeded maximum number of attempts, please try again later."
            }
            throw new Error(errorMessage);
        }
        dispatch({ type: SIGN_UP })
    }
};

export const signIn = (username, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDZo5XI6GrKW5w1Y6-eqSiqEFFKri5Qjvg', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: username,
                password: password,
                returnSecureToken: true
            })
        })

        let responseData = await response.json();
        if (!response.ok) {
            const error = responseData.error.message;
            let errorMessage = "Something went wrong!!!";
            if (error === 'EMAIL_NOT_FOUND' || error === 'INVALID_PASSWORD') {
                errorMessage = "You cannot login with provided details !!!"
            }
            if (error === 'USER_DISABLED') {
                errorMessage = "Username is blocked for some reason !!!"
            }
            throw new Error(errorMessage);
        }
        let expirationDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000);
        storeUserData(responseData.localId, responseData.idToken, expirationDate);
        dispatch(authenticate(responseData.localId, responseData.idToken, expirationDate))
        dispatch(autoSignoutAfterDelay(parseInt(responseData.expiresIn) * 1000));
    }
}

export const authenticate = (userId, token, expirationDate) => ({
    type: SIGN_IN,
    userId: userId,
    token: token,
    expirationDate: expirationDate
})

const storeUserData = (userId, token, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        userId: userId,
        token: token,
        expiryDate: expirationDate.toISOString()
    }))
}

const autoSignoutAfterDelay = (delay) => {
    return dispatch => {
        autoSignoutTimer = setTimeout(function () {
            dispatch(signOut())
        }, delay/100)
    }
}