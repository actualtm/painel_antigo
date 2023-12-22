"use client"

import AppShell from "@/components/AppShell"
import { deleteUser, getUsers } from "@/services/auth"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { MdClose } from "react-icons/md"
import SWAL from "sweetalert2";
import { MdDelete } from "react-icons/md";
import LoadingSpinner from "@/components/LoadingSpinner"

type User = {
	id: number,
	email: string,
	admin: boolean,
}


export default function Users() {
	const columnHelper = createColumnHelper<User>()
	const columns = [
		columnHelper.accessor("id", {
			id: "#",
			cell: (row) => <span>#{row.getValue()}</span>,
			footer: info => info.column.id
		}),
		columnHelper.accessor("email", {
			cell: (row) => <span>{row.getValue()}</span>,
			footer: info => info.column.id
		}),
		columnHelper.accessor("admin", {
			cell: (row) => <span>{row.getValue() ? "Yes" : "No"}</span>,
			footer: info => info.column.id
		})
	]

	const [page, setPage] = useState(1)

	const { data, refetch, isLoading } = useQuery({
		queryKey: ['users', page],
		queryFn: async () => getUsers(page),
		placeholderData: keepPreviousData
	})

	useEffect(() => {
	}, [page])

	const table = useReactTable({
		columns,
		data: data?.data ?? [],
		getCoreRowModel: getCoreRowModel(),
	})

	const gotoPage = useCallback((page: number) => {
		setPage(page)
	}, [page])

const [showUser, setShowUser] = useState<any>(null)

	const deleteButton = (id: number) =>
		<a href="#" className="text-red-500 text-2xl rounded-full w-8 h-8 hover:bg-red-100 flex items-center justify-center" onClick={() => {
			SWAL.fire({
				title: 'Tem certeza?',
				text: "Você não poderá reverter isso!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Sim, delete isso!'
			}).then(async (result) => {
				if (result.isConfirmed) {
					await deleteUser(id)
					refetch()
					SWAL.fire(
						'Deletado!',
						'O usuário foi deletado.',
						'success'
					)
					setShowUser(null)
				}
			})
		}}><MdDelete /></a>

	return <AppShell>
		{showUser && <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
			<div className="bg-white rounded-lg w-1/2 h-1/2 relative">
				<div className="flex flex-row p-4 absolute items-center top-0 w-full">
					<div className="flex-1" />
					{deleteButton(showUser.id)}
					<a href="#" className="text-red-500 text-2xl rounded-full w-8 h-8 hover:bg-red-100 flex flex-col items-center justify-center ml-2" onClick={() => setShowUser(null)}><MdClose /></a>
				</div>
				<>
					<h1 className="flex items-center text-2xl h-20 text-dark-1 mx-4">
						{showUser.username}
					</h1>
				</>
				<hr className="bg-gray-300 w-full mb-4 h-px" />
				<>
					<h1 className="text-2xl  text-dark-1 mx-4 mb-4">
						<span className="font-semibold mr-4">Email: </span>{showUser.email}
					</h1>
				</>
				<>
					<h1 className="text-2xl  text-dark-1 mx-4 mb-4">
						<span className="font-semibold mr-4">Cpf: </span>{showUser.cpf}
					</h1>
				</>
				<>
					<h1 className="text-2xl  text-dark-1 mx-4 mb-4">
						<span className="font-semibold mr-4">Tipo: </span>{showUser.type}
					</h1>
				</>
			</div>
		</div>}

		<div className="w-full mx-auto max-w-[1024px]">
			<div className="flex flex-row items-center w-full mx-auto max-w-[1024px] mb-6 mt-4">
				<h1 className="text-2xl font-bold text-gray-700 dark:text-gray-400">Usuários</h1>
				<div className="flex-1" />
				<Link
					href="/dashboard/users/add"
					className="px-4 py-2 rounded-lg text-sm text-white bg-primary-base hover:bg-primary-dark transition-all duration-150"
				>
					Adicionar usuário
				</Link>
			</div>

			<div className="w-full overflow-x-auto mx-auto px-4 flex flex-col items-center justify-center">
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
								<a href="#" className="text-blue-600 hover:text-blue-900">Edit</a>
							</td>
						</tr>)}
					</tbody>
				</table>}
				{(data?.total ?? 0) >= 2 &&
					<ul className="inline-flex -space-x-px text-sm mt-4">
						<li>
							<a href="#" onClick={() => page - 1 > 0 && gotoPage(page - 1)} className={inactivePageLink + " rounded-l-lg"}>Previous</a>
						</li>

						{page - 2 >= 1 && <>
							<a href="#" onClick={() => gotoPage(1)} className={inactivePageLink}>1</a>
							<span className="flex items-center justify-center px-3 h-8 text-gray-500 border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-700 dark:text-white">...</span>
						</>}

						{[-1, 0, 1].filter(offset => page + offset > 0 && page + offset <= data?.last_page).
							map(offset =>
								<a href="#" onClick={() => gotoPage(page + offset)} className={offset === 0 ? activePageLink : inactivePageLink}>{page + offset}</a>)}

						{page + 2 <= data.last_page && <>
							<span className="flex items-center justify-center px-3 h-8 text-gray-500 border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-700 dark:text-white">...</span>
							<a href="#" onClick={() => gotoPage(data?.last_page)} className={inactivePageLink}>{data?.last_page}</a>
						</>}


						<li>
							<a href="#" onClick={() => page + 1 <= data?.last_page && gotoPage(page + 1)} className={inactivePageLink + " rounded-r-lg"}>Next</a>
						</li>
					</ul>}


			</div>
		</div>
	</AppShell>
}

const activePageLink = "flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
const inactivePageLink = "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"

