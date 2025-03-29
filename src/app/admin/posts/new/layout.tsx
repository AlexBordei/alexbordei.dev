import { blogService } from '@/lib/services/blog';
import NewPost from './page';

export default async function NewPostLayout() {
  const categories = await blogService.getCategories();
  return <NewPost categories={categories} />;
} 