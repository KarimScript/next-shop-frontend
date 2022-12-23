import {getCookie , setCookie , deleteCookie} from 'cookies-next'

export const getToken = () => {
  return getCookie("authToken");
};

export const setToken = (token) => {
  if (token) {
    // token will exipre after 7 days 
    setCookie("authToken", token , {maxAge:60*60*24*7});
  }
};

export const removeToken = () => {
  deleteCookie("authToken");
};