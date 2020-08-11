export const SIGN_UP = "SIGN_UP";
export const SIGN_IN = "SIGN_IN";

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
        dispatch({ 
            type: SIGN_IN,
            userId: responseData.localId,
            token: responseData.idToken
         })
    }
}