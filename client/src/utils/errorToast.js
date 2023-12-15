import { toast } from "react-toastify";

export const generateErrorToast = (err) => {
	if (err.response?.data?.message) {
		toast.error(err.response.data.message);
	} else {
		toast.error(err.message);
	}
};
