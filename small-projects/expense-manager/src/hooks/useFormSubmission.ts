import { useState } from "react";

/**
 * Custom hook to handle form submissions with async logic.
 *
 * @param handleSubmitLogic - A callback function containing the submission logic which is expected to be an async operation.
 * @returns An object containing:
 *  - `isSubmitting`: a boolean indicating if the submission is in progress
 *  - `error`: a string storing an error message if an error occurs
 *  - `handleSubmit`: a function to call when the form is submitted
 * -   `setIsSubmitted`: a funciton to update the submission state
 * -   `isLoading`: a boolean that indicates loading state
 */
const useFormSubmission = (handleSubmitLogic: () => Promise<void>) => {
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		setError(null);

		try {
			setIsLoading(true);
			await handleSubmitLogic();
		} catch (err: any) {
			setError(err.message || "An error occurred");
		} finally {
			setIsSubmitted(true);
			setIsLoading(false);
		}
	};

	return { isSubmitted, error, handleSubmit, setIsSubmitted, isLoading };
};

export default useFormSubmission;
