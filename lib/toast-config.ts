import toast from "react-hot-toast";

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    duration: 4000,
    position: "top-right",
    style: {
      background: "#f0fdf4",
      color: "#166534",
      border: "1px solid #86efac",
      borderRadius: "0.75rem",
      padding: "1rem",
      fontFamily: "1FTV-Cakelan, sans-serif",
      fontSize: "0.875rem",
      fontWeight: "500",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    iconTheme: {
      primary: "#16a34a",
      secondary: "#f0fdf4",
    },
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    duration: 4000,
    position: "top-right",
    style: {
      background: "#fef2f2",
      color: "#991b1b",
      border: "1px solid #fca5a5",
      borderRadius: "0.75rem",
      padding: "1rem",
      fontFamily: "1FTV-Cakelan, sans-serif",
      fontSize: "0.875rem",
      fontWeight: "500",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    iconTheme: {
      primary: "#dc2626",
      secondary: "#fef2f2",
    },
  });
};

export const showLoadingToast = (message: string) => {
  return toast.loading(message, {
    position: "top-right",
    style: {
      background: "#f8fafc",
      color: "#1e293b",
      border: "1px solid #e2e8f0",
      borderRadius: "0.75rem",
      padding: "1rem",
      fontFamily: "1FTV-Cakelan, sans-serif",
      fontSize: "0.875rem",
      fontWeight: "500",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
  });
};

export const updateToast = (toastId: string, message: string, type: "success" | "error") => {
  if (type === "success") {
    toast.success(message, {
      id: toastId,
      duration: 4000,
      style: {
        background: "#f0fdf4",
        color: "#166534",
        border: "1px solid #86efac",
        borderRadius: "0.75rem",
        padding: "1rem",
        fontFamily: "1FTV-Cakelan, sans-serif",
        fontSize: "0.875rem",
        fontWeight: "500",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
      iconTheme: {
        primary: "#16a34a",
        secondary: "#f0fdf4",
      },
    });
  } else {
    toast.error(message, {
      id: toastId,
      duration: 4000,
      style: {
        background: "#fef2f2",
        color: "#991b1b",
        border: "1px solid #fca5a5",
        borderRadius: "0.75rem",
        padding: "1rem",
        fontFamily: "1FTV-Cakelan, sans-serif",
        fontSize: "0.875rem",
        fontWeight: "500",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
      iconTheme: {
        primary: "#dc2626",
        secondary: "#fef2f2",
      },
    });
  }
};

