import { render, screen } from '../test-utils';
import Header from '@/components/layout/Header';

// Mock the ThemeToggle component to simplify testing
jest.mock('@/components/layout/ThemeToggle', () => {
  return function MockThemeToggle() {
    return <div data-testid="theme-toggle">Theme Toggle</div>;
  };
});

describe('Header Component', () => {
  it('renders the header with logo', () => {
    render(<Header />);
    
    // Check if the logo text is present
    expect(screen.getByText('Alex Bordei')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    
    // Check for navigation links
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Resume')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Media')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('includes the theme toggle button', () => {
    render(<Header />);
    
    // Check if theme toggle is present
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('has proper links for navigation items', () => {
    render(<Header />);
    
    // Check if links have proper href attributes
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Blog').closest('a')).toHaveAttribute('href', '/blog');
    expect(screen.getByText('Resume').closest('a')).toHaveAttribute('href', '/resume');
    expect(screen.getByText('Projects').closest('a')).toHaveAttribute('href', '/projects');
    expect(screen.getByText('Media').closest('a')).toHaveAttribute('href', '/media');
    expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '/contact');
  });
}); 