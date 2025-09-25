import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import config from './config.js';

const BookManager = () => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({
    id: '',
    title: '',
    author: '',
    genre: '',
    isbn: '',
    price: '',
    publisher: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedBook, setFetchedBook] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/bookapi`;

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setBooks(res.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setMessage(`Failed to fetch books. ${error.response?.data || error.message}`);
    }
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in book) {
      if (!book[key] || book[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addBook = async () => {
    if (!validateForm()) return;
    try {
      const bookData = {
        ...book,
        id: parseInt(book.id),
        price: parseFloat(book.price)
      };
      await axios.post(`${baseUrl}/add`, bookData);
      setMessage('Book added successfully.');
      fetchAllBooks();
      resetForm();
    } catch (error) {
      console.error('Error adding book:', error);
      setMessage(`Error adding book. ${error.response?.data || error.message}`);
    }
  };

  const updateBook = async () => {
    if (!validateForm()) return;
    try {
      const bookData = {
        ...book,
        id: parseInt(book.id),
        price: parseFloat(book.price)
      };
      await axios.put(`${baseUrl}/update`, bookData);
      setMessage('Book updated successfully.');
      fetchAllBooks();
      resetForm();
    } catch (error) {
      console.error('Error updating book:', error);
      setMessage('Error updating book.');
    }
  };

  const deleteBook = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllBooks();
    } catch (error) {
      setMessage('Error deleting book.');
    }
  };

  const getBookById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedBook(res.data);
      setMessage('');
    } catch (error) {
      setFetchedBook(null);
      setMessage('Book not found.');
    }
  };

  const handleEdit = (bk) => {
    setBook(bk);
    setEditMode(true);
    setMessage(`Editing book with ID ${bk.id}`);
  };

  const resetForm = () => {
    setBook({
      id: '',
      title: '',
      author: '',
      genre: '',
      isbn: '',
      price: '',
      publisher: ''
    });
    setEditMode(false);
  };

  return (
    <div className="student-container">

{message && (
  <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
    {message}
  </div>
)}


      <h2>Book Management</h2>

      <div>
        <h3>{editMode ? 'Edit Book' : 'Add Book'}</h3>
        <div className="form-grid">
          <input type="number" name="id" placeholder="ID" value={book.id} onChange={handleChange} />
          <input type="text" name="title" placeholder="Title" value={book.title} onChange={handleChange} />
          <input type="text" name="author" placeholder="Author" value={book.author} onChange={handleChange} />
          <input type="text" name="genre" placeholder="Genre" value={book.genre} onChange={handleChange} />
          <input type="text" name="isbn" placeholder="ISBN" value={book.isbn} onChange={handleChange} />
          <input type="number" step="0.01" name="price" placeholder="Price" value={book.price} onChange={handleChange} />
          <input type="text" name="publisher" placeholder="Publisher" value={book.publisher} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addBook}>Add Book</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateBook}>Update Book</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <div>
        <h3>Get Book By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter ID"
        />
        <button className="btn-blue" onClick={getBookById}>Fetch</button>

        {fetchedBook && (
          <div>
            <h4>Book Found:</h4>
            <pre>{JSON.stringify(fetchedBook, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h3>All Books</h3>
        {books.length === 0 ? (
          <p>No books found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(book).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((bk) => (
                  <tr key={bk.id}>
                    {Object.keys(book).map((key) => (
                      <td key={key}>{bk[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(bk)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteBook(bk.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default BookManager;
