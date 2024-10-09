// app/api/cart/route.ts
import { NextRequest, NextResponse } from 'next/server';
import ProductCartRepository from '@/backend/repositories/productCartRepository';

// GET /api/cart?userId=1
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = parseInt(searchParams.get('userId') || '', 10);

  if (isNaN(userId)) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    const products = await ProductCartRepository.findAllProductsInCartByUserId(userId);
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/cart
export async function POST(req: NextRequest) {
  const { userId, productId, quantity } = await req.json();

  if (!userId || !productId || isNaN(quantity)) {
    return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
  }

  try {
    const addedProduct = await ProductCartRepository.addProductToCart(parseInt(userId), parseInt(productId), parseInt(quantity));
    return NextResponse.json(addedProduct);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}