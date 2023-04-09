export const fetchPhotos = (name, page) => {
  return fetch(
    `https://pixabay.com/api/?q=${name}&page=${page}&key=33842320-ed19ffa83cc28946150fb442a&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => res.json());
};
