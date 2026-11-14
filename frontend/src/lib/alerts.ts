import Swal, { SweetAlertOptions } from "sweetalert2";
import toast from "react-hot-toast";

/**
 * Modern SweetAlert confirmation dialog customized for Sumit DevTech / Admin theme
 */
export async function confirmAction({
  title = "Are you sure?",
  text = "You won't be able to revert this!",
  confirmButtonText = "Yes, proceed",
  cancelButtonText = "Cancel",
  icon = "warning",
}: {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  icon?: SweetAlertOptions["icon"];
}) {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: "#f97316", // Brand Orange
    cancelButtonColor: "#64748b", // Slate 500
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
    customClass: {
      popup: "rounded-2xl p-6 font-sans shadow-2xl border border-slate-100",
      title: "text-lg font-bold text-slate-900",
      htmlContainer: "text-sm text-slate-600",
      confirmButton: "px-5 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-orange-500/20",
      cancelButton: "px-4 py-2.5 rounded-xl text-xs font-semibold",
    },
  });

  return result.isConfirmed;
}

/**
 * React Hot Toast shortcuts
 */
export const notify = {
  success: (msg: string) =>
    toast.success(msg, {
      style: {
        borderRadius: "14px",
        background: "#0f172a",
        color: "#fff",
        fontSize: "13px",
        fontWeight: 600,
        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)",
      },
      iconTheme: {
        primary: "#10b981",
        secondary: "#fff",
      },
    }),
  error: (msg: string) =>
    toast.error(msg, {
      style: {
        borderRadius: "14px",
        background: "#0f172a",
        color: "#fff",
        fontSize: "13px",
        fontWeight: 600,
        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)",
      },
      iconTheme: {
        primary: "#ef4444",
        secondary: "#fff",
      },
    }),
  loading: (msg: string) =>
    toast.loading(msg, {
      style: {
        borderRadius: "14px",
        background: "#0f172a",
        color: "#fff",
        fontSize: "13px",
        fontWeight: 600,
      },
    }),
};
