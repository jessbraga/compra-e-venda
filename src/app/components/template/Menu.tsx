//import { IconHome, IconUser } from '@tabler/icons-react'
import Link from 'next/link'
import { MenuItem } from './MenuItem'

export default function Menu() {
    return (
        <div>
        <aside className="w-72 h-screen" style={{backgroundColor: "#ffb4a8"}}>
            <nav className="flex flex-col gap-1 py-7">
                <MenuItem /**icone={IconHome}*/ texto="Produtos à venda" url="/" />
                <MenuItem /**icone={IconUser}*/ texto="Minhas Compras" url="/minhasCompras" />
                <MenuItem /**icone={IconUser}*/ texto="Meu Carrinho" url="/meuCarrinho" />
                <MenuItem /**icone={IconUser}*/ texto="Meus Anúncios" url="/meusAnuncios" />
            </nav>
        </aside>
        </div>
    )
}