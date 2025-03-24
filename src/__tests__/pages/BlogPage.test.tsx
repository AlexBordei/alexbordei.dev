import { render, screen } from '../test-utils';
import BlogPage from '@/app/blog/page';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
    };
  },
  usePathname() {
    return '/blog';
  },
}));

describe('BlogPage', () => {
  it('renders the blog page title', () => {
    render(<BlogPage />);
    expect(screen.getByRole('heading', { name: /blog/i })).toBeInTheDocument();
  });

  it('renders the blog introduction text', () => {
    render(<BlogPage />);
    expect(screen.getByText(/Thoughts, tutorials, and insights about programming, AI, and technology/i)).toBeInTheDocument();
  });

  it('renders blog post cards with titles and dates', () => {
    render(<BlogPage />);
    
    // Check for article headings
    expect(screen.getByText('Getting Started with Next.js and AI Integration')).toBeInTheDocument();
    expect(screen.getByText('The Future of AI in Software Development')).toBeInTheDocument();
    expect(screen.getByText('Productivity Hacks for Developers')).toBeInTheDocument();
    
    // Check for dates
    expect(screen.getByText('March 20, 2024')).toBeInTheDocument();
    expect(screen.getByText('March 15, 2024')).toBeInTheDocument();
    expect(screen.getByText('March 10, 2024')).toBeInTheDocument();
  });

  it('renders blog post cards with summaries', () => {
    render(<BlogPage />);
    
    expect(screen.getByText(/Learn how to set up a modern web application with Next.js and integrate AI capabilities/i)).toBeInTheDocument();
    expect(screen.getByText(/Exploring how artificial intelligence is transforming the software development landscape/i)).toBeInTheDocument();
    expect(screen.getByText(/Discover practical techniques and tools to boost your productivity/i)).toBeInTheDocument();
  });

  it('renders read more links for each blog post', () => {
    render(<BlogPage />);
    
    const readMoreLinks = screen.getAllByText('Read more');
    expect(readMoreLinks.length).toBe(4); // There are 4 blog posts
    
    // Check that each "Read more" link has an href attribute
    readMoreLinks.forEach(link => {
      expect(link.closest('a')).toHaveAttribute('href');
    });
  });
}); 