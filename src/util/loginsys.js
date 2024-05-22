export const autoLogin = () => {
  console.log('autlogin')
  const key = localStorage.getItem('pteroKey') || process.env.REACT_APP_PTERO_KEY
  const url = localStorage.getItem('pteroURL') || process.env.REACT_APP_PTERO_URL
    // console.log(url,key)
  if (!localStorage.getItem('pteroKey') && key) localStorage.setItem('pteroKey', key)
  if (!localStorage.getItem('pteroURL') && url) localStorage.setItem('pteroURL', url)
  if (process.env.REACT_APP_PTERO_KEY && !localStorage.getItem('pteroKey')) {
    // console.log('autlogin')

    localStorage.setItem('pteroKey', process.env.REACT_APP_PTERO_KEY)
  }
  if (process.env.REACT_APP_PTERO_URL && !localStorage.getItem('pteroURL')) {
    // console.log('autlogin')
    localStorage.setItem('pteroURL', process.env.REACT_APP_PTERO_URL)
  }
  if (key && url) {
    return { key, url }
  }
}
export const login = async (pteroKey, pteroURL) => {
  localStorage.setItem('pteroKey', pteroKey)
  localStorage.setItem('pteroURL', pteroURL)
  try {
    return await fetch(pteroURL + '/api/client/account', {
      headers: {
        Authorization: 'Bearer ' + pteroKey,
        Referer: pteroURL
      }
        // mode: 'no-cors'
    }).then(r => r.text()).then(r => {
      console.log(r)
      try {
        let json = JSON.parse(r)
        alert('Welcome ' + json.attributes.username + '!')
      } catch (e) {
        alert('Invalid key or url!')
        logout()
      }
    })
  } catch (e) {
    alert(e.message)
    logout()
  }
}

export const logout = () => {
  localStorage.removeItem('pteroKey')
  localStorage.removeItem('pteroURL')
}

export const isLoggedIn = () => {
  autoLogin()
  return localStorage.getItem('pteroKey') && localStorage.getItem('pteroURL')
}

export const getLoginData = () => {
  return {
    key: localStorage.getItem('pteroKey'),
    url: localStorage.getItem('pteroURL')
  }
}
