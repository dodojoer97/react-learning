export const isEmail = (value: string): boolean => {
	return value.includes("@");
};

export const isMinLength = (value: string, minLength: number): boolean => {
	return value.length >= minLength;
};
