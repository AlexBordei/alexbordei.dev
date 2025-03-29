// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock environment variables
process.env.MAILGUN_API_KEY = 'test-api-key';
process.env.MAILGUN_DOMAIN = 'test.mailgun.org';
process.env.MAILGUN_FROM_EMAIL = 'test@example.com';
process.env.MAILGUN_MAILING_LIST = 'newsletter@test.mailgun.org';
process.env.CONTACT_EMAIL = 'contact@example.com';
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';

// Mock Request for Next.js API routes
global.Request = class Request {
  constructor(url, options) {
    this.url = url;
    this.method = options?.method || 'GET';
    this.headers = options?.headers || {};
    this.body = options?.body;
  }

  async json() {
    return JSON.parse(this.body);
  }
};

// Mock Response for Next.js API routes
global.Response = class Response {
  constructor(body, options) {
    this.body = body;
    this.status = options?.status || 200;
    this.headers = options?.headers || {};
  }

  json() {
    return Promise.resolve(this.body);
  }
};

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
    getAll: jest.fn(),
    has: jest.fn(),
    forEach: jest.fn(),
    entries: jest.fn(),
    values: jest.fn(),
    keys: jest.fn(),
    toString: jest.fn(),
  }),
  usePathname: () => '/test-path',
}));

// Mock NextResponse with proper json method
jest.mock('next/server', () => {
  const json = (data, init) => {
    const response = new Response(JSON.stringify(data), init);
    response.json = () => Promise.resolve(data);
    return response;
  };

  return {
    NextResponse: {
      json,
      redirect: jest.fn(),
      rewrite: jest.fn(),
      next: jest.fn(),
    },
  };
});

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '',
    query: {},
    asPath: '',
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  }),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next-themes
jest.mock('next-themes', () => {
  const React = require('react');
  return {
    useTheme: () => ({ theme: 'light', setTheme: jest.fn() }),
    ThemeProvider: ({ children }) => React.createElement('div', null, children),
  };
}); 