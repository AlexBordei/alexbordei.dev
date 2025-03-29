import { notFound } from 'next/navigation';
import { blogService } from '@/lib/services/blog';
import EditPost from './page';

interface EditPostLayoutProps {
  params: {
    id: string;
  };
}

export default async function EditPostLayout({ params }: EditPostLayoutProps) {
  const [post, categories] = await Promise.all([
    blogService.getPost(parseInt(params.id)),
    blogService.getCategories()
  ]);

  if (!post) {
    notFound();
  }

  return <EditPost params={params} post={post} categories={categories} />;
} 