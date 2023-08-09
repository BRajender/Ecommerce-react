import { BASE_URL } from "../constans/api_routes.js";

//Register service
export const signup = async (data) => {
  const result = await fetch(`${BASE_URL}/user/register`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: data,
  });
  return result;
};

//Login service
export const login=async(data)=>{
  const result = await fetch(`${BASE_URL}/user/login`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: data,
  });
  return result;

}
