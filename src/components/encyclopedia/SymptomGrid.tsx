import { symptomArticles } from '@/data/symptom-articles';

interface SymptomGridProps {
  onSelect: (id: string) => void;
}

export function SymptomGrid({ onSelect }: SymptomGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {symptomArticles.map((article) => (
        <button
          key={article.id}
          onClick={() => onSelect(article.id)}
          className="flex flex-col items-center gap-2 rounded-3xl bg-white p-5 shadow-[0_2px_12px_rgba(74,44,94,0.06)] transition-all hover:shadow-md active:scale-[0.97] min-h-[100px] justify-center"
        >
          <span className="text-3xl">{article.emoji}</span>
          <span className="text-caption font-medium text-deep-plum text-center">{article.title}</span>
        </button>
      ))}
    </div>
  );
}
