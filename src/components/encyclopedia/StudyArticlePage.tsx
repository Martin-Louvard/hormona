import { studyArticles } from '@/data/study-articles';
import { Card } from '@/components/ui/Card';
import { ArrowLeft } from 'lucide-react';

interface StudyArticlePageProps {
  articleId: string;
  onBack: () => void;
}

export function StudyArticlePage({ articleId, onBack }: StudyArticlePageProps) {
  const article = studyArticles.find((a) => a.id === articleId);
  if (!article) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="min-w-[44px] min-h-[44px] flex items-center justify-center">
          <ArrowLeft size={22} className="text-deep-plum" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xl">{article.emoji}</span>
          <h2 className="font-serif text-heading text-deep-plum">{article.title}</h2>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {article.content.map((text, i) => (
          <Card key={i}>
            <p className="text-body text-warm-gray">{text}</p>
          </Card>
        ))}
      </div>

      <div className="rounded-2xl bg-lavender/10 px-4 py-3">
        <p className="text-tiny text-warm-gray">
          Source : {article.source}
        </p>
      </div>
    </div>
  );
}
