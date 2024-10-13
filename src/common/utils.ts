const getUrlSlug = (id: number, artist: string, title: string) => {
  return `${id}/${artist}_${title}`.toLowerCase().replace(/\s+/g, '-');
};

export { getUrlSlug };
