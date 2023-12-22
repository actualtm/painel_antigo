import { reabApi } from './reabApi';

export async function loginRequest({ email, password }) {
  const response = await reabApi.post(`/users/login`, {
    email,
    password,
  });

  return {
    token: response.data.token,
  };
}

export async function getUser(user_id) {
  try {
    const response = await reabApi.get(`/users/${user_id}`);

    return {
      user: response.data,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getUsers(page = 1) {
  try {
    const response = await reabApi.get(`/users/paginated?page=${page}`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}


export async function getTherapists(input) {
  try {
    const response = await reabApi.get(`/users/?role=T`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function getPacients(input) {
  try {
    const response = await reabApi.get(`/users/?role=P`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function me() {
  try {
	const response = await reabApi.get(`/users/me`);

	return response.data.me;
  } catch (error) {
	console.error(error);
  }
}

export async function createNewUser(user) {
  try {

	const response = await reabApi.post(`/users`, {
		clinic_id: user.clinic_id,
		cpf: user.cpf,
		username: user.username,
		email: user.email,
		admin: user.admin,
		type: user.type,
		password: user.password,
	});

	return response.data;
  } catch (error) {
	console.error(error);
  }
}

export async function deleteUser(user_id) {
  try {
	const response = await reabApi.delete(`/users/${user_id}`);

	return response.data;
  } catch (error) {
	console.error(error);
  }
}
