export async function submitApplication(formData: FormData): Promise<{ message: string }> {
  // Post directly to our backend career application endpoint
  const response = await fetch("/api/careers/apply", {
    method: "POST",
    body: formData,
  });

  let data: any = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok || !data?.success) {
    const message = data?.message || "Could not submit your application. Please try again.";
    throw new Error(message);
  }

  return { message: data?.message || "Application submitted successfully." };
}
