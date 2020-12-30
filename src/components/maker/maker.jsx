import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ FileInput, authService, cardRepository }) => {
  const historyState = useHistory().state;
  const [cards, setCards] = useState({});
  const [userId, setUserId] = useState(historyState && historyState.id);

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
    cardRepository.saveCard(userId, card);
  };

  const deleteCard = card => {
    setCards(cards => {
      const update = { ...cards };
      delete update[card.id];
      return update;
    });
    cardRepository.deleteCard(userId, card);
  };
  useEffect(() => {
    if (!userId) {
      return;
    }
    cardRepository.syncCards(userId, cards => {
      setCards(cards);
    });
    return () => stopSync();
  }, [userId]);
  useEffect(() => {
    authService.onAuthChange(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        history.push('/');
      }
    });
  });

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          FileInput={FileInput}
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
