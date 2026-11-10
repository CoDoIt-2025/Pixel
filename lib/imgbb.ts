export const IMGBB_API_KEY =
  process.env.NEXT_PUBLIC_IMGBB_API_KEY || "34b1022bc8d3afbe2dc9875cba76714d";

export interface ImgBBUploadResponse {
  url: string;
  displayUrl: string;
  thumbUrl?: string;
  deleteUrl?: string;
  filename: string;
  size: number;
}

/**
 * Uploads an image file directly to ImgBB and returns permanent CDN hosted URLs (i.ibb.co)
 */
export async function uploadToImgBB(file: File): Promise<ImgBBUploadResponse> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || `ImgBB upload failed with HTTP status ${res.status}`
    );
  }

  const json = await res.json();
  if (!json.success || !json.data) {
    throw new Error("ImgBB API returned an unsuccessful response");
  }

  return {
    url: json.data.url,
    displayUrl: json.data.display_url || json.data.url,
    thumbUrl: json.data.thumb?.url,
    deleteUrl: json.data.delete_url,
    filename: json.data.image?.filename || file.name,
    size: json.data.size || file.size,
  };
}
