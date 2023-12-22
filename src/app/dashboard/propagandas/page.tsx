"use client"

import IconClinicas from "@public/clinicas.svg"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import {getPropagandas} from "@/services/propagandas"
import AppShell from "@/components/AppShell"
import Link from "next/link"

export default function Propagandas() {

	const {data } = useQuery({
		queryKey: ['propangadas'],
		queryFn: async () => getPropagandas(),
		placeholderData: keepPreviousData
	})

	return <AppShell>
		<div className="w-full mx-auto max-w-[1024px] px-2">
			<div className="flex flex-row items-center w-full mx-auto max-w-[1024px] mb-6 mt-4">
				<h1 className="text-2xl font-bold text-gray-700 dark:text-gray-400">Propangadas</h1>
				<div className="flex-1" />
				<Link
					href="/dashboard/propagandas/add"
					className="px-4 py-2 rounded-lg text-sm text-white bg-primary-base hover:bg-primary-dark transition-all duration-150"
				>
					Adicionar Propagandas
				</Link>
			</div>
			<div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
				{data?.data && data.data.map(clinic => <>
					<div className='flex p-4 rounded bg-white h-48 flex-col items-center justify-center hover:cursor-pointer hover:bg-gray-50 hover:ring-2 hover:ring-offset-2'>
						<IconClinicas className="h-16 w-16" />
						{clinic.desc}
					</div>
				</>)}
			</div>
		</div>
	</AppShell>

}
