import React from 'react';
import PropTypes from 'prop-types';

function CardRecipies({ index, urlImage, nameRecipie, descRecipie }) {
  return (
    <div
      className="card"
      style={ { width: '18rem' } }
      data-testid={ `${index}-recipe-card` }
    >
      <img
        src={ urlImage }
        className="card-img-top"
        alt={ nameRecipie }
        data-testid={ `${index}-card-img` }
      />
      <div className="card-body">
        <h5
          className="card-title"
          data-testid={ `${index}-card-name` }
        >
          {nameRecipie}
        </h5>
        <p className="card-text">{descRecipie}</p>
        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>
  );
}

CardRecipies.propTypes = {
  index: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
  nameRecipie: PropTypes.string.isRequired,
  descRecipie: PropTypes.string.isRequired,
};

export default CardRecipies;
