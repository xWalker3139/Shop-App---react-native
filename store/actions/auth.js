export const SIGNUP = "SIGNUP";

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyBykjABefjSWjT4isNvCinHeLEqRBoAiuc', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: false,
            })
        });
        if(!response.ok){
            throw new Error('Something went wrong!');
        }
        const resData = await response.json();
        console.log(resData);
        dispatch({ type: SIGNUP});
    }
}