import { auth } from "@clerk/nextjs";

const adminIds = ["user_2gAZdeZmYO5bmHa5IQ8U6LL8OdX"];

export const isAdmin = () => {
	const { userId } = auth();

	if (!userId) return false;

	return adminIds.indexOf(userId) !== -1;
};
