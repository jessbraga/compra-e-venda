import { Product, User } from "@prisma/client";
import ProductRepository from "@/backend/repositories/productRepository";
import UserRepository from "@/backend/repositories/userRepository";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const filter = searchParams.get("filterBy")
  let products: Product[] = []
  
  if (filter === "notMine") { 
    products = await ProductRepository.findAll({
      // o ID 1 está fixo pois é o único usuário de demonstração. favor remover após integrar
      where: { NOT: { userId: 1 } } 
    }) 
  } else {
    products = await ProductRepository.findAll()
  }

  const promises = products.map(async (item: Product) => {
    const user: User = await UserRepository.findOneById(item.userId)
    return {
      ...item,
      userEmail: user.email
    }
  })

  const result = await Promise.all(promises)
  return Response.json({"products": result})
}