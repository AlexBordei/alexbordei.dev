import { FiDownload, FiBriefcase, FiBook, FiAward, FiCode } from 'react-icons/fi';

export default function Resume() {
  const experiences = [
    {
      title: "Lead Software Engineer",
      company: "Tech Innovations Inc.",
      period: "2021 - Present",
      description: "Leading development of AI-powered enterprise applications. Managing a team of 6 engineers and collaborating with product managers and designers to deliver high-quality software solutions.",
      achievements: [
        "Implemented ML-based recommendation system that increased user engagement by 35%",
        "Reduced system downtime by 75% through architecture improvements",
        "Led the migration from monolith to microservices architecture"
      ]
    },
    {
      title: "Senior Full Stack Developer",
      company: "Global Solutions Ltd.",
      period: "2018 - 2021",
      description: "Developed and maintained complex web applications using React, Node.js, and AWS. Collaborated with cross-functional teams to deliver features and fix bugs.",
      achievements: [
        "Built custom CRM system used by over 500 clients",
        "Optimized database queries resulting in 40% faster load times",
        "Mentored junior developers and led technical knowledge sharing sessions"
      ]
    },
    {
      title: "Web Developer",
      company: "Creative Digital Agency",
      period: "2016 - 2018",
      description: "Designed and developed responsive websites and applications for various clients across industries.",
      achievements: [
        "Delivered 20+ client projects on time and within budget",
        "Implemented automated testing processes reducing bugs by 30%",
        "Created reusable component library that accelerated development time"
      ]
    }
  ];

  const education = [
    {
      degree: "Master of Science in Computer Science",
      institution: "University of Technology",
      period: "2014 - 2016",
      description: "Specialized in Artificial Intelligence and Machine Learning. Thesis on neural networks for natural language processing."
    },
    {
      degree: "Bachelor of Science in Computer Engineering",
      institution: "National University",
      period: "2010 - 2014",
      description: "Graduated with honors. Participated in multiple hackathons and programming competitions."
    }
  ];

  const skills = {
    programming: ["JavaScript/TypeScript", "Python", "Java", "SQL", "HTML/CSS"],
    frameworks: ["React", "Next.js", "Node.js", "Express", "TensorFlow", "Django"],
    tools: ["Git", "Docker", "AWS", "Firebase", "MongoDB", "PostgreSQL"],
    other: ["Agile/Scrum", "CI/CD", "Technical Writing", "UI/UX Design", "Public Speaking"]
  };

  const certifications = [
    "AWS Certified Solutions Architect",
    "Google Professional Machine Learning Engineer",
    "MongoDB Certified Developer",
    "Certified Scrum Master"
  ];

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Resume</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              My professional experience and qualifications
            </p>
          </div>
          <a 
            href="/alex-bordei-resume.pdf" 
            download
            className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-medium transition-colors"
          >
            <FiDownload className="h-4 w-4" />
            Download PDF
          </a>
        </div>

        {/* Experience Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <FiBriefcase className="h-6 w-6 text-blue-600 dark:text-blue-500" />
            <h2 className="text-2xl font-bold">Professional Experience</h2>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-6 ml-3 pb-2">
                <div className="relative">
                  <div className="absolute -left-[39px] h-7 w-7 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-blue-600 dark:bg-blue-500"></div>
                  </div>
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 dark:text-gray-400 mb-2">
                    <span className="font-medium">{exp.company}</span>
                    <span className="hidden sm:block mx-2">•</span>
                    <span>{exp.period}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">{exp.description}</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <FiBook className="h-6 w-6 text-blue-600 dark:text-blue-500" />
            <h2 className="text-2xl font-bold">Education</h2>
          </div>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-6 ml-3 pb-2">
                <div className="relative">
                  <div className="absolute -left-[39px] h-7 w-7 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-blue-600 dark:bg-blue-500"></div>
                  </div>
                  <h3 className="text-xl font-semibold">{edu.degree}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 dark:text-gray-400 mb-2">
                    <span className="font-medium">{edu.institution}</span>
                    <span className="hidden sm:block mx-2">•</span>
                    <span>{edu.period}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <FiCode className="h-6 w-6 text-blue-600 dark:text-blue-500" />
            <h2 className="text-2xl font-bold">Skills</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Programming Languages</h3>
              <div className="flex flex-wrap gap-2">
                {skills.programming.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Frameworks & Libraries</h3>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Other Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.other.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <FiAward className="h-6 w-6 text-blue-600 dark:text-blue-500" />
            <h2 className="text-2xl font-bold">Certifications</h2>
          </div>

          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 pl-2">
            {certifications.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
} 