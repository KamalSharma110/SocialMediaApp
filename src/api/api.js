const BASE_URL = 'http://localhost:8080';

const getToken = () => {
  const currentUserInfo = localStorage.getItem("currentUserInfo");
  if (currentUserInfo) {
    return JSON.parse(currentUserInfo).token;
  } else throw new Error("Unable to find the token");
};

const sendRequest = async (url, method, body, isAuthenticated = true) => {
  let headers = {};

  if (method === "POST") headers["Content-Type"] = "application/json";

  if (isAuthenticated) {
    const token = getToken();
    if (token) headers.Authorization = "Bearer " + token;
  }

  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
  });

  const resData = await response.json();

  if (!response.ok) {
    if(!isAuthenticated){
      const error = new Error();
      for(const e of resData.errors){
        error[e['path']] = e.msg;
      }
      throw error;
    }
    else throw new Error(resData.error.message);
  }

  return resData;
};

export const signup = async(body) => {
  return await sendRequest(BASE_URL + '/auth/signup', 'POST', body, false);
};

export const login = async(body) => {
  return await sendRequest(BASE_URL + '/auth/login', 'POST', body, false);
};
