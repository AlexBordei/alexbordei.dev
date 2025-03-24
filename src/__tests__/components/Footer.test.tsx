import { render, screen } from '../test-utils';
import Footer from '@/components/layout/Footer';

// Mock the current year to make tests deterministic
const mockDate = new Date(2024, 0, 1);
const originalDate = global.Date;

describe('Footer', () => {
  beforeAll(() => {
    // Mock Date constructor to return fixed date
    global.Date = class extends Date {
      constructor() {
        super();
        return mockDate;
      }
    } as DateConstructor;
  });

  afterAll(() => {
    // Restore original Date
    global.Date = originalDate;
  });

  it('renders the footer with the correct content', () => {
    render(<Footer />);
    
    // Check if the name is displayed
    expect(screen.getByText('Alex Bordei')).toBeInTheDocument();
    
    // Check if the profession is displayed
    expect(screen.getByText('Software Engineer & AI Educator')).toBeInTheDocument();
    
    // Check if the location is displayed
    expect(screen.getByText('Based in Bucharest, Romania')).toBeInTheDocument();
    
    // Check if links section is present
    expect(screen.getByText('Links')).toBeInTheDocument();
    
    // Check if all navigation links are present
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Media')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    
    // Check if connect section is present
    expect(screen.getByText('Connect')).toBeInTheDocument();
    
    // Check if social media links are present
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('YouTube')).toBeInTheDocument();
    expect(screen.getByLabelText('TikTok')).toBeInTheDocument();
    
    // Check if copyright is present with correct year
    expect(screen.getByText('© 2024 Alex Bordei. All rights reserved.')).toBeInTheDocument();
  });

  it('renders links with correct href attributes', () => {
    render(<Footer />);
    
    // Check internal links
    expect(screen.getByText('Blog').closest('a')).toHaveAttribute('href', '/blog');
    expect(screen.getByText('Projects').closest('a')).toHaveAttribute('href', '/projects');
    expect(screen.getByText('Media').closest('a')).toHaveAttribute('href', '/media');
    expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '/contact');
    
    // Check external links
    expect(screen.getByLabelText('GitHub')).toHaveAttribute('href', 'https://github.com/alexbordei');
    expect(screen.getByLabelText('LinkedIn')).toHaveAttribute('href', 'https://linkedin.com/in/alexbordei');
    expect(screen.getByLabelText('YouTube')).toHaveAttribute('href', 'https://youtube.com/@alexbordei');
    expect(screen.getByLabelText('TikTok')).toHaveAttribute('href', 'https://tiktok.com/@alexbordei');
  });
}); 