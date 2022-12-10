import { MouseEvent, useState } from 'react';

import './Book.css';

import { useAppDispatch } from '../../app/hooks';
import EditBookModal from '../../components/EditBookModal/EditBookModal';
import { deleteBook, editBook } from '../../features/booksListSlice';
import { BookType } from '../../types';


interface Props extends BookType {}

const Book: React.FC<Props> = ({
  id, name, price, category, description
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  
  const dispatch = useAppDispatch();

  const toggleShowNodal = () => setShowModal(!showModal);
  
  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    dispatch(deleteBook(id)).then(toggleShowNodal);
  }

  const handleEdit = (book: BookType) => {
    dispatch(editBook(book)).then(toggleShowNodal);
  }
    

  return (
    <>
      <div className='book-wrapper' onClick={toggleShowNodal}>
        <p className='name'>{name}</p>
        <p className='price'>{`${price}`}</p>
        <p className='category'>{category}</p>
        <button className='btn' onClick={handleDelete}>Delete</button>
      </div>

      {showModal && 
        <EditBookModal 
          id={id}
          name={name}
          price={price}
          category={category}
          description={description}
          title='Edit book'
          onClose={toggleShowNodal}
          onSave={handleEdit}
        />
      }
    </>
  );
}

export default Book;
