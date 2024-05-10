const formatDateForInput = (date: Date): string => {
	return date.toISOString().slice(0, 10);
};

export default formatDateForInput;
