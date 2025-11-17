/**
 * Format timestamp to readable date-time format
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Formatted date string (e.g., "15/01/2025 14:30")
 */
export function formatTimestamp(timestamp: number): string {
  try {
    const date = new Date(timestamp);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "N/A";
    }

    // Format: DD/MM/YYYY HH:MM
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  } catch (error) {
    console.error("Error formatting timestamp:", error);
    return "N/A";
  }
}

/**
 * Format timestamp to relative time (e.g., "2 hours ago", "Yesterday")
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Relative time string in Vietnamese
 */
export function formatRelativeTime(timestamp: number): string {
  try {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) {
      return "Vừa xong";
    } else if (diffMins < 60) {
      return `${diffMins} phút trước`;
    } else if (diffHours < 24) {
      return `${diffHours} giờ trước`;
    } else if (diffDays === 1) {
      return "Hôm qua";
    } else if (diffDays < 7) {
      return `${diffDays} ngày trước`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} tuần trước`;
    } else {
      return formatTimestamp(timestamp);
    }
  } catch (error) {
    console.error("Error formatting relative time:", error);
    return "N/A";
  }
}

