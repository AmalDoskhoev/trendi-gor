"use client"

import React from "react"
import {X} from "lucide-react"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Button,
	Input,
	Label
} from "@/shared/ui"
import {saveTokenStorage} from "@/shared/services";
import {useUserStore} from "@/app/store";

export function AuthPopup()
{
	const [step, setStep] = React.useState(1)
	const [phone, setPhone] = React.useState("")
	const [smsCode, setSmsCode] = React.useState("")
	const [email, setEmail] = React.useState("")
	const [name, setName] = React.useState("")

	const {toggleAuthPopup, authPopup, setUserData} = useUserStore();

	const handlePhoneSubmit = (e: React.FormEvent) =>
	{
		e.preventDefault()
		// Здесь должна быть логика отправки SMS
		console.log("Отправка SMS на номер:", phone)
		setStep(2)
	}

	const handleSmsSubmit = (e: React.FormEvent) =>
	{
		e.preventDefault()
		// Здесь должна быть логика проверки SMS кода
		console.log("Проверка SMS кода:", smsCode)
		// Предположим, что это новый пользователь
		setStep(3)
	}

	const handleFinalSubmit = (e: React.FormEvent) =>
	{
		e.preventDefault()
		saveTokenStorage('store');
		setUserData({phone, email, name})
		// Здесь должна быть логика сохранения данных пользователя
		console.log("Сохранение данных:", {phone, email, name})
		toggleAuthPopup()
		setStep(1)
	}

	const resetForm = () =>
	{
		setPhone("")
		setSmsCode("")
		setEmail("")
		setName("")
		setStep(1)
	}

	return (
		<Dialog
			open={authPopup}
			onOpenChange={(open) =>
			{
				toggleAuthPopup()
				if (!open) resetForm()
			}}
		>
			<DialogTrigger asChild>
				<Button
					className="hidden md:flex"
					variant="ghost"
				>Войти</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Авторизация</DialogTitle>
					<DialogDescription>
						{step === 1 && "Введите ваш номер телефона для входа или регистрации"}
						{step === 2 && "Введите код из SMS для подтверждения"}
						{step === 3 && "Заполните дополнительную информацию"}
					</DialogDescription>
				</DialogHeader>
				{step === 1 && (
					<form
						onSubmit={handlePhoneSubmit}
						className="space-y-4"
					>
						<div className="space-y-2">
							<Label htmlFor="phone">Номер телефона</Label>
							<Input
								id="phone"
								placeholder="+7 (999) 999-99-99"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								required
							/>
						</div>
						<Button
							type="submit"
							className="w-full"
						>Получить код</Button>
						<div className="text-center">
							<Button
								variant="link"
								className="text-sm text-muted-foreground"
							>
								Хотите сотрудничать с нами?
							</Button>
						</div>
					</form>
				)}
				{step === 2 && (
					<form
						onSubmit={handleSmsSubmit}
						className="space-y-4"
					>
						<div className="space-y-2">
							<Label htmlFor="sms">Код из SMS</Label>
							<Input
								id="sms"
								placeholder="Введите код"
								value={smsCode}
								onChange={(e) => setSmsCode(e.target.value)}
								required
							/>
						</div>
						<Button
							type="submit"
							className="w-full"
						>Подтвердить</Button>
					</form>
				)}
				{step === 3 && (
					<form
						onSubmit={handleFinalSubmit}
						className="space-y-4"
					>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="your@email.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="name">Имя</Label>
							<Input
								id="name"
								placeholder="Ваше имя"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
						<Button
							type="submit"
							className="w-full"
						>Завершить регистрацию</Button>
					</form>
				)}
			</DialogContent>
		</Dialog>
	)
}