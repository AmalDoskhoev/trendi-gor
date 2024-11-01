import Image from "next/image"
import Link from "next/link"
import {MapPin, Phone, Mail, Globe, Facebook, Instagram, Twitter} from "lucide-react"

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	Button,
	Badge,
	Avatar,
	AvatarFallback,
	AvatarImage
} from "@/shared/ui"

export default function StoreProfile()
{
	const storeInfo = {
		name: "Тренды гор",
		description: "Мы — начинающий стартап, создающий маркетплейс для бутиков, где они могут выкладывать и продавать свои товары. Цель — помочь небольшим магазинам привлечь больше покупателей и расширить бизнес через удобную платформу.",
		location: "г. Магас, ул. Дошлако Мальсагова, 27/1",
		phone: "+7 (963) 179-3608",
		email: "dosxoevamal006@mail.ru",
		website: "www.trendi-gor.com",
		socialMedia: {
			facebook: "https://facebook.com/fashionhub",
			instagram: "https://instagram.com/fashionhub",
			twitter: "https://twitter.com/fashionhub",
		},
		featuredProducts: [
			{id: 1, name: "Платье «Летний бриз»", price: 4999.99, image: "https://placehold.co/200x200"},
			{
				id: 2,
				name: "Классическая джинсовая куртка",
				price: 7999.99,
				image: "https://placehold.co/200x200"
			},
			{id: 3, name: "Джинсы Comfort Fit", price: 499.99, image: "https://placehold.co/200x200"},
			{id: 4, name: "Элегантное вечернее платье", price: 2129.99, image: "https://placehold.co/200x200"},
		],
	}

	return (
		<>
			<div className="grid gap-6 md:grid-cols-3">
				<Card className="md:col-span-2">
					<CardHeader>
						<div className="flex items-center space-x-4">
							<Avatar className="w-20 h-20">
								<AvatarImage
									src="/placeholder.svg?height=80&width=80"
									alt={storeInfo.name}
								/>
								<AvatarFallback>{storeInfo.name.slice(0, 2).toUpperCase()}</AvatarFallback>
							</Avatar>
							<div>
								<CardTitle className="text-3xl font-bold">{storeInfo.name}</CardTitle>
								<Badge
									variant="secondary"
									className="mt-2"
								>Проверенный магазин</Badge>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground mb-4">{storeInfo.description}</p>
						<div className="grid gap-2">
							<div className="flex items-center">
								<MapPin className="w-4 h-4 mr-2 text-muted-foreground"/>
								<span>{storeInfo.location}</span>
							</div>
							<div className="flex items-center">
								<Phone className="w-4 h-4 mr-2 text-muted-foreground"/>
								<span>{storeInfo.phone}</span>
							</div>
							<div className="flex items-center">
								<Mail className="w-4 h-4 mr-2 text-muted-foreground"/>
								<span>{storeInfo.email}</span>
							</div>
							<div className="flex items-center">
								<Globe className="w-4 h-4 mr-2 text-muted-foreground"/>
								<span>{storeInfo.website}</span>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<div className="flex space-x-4">
							<Link
								href={storeInfo.socialMedia.facebook}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Button
									variant="ghost"
									size="icon"
								>
									<Facebook className="w-4 h-4"/>
									<span className="sr-only">Facebook</span>
								</Button>
							</Link>
							<Link
								href={storeInfo.socialMedia.instagram}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Button
									variant="ghost"
									size="icon"
								>
									<Instagram className="w-4 h-4"/>
									<span className="sr-only">Instagram</span>
								</Button>
							</Link>
							<Link
								href={storeInfo.socialMedia.twitter}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Button
									variant="ghost"
									size="icon"
								>
									<Twitter className="w-4 h-4"/>
									<span className="sr-only">Twitter</span>
								</Button>
							</Link>
						</div>
					</CardFooter>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Часы работы магазина</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<div className="flex justify-between">
								<span>Понедельник - Пятница</span>
								<span>9:00 - 18:00</span>
							</div>
							<div className="flex justify-between">
								<span>Суббота</span>
								<span>10:00 - 16:00</span>
							</div>
							<div className="flex justify-between">
								<span>Воскресенье</span>
								<span>11:00 - 15:00</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
			<div className="mt-10">
				<h2 className="text-2xl font-bold mb-6">Рекомендуемые товары</h2>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{storeInfo.featuredProducts.map((product) => (
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
			</div>
		</>
	)
}