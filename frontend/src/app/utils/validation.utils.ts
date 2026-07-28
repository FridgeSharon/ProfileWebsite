/**
 * Validates whether the given string is a valid email address or phone number.
 */
export function isValidContact(value: string | undefined | null): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[\d\s-]{7,20}$/;
  return emailRegex.test(trimmed) || phoneRegex.test(trimmed);
}
