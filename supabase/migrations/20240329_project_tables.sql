-- Create project_categories table
CREATE TABLE IF NOT EXISTS project_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    technologies TEXT[] DEFAULT '{}',
    image_url TEXT,
    github_url TEXT,
    live_url TEXT,
    featured BOOLEAN DEFAULT false,
    category INTEGER REFERENCES project_categories(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for both tables
CREATE TRIGGER update_project_categories_updated_at
    BEFORE UPDATE ON project_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert initial categories
INSERT INTO project_categories (name) VALUES
    ('Web Development'),
    ('Mobile'),
    ('AI'),
    ('IoT'),
    ('Data Visualization'),
    ('DevOps')
ON CONFLICT DO NOTHING;

-- Insert sample projects
INSERT INTO projects (
    title,
    description,
    long_description,
    technologies,
    featured,
    category
) VALUES (
    'AI-Powered CRM System',
    'A customer relationship management system with integrated AI for better insights and automation.',
    'This CRM system uses machine learning algorithms to analyze customer data and provide actionable insights. Features include automated customer segmentation, predictive analytics for sales forecasting, and intelligent task prioritization.',
    ARRAY['React', 'Node.js', 'TensorFlow', 'MongoDB', 'AWS'],
    true,
    (SELECT id FROM project_categories WHERE name = 'AI')
), (
    'Tech Education Platform',
    'Online learning platform focused on programming and AI, with interactive courses and community features.',
    'A comprehensive learning platform that offers courses on programming, AI, and data science. Features include interactive coding exercises, progress tracking, community forums, and personalized learning paths.',
    ARRAY['Next.js', 'Python', 'Docker', 'Firebase', 'TailwindCSS'],
    true,
    (SELECT id FROM project_categories WHERE name = 'Web Development')
), (
    'Smart Home Management System',
    'IoT solution for monitoring and controlling home devices with voice commands and automation rules.',
    'An integrated system that connects various IoT devices in a home environment. It provides a unified interface for monitoring and controlling devices, with support for voice commands, automation rules, and energy usage optimization.',
    ARRAY['React Native', 'Node.js', 'MQTT', 'MongoDB', 'TensorFlow Lite'],
    false,
    (SELECT id FROM project_categories WHERE name = 'IoT')
)
ON CONFLICT DO NOTHING; 