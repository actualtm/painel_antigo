import { reabApi } from './reabApi';

export async function getClinics() {
  return reabApi.get('/clinics').then(res => res.data);
}

export async function registerClinics(data: any) {
	return reabApi.post('/clinics', data).then(res => res.data)
}

export async function deleteClinics(id: number) {
	return reabApi.delete(`/clinics/${id}`).then(res => res.data)
}
