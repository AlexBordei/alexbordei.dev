import { render, screen, fireEvent } from '../test-utils';
import ThemeToggle from '@/components/layout/ThemeToggle';
import { useTheme } from 'next-themes';

// Mock the next-themes module
jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeToggle Component', () => {
  // Helper to set up the useTheme mock
  const mockUseTheme = (theme: string) => {
    const setTheme = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({ theme, setTheme });
    return { setTheme };
  };

  it('renders without errors', () => {
    mockUseTheme('light');
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('displays moon icon when theme is light', () => {
    mockUseTheme('light');
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Toggle theme'); // Screen reader text
  });

  it('displays sun icon when theme is dark', () => {
    mockUseTheme('dark');
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Toggle theme'); // Screen reader text
  });

  it('toggles theme from light to dark when clicked', () => {
    const { setTheme } = mockUseTheme('light');
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('toggles theme from dark to light when clicked', () => {
    const { setTheme } = mockUseTheme('dark');
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(setTheme).toHaveBeenCalledWith('light');
  });
}); 