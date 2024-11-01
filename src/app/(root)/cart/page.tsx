"use client"

import {useState} from "react"
import Image from "next/image"
import Link from "next/link"
import {Minus, Plus, Trash2} from "lucide-react"

import {Button, Input, Card, CardContent, CardFooter, CardHeader, CardTitle, ScrollArea} from "@/shared/ui"

interface CartItem
{
	id: number
	name: string
	price: number
	quantity: number
	image: string
}

export default function ResponsiveShoppingCart()
{
	const [cartItems, setCartItems] = useState<CartItem[]>([
		{
			id: 1,
			name: "Классическая белая футболка",
			price: 1999.99,
			quantity: 2,
			image: "https://placehold.co/100x100"
		},
		{id: 2, name: "Джинсы из денима", price: 4999.99, quantity: 1, image: "https://placehold.co/100x100"},
		{id: 3, name: "Кожаная куртка", price: 9999.99, quantity: 1, image: "https://placehold.co/100x100"},
	])

	const updateQuantity = (id: number, newQuantity: number) =>
	{
		if (newQuantity >= 0)
		{
			setCartItems(cartItems.map(item =>
				item.id === id ? {...item, quantity: newQuantity} : item
			))
		}
	}

	const removeItem = (id: number) =>
	{
		setCartItems(cartItems.filter(item => item.id !== id))
	}

	const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
	const tax = subtotal * 0.1 // Предположим, что налог составляет 10%
	const total = subtotal + tax

	return (
		<>
			<h1 className="text-2xl font-bold mb-6">Корзина</h1>
			{cartItems.length === 0 ? (
				<Card>
					<CardContent className="pt-6">
						<p className="text-center text-muted-foreground">Ваша корзина пуста.</p>
					</CardContent>
					<CardFooter className="justify-center">
						<Button asChild>
							<Link href="/">Продолжить покупки</Link>
						</Button>
					</CardFooter>
				</Card>
			) : (
				<div className="grid gap-6 lg:grid-cols-3">
					<div className="lg:col-span-2">
						<ScrollArea className="h-[calc(100vh-200px)] lg:h-auto">
							{cartItems.map((item) => (
								<Card
									key={item.id}
									className="mb-4"
								>
									<CardContent className="p-4">
										<div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
											<img
												src={item.image}
												alt={item.name}
												className="w-full h-32 rounded-md sm:w-24 sm:h-24"
											/>

											<div className="flex-1">
												<h3 className="font-semibold">{item.name}</h3>
												<p className="text-sm text-muted-foreground">{item.price.toFixed(2)} ₽</p>
											</div>
											<div className="flex items-center space-x-2">
												<Button
													variant="outline"
													size="icon"
													onClick={() => updateQuantity(item.id, item.quantity - 1)}
												>
													<Minus className="h-4 w-4"/>
												</Button>
												<Input
													min="0"
													value={item.quantity}
													onChange={(e) => e.preventDefault()}
													className="w-16 text-center"
												/>
												<Button
													variant="outline"
													size="icon"
													onClick={() => updateQuantity(item.id, item.quantity + 1)}
												>
													<Plus className="h-4 w-4"/>
												</Button>
											</div>
											<div className="flex items-center justify-between w-full sm:w-auto">
												<span className="font-semibold sm:hidden">Цена:</span>
												<span className="font-semibold">{(item.price * item.quantity).toFixed(2)} ₽</span>
												<Button
													variant="ghost"
													size="icon"
													onClick={() => removeItem(item.id)}
													className="ml-4"
												>
													<Trash2 className="h-4 w-4"/>
												</Button>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</ScrollArea>
					</div>
					<div>
						<Card className="sticky top-4">
							<CardHeader>
								<CardTitle>Ваш заказ</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									<div className="flex justify-between">
										<span>Товар</span>
										<span>{subtotal.toFixed(2)} ₽</span>
									</div>
									<div className="flex justify-between">
										<span>Комиссия</span>
										<span>{tax.toFixed(2)} ₽</span>
									</div>
									<div className="flex justify-between font-bold">
										<span>Итого</span>
										<span>{total.toFixed(2)} ₽</span>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button className="w-full">Оформить заказ</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			)}
		</>
	)
}