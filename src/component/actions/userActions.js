export const LOGGED_IN_USER = 'LOGGED_IN_USER'
export const LOGOUT = 'LOGOUT'

export const setUser = (payload) => {
  return {
    type: LOGGED_IN_USER,
    payload: payload
  }
}

export const logOut = () => {
  return {
    type: LOGOUT,
    payload: null
  }
}