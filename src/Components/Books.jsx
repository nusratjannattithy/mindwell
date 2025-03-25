import { useState } from "react";

const Books = () => {
  // State to manage search query
  const [searchQuery, setSearchQuery] = useState("");

  // Data for books
  const books = [
    {
      title: "The Little Book of Mental Health",
      description: "Everyday wellbeing is about how we feel, think and behave. This book focuses on the importance of taking care of your mental state as much as your physical health.",
      pdf: "./assets/books/book1.pdf", // Replace with actual file paths

    },
    {
      title: "Look after your mental health using exercise",
      description: "At a very basic level, physical activity means any movement of your body that uses your muscles and expends energy. One of the great things about phyical activity is that there are endless possibilities and there will be an activity to suit almost everyone!  It is recommended that the average adult should do between 75 and 150 minutes of exercise a week.",
      pdf: "./assets/books/book2.pdf", // Replace with actual file paths

    },
    {
      title: "Mental Health in the Workplace",
      description: "This book explores the intersection between mental health and the workplace, offering insights into the challenges faced by people with mental health difficulties in work settings.",
      pdf: "./assets/books/book3.pdf", // Replace with actual file paths

    },
    {
      title: "Wellbeing and Mental Health: A Guide to Looking After Yourself and Others",
      description: "A comprehensive guide on promoting positive mental health, offering advice on emotional wellbeing, coping with challenges, supporting others, and incorporating simple practices into daily life.",
      pdf: "./assets/books/book4.pdf", // Replace with actual file paths

    },
    {
      title: "Our Best Ever Mental Health Tips",
      description: "Research-based measures to protect and promote daily mental health, including strategies for stress and emotion management, and the importance of emotional support.",
      pdf: "./assets/books/book5.pdf", // Replace with actual file paths

    },
    // Add more books as needed
  ];

  // Filtered books based on search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen p-10">
      
      {/* Title and Subheading */}
      <h1 className="text-4xl font-bold text-center mb-2">Books</h1>
      <h2 className="text-2xl text-center text-gray-600 mb-8">Explore our collection of insightful books</h2>

      {/* Search Bar */}
      <div className="text-center mb-8 flex justify-center">
        <input
          type="text"
          className="p-2 w-full border rounded-lg shadow-md"
          placeholder="Search Books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="ml-2 p-2 bg-[#1A0B5B] text-white rounded-lg shadow-md"
          onClick={() => setSearchQuery(searchQuery)}

        >
          Search
        </button>
      </div>



      {/* Books List */}
      <div className="space-y-12">
        {filteredBooks.map((book, index) => (
          <div key={index} className="border p-8 rounded-lg shadow-md bg-white">
            <h2 className="text-3xl font-semibold text-[#1A0B5B]">{book.title}</h2>
            <p className="mt-4 text-lg text-gray-700">{book.description}</p>

            {/* PDF Button */}
            <div className="mt-6">
              <a
                href={book.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-[#1A0B5B] hover:bg-[#1A0B5B]/90 p-3 rounded-lg shadow-md"
              >
                Open PDF
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
