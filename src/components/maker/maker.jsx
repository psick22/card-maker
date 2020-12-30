import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ authService }) => {
  const [cards, setCards] = useState({
    1: {
      id: '1',
      name: 'Kirok',
      company: 'nomad',
      theme: 'dark',
      title: 'software engineer',
      email: 'kgirok@gamil.com',
      message: 'gosu',
      fileName: 'kirok',
      fileURL: null,
    },
    2: {
      id: '2',
      name: 'Kirok',
      company: 'nomad',
      theme: 'light',
      title: 'software engineer',
      email: 'kgirok@gamil.com',
      message: 'gosu',
      fileName: 'kirok',
      fileURL: null,
    },
    3: {
      id: '3',
      name: 'Kirok',
      company: 'nomad',
      theme: 'colorful',
      title: 'software engineer',
      email: 'kgirok@gamil.com',
      message: 'gosu',
      fileName: 'kirok',
      fileURL: null,
    },
  });
  const history = useHistory();

  const onLogout = () => {
    authService.logout();
  };

  const addOrUpdateCard = card => {
    setCards(cards => {
      const update = { ...cards };
      update[card.id] = card;
      return update;
    });
  };

  const deleteCard = card => {
    setCards(cards => {
      const update = { ...cards };
      delete update[card.id];
      return update;
    });
  };
  useEffect(() => {
    authService.onAuthChange(user => {
      if (!user) {
        history.push('/');
      }
    });
  });

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          cards={cards}
          addCard={addOrUpdateCard}
          updateCard={addOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
