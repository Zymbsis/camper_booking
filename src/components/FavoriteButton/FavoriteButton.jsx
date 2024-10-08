import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromFavorite, addToFavorite } from '@redux/campers/slice';
import { selectFavoritesId } from '@redux/campers/selectors';
import { Icon } from 'shared';
import clsx from 'clsx';
import css from './FavoriteButton.module.css';

const FavoriteButton = ({ camper }) => {
  const dispatch = useDispatch();
  const favoritesId = useSelector(selectFavoritesId);

  const [isChecked, setIsChecked] = useState(() =>
    favoritesId.some((item) => item === camper.id),
  );

  const handleChange = ({ target: { checked } }) => {
    setIsChecked(checked);
    if (checked) {
      dispatch(addToFavorite(camper));
    } else {
      dispatch(deleteFromFavorite(camper.id));
    }
  };

  return (
    <>
      <input
        className={css.heartCheckbox}
        type='checkbox'
        checked={isChecked}
        onChange={handleChange}
      />
      <Icon
        iconId='icon-heart'
        className={clsx(css.heartIcon, { [css.active]: isChecked })}
      />
    </>
  );
};

export default FavoriteButton;
