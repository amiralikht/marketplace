const setCookie = tokens =>{
    document.cookie = `accessToken=${tokens.accessToken}; max-age=${1 * 24 * 60 * 60}`;
    document.cookie = `refreshToken=${tokens.refreshToken}; max-age=${30 * 24 * 60 * 60}`;
}

const getCookie = (cookieName) =>{
    return document.cookie.split(";")
    .find(token=>token.trim().split("=")[0] === cookieName)?.split("=")[1];
}

const removeCookies = () => {
    document.cookie.split(";").forEach(cookie => {
        const cookieName = cookie.split("=")[0].trim();
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    
}

export {setCookie, getCookie, removeCookies}