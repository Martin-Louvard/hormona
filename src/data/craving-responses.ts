import type { CyclePhase } from '@/types';

export type CravingType = 'sweet' | 'salty' | 'comfort';

export interface CravingResponse {
  phase: CyclePhase;
  cravingType: CravingType;
  suggestion: string;
  explanation: string;
}

export const cravingResponses: CravingResponse[] = [
  // Menstrual - Sweet
  { phase: 'menstrual', cravingType: 'sweet', suggestion: 'Chocolat noir 70% + une banane', explanation: 'Le magnesium du chocolat aide avec les crampes, la banane apporte du tryptophane.' },
  { phase: 'menstrual', cravingType: 'sweet', suggestion: 'Porridge tiede avec myrtilles et miel', explanation: 'Les glucides complexes stabilisent la glycemie et apaisent.' },
  { phase: 'menstrual', cravingType: 'sweet', suggestion: 'Yaourt grec + amandes + cannelle', explanation: 'Les proteines du yaourt rassasient, la cannelle aide la glycemie.' },

  // Menstrual - Salty
  { phase: 'menstrual', cravingType: 'salty', suggestion: 'Bouillon de legumes chaud avec gingembre', explanation: 'Reconfortant, anti-inflammatoire et aide les nausees.' },
  { phase: 'menstrual', cravingType: 'salty', suggestion: 'Houmous + batonnets de legumes', explanation: 'Les pois chiches apportent du fer et des proteines.' },
  { phase: 'menstrual', cravingType: 'salty', suggestion: 'Tartine de pain au levain + avocat + graines', explanation: 'Les bonnes graisses de l\'avocat sont anti-inflammatoires.' },

  // Menstrual - Comfort
  { phase: 'menstrual', cravingType: 'comfort', suggestion: 'Soupe de lentilles corail au curcuma', explanation: 'Reconfortante, riche en fer et anti-inflammatoire.' },
  { phase: 'menstrual', cravingType: 'comfort', suggestion: 'Tisane gingembre-citron + carres de chocolat noir', explanation: 'Le gingembre soulage les crampes, le chocolat apporte du magnesium.' },
  { phase: 'menstrual', cravingType: 'comfort', suggestion: 'Bol de riz basmati + legumes sautes + oeuf', explanation: 'Repas complet et doux pour l\'estomac.' },

  // Follicular - Sweet
  { phase: 'follicular', cravingType: 'sweet', suggestion: 'Smoothie : epinards + banane + beurre d\'amande', explanation: 'Ton energie remonte ! Les epinards apportent du fer.' },
  { phase: 'follicular', cravingType: 'sweet', suggestion: 'Energy balls : dattes + noix de coco + cacao', explanation: 'Energie naturelle sans pic glycemique.' },
  { phase: 'follicular', cravingType: 'sweet', suggestion: 'Pancakes a la banane et flocons d\'avoine', explanation: 'Les glucides complexes soutiennent ton energie montante.' },

  // Follicular - Salty
  { phase: 'follicular', cravingType: 'salty', suggestion: 'Salade composee avec quinoa et graines', explanation: 'Ton metabolisme accelere, profite des proteines vegetales.' },
  { phase: 'follicular', cravingType: 'salty', suggestion: 'Edamames sales et graines de courge', explanation: 'Snack proteine ideal pour cette phase energetique.' },
  { phase: 'follicular', cravingType: 'salty', suggestion: 'Wrap au poulet grille et legumes croquants', explanation: 'Proteines + fibres pour soutenir ton activite.' },

  // Follicular - Comfort
  { phase: 'follicular', cravingType: 'comfort', suggestion: 'Poke bowl fait maison', explanation: 'Frais, colore et plein de bons nutriments.' },
  { phase: 'follicular', cravingType: 'comfort', suggestion: 'Tartine de fromage de chevre + miel + noix', explanation: 'Equilibre sucre-sale avec des bonnes graisses.' },
  { phase: 'follicular', cravingType: 'comfort', suggestion: 'Bol de muesli + yaourt + fruits de saison', explanation: 'Simple et nutritif pour soutenir cette phase creative.' },

  // Ovulatory - Sweet
  { phase: 'ovulatory', cravingType: 'sweet', suggestion: 'Salade de fruits frais + menthe + citron vert', explanation: 'Legere et hydratante au pic de ton energie.' },
  { phase: 'ovulatory', cravingType: 'sweet', suggestion: 'Sorbet maison aux fruits rouges', explanation: 'Les antioxydants des baies soutiennent cette phase.' },
  { phase: 'ovulatory', cravingType: 'sweet', suggestion: 'Carres de chocolat noir + fraises', explanation: 'Combo antioxydant et plaisir.' },

  // Ovulatory - Salty
  { phase: 'ovulatory', cravingType: 'salty', suggestion: 'Crudites + guacamole maison', explanation: 'Les bonnes graisses de l\'avocat soutiennent les hormones.' },
  { phase: 'ovulatory', cravingType: 'salty', suggestion: 'Sushi/maki au saumon', explanation: 'Omega-3 + proteines au moment ou tu es la plus active.' },
  { phase: 'ovulatory', cravingType: 'salty', suggestion: 'Salade mediterraneenne + feta + olives', explanation: 'Les graisses saines et les legumes sont parfaits maintenant.' },

  // Ovulatory - Comfort
  { phase: 'ovulatory', cravingType: 'comfort', suggestion: 'Bowl de quinoa + legumes grilles + tahini', explanation: 'Repas equilibre pour maintenir ton energie.' },
  { phase: 'ovulatory', cravingType: 'comfort', suggestion: 'Brunch : oeufs + avocat + pain au levain', explanation: 'Proteines et bonnes graisses pour ta phase la plus active.' },
  { phase: 'ovulatory', cravingType: 'comfort', suggestion: 'Risotto de legumes au parmesan', explanation: 'Reconfortant et nutritif, avec des fibres.' },

  // Luteal - Sweet
  { phase: 'luteal', cravingType: 'sweet', suggestion: 'Patate douce rotie + cannelle + beurre d\'amande', explanation: 'Les glucides complexes aident a produire la serotonine le soir.' },
  { phase: 'luteal', cravingType: 'sweet', suggestion: 'Mousse au chocolat noir a l\'avocat', explanation: 'Le chocolat apporte du magnesium, l\'avocat des bonnes graisses.' },
  { phase: 'luteal', cravingType: 'sweet', suggestion: 'Compote de pommes tiede + cannelle + noix', explanation: 'Doux et reconfortant, aide la digestion.' },

  // Luteal - Salty
  { phase: 'luteal', cravingType: 'salty', suggestion: 'Soupe miso + tofu + algues', explanation: 'Le miso est fermente (bon pour le microbiote) et le tofu apporte des proteines.' },
  { phase: 'luteal', cravingType: 'salty', suggestion: 'Patate douce frites au four + houmous', explanation: 'Glucides complexes + proteines pour apaiser les fringales.' },
  { phase: 'luteal', cravingType: 'salty', suggestion: 'Omelette aux champignons et fromage', explanation: 'Proteines rassasiantes + vitamines B pour l\'humeur.' },

  // Luteal - Comfort
  { phase: 'luteal', cravingType: 'comfort', suggestion: 'Curry de pois chiches + riz basmati', explanation: 'Les epices rechauffent et les legumineuses stabilisent la glycemie.' },
  { phase: 'luteal', cravingType: 'comfort', suggestion: 'Gratin de legumes avec bechamel legere', explanation: 'Reconfortant avec des fibres pour la digestion souvent ralentie.' },
  { phase: 'luteal', cravingType: 'comfort', suggestion: 'Tisane rooibos + tartine chocolat noir + banane', explanation: 'Sans cafeine, riche en magnesium, parfait avant de dormir.' },
];

export function getCravingSuggestion(phase: CyclePhase, type: CravingType): CravingResponse {
  const matching = cravingResponses.filter(
    (r) => r.phase === phase && r.cravingType === type
  );
  return matching[Math.floor(Math.random() * matching.length)];
}

export const cravingLabels: Record<CravingType, { label: string; emoji: string }> = {
  sweet: { label: 'Sucre', emoji: '\uD83C\uDF6B' },
  salty: { label: 'Sale', emoji: '\uD83C\uDF5F' },
  comfort: { label: 'Reconfort', emoji: '\uD83E\uDD17' },
};
