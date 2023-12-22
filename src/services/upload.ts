import { reabApi } from './reabApi';

export function upload(file) {
	const formData = new FormData()
	formData.append('file', file) 

	return reabApi.post('/upload', formData)
}
