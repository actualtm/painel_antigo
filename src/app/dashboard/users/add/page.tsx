"use client"

import AppShell from "@/components/AppShell";
import { useForm } from 'react-hook-form';
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { createNewUser } from "@/services/auth";

const newUserSchema = z.object({
	username: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
	cpf: z.string(),
	type: z.string().min(1).max(1),
	admin: z.boolean().optional(),
})

const inputClass = "border border-dark-3 rounded-lg px-4 py-2 w-full text-black outline-none focus:ring-2 focus:ring-offset-2"
const inputErrorClass = "border border-red-500 focus:ring-red-500 focus:ring-2 focus:ring-offset-2"

export default function AddUser() {
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: zodResolver(newUserSchema)
	})

	const auth = useContext(AuthContext)

	if(auth.state !== "authenticated") {
		return null
	}

	async function handleAddNewUser(data: any) {
		if(auth.state !== "authenticated") {
			return
		}
		data.clinic_id = auth.user.clinic_id
		await createNewUser(data)
	}

	return <AppShell>
		<div className="w-full mx-auto max-w-[1024px]">
			<form className="flex flex-col items-start p-6 rounded-lg bg-white mt-12" onSubmit={handleSubmit(handleAddNewUser)}>
				<h1 className="text-2xl font-semibold text-dark-1 text-center mb-4">
					Adicionar novo usuário
				</h1>
				<hr className="bg-gray-300 w-full mb-4 h-px" />
				<>
					<label
						htmlFor="username"
						className="block text-dark-1 font-bold text-xs uppercase"
					>
						Nome Usuario
					</label>
					<input
						id="username"
						placeholder="Digite o nome do usuario"
						className={inputClass + (errors.email ? inputErrorClass : "")}
						{...register("username")}
					/>
					{errors.email && <span className="text-red-500 text-sm mt-2">{errors?.username?.message as any}</span>}
				</>
				<>
					<label
						htmlFor="email"
						className="block text-dark-1 font-bold text-xs uppercase mt-4"
					>
						Email
					</label>
					<input
						id="email"
						placeholder="Digite seu email"
						className={inputClass + (errors.email ? inputErrorClass : "")}
						{...register("email")}
					/>
					{errors.email && <span className="text-red-500 text-sm mt-2">{errors.email.message as any}</span>}
				</>

				<>
					<label
						className="block text-dark-1 font-bold text-xs uppercase mt-4"
					>
						CPF
					</label>
					<input
						type="text"
						placeholder="Digite seu CPF"
						className={inputClass + (errors.cpf ? inputErrorClass : "")}
						{...register("cpf")}
					/>
					{errors.cpf && <span className="text-red-500 text-sm mt-2">{errors?.cpf?.message as any}</span>}
				</>

				<>
					<label
						htmlFor="password"
						className="block text-dark-1 font-bold text-xs uppercase mt-4"
					>
						Password
					</label>
					<input
						id="password"
						placeholder="Digite seu senha"
						className={inputClass + (errors.password ? inputErrorClass : "")}
						{...register("password")}
					/>
					{errors.password && <span className="text-red-500 text-sm mt-2">{errors.password.message as any}</span>}
				</>

				<>
					<label
						className="block text-dark-1 font-bold text-xs uppercase mt-4"
					>
						Tipo da conta
					</label>
					<select
						className={inputClass + (errors.type ? inputErrorClass : "")}
						{...register("type")}
					>
						<option value="P">Paciente</option>
						<option value="T">Terapeuta</option>
					</select>
					{errors.type && <span className="text-red-500 text-sm mt-2">{errors.type.message as any}</span>}
				</>
				<>
					<label
						className="block text-dark-1 font-bold text-xs uppercase mt-4"
					>
						Permissões
					</label>
					<div className="flex flex-row items-center mt-4">
						<input
							type="checkbox"
							className="mr-2"
							{...register("admin")}
						/>
						<span className="text-dark-1 font-bold text-xs uppercase">
							Administrativas
						</span>
					</div>
				</>
				<button
					type="submit"
					className="self-end px-4 py-2 rounded-lg text-sm text-white bg-primary-base hover:bg-primary-dark transition-all duration-150 mt-4"
				>
					Enviar
				</button>
			</form>
		</div>
	</AppShell>
}
