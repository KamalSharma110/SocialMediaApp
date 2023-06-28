export const getExpirationTime = () => {
    let expirationTime = JSON.parse(localStorage.getItem('currentUserInfo')).expirationTime;
    return new Date(expirationTime) - Date.now();
};