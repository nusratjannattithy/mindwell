/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from 'react-icons/fa';
import breathingTechniques from "../assets/blog_img/breathing-techniques.jpg";
import selfCompassion from "../assets/blog_img/self-compassion.jpg";
import selfHarm from "../assets/blog_img/self-harm.jpg";

const AdminResources = () => {
  // Articles data
  const articles = [
    {
      title: "An integrative collaborative care model for people with mental illness and physical comorbidities",
      abstract: "Many individuals with mental health problems have comorbid physical conditions, or may present with substance/alcohol misuse or abuse issues...",
      pdf: "./assets/articles/article1.pdf", 
    },
    {
      title: "Cognitive–behavioral therapy for management of mental health and stress-related disorders",
      abstract: "Cognitive–behavioral therapy (CBT) helps individuals to eliminate avoidant and safety-seeking behaviors that prevent self-correction of faulty beliefs...",
      pdf: "./assets/articles/article2.pdf", 
    },
  ];

  // Books data
  const books = [
    {
      title: "The Little Book of Mental Health",
      description: "Everyday wellbeing is about how we feel, think and behave. Focus on mental and physical health equally.",
      pdf: "./assets/books/book1.pdf",
    },
    {
      title: "Look after your mental health using exercise",
      description: "Physical activity means any movement of your body that uses your muscles and expends energy.",
      pdf: "./assets/books/book2.pdf",
    },
    {
      title: "Mental Health in the Workplace",
      description: "This book explores the intersection between mental health and the workplace.",
      pdf: "./assets/books/book3.pdf",
    },
  ];

  // Blogs data
  const blog = [
    {
      id: 1,
      title: "Breathing Techniques For Anxiety You Can Start Using Today",
      description: "Effective breathing techniques to reduce stress and build resilience.",
      image: breathingTechniques
    },
    {
      id: 2,
      title: "What Is Self-Compassion: 5 Facts, 4 Myths, And 5 Ways To Practice It",
      description: "Learn how self-compassion boosts mental health and get tips to practice it.",
      image: selfCompassion
    },
    {
      id: 3,
      title: "How To Stop Cutting: 7 Ways To Quit Self-Harm For Good",
      description: "Guide on overcoming self-harm tendencies and mental health struggles.",
      image: selfHarm
    }
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Blogs */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold mb-4 text-gray-700">Blogs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blog.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
              <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded" />
              <h4 className="mt-4 text-xl font-semibold">{item.title}</h4>
              <p className="text-gray-600 mt-2">{item.description}</p>
              <Link to={`/blog/${item.id}`} className="text-blue-600 mt-3 inline-block hover:underline">
                View Blog <FaArrowRight className="inline-block ml-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold mb-4 text-gray-700">Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <h4 className="text-xl font-semibold">{item.title}</h4>
              <p className="text-gray-600 mt-2">{item.abstract}</p>
              <a href={item.pdf} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-3 inline-block hover:underline">
                Open PDF <FaArrowRight className="inline-block ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Books */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-gray-700">Books</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <h4 className="text-xl font-semibold">{item.title}</h4>
              <p className="text-gray-600 mt-2">{item.description}</p>
              <a href={item.pdf} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-3 inline-block hover:underline">
                Open Book <FaArrowRight className="inline-block ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminResources;
