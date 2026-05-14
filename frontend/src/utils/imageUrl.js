export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  // local uploaded image (starts with /uploads/)
  return `http://localhost:5000${path}`;
};