import {useSelector} from 'react-redux';

export const usePost = () => {
  const userPost = useSelector((state) => state.user.userPost);
  let name, favourites, images, likedBy, hashtags, comments;

  // If there's data
  if (userPost) {
    ({
      name,
      favourites,
      story: {images, likedBy, hashtags, comments},
    } = userPost);
  }

  return {name, favourites, images, likedBy, hashtags, comments};
};
