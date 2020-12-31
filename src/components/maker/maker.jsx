import React, { useCallback, useEffect, useState } from 'react';
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

  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);

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
    // mount 될때 + userId, cardRepository가 업데이트 될때
    if (!userId) {
      return;
    }
    const stopSync = cardRepository.syncCards(userId, cards => {
      setCards(cards);
    });
    // unmount 될때 stopSync() 함수를 return함
    return () => stopSync();
  }, [userId, cardRepository]);

  useEffect(() => {
    authService.onAuthChange(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        history.push('/');
      }
    });
  }, [userId, history, authService]);

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
