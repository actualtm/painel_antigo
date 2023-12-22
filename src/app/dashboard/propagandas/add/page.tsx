"use client"

import AppShell from "@/components/AppShell";
import { registerPropaganda } from "@/services/propagandas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const inputClass = "border border-dark-3 rounded-lg px-4 py-2 w-full text-black bg-white outline-none focus:ring-2 focus:ring-offset-2"
const inputErrorClass = "border border-red-500 focus:ring-red-500 focus:ring-2 focus:ring-offset-2"

const newPropagandaSchema = z.object({
	name: z.string().min(3),
	link: z.string(),
	img: z.any(),
	desc: z.string()
})

const inputs = [{
	name: "name",
	label: "Nome",
	type: "input"
},
{
	name: "img",
	label: "Image",
	type: "file"
},
{
	name: "link",
	label: "Link",
	type: "input"
},
{
	name: "desc",
	label: "Descrição",
	type: "textarea"
}
]

export default function AddClinics() {
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: zodResolver(newPropagandaSchema)
	})
	const router = useRouter()

	function handleNewPropagandas(data) {
		const formData = new FormData()
		formData.append('name', data.name)
		formData.append('link', data.link)
		formData.append('desc', data.desc)
		formData.append('img', data.img[0])
		registerPropaganda(formData).then(() => {
			router.back()
		})
	}
	return <AppShell>
		<div className="w-full mx-auto max-w-[1024px]">
			<form className="flex flex-col items-start p-6 rounded-lg bg-white mt-12" onSubmit={handleSubmit(handleNewPropagandas)}>
				<h1 className="text-2xl font-semibold text-dark-1 text-center mb-4">
					Adicionar novo usuário
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
							id={input.name}
							placeholder="Digite o nome do usuario"
							className={inputClass + (errors[input.name] ? inputErrorClass : "")}
							{...register(input.name)}
						/>
						{errors[input.name] && <span className="text-red-500 text-sm mt-2">{errors[input.name]?.message as any}</span>}
					</>}
					{input.type == "file" && <>
						<label
							htmlFor={input.name}
							className="block text-dark-1 font-bold text-xs uppercase"
						>
							{input.label}
						</label>
						<input
							id={input.name}
							type="file"
							className={"block w-full text-sm text-gray-900 border border-dark-3 rounded-lg cursor-pointer gb-gray-50 file:mr-5 file:bg-primary-base file:p-2 file:text-white file:border-none"}
							{...register(input.name)}
						/>
						{errors[input.name] && <span className="text-red-500 text-sm mt-2">{errors[input.name]?.message as any}</span>}
					</>}
					{input.type == "textarea" && <>
						<label
							htmlFor="username"
							className="block text-dark-1 font-bold text-xs uppercase"
						>
							{input.label}
						</label>
						<textarea
							id={input.name}
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
