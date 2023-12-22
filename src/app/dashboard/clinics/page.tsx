"use client"

import IconClinicas from "@public/clinicas.svg"
import React from 'react'
import AppShell from "@/components/AppShell";
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import Link from "next/link";
import { deleteClinics, getClinics } from "@/services/clinics";
import { MdDelete } from "react-icons/md";
import SWAL from "sweetalert2";

export default function Clinics() {

	const {data, refetch} = useQuery({
		queryKey: ['clinics'],
		queryFn: async () => getClinics(),
		placeholderData: keepPreviousData
	})

	const deleteButton = (id: number) =>  
						<a href="#" className="text-red-500 text-2xl rounded-full w-8 h-8 hover:bg-red-100 flex items-center justify-center" onClick={() => {
							SWAL.fire({
								title: 'Você tem certeza?',
								text: 'Você não será capaz de reverter isso!',
								icon: 'warning',
								showCancelButton: true,
								confirmButtonText: 'Sim, delete isso!',
								cancelButtonText: 'Não, cancelar!',
								reverseButtons: true
							}).then(async (result) => {
								if (result.isConfirmed) {
									await deleteClinics(id)
									refetch()
									SWAL.fire(
										'Deletado!',
										'Sua clínica foi deletada.',
										'success'
									)
								} else if (result.dismiss === SWAL.DismissReason.cancel) {
									SWAL.fire(
										'Cancelado',
										'Sua clínica está segura :)',
										'error'
									)
								}
							})
						}}><MdDelete /></a>

	return <AppShell>
		<div className="w-full mx-auto max-w-[1024px]">
			<div className="flex flex-row items-center w-full mx-auto max-w-[1024px] mb-6 mt-4">
				<h1 className="text-2xl font-bold text-gray-700 dark:text-gray-400">Clínicas</h1>
				<div className="flex-1" />
				<Link
					href="/dashboard/clinics/add"
					className="px-4 py-2 rounded-lg text-sm text-white bg-primary-base hover:bg-primary-dark transition-all duration-150"
				>
					Adicionar Clinicas
				</Link>
			</div>
			<div className="grid gap-2 grid-cols-4">
				{data && data.map(clinic => <>
					<div className='flex relative p-4 rounded bg-white h-48 flex-col items-center justify-center hover:cursor-pointer hover:bg-gray-50 hover:ring-2 hover:ring-offset-2'>
						<IconClinicas className="h-16 w-16" />
						{clinic.name}
						<div className="flex flex-row w-full absolute bottom-0 p-2">
							<div className="flex-1" />
							{deleteButton(clinic.id)}
						</div>
					</div>
				</>)}
			</div>
		</div>
	</AppShell>
}
