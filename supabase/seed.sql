-- Insert sample blog posts with full content and images
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
    category_id,
    featured_image
) VALUES
    (
        'Building a Modern Blog with Next.js and Supabase',
        'building-modern-blog-nextjs-supabase',
        'Learn how to create a modern, performant blog using Next.js 14, Supabase, and Tailwind CSS. This comprehensive guide covers everything from setup to deployment.',
        '<h2>Introduction</h2>
<p>In this tutorial, we''ll explore how to build a modern blog using Next.js 14, Supabase, and Tailwind CSS. We''ll cover everything from initial setup to deployment, including real-time features and authentication.</p>

<h2>Setting Up the Project</h2>
<p>First, let''s create a new Next.js project with TypeScript support:</p>
<pre><code>npx create-next-app@latest my-blog --typescript --tailwind --eslint</code></pre>

<h2>Database Structure</h2>
<p>Our blog will need two main tables: blog_posts and blog_categories. Here''s the SQL to create them:</p>
<pre><code>CREATE TABLE blog_categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE(''utc''::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE(''utc''::text, NOW()) NOT NULL
);

CREATE TABLE blog_posts (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE,
    reading_time VARCHAR(50),
    tags TEXT[] DEFAULT ''{}'',
    author VARCHAR(255) NOT NULL,
    featured_image VARCHAR(255),
    status VARCHAR(20) DEFAULT ''draft'' CHECK (status IN (''draft'', ''published'')),
    category_id BIGINT REFERENCES blog_categories(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE(''utc''::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE(''utc''::text, NOW()) NOT NULL
);</code></pre>

<h2>Conclusion</h2>
<p>Building a modern blog with Next.js and Supabase is a great way to create a performant, scalable application. The combination of Next.js''s server components and Supabase''s real-time capabilities makes it perfect for a blog platform.</p>',
        NOW(),
        '8 min read',
        ARRAY['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS'],
        'Alex Bordei',
        'published',
        2,
        'https://images.unsplash.com/photo-1461749280684-dccba630ec2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ),
    (
        'The Future of AI in Software Development',
        'future-ai-software-development',
        'Explore how artificial intelligence is transforming the software development landscape and what it means for developers in the coming years.',
        '<h2>The Current State of AI in Development</h2>
<p>Artificial Intelligence has already started to revolutionize how we write and maintain code. From code completion to automated testing, AI tools are becoming an integral part of the development workflow.</p>

<h2>Key AI Tools for Developers</h2>
<p>Here are some of the most impactful AI tools available today:</p>
<ul>
    <li>GitHub Copilot - AI-powered code completion</li>
    <li>ChatGPT - Code generation and debugging assistance</li>
    <li>Amazon CodeWhisperer - Security-focused code suggestions</li>
</ul>

<h2>Impact on Development Workflows</h2>
<p>AI is changing how developers work in several ways:</p>
<ul>
    <li>Faster code generation and prototyping</li>
    <li>Improved code quality through automated reviews</li>
    <li>Reduced time spent on repetitive tasks</li>
</ul>

<h2>Looking Ahead</h2>
<p>As AI continues to evolve, we can expect even more sophisticated tools that will further enhance developer productivity and code quality.</p>',
        NOW() - INTERVAL '5 days',
        '6 min read',
        ARRAY['AI', 'Software Development', 'Future Tech'],
        'Alex Bordei',
        'published',
        1,
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ),
    (
        'Maximizing Developer Productivity with Modern Tools',
        'maximizing-developer-productivity',
        'Discover the best tools and practices for boosting your development productivity in 2024.',
        '<h2>Essential Developer Tools</h2>
<p>Having the right tools can significantly impact your productivity. Here are some must-have tools for modern developers:</p>
<ul>
    <li>VS Code with essential extensions</li>
    <li>Git for version control</li>
    <li>Docker for containerization</li>
    <li>Postman for API testing</li>
</ul>

<h2>Productivity Tips</h2>
<p>Beyond tools, here are some proven strategies to boost your productivity:</p>
<ul>
    <li>Use keyboard shortcuts effectively</li>
    <li>Implement automation for repetitive tasks</li>
    <li>Maintain a clean development environment</li>
    <li>Take regular breaks to prevent burnout</li>
</ul>

<h2>Time Management</h2>
<p>Effective time management is crucial for developer productivity. Consider using techniques like:</p>
<ul>
    <li>Pomodoro Technique</li>
    <li>Time blocking</li>
    <li>Task prioritization</li>
</ul>

<h2>Conclusion</h2>
<p>By combining the right tools with effective practices, you can significantly improve your development productivity.</p>',
        NOW() - INTERVAL '10 days',
        '7 min read',
        ARRAY['Productivity', 'Development Tools', 'Time Management'],
        'Alex Bordei',
        'published',
        3,
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ); 