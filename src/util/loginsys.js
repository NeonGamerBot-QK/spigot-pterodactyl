export const autoLogin = () => {
    const key = localStorage.getItem('pteroKey') || process.env.PTERO_KEY
    const url = localStorage.getItem('pteroURL') || process.env.PTERO_URL

    if (process.env.PTERO_KEY && !localStorage.getItem('pteroKey')) { 
        localStorage.setItem('pteroKey', process.env.PTERO_KEY)
    }
    if (process.env.PTERO_URL && !localStorage.getItem('pteroURL')) { 
        localStorage.setItem('pteroURL', process.env.PTERO_URL)
    }
    if (key && url) {
        return { key, url }
    }
}
export const login = (pteroKey, pteroURL) => {
    localStorage.setItem('pteroKey', pteroKey)
    localStorage.setItem('pteroURL', pteroURL)
}

export const logout = () => { 
    localStorage.removeItem('pteroKey')
    localStorage.removeItem('pteroURL')
}

export const isLoggedIn = () => {
    return localStorage.getItem('pteroKey') && localStorage.getItem('pteroURL')
}

export const getLoginData = () => { 
    return {
        key: localStorage.getItem('pteroKey'),
        url: localStorage.getItem('pteroURL')
    }
}