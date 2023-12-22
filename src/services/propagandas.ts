import { reabApi } from './reabApi';

export function getPropagandas() {
	return reabApi.get('propagandas')
}

export function registerPropaganda(data) {
	return reabApi.post('propagandas', data)
}
