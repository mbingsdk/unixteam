/**
 * Format date consistently to avoid hydration mismatches
 * Uses a simple format that works the same on server and client
 */
export function formatDate(dateString: string, locale: 'en-US' | 'id-ID' = 'en-US'): string {
  const date = new Date(dateString);

  const months = locale === 'id-ID'
    ? ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return locale === 'id-ID'
    ? `${day} ${month} ${year}`
    : `${month} ${day}, ${year}`;
}

/**
 * Format date with full month name
 */
export function formatDateFull(dateString: string, locale: 'en-US' | 'id-ID' = 'en-US'): string {
  const date = new Date(dateString);

  const months = locale === 'id-ID'
    ? ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return locale === 'id-ID'
    ? `${day} ${month} ${year}`
    : `${month} ${day}, ${year}`;
}
