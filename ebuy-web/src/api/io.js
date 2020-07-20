import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/ebuy-api";
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["Access-Control-Allow-Headers"] = "*";

export const io = ({ url, method, data, params, headers, requestToken }) => {
  //   if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //   else if (requestToken)
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${requestToken}`;

  // refer here : https://www.npmjs.com/package/axios#axiosrequestconfig-1
  return axios({
    url,
    method,
    headers,
    params,
    data,
  });
};
