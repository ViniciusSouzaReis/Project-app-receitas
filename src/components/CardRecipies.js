import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function CardRecipies({ index, urlImage, nameRecipie, id, type }) {
  const { push } = useHistory();

  const handleClick = () => {
    push(`${type}/${id}`);
  };

  return (
    <div
      className="card"
      name={ id }
      style={ { width: '18rem' } }
      role="presentation"
      data-testid={ `${index}-recipe-card` }
      onClick={ handleClick }
    >
      <img
        src={ urlImage }
        className="card-img-top"
        alt={ nameRecipie }
        data-testid={ `${index}-card-img` }
        role="presentation"
      />
      <div className="card-body">
        <h5
          className="card-title"
          data-testid={ `${index}-card-name` }
          role="presentation"
        >
          {nameRecipie}
        </h5>
        {/* <p className="card-text">{descRecipie}</p> */}
        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>
  );
}

CardRecipies.propTypes = {
  index: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
  nameRecipie: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default CardRecipies;
