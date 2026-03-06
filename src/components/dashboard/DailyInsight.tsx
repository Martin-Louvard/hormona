import { Card } from '@/components/ui/Card';
import { getDayOfYear } from 'date-fns';

const insights = [
  'Le SOPK touche environ 1 femme sur 10 en age de procreer. Tu n\'es pas seule.',
  'L\'inositol a montre une efficacite comparable a la metformine dans certaines etudes sur le SOPK.',
  'Manger les fibres en premier pendant un repas peut reduire le pic glycemique de 30 a 40%.',
  'Le stress chronique augmente le cortisol, qui peut aggraver la resistance a l\'insuline.',
  'La marche apres les repas (10-15 min) aide a reguler la glycemie naturellement.',
  '70% des femmes SOPK ont une resistance a l\'insuline, meme sans surpoids.',
  'Le sommeil est un regulateur hormonal puissant : 7-9h par nuit font vraiment la difference.',
  'Les exercices de musculation ameliorent la sensibilite a l\'insuline a long terme.',
  'Le microbiote intestinal joue un role dans le SOPK — les probiotiques peuvent aider.',
  'La vitamine D est souvent basse chez les femmes SOPK : pense a te supplemenenter.',
  'Le cycle syncing (adapter ses activites a sa phase) peut reduire le stress et la fatigue.',
  'Les omega-3 aident a reduire l\'inflammation chronique liee au SOPK.',
  'Le magnesium aide a mieux dormir et reduit les crampes — un allie au quotidien.',
  'L\'acne SOPK est souvent hormonale : les soins topiques seuls ne suffisent pas toujours.',
  'Reduire le sucre ajoute ne veut pas dire supprimer les glucides — les complexes sont tes amis.',
];

export function DailyInsight() {
  const dayOfYear = getDayOfYear(new Date());
  const insight = insights[dayOfYear % insights.length];

  return (
    <Card variant="highlight" phaseColor="#C3B1E1">
      <p className="text-tiny font-medium text-deep-plum/60 mb-1">Le savais-tu ?</p>
      <p className="text-caption text-warm-gray">{insight}</p>
    </Card>
  );
}
