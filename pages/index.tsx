import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import Book  from '../app/components/Book';
import Button  from '../app/components/Button';
import EditBookModal  from '../app/components/EditBookModal';
import Overlay  from '../app/components/Overlay';
import { 
  addBook,
  deleteBook,
  editBook,
  fetchBooksList,
  selectAppStatus,
  selectBooksList
} from '../app/store/booksListPageSlice';
import { useAppDispatch, useAppSelector } from '../app/store/hooks';
import { wrapper } from '../app/store/store';
import styles from '../styles/BooksListPage.module.css'
import { AppStatus, iBook } from '../types';

const BookList: NextPage = () => {
  const dispach = useAppDispatch();
  const booksList = useAppSelector(selectBooksList);
  const appStatus = useAppSelector(selectAppStatus);

  const [showAddBookModal, setShowAddBookModal] = useState(false);

  const toggleShowModal = () => setShowAddBookModal(!showAddBookModal);
  const handleAddBook = async (book: Omit<iBook, 'id'>) => {
    await dispach(addBook(book));
    toggleShowModal();
  };
  const handleDeleteBook = (id: iBook['id']) => dispach(deleteBook(id));
  const handleEditBook = (book: Omit<iBook, 'id'>) => dispach(editBook(book))

  const showLoadingModal = appStatus === AppStatus.LOADING;

  return (
    <>
      <Head>
        <title>Books List</title>
      </Head>
      <Button 
        className={styles.addBookBtn}
        onClick={toggleShowModal}
      >
        Add New Book
      </Button>
      <div className={styles.booksList}>
        {booksList?.map(book => 
          <Book 
            key={`book_${book.id}`}
            onDelete={handleDeleteBook}
            onEdit={handleEditBook}
            {...book}
          />
        )}
      </div>

      {showAddBookModal && 
        <EditBookModal 
          title='Add book'
          onClose={toggleShowModal}
          onSave={handleAddBook}
        />
      }

      {showLoadingModal &&
        <Overlay>
          <div className={styles.spinerWrapper}>
            <div className={styles.spinerRotation}>
              Loading...
            </div>
          </div>
        </Overlay>
      }
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async () => {
      await store.dispatch(fetchBooksList());

      return { props: {} };
    }
);

export default BookList;
