import { FormEvent, useState } from 'react';

import Button from './Button';
import Input from './Input';
import Overlay from './Overlay';
import { iBook } from '../../types';
import styles from '../../styles/EditBookModal.module.css';

type Props = {
  id?: iBook['id'];
  name?: iBook['name'];
  price?: iBook['price'];
  category?: iBook['category'];
  description?: iBook['description'];
  title: string;
  onClose(): void;
  onSave(book: Omit<iBook, 'id'>): void;
};

const EditBookModal: React.FC<Props> = ({ id, title, onClose, onSave, ...rest}) => {
  const [name, setName] = useState(rest.name || '');
  const [price, setPrice] = useState(rest.price || '');
  const [category, setCategory] = useState(rest.category || '');
  const [description, setDescription] = useState(rest.description || '');
  
  const handleNameChange = (value: string) => setName(value);
  const handlePriceChange = (value: string) => setPrice(value);
  const handleCategoryChange = (value: string) => setCategory(value);
  const handleDescriptionChange = (value: string) => setDescription(value);

  const handleOnSave = (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const data = { name, price, category, description } as iBook;

    id && (data.id = id);

    onSave(data);
  }

  return (
    <Overlay>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>{title}</h2>

        <form onSubmit={handleOnSave}>
          <Input 
            id='name'
            label='Name:'
            value={name}
            required
            onChange={handleNameChange}
          />

          <Input
            id='price'
            type='number'
            label='Price:'
            value={price}
            required
            onChange={handlePriceChange}
            min='0'
            step='1'
          />

          <Input 
            id='category'
            label='Category:'
            value={category}
            onChange={handleCategoryChange}
          />

          <Input 
            id='description'
            isTextArea
            label='Description:'
            value={description}
            onChange={handleDescriptionChange}
          />

          <div className={styles.btnWrapper}>
            <Button 
              className={styles.saveButton}
              type='submit'
            >
              Save
            </Button>
            <Button 
              onClick={onClose}
              className={styles.closeButton}
            > 
              Close
            </Button>
          </div>
        </form>
      </div>
    </Overlay>
  );
}

export default EditBookModal;
