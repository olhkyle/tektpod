import supabase from './service';
import { RegisterSchema } from '../components/auth/schema';

const TABLE = 'users';

const isUserExist = async (email: string) => {
	const { data, error } = await supabase.from(TABLE).select('email').eq('email', email);

	return { data: data?.length !== 0, error };
};

const addNewUser = async ({ userId, userData }: { userId?: string; userData: RegisterSchema }) => {
	return await supabase.from(TABLE).insert({ user_id: userId, email: userData.email, nickname: userData.nickname });
};

const updateUser = async ({ userId, userData }: { userId: string; userData: RegisterSchema }) => {
	return await supabase.from(TABLE).update({ userData }).eq('id', userId);
};

export { isUserExist, addNewUser, updateUser };
