"use client"

import { useQuery } from "@tanstack/react-query"
import React from "react"
import { upload } from "@/services/upload";

export default function FileInput(props: { error: any, name: string, label: string, setValue: (key: string, value: any) => void}) {
	return <>
		<label
			htmlFor={props.name}
			className="block text-dark-1 font-bold text-xs uppercase"
		>
			{props.label}
		</label>
		<input
			id={props.name}
			type="file"
			onChange={(e) => upload(e.target.files[0]).then((res) => props.setValue(props.name, res.data))}
			className={"block w-full text-sm text-gray-900 border border-dark-3 rounded-lg cursor-pointer gb-gray-50 file:mr-5 file:bg-primary-base file:p-2 file:text-white file:border-none"}
		/>
		{props.error && <span className="text-red-500 text-sm mt-2">{props.error?.message}</span>}
	</>
}
