export const BASE_URL = 'http://localhost:8080';

const getToken = () => {
  const currentUserInfo = localStorage.getItem("currentUserInfo");
  if (currentUserInfo) {
    return JSON.parse(currentUserInfo).token;
  } else throw new Error("Unable to find the token");
};

const sendRequest = async (url, method, body, isAuthenticated = true, isMultiPart = false) => {
  const headers = {};
  const options = {};

  if (method === "POST"){
    if(!isMultiPart) {
      headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }
    else options.body = body;
  }

  if (isAuthenticated) {
    const token = getToken();
    if (token) headers.Authorization = "Bearer " + token;
  }

  options.method = method;
  options.headers = headers;

  const response = await fetch(url, options);

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

export const createPost = async(body) => {
  return await sendRequest(BASE_URL + '/create-post', 'POST', body, true, true);
};

export const getPosts = async() => {
  return await sendRequest(BASE_URL + '/posts', 'GET');
};

export const addFriend = async(body) => {
  return await sendRequest(BASE_URL + '/friend?add=true', 'POST', body);
};

export const removeFriend = async(body) => {
  return await sendRequest(BASE_URL + '/friend?add=false', 'POST', body);
};

export const getFriends = async() => {
  return await sendRequest(BASE_URL + '/friends', 'GET');
};



