import { useState } from "react";

const Articles = () => {
  // State to manage search query
  const [searchQuery, setSearchQuery] = useState("");

  // Data for articles
  const articles = [
    {
      title: "An integrative collaborative care model for people with mental illness and physical comorbidities",
      abstract: "Many individuals with mental health problems have comorbid physical conditions, or may present with substance/alcohol misuse or abuse issues. This results in complex treatment challenges that may not be adequately addressed by a model of care that is solely delivered by an individual clinician using a sole intervention...",
      pdf: "./assets/articles/article1.pdf", // Replace with actual file paths
    },
    {
      title: "Cognitive–behavioral therapy for management of mental health and stress-related disorders: Recent advances in techniques and technologies",
      abstract: "Cognitive–behavioral therapy (CBT) helps individuals to eliminate avoidant and safety-seeking behaviors that prevent self-correction of faulty beliefs, thereby facilitating stress management to reduce stress-related disorders and enhance mental health...",
      pdf: "./assets/articles/article2.pdf", // Replace with actual file paths
    },
    {
      title: "Understanding Your Mental Wellbeing",
      abstract: "An important first step in improving your mental health is developing a clear understanding of your signs of poor mental wellbeing. The impact of the changes you make will become clearer if you have a decent understanding of how poor mental wellbeing impacts your mind, body and behaviour...",
      pdf: "./assets/articles/article3.pdf", // Replace with actual file paths
    },
    // Add more articles as needed
  ];

  // Filtered articles based on search query
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen p-10">
      {/* Title and Subheading */}
      <h1 className="text-4xl font-bold text-center mb-2">Articles</h1>
      <h2 className="text-2xl text-center text-gray-600 mb-8">Explore our collection of insightful articles</h2>


      {/* Search Bar */}
      <div className="text-center mb-8 flex justify-center">
        <input
          type="text"
          className="p-2 w-full border rounded-lg shadow-md"
          placeholder="Search Articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="ml-2 p-2 bg-[#1A0B5B] text-white rounded-lg shadow-md"
          onClick={() => {/* Implement search functionality if needed */}}
        >
          Search
        </button>
      </div>

      {/* Articles List */}
      <div className="space-y-12">
        {filteredArticles.map((article, index) => (
          <div key={index} className="border p-8 rounded-lg shadow-md bg-white">
            <h2 className="text-3xl font-semibold text-[#1A0B5B]">{article.title}</h2>
            <p className="mt-4 text-lg text-gray-700">{article.abstract}</p>

            {/* PDF Button */}
            <div className="mt-6">
              <a
                href={article.pdf}
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

export default Articles;
