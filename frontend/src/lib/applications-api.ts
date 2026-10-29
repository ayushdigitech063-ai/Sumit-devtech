export async function submitApplication(formData: FormData): Promise<{ message: string }> {
  const response = await fetch("/api/applications", {
    method: "POST",
    body: formData,
    cache: "no-store",
  });

  let data: unknown = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      typeof data === "object" && data !== null && "message" in data && typeof (data as { message: unknown }).message === "string"
        ? (data as { message: string }).message
        : "Could not submit your application. Please try again.";
    throw new Error(message);
  }

  const successMessage =
    typeof data === "object" && data !== null && "message" in data && typeof (data as { message: unknown }).message === "string"
      ? (data as { message: string }).message
      : "Application submitted successfully.";

  return { message: successMessage };
}

