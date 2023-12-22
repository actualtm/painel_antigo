'use client';

import AppShell from '@/components/AppShell'
import { AuthContext } from '@/contexts/AuthContext';
import Banner from '@public/dashboard-banner.svg'
import { useContext } from 'react';

export default function Dashboard() {
	const auth = useContext(AuthContext);

	if (auth.state === "unauthenticated") {
		return 
	}

	return <AppShell>
		<div className="flex flex-col justify-center items-center w-full mx-auto max-w-[1024px]">
			<h1 className="text-4xl text-center mb-4">Seja Bem vindo, {auth.user.username}</h1>
			<Banner className="mx-auto w-48"/>
		</div>
	</AppShell>
}
