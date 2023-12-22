
"use client"

import AppShell from "@/components/AppShell"
import LoadingSpinner from "@/components/LoadingSpinner"
import { getClinics } from "@/services/clinics"
import { getSessions } from "@/services/sessions"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { format, formatRelative } from "date-fns"
import { ptBR } from "date-fns/locale"

type Session = {
	id: number,
	started_at: string,
	ended_at: string,
}


export default function Sessions() {
	const columnHelper = createColumnHelper<Session>()
	const columns = [
		columnHelper.accessor("id", {
			id: "#",
			cell: (row) => <span>{row.getValue()}</span>,
			footer: info => info.column.id
		}),
		columnHelper.accessor("started_at", {
			cell: (row) => <span>{row.getValue()}</span>,
			footer: info => info.column.id
		}),
		columnHelper.accessor("ended_at", {
			cell: (row) => <span>{row.getValue()}</span>,
			footer: info => info.column.id
		}),
	]

	const [page, setPage] = useState(1)

	const { data, isLoading } = useQuery({
		queryKey: ['sessions', page],
		queryFn: async () => getSessions(page),
	})

	const table = useReactTable({
		columns,
		data: data?.data?.data ?? [],
		getCoreRowModel: getCoreRowModel(),
	})

	const gotoPage = useCallback((page: number) => {
		setPage(page)
	}, [page])

	console.log(data)

	return <AppShell>
		<div className="w-full mx-auto max-w-[1024px]">
			<div className="flex flex-row items-center w-full mx-auto max-w-[1024px] mb-6 mt-4">
				<h1 className="text-2xl font-bold text-gray-700 dark:text-gray-400">Sessões</h1>
				<div className="flex-1" />
				<Link
					href="/dashboard/sessions/add"
					className="px-4 py-2 rounded-lg text-sm text-white bg-primary-base hover:bg-primary-dark transition-all duration-150"
				>
					Adicionar sessões
				</Link>
			</div>

			<div className="w-full mx-auto px-4 flex flex-col items-center justify-center">
				{isLoading && <div className="w-full flex items-center justify-center">
					<LoadingSpinner />
				</div>}

				{!isLoading && <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						{table.getHeaderGroups().map(headerGroup => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map(header => (
									<th className="px-6 py-3" key={header.id}>
										{header.isPlaceholder ? "" : flexRender(header.column.columnDef.header, header.getContext())}
									</th>
								))}
								<th className="px-6 py-3" key="actions">
									Actions
								</th>
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map(row => <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={row.id}>
							{row.getVisibleCells().map(cell => <td className="px-6 py-3" key={cell.id}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</td>)}
							<td className="px-6 py-3">
								<a href="#" className="text-blue-600 hover:text-blue-900">Editar</a>
								<a href="#" className="text-blue-600 hover:text-blue-900">Ver</a>
							</td>
						</tr>)}
					</tbody>
				</table>}
				{(data?.data?.total ?? 0) >= 1 &&
					<ul className="inline-flex -space-x-px text-sm mt-4">
						<li>
							<a href="#" onClick={() => page - 1 > 0 && gotoPage(page - 1)} className={inactivePageLink + " rounded-l-lg"}>Previous</a>
						</li>

						{page - 2 >= 1 && <>
							<a href="#" onClick={() => gotoPage(1)} className={inactivePageLink}>1</a>
							<span className="flex items-center justify-center px-3 h-8 text-gray-500 border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-700 dark:text-white">...</span>
						</>}

						{[-1, 0, 1].filter(offset => page + offset > 0 && page + offset <= data?.data?.last_page).
							map(offset =>
								<a href="#" onClick={() => gotoPage(page + offset)} className={offset === 0 ? activePageLink : inactivePageLink}>{page + offset}</a>)}

						{page + 2 <= data?.data?.last_page && <>
							<span className="flex items-center justify-center px-3 h-8 text-gray-500 border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-700 dark:text-white">...</span>
							<a href="#" onClick={() => gotoPage(data?.data?.last_page)} className={inactivePageLink}>{data?.data?.last_page}</a>
						</>}


						<li>
							<a href="#" onClick={() => page + 1 <= data?.data?.last_page && gotoPage(page + 1)} className={inactivePageLink + " rounded-r-lg"}>Next</a>
						</li>
					</ul>}


			</div>
		</div>
	</AppShell>
}

const activePageLink = "flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
const inactivePageLink = "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"

