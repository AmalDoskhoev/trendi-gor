import React from 'react';
import {Button, Input} from "@/shared/ui";
import {Search, ShoppingBag, Heart} from "lucide-react";
import {ModeToggle, UserNav} from "@/features";
import Link from "next/link";
import {ROUTES} from "@/shared/constants";
import {AuthPopup} from "@/widgets";
import {getAccessToken} from "@/shared/services";
import {useUserStore} from "@/app/store";

export function Header()
{
	const {user} = useUserStore();

	return (
		<header className="sticky top-0 z-10 bg-background border-b">
			<div className="container mx-auto px-4 py-3 flex items-center justify-between">
				<Link href={ROUTES.CATALOG}>
					<h1 className="text-2xl font-bold">ТрендыГор</h1>
				</Link>
				<div className="hidden md:flex flex-1 max-w-sm mx-4">
					<div className="relative w-full">
						<Input
							type="search"
							placeholder="Поиск продуктов..."
							className="w-full pl-10"
						/>
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
					</div>
				</div>
				<nav className="hidden md:flex space-x-4">
					<Link
						href={ROUTES.CATALOG}
						className="text-foreground hover:text-primary"
					>Каталог</Link>
					<Link
						href={ROUTES.STORE_PROFILE}
						className="text-foreground hover:text-primary"
					>О нас</Link>
					<a
						href="#"
						className="text-foreground hover:text-primary"
					>Контакты</a>
				</nav>
				<div className="flex items-center">
					<ModeToggle/>
					<Link href={ROUTES.FAVORITES}>
						<Button
							variant="ghost"
							className='hidden md:flex'
						>
							<Heart className="h-5 w-5"/>
						</Button>
					</Link>
					<Link href={ROUTES.CART}>
						<Button
							variant="ghost"
							className='hidden md:flex'
						>
							<ShoppingBag className="h-5 w-5"/>
						</Button>
					</Link>
					{user ? <UserNav/> : <AuthPopup/>}
				</div>
			</div>
		</header>
	);
}