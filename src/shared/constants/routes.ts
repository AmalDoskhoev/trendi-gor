export enum RoutesMap
{
	catalog = 'catalog',

	profile = 'profile',
	store = 'store',

	favorites = 'favorites',

	cart = 'cart',
}

export const ROUTES = {
	// Главная
	CATALOG: `/${RoutesMap.catalog}`,

	// Профиль
	PROFILE: `/${RoutesMap.profile}`,
	STORE_PROFILE: `/${RoutesMap.store}-${RoutesMap.profile}`,

	// Добавление товара
	ADD_ITEM: `/add-item`,

	// Избранное
	FAVORITES: `/${RoutesMap.favorites}`,

	// Корзина
	CART: `/${RoutesMap.cart}`,
};
