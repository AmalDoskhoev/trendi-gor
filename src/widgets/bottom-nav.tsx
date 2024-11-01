import React from "react";
import {Home, Heart, ShoppingBag, CircleUserRound, CirclePlus} from "lucide-react";
import Link from "next/link";
import {ROUTES} from "@/shared/constants";
import {useUserStore} from "@/app/store";
import {useRouter} from "next/navigation";

export function BottomNav()
{
	const {user, toggleAuthPopup} = useUserStore();
	const {push} = useRouter();

	return (
		<nav className="fixed bottom-[-2px] left-0 right-0 bg-background border-t border-gray-200 md:hidden flex justify-between px-4 py-3 rounded-t-xl">
			<Link
				href={ROUTES.CATALOG}
				className="flex flex-col items-center gap-y-0.5"
			>
				<Home className="h-6 w-6"/>
				<span className="text-xs">Каталог</span>
			</Link>
			<Link
				href={ROUTES.FAVORITES}
				className="flex flex-col items-center gap-y-0.5"
			>
				<Heart className="h-6 w-6"/>
				<span className="text-xs">Избранное</span>
			</Link>
			<Link
				href={ROUTES.ADD_ITEM}
				className="flex flex-col items-center gap-y-0.5"
			>
				<CirclePlus className="h-6 w-6"/>
				<span className="text-xs">Добавить</span>
			</Link>
			<Link
				href={ROUTES.CART}
				className="flex flex-col items-center gap-y-0.5"
			>
				<ShoppingBag className="h-6 w-6"/>
				<span className="text-xs">Корзина</span>
			</Link>
			<div
				onClick={() => user ? push(ROUTES.STORE_PROFILE) : toggleAuthPopup()}
				className="flex flex-col items-center gap-y-0.5"
			>
				<CircleUserRound className="h-6 w-6"/>
				<span className="text-xs">Профиль</span>
			</div>
		</nav>
	);
}