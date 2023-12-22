"use client"

import "react-datetime/css/react-datetime.css";
import AppShell from "@/components/AppShell";
import Datetime from 'react-datetime';
import Select from 'react-select';
import { Editor } from 'primereact/editor'
import { getPacients, getTherapists } from "@/services/auth";
import { registerPropaganda } from "@/services/propagandas";
import { registerSession } from "@/services/sessions";
import { zodResolver } from "@hookform/resolvers/zod";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const inputClass = "border border-dark-3 rounded-lg px-4 py-2 w-full text-black bg-white outline-none focus:ring-2 focus:ring-offset-2"
const inputErrorClass = "border border-red-500 focus:ring-red-500 focus:ring-2 focus:ring-offset-2"

const newPropagandaSchema = z.object({
	therapist_id: z.number().nonnegative(),
	pacient_id: z.number().nonnegative(),
	started_at: z.date(),
	ended_at: z.date(),
	therapy_kind: z.string().nonempty(),
	therapist_notes: z.string().nonempty(),
	therapist_recommendations: z.string().nonempty(),
})

export default function AddPropaganda() {
	const { register, handleSubmit, formState: { errors }, control } = useForm({
		resolver: zodResolver(newPropagandaSchema)
	})

	const router = useRouter()
	const therapists = useQuery({
		queryKey: ['therapists'],
		queryFn: async () => getTherapists(),
		placeholderData: keepPreviousData
	})
	const pacients = useQuery({
		queryKey: ['pacients'],
		queryFn: async () => getPacients(),
		placeholderData: keepPreviousData
	})

	const queryClient = useQueryClient()

	function handleNewSession(data) {
		console.log(data, "asdf")
		registerSession(data).then(() => {
			queryClient.invalidateQueries({queryKey: ['sessions']})
			router.back()
		})
	}

	const inputs = [{
		name: "therapist_id",
		label: "Terapeuta",
		type: "select",
		isLoading: therapists.isLoading,
		options: therapists.data?.map((therapist) => ({
			value: therapist.id,
			label: therapist.username
		}))
	},
	{
		name: "pacient_id",
		label: "Paciente",
		type: "select",
		isLoading: pacients.isLoading,
		options: pacients.data?.map((therapist) => ({
			value: therapist.id,
			label: therapist.username
		}))
	},
	{
		name: "therapy_kind",
		label: "Tipo de terapia",
		type: "select",
		options: [{
			label: "Fisioterapia",
			value: "fisioterapia",
		}]
	},
	{
		name: "started_at",
		label: "Inicio da sessao",
		type: "datetime"
	},
	{
		name: "ended_at",
		label: "Fim da sessao",
		type: "datetime"
	},
	{
		name: "therapist_notes",
		label: "Notas do terapeuta",
		type: "editor"
	},
	{
		name: "therapist_recommendations",
		label: "Recomendacoes do terapeuta",
		type: "editor"
	},
	]
	console.log(errors)


	return <AppShell>
		<div className="w-full mx-auto max-w-[1024px]">
			<form className="flex flex-col items-start p-6 rounded-lg bg-white mt-12" onSubmit={handleSubmit(handleNewSession)}>
				<h1 className="text-2xl font-semibold text-dark-1 text-center mb-4">
					Adicionar nova sessao
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
					{input.type == "select" && <>
						<label
							className="block text-dark-1 font-bold text-xs uppercase"
						>
							{input.label}
						</label>
						<Controller
							control={control}
							name={input.name}
							render={({ field }) => (
								<Select
									id={input.name}
									options={input.options}
									onChange={(value: any) => field.onChange(value?.value)}
									isLoading={input.isLoading}
									isSearchable
									className='w-full'
								/>
							)}
						/>
						{errors[input.name] && <span className="text-red-500 text-sm mt-2">{errors[input.name]?.message as any}</span>}
					</>}
					{input.type == "editor" && <>
						<label
							htmlFor="username"
							className="block text-dark-1 font-bold text-xs uppercase"
						>
							{input.label}
						</label>
						<Controller
							control={control}
							name={input.name}
							render={({ field }) => (
								<Editor
									onTextChange={(e) => field.onChange(e.htmlValue)}
									id={input.name}
									placeholder="Digite o nome do usuario"
									className="w-full"
								/>
							)}
						/>
						{errors[input.name] && <span className="text-red-500 text-sm mt-2">{errors[input.name]?.message as any}</span>}
					</>}
					{input.type == "datetime" && <>
						<label
							htmlFor="username"
							className="block text-dark-1 font-bold text-xs uppercase"
						>
							{input.label}
						</label>
						<Controller
							control={control}
							name={input.name}
							render={({ field }) => (
								<Datetime
									inputProps={{
										className: inputClass + (errors[input.name] ? inputErrorClass : ""),
									}}
									onChange={(value: moment.Moment) => value.toDate && field.onChange(value.toDate())}
									className="w-full"
								/>
							)}
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
