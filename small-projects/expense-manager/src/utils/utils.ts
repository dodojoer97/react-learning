export const isEmail = (value: string): boolean => {
	return value.includes("@");
};

export const hasMinLength = (value: string, minLength: number): boolean => {
	return value.length >= minLength;
};

export const promisify = <T>(
	value: T,
	resolveTime: number,
	shouldReject: boolean = false
): Promise<T> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (shouldReject) {
				reject(new Error("Promise rejected as requested."));
			} else {
				resolve(value);
			}
		}, resolveTime);
	});
};
