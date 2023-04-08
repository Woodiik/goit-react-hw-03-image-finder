import PropTypes from 'prop-types';
export const Item = ({ url, largeImg, openModal, onClick }) => {
  return (
    <li onClick={() => onClick(largeImg)} className="image-gallery-item">
      <img
        onClick={() => openModal()}
        className="image-gallery-item-image"
        src={url}
        alt=""
      />
    </li>
  );
};

Item.propTypes = {
  url: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};
