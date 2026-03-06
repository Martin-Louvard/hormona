import { studyArticles } from '@/data/study-articles';
import { Card } from '@/components/ui/Card';
import { ChevronRight } from 'lucide-react';

interface StudyFeedProps {
  onSelect: (id: string) => void;
}

export function StudyFeed({ onSelect }: StudyFeedProps) {
  return (
    <div className="flex flex-col gap-3">
      {studyArticles.map((article) => (
        <button
          key={article.id}
          onClick={() => onSelect(article.id)}
          className="w-full text-left"
        >
          <Card variant="interactive">
            <div className="flex items-start gap-3">
              <span className="text-xl">{article.emoji}</span>
              <div className="flex-1">
                <p className="text-caption font-medium text-deep-plum">{article.title}</p>
                <p className="text-tiny text-warm-gray mt-1 line-clamp-2">{article.summary}</p>
              </div>
              <ChevronRight size={18} className="text-warm-gray-light mt-1" />
            </div>
          </Card>
        </button>
      ))}
    </div>
  );
}
