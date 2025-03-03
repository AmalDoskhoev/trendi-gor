"use client"

import {useState} from "react"
import {useRouter} from "next/navigation"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {Loader2, Upload} from "lucide-react"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Button,
	Input,
	Textarea,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/ui"
import {toast} from "@/shared/hooks";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	description: z.string().min(10, {
		message: "Description must be at least 10 characters.",
	}),
	price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
		message: "Price must be a positive number.",
	}),
	category: z.string({
		required_error: "Please select a category.",
	}),
	size: z.string({
		required_error: "Please select a size.",
	}),
	color: z.string().min(2, {
		message: "Color must be at least 2 characters.",
	}),
	stock: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
		message: "Stock must be a non-negative number.",
	}),
})

export default function AddClothingItem()
{
	const router = useRouter()
	const [isUploading, setIsUploading] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
			price: "",
			category: "",
			size: "",
			color: "",
			stock: "",
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>)
	{
		toast({
			title: "Вы предоставили следующие значения:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
			),
		})
		// Here you would typically send the data to your backend
		console.log(values)
		// Redirect to the product list or dashboard
		// router.push('/products')
	}

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) =>
	{
		const file = event.target.files?.[0]
		if (file)
		{
			setIsUploading(true)
			// Simulate file upload
			setTimeout(() =>
			{
				setIsUploading(false)
				toast({
					title: "Изображение загружено",
					description: "Ваше изображение успешно загружено.",
				})
			}, 2000)
		}
	}

	return (
		<>
			<h1 className="text-2xl font-bold mb-6">Добавить новый товар</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					<FormField
						control={form.control}
						name="name"
						render={({field}) => (
							<FormItem>
								<FormLabel>Название</FormLabel>
								<FormControl>
									<Input placeholder="Классическая белая футболка" {...field} />
								</FormControl>
								<FormDescription>
									Введите название товара.
								</FormDescription>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({field}) => (
							<FormItem>
								<FormLabel>Описание</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Удобная, универсальная белая футболка из 100% органического хлопка."
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Предоставьте подробное описание товара.
								</FormDescription>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="price"
						render={({field}) => (
							<FormItem>
								<FormLabel>Цена</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="29.99" {...field} />
								</FormControl>
								<FormDescription>
									Введите цену в рублях (например, 29,99).
								</FormDescription>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="category"
						render={({field}) => (
							<FormItem>
								<FormLabel>Категория</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Выберите категорию"/>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="t-shirts">Футболки</SelectItem>
										<SelectItem value="jeans">Джинсы</SelectItem>
										<SelectItem value="dresses">Платья</SelectItem>
										<SelectItem value="jackets">Куртки</SelectItem>
										<SelectItem value="shoes">Обувь</SelectItem>
										<SelectItem value="accessories">Аксессуары</SelectItem>
									</SelectContent>
								</Select>
								<FormDescription>
									Выберите категорию, которая лучше всего соответствует товару.
								</FormDescription>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="size"
						render={({field}) => (
							<FormItem>
								<FormLabel>Размер</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Выберите размер"/>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="xs">XS</SelectItem>
										<SelectItem value="s">S</SelectItem>
										<SelectItem value="m">M</SelectItem>
										<SelectItem value="l">L</SelectItem>
										<SelectItem value="xl">XL</SelectItem>
										<SelectItem value="xxl">XXL</SelectItem>
									</SelectContent>
								</Select>
								<FormDescription>
									Выберите размер товара.
								</FormDescription>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="color"
						render={({field}) => (
							<FormItem>
								<FormLabel>Цвет</FormLabel>
								<FormControl>
									<Input placeholder="Белый" {...field} />
								</FormControl>
								<FormDescription>
									Введите цвет товара.
								</FormDescription>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="stock"
						render={({field}) => (
							<FormItem>
								<FormLabel>Количество</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="100" {...field} />
								</FormControl>
								<FormDescription>
									Введите количество товара на складе.
								</FormDescription>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<div>
						<FormLabel>Изображение</FormLabel>
						<div className="mt-2">
							<Input
								id="image"
								type="file"
								accept="image/*"
								onChange={handleImageUpload}
							/>
						</div>
						<FormDescription>
							Загрузите изображение товара.
						</FormDescription>
					</div>
					<Button
						type="submit"
						disabled={isUploading}
						className="w-full sm:w-auto"
					>
						{isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
						{isUploading ? "Загрузка..." : "Добавить товар"}
					</Button>
				</form>
			</Form>
		</>
	)
}