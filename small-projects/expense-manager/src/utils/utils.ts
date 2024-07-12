export const isEmail = (value: string): boolean => {
	return value.includes("@");
};

export const hasMinLength = (value: string, minLength: number): boolean => {
	return value.length >= minLength;
};
