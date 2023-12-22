"use client"

import AppShell from "@/components/AppShell";
import { registerClinics } from "@/services/clinics";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const inputClass = "border border-dark-3 rounded-lg px-4 py-2 w-full text-black outline-none focus:ring-2 focus:ring-offset-2"
const inputErrorClass = "border border-red-500 focus:ring-red-500 focus:ring-2 focus:ring-offset-2"

const newClinicssSchema = z.object({
	name: z.string().min(3)
})

const inputs = [{
	name: "name",
	label: "Nome",
	type: "input"
}]

export default function AddClinics() {
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: zodResolver(newClinicssSchema)
	})
	const router = useRouter()

	function handleNewClinics(data) {
		registerClinics(data).then(() => {
			router.back()
		})
	}
	return <AppShell>
		<div className="w-full mx-auto max-w-[1024px]">
			<form className="flex flex-col items-start p-6 rounded-lg bg-white mt-12" onSubmit={handleSubmit(handleNewClinics)}>
				<h1 className="text-2xl font-semibold text-dark-1 text-center mb-4">
					Adicionar nova clinica
				</h1>
				<hr className="bg-gray-300 w-full mb-4 h-px" />
				{inputs.map((input) => <>

					{input.type == "input" && <>
						<label
							htmlFor="username"
							className="block text-dark-1 font-bold text-xs uppercase"
						>
							{input.label}
						</label>
						<input
							id="username"
							placeholder="Digite o nome do usuario"
							className={inputClass + (errors[input.name] ? inputErrorClass : "")}
							{...register(input.name)}
						/>
						{errors[input.name] && <span className="text-red-500 text-sm mt-2">{errors[input.name]?.message as any}</span>}
					</>}
				</>)}
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
