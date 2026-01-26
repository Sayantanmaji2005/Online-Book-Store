import React from 'react';
import { BookList } from '../Components/product/bookList.jsx';
import { sampleBooks } from "../book.js";

export const Home = ({ onBookSelect, selectedCategory }) => {
  const filteredBooks = selectedCategory === 'all'
    ? sampleBooks
    : sampleBooks.filter(book => book.genre.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <main className="p-5 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Pass the filtered books data to the BookList component */}
        <BookList books={filteredBooks} onBookSelect={onBookSelect} />
      </div>
    </main>
  );
};