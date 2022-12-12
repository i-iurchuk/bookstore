import { MouseEvent, useState } from 'react';

import Button from '../components/Button';
import EditBookModal from '../components/EditBookModal';
import styles from '../../styles/Book.module.css';
import { iBook } from '../../types';

interface Props extends iBook {
  onEdit: (book: Omit<iBook, 'id'>) => void;
  onDelete: (id: iBook['id']) => void;
}

const Book: React.FC<Props> = ({ id, name, price, category, description, onEdit, onDelete }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  
  const toggleShowModal = () => setShowEditModal(!showEditModal);

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete(id);
  };

  const handleEditBook = async (book: Omit<iBook, 'id'>) => {
    await onEdit(book);
    toggleShowModal();
  }
  
  return (
    <>
      <div className={styles.book} onClick={toggleShowModal}>
        <h3 className={styles.name}>{name}</h3>

        <div className={styles.bookDetails}>
          <p className={styles.price}>{price}</p>
          <p className={styles.category}>{category}</p>
          <Button className={styles.deleteBtn} onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      {showEditModal && 
        <EditBookModal 
          id={id}
          name={name}
          price={price}
          category={category}
          description={description}
          title='Edit book'
          onClose={toggleShowModal}
          onSave={handleEditBook}
        />
      }
    </>
  );
};

export default Book;
