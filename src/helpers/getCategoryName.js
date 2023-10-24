function getCategoryName(url) {
  const knownCategories = ['mobile', 'car', 'laptop', 'sofa'];

  const parts = url.split('/');

  for (const part of parts) {
    if (knownCategories.includes(part)) {
      return part;
    }
  }
  return null;
}

module.exports = getCategoryName;