import { reabApi } from './reabApi';

export function getSessions(page = 1) {
	return reabApi.get(`/section/paginated?page=${page}`)
}

export function registerSession(data) {
	return reabApi.post('/section', data)
}
