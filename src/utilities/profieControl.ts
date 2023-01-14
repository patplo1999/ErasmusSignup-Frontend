import { getCookie, setCookie } from 'typescript-cookie'

const isLoggedIn = (): Boolean => {
    return getCookie("oauth_token") != null && getCookie("oauth_verifier") != null;
  }
  
export default isLoggedIn;