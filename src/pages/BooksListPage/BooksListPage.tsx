import React, { useState } from 'react';

import './BooksListPage.css';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Book from '../../components/Book/Book';
import EditBookModal from '../../components/EditBookModal/EditBookModal';
import { addBook, selectBooksList } from '../../features/booksListSlice';
import { BookType } from '../../types';

const BooksListPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const booksList = useAppSelector(selectBooksList);
  const dispatch = useAppDispatch();

  const toggleShowNodal = () => setShowModal(!showModal);

  const handleAddBook = (book: BookType) =>
    dispatch(addBook(book)).then(toggleShowNodal);

  return (
    <>
      {/* {status === 'loading' && <div>Loading...</div>} */}
      <div>
        <button className='btn' onClick={toggleShowNodal}>Add book</button>

        <div className='books-list'>
          {booksList.map((book: BookType) => 
            <Book key={`book_${book.id}`} {...book}/>)
          }
        </div>
      </div>

      {showModal && 
        <EditBookModal 
          title="Add book"
          onClose={toggleShowNodal}
          onSave={handleAddBook}
        />
      }
    </>
  );
}

export default BooksListPage;
