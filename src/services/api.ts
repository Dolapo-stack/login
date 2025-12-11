import axios from "axios";
import loginConfig from "./interceptors";

export const api = axios.create({
  baseURL: "https://blog-website-api.vercel.app/api/user",
});

interface IData {
  name: string;
  email: string;
  password: string;
}

type IloginDetails  = Pick<IData, "email" | "password">;

export const register = async (data: IData) => {
  try {
    const response = await api.post("/register", data);
    console.log(response)
    return response;
  } catch (error) {
    throw error;
  }
};

export const login = async (data: IloginDetails) => {
  try {
    const response = await api.post("/login", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getNews = async () => {
  try {
    const response = await axios.get(
      "https://newsapi.org/v2/everything?q=tesla&from=2025-11-11&sortBy=publishedAt&apiKey=373b5211c8f541cea53ad4df5edd4b33"
    );
    return response;
  } catch (error) {
    throw error;
  }
};
