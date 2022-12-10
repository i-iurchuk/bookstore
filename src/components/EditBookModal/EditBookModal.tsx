import { FormEvent, useState } from 'react';

import './EditBookModal.css';

import Input from '../Input/Input';
import { BookType } from '../../types';

type Props = {
  id?: BookType['id'];
  name?: BookType['name'];
  price?: BookType['price'];
  category?: BookType['category'];
  description?: BookType['description'];
  title: string;
  onClose(): void;
  onSave(book: BookType): void;
}

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

    const data = { name, price, category, description } as BookType;

    if(id) {
      data.id = id
    }

    onSave(data);
  }

  return (
    <div className='overlay'>
      <div className='modal'>
        <h2>{title}</h2>

        <form onSubmit={handleOnSave}>
          <Input 
            id='name'
            label='Name:'
            value={name}
            onChange={handleNameChange}
          />

          <Input
            id='price'
            type='number'
            label='Price:'
            value={price}
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

          <div className='btn-wrappper'>
            <button 
              className='btn'
              type='submit'
            >
              Save
            </button>
            <button 
              onClick={onClose}
              className='btn close-btn'
            > 
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBookModal;
