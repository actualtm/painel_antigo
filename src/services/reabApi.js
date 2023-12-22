import axios from 'axios';
import { parseCookies } from 'nookies';

const { reabsystem_token } = parseCookies();

export const reabApi = axios.create({
	baseURL: "https://reabilitycenter-api.com/api",
});

if (reabsystem_token) {
  reabApi.defaults.headers['Authorization'] = `Bearer ${reabsystem_token}`;
}
