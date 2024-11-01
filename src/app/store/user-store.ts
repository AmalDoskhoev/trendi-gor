import {create} from 'zustand';
import {removeTokenFromStorage} from "@/shared/services";

export interface UserEntity
{
	id: number;
	email: string;
	name: string;
	phone: string;
}

export interface UserState
{
	user: UserEntity | null;
	authPopup: boolean;
	loading: boolean;

	setUserData: (data: any) => void;
	toggleAuthPopup: () => void;
	logout: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
	user: null,
	authPopup: false,
	loading: true,

	setUserData: (data: any) =>
	{
		set({user: data});
	},

	toggleAuthPopup: () =>
	{
		set({authPopup: !get().authPopup});
	},

	logout: () =>
	{
		set({user: null});
		removeTokenFromStorage();
	},
}));