export function buildImageURLs(
  userId: string,
  postId: string,
  mediaIds: string[]
): string[] {
  const baseUrl =
    import.meta.env.VITE_MEDIA_BASE_URL || "http://localhost:9000";
  return mediaIds.map(
    (mediaId) =>
      `${baseUrl}/campuscribs-media/users/${userId}/${postId}/${mediaId}`
  );
}

export function buildThumbnailURLs(
  userId: string,
  postId: string,
  mediaIds: string[]
): string[] {
  const baseUrl =
    import.meta.env.VITE_MEDIA_BASE_URL || "http://localhost:9000";
  return mediaIds.map(
    (mediaId) =>
      `${baseUrl}/campuscribs-media/users/${userId}/${postId}/${mediaId}?thumbnail=true`
  );
}
