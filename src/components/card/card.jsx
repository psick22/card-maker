import React from 'react';
import styles from './card.module.css';

const Card = ({ card }) => {
  console.log(card);
  return <h1>{card.name}</h1>;
};

export default Card;
