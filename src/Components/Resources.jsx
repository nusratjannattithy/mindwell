/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Heading from './Heading';

const Resources = () => {
  return (
    <div className="w-full min-h-screen p-10">
      {/* Heading Section */}
      <Heading 
        Headline={"Resources"} 
        pagename={"Explore insightful Blogs, Articles, and Books etc"} 
      />
     
      {/* Description Below Heading */}
      <div className="mt-6 text-center">
        <p className="text-lg text-gray-700">
          We provide these resources to support your mental health and well-being. Our collection of <Link to="/blog" className="text-[#1A0B5B] font-semibold">blogs</Link>, <Link to="/articles" className="text-[#1A0B5B] font-semibold">articles</Link>, and <Link to="/books" className="text-[#1A0B5B] font-semibold">books</Link> aims to offer valuable insights, coping strategies, and expert advice to help you navigate your mental health journey. Whether you&apos;re looking for self-care tips, psychological guidance, or personal stories, our resources are here to provide support every step of the way.

        </p>
      </div>

      {/* Resource Links */}
      <div className="grid grid-cols-3 gap-8 text-center w-full max-w-7xl mx-auto mt-10">
        
        {/* Blog Section */}
        <Link to="/blog" className="p-8 border rounded-lg shadow-md hover:shadow-lg transition bg-white">
          <img src="./assets/icons/blog-icon.png" alt="Blog" className="mx-auto w-28 h-28 mb-6" />
          <h2 className="text-3xl font-semibold text-[#1A0B5B]">Blogs</h2>
          <p className="text-gray-600">Explore insightful blogs recommended by experts in the mental health field.</p>
        </Link>

        {/* Articles Section */}
        <Link to="/articles" className="p-8 border rounded-lg shadow-md hover:shadow-lg transition bg-white">
          <img src="./assets/icons/article-icon.png" alt="Articles" className="mx-auto w-28 h-28 mb-6" />
          <h2 className="text-3xl font-semibold text-[#1A0B5B]">Articles</h2>
          <p className="text-gray-600">Read research articles and journals that provide in-depth understanding of mental health topics.</p>
        </Link>

        {/* Books Section */}
        <Link to="/books" className="p-8 border rounded-lg shadow-md hover:shadow-lg transition bg-white">
          <img src="./assets/icons/book-icon.png" alt="Books" className="mx-auto w-28 h-28 mb-6" />
          <h2 className="text-3xl font-semibold text-[#1A0B5B]">Books</h2>
          <p className="text-gray-600">Discover books written by mental health professionals that guide you on your journey.</p>
        </Link>

      </div>
    </div>
  );
};

export default Resources;
