import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import '@testing-library/jest-dom';

// Create a simple theme provider mock for testing
const MockThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div data-testid="theme-provider">{children}</div>
);

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  withTheme?: boolean;
}

/**
 * Custom render function that includes common providers
 */
const customRender = (
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { withTheme = true, ...renderOptions } = options;

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    if (withTheme) {
      return <MockThemeProvider>{children}</MockThemeProvider>;
    }
    return <>{children}</>;
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render }; 