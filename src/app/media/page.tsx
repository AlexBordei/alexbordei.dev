import Link from 'next/link';
import { FiCalendar, FiExternalLink, FiPlayCircle, FiFileText } from 'react-icons/fi';

export default function Media() {
  const talks = [
    {
      id: 1,
      title: "The Future of AI in Software Development",
      event: "DevFest Bucharest 2023",
      date: "November 15, 2023",
      description: "A talk about how artificial intelligence is transforming the software development landscape and what developers need to know to stay relevant.",
      videoUrl: "https://youtube.com/watch?v=example1",
      slidesUrl: "https://speakerdeck.com/alexbordei/future-of-ai-in-software-development"
    },
    {
      id: 2,
      title: "Building Scalable Web Applications with Next.js",
      event: "React Summit Europe 2023",
      date: "September 8, 2023",
      description: "A deep dive into Next.js architecture and best practices for building performant and scalable web applications.",
      videoUrl: "https://youtube.com/watch?v=example2",
      slidesUrl: "https://speakerdeck.com/alexbordei/building-scalable-webapps-nextjs"
    },
    {
      id: 3,
      title: "From Developer to Entrepreneur: Lessons Learned",
      event: "WordCamp Europe 2023",
      date: "June 12, 2023",
      description: "Sharing personal experiences and lessons learned during the journey from being a developer to founding a tech startup.",
      videoUrl: "https://youtube.com/watch?v=example3",
      slidesUrl: "https://speakerdeck.com/alexbordei/from-developer-to-entrepreneur"
    }
  ];

  const articles = [
    {
      id: 1,
      title: "How to Implement AI Features in Your Web Application",
      publication: "DEV.to",
      date: "December 5, 2023",
      description: "A comprehensive guide on integrating AI capabilities into web applications, with practical examples and code snippets.",
      url: "https://dev.to/alexbordei/how-to-implement-ai-features-in-your-web-application"
    },
    {
      id: 2,
      title: "The State of Web Development in 2023",
      publication: "Medium",
      date: "October 22, 2023",
      description: "An analysis of current trends, technologies, and practices in web development, based on industry surveys and personal experience.",
      url: "https://medium.com/@alexbordei/state-of-web-development-2023"
    },
    {
      id: 3,
      title: "10 Productivity Hacks for Software Developers",
      publication: "freeCodeCamp",
      date: "August 17, 2023",
      description: "Practical tips and tools to boost productivity and maintain work-life balance as a software developer.",
      url: "https://freecodecamp.org/news/productivity-hacks-for-developers"
    }
  ];

  const interviews = [
    {
      id: 1,
      title: "Building a Career in AI and Tech Education",
      publication: "Tech Insights Podcast",
      date: "January 12, 2024",
      description: "Discussion about career paths in AI development and tech education, with insights on upcoming trends and opportunities.",
      url: "https://techinsights.fm/episodes/alex-bordei-interview"
    },
    {
      id: 2,
      title: "From Freelancer to Tech Entrepreneur",
      publication: "Startup Stories",
      date: "November 3, 2023",
      description: "Interview about the journey of building a tech business from scratch, challenges faced, and lessons learned.",
      url: "https://startupstories.com/alex-bordei-interview"
    }
  ];

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Media & Speaking</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
          Talks, articles, interviews, and other media appearances where I share insights about technology, AI, and software development.
        </p>
        
        {/* Conference Talks */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Conference Talks</h2>
          <div className="space-y-8">
            {talks.map((talk) => (
              <div key={talk.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-2">{talk.title}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 dark:text-gray-400 mb-3 gap-3 sm:gap-6">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{talk.event}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCalendar className="h-4 w-4" />
                    <span>{talk.date}</span>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{talk.description}</p>
                <div className="flex flex-wrap gap-4">
                  {talk.videoUrl && (
                    <a 
                      href={talk.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      <FiPlayCircle className="h-4 w-4" />
                      Watch Video
                    </a>
                  )}
                  {talk.slidesUrl && (
                    <a 
                      href={talk.slidesUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      <FiFileText className="h-4 w-4" />
                      View Slides
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Articles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Articles & Publications</h2>
          <div className="space-y-6">
            {articles.map((article) => (
              <div key={article.id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-xl font-semibold mb-2">
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                  >
                    {article.title}
                  </a>
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 dark:text-gray-400 mb-3 gap-1 sm:gap-3">
                  <span className="font-medium">{article.publication}</span>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex items-center gap-2">
                    <FiCalendar className="h-4 w-4" />
                    <span>{article.date}</span>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">{article.description}</p>
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Read Article
                  <FiExternalLink className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </section>
        
        {/* Interviews */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Interviews & Podcasts</h2>
          <div className="space-y-6">
            {interviews.map((interview) => (
              <div key={interview.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                <h3 className="text-xl font-semibold mb-2">
                  <a 
                    href={interview.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                  >
                    {interview.title}
                  </a>
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 dark:text-gray-400 mb-3 gap-1 sm:gap-3">
                  <span className="font-medium">{interview.publication}</span>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex items-center gap-2">
                    <FiCalendar className="h-4 w-4" />
                    <span>{interview.date}</span>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">{interview.description}</p>
                <a 
                  href={interview.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Listen to Interview
                  <FiExternalLink className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </section>
        
        {/* Contact Banner */}
        <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-3">Interested in having me speak at your event?</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            I'm available for conferences, meetups, podcasts, and other speaking engagements on topics related to AI, software development, and technology.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
} 