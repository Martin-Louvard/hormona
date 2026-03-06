import { useState } from 'react';
import { symptomArticles } from '@/data/symptom-articles';
import { Card } from '@/components/ui/Card';
import { ArrowLeft } from 'lucide-react';

interface SymptomArticlePageProps {
  articleId: string;
  onBack: () => void;
}

type TabKey = 'understand' | 'natural' | 'medical';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'understand', label: 'Comprendre' },
  { key: 'natural', label: 'Naturel' },
  { key: 'medical', label: 'Medical' },
];

export function SymptomArticlePage({ articleId, onBack }: SymptomArticlePageProps) {
  const article = symptomArticles.find((a) => a.id === articleId);
  const [activeTab, setActiveTab] = useState<TabKey>('understand');

  if (!article) return null;

  const content = article[activeTab];

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

      <div className="flex border-b border-warm-gray/10">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-3 text-caption font-medium transition-all min-h-[44px] ${
              activeTab === key
                ? 'text-deep-plum border-b-2 border-rose-soft'
                : 'text-warm-gray'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {content.map((text, i) => (
          <Card key={i}>
            <p className="text-body text-warm-gray">{text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
