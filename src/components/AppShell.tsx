"use client"

import React, { useContext } from "react"
import { AuthContext } from '@/contexts/AuthContext';
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import PacientesIcon from "@public/pacientes.svg"

const navigation = [
	{
		icon: PacientesIcon,
		iconAlt: "Ícone do dashboard",
		label: "Dashboard",
		path: "/dashboard",
		adminOnly: false
	},
	{
		icon: PacientesIcon,
		iconAlt: "Ícone de users",
		label: "Usuários",
		path: "/dashboard/users",
		adminOnly: true
	},
	{
		icon: PacientesIcon,
		iconAlt: "Ícone de clinicas",
		label: "Clinicas",
		path: "/dashboard/clinics",
		adminOnly: true
	},
	{
		icon: PacientesIcon,
		iconAlt: "Ícone de propaganda",
		label: "Propaganda",
		path: "/dashboard/propagandas",
		adminOnly: true
	},
	{
		icon: PacientesIcon,
		iconAlt: "Ícone de sessões",
		label: "Sessões",
		path: "/dashboard/sessions",
	}
]

export default function AppShell(props: React.PropsWithChildren<{}>) {
	const auth = useContext(AuthContext)
	const pathname = usePathname().split("/").slice(0, 4).join("/")
	const router = useRouter();
	
	if (auth.state !== "authenticated") {
		router.push("/login")
		return null
	}

	return (
		<div className="bg-light-2 flex">
			<div className="bg-white p-4 h-screen w-full max-w-[250px]">
				<div>
					<div className="space-y-2">
						{navigation.map((item, index) => (
							(item.adminOnly ? auth.user.admin: true) && <NavbarLink
								key={index}
								isActive={pathname === item.path}
								icon={item.icon}
								iconAlt={item.iconAlt}
								label={item.label}
								path={item.path}
							/>
						)).filter(Boolean)
						}
						<button
							onClick={auth.logout}
							className="flex items-center gap-4 p-2 rounded-lg font-medium text-sm text-feedback-error hover:bg-light-3 transition-all duration-150"
						>
							<Image
								src="/logout.svg"
								width="24"
								height="24"
								alt="Ícone de logout"
							/>
							Sair da conta
						</button>
					</div>
				</div>
			</div>
			{props.children}
		</div>
	);

}

function NavbarLink({
	key,
	isActive,
	icon: Icon,
	iconAlt,
	label,
	path
}: {
	key: any,
	isActive?: boolean,
	icon: any,
	iconAlt: string,
	label: string,
	path: string,
}) {
	Icon
	return (
		<Link
			key={key}
			href={path}
			className={`flex items-center gap-4 p-2 rounded-lg font-medium text-sm 
      ${isActive
					? 'text-primary-base bg-primary-clear'
					: 'text-dark-2 hover:bg-light-3 transition-all duration-150'
				} `}
		>
			{isActive ? (
				<Icon alt={iconAlt} className="fill-primary-base" />
			) : (
				<Icon className="fill-dark-2" />
			)}

			{label}
		</Link>
	);
}
