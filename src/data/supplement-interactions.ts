export interface SupplementInteraction {
  id: string;
  title: string;
  supplements: string[];
  description: string;
  rule: string;
  reason: string;
}

export const supplementInteractions: SupplementInteraction[] = [
  {
    id: 'fer-calcium',
    title: 'Fer et Calcium',
    supplements: ['Fer', 'Calcium'],
    description: 'Le calcium bloque l\'absorption du fer.',
    rule: 'Prends-les a au moins 2h d\'intervalle.',
    reason: 'Le calcium forme des complexes insolubles avec le fer dans l\'intestin.',
  },
  {
    id: 'fer-zinc',
    title: 'Fer et Zinc',
    supplements: ['Fer', 'Zinc'],
    description: 'Le fer et le zinc se font concurrence pour l\'absorption.',
    rule: 'Prends-les a des moments differents de la journee.',
    reason: 'Ils utilisent les memes transporteurs intestinaux.',
  },
  {
    id: 'vitd-magnesium',
    title: 'Vitamine D et Magnesium',
    supplements: ['Vitamine D3', 'Magnesium'],
    description: 'Le magnesium aide a activer la vitamine D.',
    rule: 'Tu peux les prendre ensemble, c\'est meme recommande.',
    reason: 'Le magnesium est necessaire a la conversion de la vit D en forme active.',
  },
  {
    id: 'berberine-metformine',
    title: 'Berberine et Metformine',
    supplements: ['Berberine', 'Metformine'],
    description: 'Effets similaires sur la glycemie — risque d\'hypoglycemie.',
    rule: 'Ne les combine pas sans avis medical.',
    reason: 'Les deux agissent sur la voie AMPK et peuvent cumuler leurs effets.',
  },
  {
    id: 'fer-the-cafe',
    title: 'Fer et Cafe/The',
    supplements: ['Fer'],
    description: 'Les tanins du the et la cafeine reduisent l\'absorption du fer.',
    rule: 'Attends 1h apres le fer avant de boire du the ou du cafe.',
    reason: 'Les polyphenols se lient au fer non-heminique.',
  },
  {
    id: 'omega3-anticoagulants',
    title: 'Omega-3 et Anticoagulants',
    supplements: ['Omega-3'],
    description: 'Les omega-3 a haute dose ont un effet fluidifiant.',
    rule: 'Si tu prends des anticoagulants, parles-en a ton medecin.',
    reason: 'Effet additif sur la fluidite du sang.',
  },
  {
    id: 'inositol-timing',
    title: 'Inositol : le bon moment',
    supplements: ['Inositol'],
    description: 'L\'inositol est mieux absorbe a jeun ou entre les repas.',
    rule: 'Prends-le 30 min avant le petit-dejeuner et avant le diner.',
    reason: 'Les aliments riches en fibres peuvent reduire son absorption.',
  },
  {
    id: 'nac-paracetamol',
    title: 'NAC et Paracetamol',
    supplements: ['NAC'],
    description: 'La NAC est l\'antidote du paracetamol en cas de surdosage.',
    rule: 'Tu peux les prendre ensemble sans probleme aux doses normales.',
    reason: 'La NAC regenere le glutathion, qui protege le foie.',
  },
];
