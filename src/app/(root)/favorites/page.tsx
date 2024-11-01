import React from 'react';
import {Button, Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/shared/ui";
import Image from "next/image";

export default function Favorites()
{
	const favorites = [
		{id: 1, name: "Платье «Летний бриз»", price: 4999.99, image: "https://placehold.co/200x200"},
		{
			id: 2,
			name: "Классическая джинсовая куртка",
			price: 7999.99,
			image: "https://placehold.co/200x200"
		},
		{id: 3, name: "Джинсы Comfort Fit", price: 499.99, image: "https://placehold.co/200x200"},
		{id: 4, name: "Элегантное вечернее платье", price: 2129.99, image: "https://placehold.co/200x200"},
	]

	return (
		<>
			<h2 className="text-2xl font-bold mb-6">Избранное</h2>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{favorites.map((product) => (
					<Card key={product.id}>
						<CardHeader>
							<img
								src={product.image}
								alt={product.name}
								className="w-full h-48 object-cover rounded-t-lg"
							/>
						</CardHeader>
						<CardContent>
							<CardTitle className="text-lg">{product.name}</CardTitle>
							<p className="text-muted-foreground">{product.price.toFixed(2)} ₽</p>
						</CardContent>
						<CardFooter>
							<Button className="w-full">Посмотреть подробности</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</>
	);
}