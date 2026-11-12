export async function uploadImageFile(file: File): Promise<{ success: boolean; url: string }> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Upload failed");
  }

  return data;
}
