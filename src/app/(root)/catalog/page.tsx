"use client"

import {useState} from "react"
import {Card, CardContent, CardFooter, CardHeader, CardTitle, Button, Slider, Checkbox} from "@/shared/ui"

export default function Catalog()
{
	const [searchTerm, setSearchTerm] = useState("")
	const [priceRange, setPriceRange] = useState([0, 10000])
	const [selectedCategories, setSelectedCategories] = useState<any[]>([])

	const categories = [
		{
			value: "T-Shirts",
			label: "Футболки"
		},
		{
			value: "Dresses",
			label: "Платья"
		},
		{
			value: "Jackets",
			label: "Куртки"
		},
		{
			value: "Shoes",
			label: "Обувь"
		}, {
			value: "Accessories",
			label: "Аксессуары"
		}, {
			value: "Jeans",
			label: "Джинсы"
		}]

	const products = [
		{
			id: 1,
			name: "Классическая белая футболка",
			price: 1999.99,
			image: "https://placehold.co/200x200",
			category: "T-Shirts"
		},
		{
			id: 2,
			name: "Джинсы из денима",
			price: 4999.99,
			image: "https://placehold.co/200x200",
			category: "Jeans"
		},
		{
			id: 3,
			name: "Кожаная куртка",
			price: 9999.99,
			image: "https://placehold.co/200x200",
			category: "Jackets"
		},
		{
			id: 4,
			name: "Летнее платье",
			price: 3999.99,
			image: "https://placehold.co/200x200",
			category: "Dresses"
		},
		{id: 5, name: "Кроссовки", price: 5999.99, image: "https://placehold.co/200x200", category: "Shoes"},
		{
			id: 6,
			name: "Шерстяной свитер",
			price: 6999.99,
			image: "https://placehold.co/200x200",
			category: "T-Shirts"
		},
	]

	const filteredProducts = products.filter((product) =>
	{
		const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())

		const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

		const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(c => c === product.category)

		return matchesSearch && matchesPrice && matchesCategory
	})

	return (
		<div>
			<section className="mb-12">
				<Card>
					<CardContent className="p-6">
						<div className="grid md:grid-cols-2 gap-6 items-center">
							<div>
								<h2 className="text-3xl font-bold mb-4">Зимняя коллекция</h2>
								<p className="text-muted-foreground mb-4">Откройте для себя наши последние зимние стили
									и тенденции. Идеально для сезонного отдыха!</p>
								<Button>Купить сейчас</Button>
							</div>
							<div className="aspect-video relative overflow-hidden rounded-lg">
								<img
									src="https://placehold.co/400x600"
									alt="Collection"
									className="object-cover w-full h-full"
								/>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>

			<div className="flex flex-col md:flex-row gap-8">
				<aside className="w-full md:w-64">
					<Card>
						<CardHeader>
							<CardTitle>Фильтры</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div>
									<h3 className="font-semibold mb-2">Диапазон цен</h3>
									<Slider
										min={0}
										max={10000}
										step={1}
										value={priceRange}
										onValueChange={setPriceRange}
									/>
									<div className="flex justify-between mt-2">
										<span>{priceRange[0]} ₽</span>
										<span>{priceRange[1]} ₽</span>
									</div>
								</div>
								<div className="flex flex-col space-y-2">
									<h3 className="font-semibold mb-2">Категории</h3>
									{categories.map((category) => (
										<div
											key={category.value}
											className="flex items-center space-x-2"
										>
											<Checkbox
												id={category.value}
												checked={selectedCategories.some(c => c === category.value)}
												onCheckedChange={(checked) =>
												{
													setSelectedCategories(
														checked
															? [...selectedCategories, category.value]
															: selectedCategories.filter((c) => c !== category.value)
													)
												}}
											/>
											<label
												htmlFor={category.value}
												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
											>
												{category.label}
											</label>
										</div>
									))}
								</div>
							</div>
						</CardContent>
					</Card>
				</aside>

				<section className="flex-1">
					<h2 className="text-2xl font-bold mb-6">Рекомендуемые товары</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredProducts.map((product) => (
							<Card key={product.id}>
								<CardHeader>
									<img
										src={product.image}
										alt={product.name}
										className="w-full h-48 object-cover rounded-t-lg"
									/>
								</CardHeader>
								<CardContent>
									<CardTitle>{product.name}</CardTitle>
									<p className="text-muted-foreground mt-2">{product.price.toFixed(2)} ₽</p>
									<p className="text-sm text-muted-foreground mt-1">{categories.find(el => el.value === product.category)?.label}</p>
								</CardContent>
								<CardFooter>
									<Button className="w-full">Добавить в корзину</Button>
								</CardFooter>
							</Card>
						))}
					</div>
				</section>
			</div>
		</div>
	)
}