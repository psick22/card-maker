import { firebaseDatabase } from './firebase';

class CardRepository {
  saveCard(userId, card) {
    firebaseDatabase.ref(`${userId}/cards/${card.id}`).set(card);
  }
  deleteCard(userId, card) {
    firebaseDatabase.ref(`${userId}/cards/${card.id}`).remove();
  }
  syncCards(userId, onUpdate) {
    const ref = firebaseDatabase.ref(`${userId}/cards/`);
    ref.on('value', snapshot => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => {
      ref.off();
    };
  }
}
export default CardRepository;
