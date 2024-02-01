import axios from "axios";
import * as Localization from "expo-localization";

const Axios = axios.create({
  method: "GET",
  baseURL: "https://api.themoviedb.org/3/",
  params: { language: Localization.getLocales()[0].languageCode },
  headers: {
    accept: "application/json",
    Authorization: process.env.EXPO_PUBLIC_API_KEY,
  },
});

export default Axios;
