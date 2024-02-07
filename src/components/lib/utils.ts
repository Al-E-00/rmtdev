import toast from "react-hot-toast";

export const handleError = (error: unknown) => {
  let message;

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "An error occured while fetching job items. Please try again.";
  }

  toast.error(message);
};
