-- Create blog_categories table
CREATE TABLE blog_categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create blog_posts table
CREATE TABLE blog_posts (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE,
    reading_time VARCHAR(50),
    tags TEXT[] DEFAULT '{}',
    author VARCHAR(255) NOT NULL,
    featured_image VARCHAR(255),
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    category_id BIGINT REFERENCES blog_categories(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_tags ON blog_posts USING GIN(tags);

-- Insert initial categories
INSERT INTO blog_categories (name, slug, description) VALUES
    ('AI', 'ai', 'Articles about artificial intelligence and machine learning'),
    ('Web Development', 'web-development', 'Web development tutorials and insights'),
    ('Productivity', 'productivity', 'Tips and tools for developer productivity'),
    ('Freelancing', 'freelancing', 'Freelancing and business advice'),
    ('Career', 'career', 'Career development and professional growth');

-- Insert sample blog posts
INSERT INTO blog_posts (
    title,
    slug,
    excerpt,
    content,
    published_at,
    reading_time,
    tags,
    author,
    status,
    category_id
) VALUES
    (
        'Getting Started with Next.js and AI Integration',
        'getting-started-with-nextjs-and-ai',
        'Learn how to set up a modern web application with Next.js and integrate AI capabilities for enhanced user experiences.',
        'Full content here...',
        NOW(),
        '6 min read',
        ARRAY['Next.js', 'AI', 'Web Development'],
        'Alex Bordei',
        'published',
        1
    ),
    (
        'The Future of AI in Software Development',
        'future-of-ai-in-software-development',
        'Exploring how artificial intelligence is transforming the software development landscape and what it means for developers.',
        'Full content here...',
        NOW() - INTERVAL '5 days',
        '8 min read',
        ARRAY['AI', 'Software Development', 'Future Tech'],
        'Alex Bordei',
        'published',
        1
    ); 