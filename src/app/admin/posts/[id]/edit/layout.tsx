import EditPost from './page';

interface EditPostLayoutProps {
  params: {
    id: string;
  };
}

export default function EditPostLayout({ params }: EditPostLayoutProps) {
  return <EditPost params={params} />;
} 