'use client';

import { getUser, loginRequest, me } from '@/services/auth';
import { createContext, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { useRouter } from 'next/navigation';
import { reabApi } from '@/services/reabApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';


type Auth = {
	state: "loading",
} | {
	state: "unauthenticated",
} | {
	state: "authenticated",
	token: string,
	user: {
		email: string,
		username: string,
		admin: boolean,
		clinic_id: string
	},
};

export const AuthContext = createContext<Auth & {
	login: (data: { email: string, password: string }) => Promise<void>,
	logout: () => Promise<void>,
}>({
	state: "loading",
	login: async () => { },
	logout: async () => { },
});

export function AuthProvider({ children }) {
	const [state, setState] = useState<Auth>({ state: "loading" });
	const [token, setToken] = useState(null)
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState(null)
	const router = useRouter();

	useEffect(() => {
		localStorage.setItem('reab.authentication', JSON.stringify(state))
	}, [state])

	useEffect(() => {
		try {
			const stored = JSON.parse(localStorage.getItem('reab.authentication'))
			if (stored) {
				setState(stored)
			}

			if (!stored || stored.state === "loading") {
				setState({ state: "unauthenticated" })
			}
			console.log(stored)
		} catch (error) {
			console.log(error)
		}

	}, [])

	async function login({ email, password }) {
		const { token } = await loginRequest({
			email,
			password,
		});

		reabApi.defaults.headers['Authorization'] = `Bearer ${token}`;

		me().then((user) => {
			setState({
				state: "authenticated",
				token: token,
				user: user
			})

			router.replace('/dashboard');
		})

		router.replace('/dashboard');
	}

	async function logout() {
		setState({ state: "unauthenticated" })

		router.replace('/');
	}

	console.log(state)

	if (state.state === "loading") {
		return <div>Carregando...</div>;
	}

	console.log(state)

	return (
		<AuthContext.Provider
			value={{ ...state, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
}
