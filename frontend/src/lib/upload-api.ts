export async function uploadImageFile(file: File): Promise<{ success: boolean; url: string }> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Non-JSON upload response:", text);
    throw new Error(
      res.status === 404
        ? "Upload endpoint not found. Please ensure backend server is running and rebuilt on production."
        : `Server returned HTML error (${res.status}). Backend might be restarting.`
    );
  }

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Upload failed");
  }

  return data;
}
