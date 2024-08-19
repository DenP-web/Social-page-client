export const formatDateForInput = (isoDate: string | undefined) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return date.toISOString().split('T')[0];
};