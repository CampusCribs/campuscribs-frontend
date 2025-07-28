export function buildDraftImageURLs(
  userId: string,
  postId: string,
  mediaIds: string[]
): string[] {
  const baseUrl = import.meta.env.VITE_MINIO_DRAFTMEDIA_ENDPOINT;
  return mediaIds.map(
    (mediaId) => `${baseUrl}/users/${userId}/${postId}/${mediaId}`
  );
}

export function buildImageURLs(
  userId: string,
  postId: string,
  mediaIds: string[]
): string[] {
  const baseUrl = import.meta.env.VITE_MINIO_POSTMEDIA_ENDPOINT;
  return mediaIds.map(
    (mediaId) => `${baseUrl}/users/${userId}/${postId}/${mediaId}`
  );
}

export function buildImageURL(
  userId: string,
  postId: string,
  mediaId: string
): string {
  const baseUrl = import.meta.env.VITE_MINIO_POSTMEDIA_ENDPOINT;
  return `${baseUrl}/users/${userId}/${postId}/${mediaId}`;
}

export function buildDraftImageURL(
  userId: string,
  postId: string,
  mediaId: string
): string {
  const baseUrl = import.meta.env.VITE_MINIO_DRAFTMEDIA_ENDPOINT;
  return `${baseUrl}/users/${userId}/${postId}/${mediaId}`;
}

export function buildThumbnailURLs(
  userId: string,
  postId: string,
  mediaIds: string[]
): string[] {
  const baseUrl = import.meta.env.VITE_MINIO_THUMBNAILS_ENDPOINT;
  return mediaIds.map(
    (mediaId) =>
      `${baseUrl}/users/${userId}/${postId}/${mediaId}?thumbnail=true`
  );
}

export function buildThumbnailURL(userId: string, mediaId: string): string {
  const baseUrl = import.meta.env.VITE_MINIO_THUMBNAILS_ENDPOINT;
  return `${baseUrl}/users/${userId}/thumbnails/${mediaId}`;
}
