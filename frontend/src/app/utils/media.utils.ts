import { environment } from '../../environments/environment';

/**
 * Resolves media/image URLs using sanitized environment.apiBaseUrl.
 */
export function resolveMediaUrl(filename: string | undefined | null): string {
  if (!filename) return '';
  if (filename.startsWith('http://') || filename.startsWith('https://')) return filename;
  
  const baseUrl = (environment.apiBaseUrl || '').replace(/\/+$/, '');
  if (filename.startsWith('/')) return `${baseUrl}${filename}`;
  
  return `${baseUrl}/api/media/images/${filename}`;
}

/**
 * Extracts 2-letter uppercase initials from a given entity or company name.
 */
export function getInitials(name: string | undefined | null): string {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}
