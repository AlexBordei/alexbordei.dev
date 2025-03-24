import { render, screen } from '../test-utils';
import HomePage from '@/app/page';

// Mock the components used in HomePage
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('Home Page', () => {
  it('renders hero section with title', () => {
    render(<HomePage />);
    
    const heroTitle = screen.getByText((content) => 
      content.includes('Software Engineer') && content.includes('AI Educator')
    );
    
    expect(heroTitle).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    render(<HomePage />);
    
    const blogButton = screen.getByText('Read the Blog');
    const contactButton = screen.getByText('Get in Touch');
    
    expect(blogButton).toBeInTheDocument();
    expect(contactButton).toBeInTheDocument();
    
    expect(blogButton.closest('a')).toHaveAttribute('href', '/blog');
    expect(contactButton.closest('a')).toHaveAttribute('href', '/contact');
  });

  it('renders areas of expertise section', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Areas of Expertise')).toBeInTheDocument();
    expect(screen.getByText('Software Engineering')).toBeInTheDocument();
    expect(screen.getByText('Artificial Intelligence')).toBeInTheDocument();
    expect(screen.getByText('Digital Transformation')).toBeInTheDocument();
  });

  it('renders featured projects section', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Featured Projects')).toBeInTheDocument();
    expect(screen.getByText('AI-Powered CRM System')).toBeInTheDocument();
    expect(screen.getByText('Tech Education Platform')).toBeInTheDocument();
    expect(screen.getByText('View all projects')).toBeInTheDocument();
    
    // Check link to projects page
    expect(screen.getByText('View all projects').closest('a')).toHaveAttribute('href', '/projects');
  });

  it('renders newsletter section', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Stay Updated')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument();
  });
}); 