"use client";

import { useState } from 'react';
import { FiMail, FiGithub, FiLinkedin, FiYoutube, FiMapPin, FiSend } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // In a real implementation, you would send the form data to your backend
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-2xl">
          Have a question or want to work together? Fill out the form below or reach out through social media.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            {submitted ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-green-800 dark:text-green-400 mb-2">Message Sent!</h3>
                <p className="text-green-700 dark:text-green-300">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="Project Inquiry">Project Inquiry</option>
                    <option value="Job Opportunity">Job Opportunity</option>
                    <option value="Speaking Engagement">Speaking Engagement</option>
                    <option value="General Question">General Question</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg p-4 text-red-700 dark:text-red-300">
                    {error}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium inline-flex items-center gap-2 transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message
                      <FiSend className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
          
          <div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <FiMail className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a 
                      href="mailto:hello@alexbordei.dev" 
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                    >
                      hello@alexbordei.dev
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <FiMapPin className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Bucharest, Romania
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Connect With Me</h3>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/alexbordei"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    aria-label="GitHub"
                  >
                    <FiGithub className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/alexbordei"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <FiLinkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://youtube.com/@alexbordei"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    aria-label="YouTube"
                  >
                    <FiYoutube className="h-5 w-5" />
                  </a>
                  <a
                    href="https://tiktok.com/@alexbordei"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    aria-label="TikTok"
                  >
                    <SiTiktok className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 