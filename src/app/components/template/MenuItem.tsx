import Link from "next/link"
import { ElementType } from "react"

export interface MenuItemProps {
	icone?: ElementType
	texto: string
	url: string
}

export function MenuItem({ icone: Icon, texto, url }: MenuItemProps) {
	return (
		<Link
			href={url}
			aria-label={texto}
			className="flex items-center gap-2 px-4 py-2 hover:bg-gray-300 text-white"
		>
			{Icon && <Icon aria-hidden="true" />}
			<span>{texto}</span>
		</Link>
	)
}

export default MenuItem
