import type { GILevel } from '@/types';

export interface GIEntry {
  id: string;
  name: string;
  gi: number;
  level: GILevel;
  category: string;
  alternatives: string[];
  tip?: string;
}

export const giDatabase: GIEntry[] = [
  // Cereales & Feculents
  { id: 'c1', name: 'Riz blanc', gi: 72, level: 'high', category: 'Cereales', alternatives: ['Riz basmati', 'Riz complet'], tip: 'Le riz basmati a un IG 30% plus bas.' },
  { id: 'c2', name: 'Riz basmati', gi: 50, level: 'low', category: 'Cereales', alternatives: [], tip: 'Bon choix ! Cuit al dente c\'est encore mieux.' },
  { id: 'c3', name: 'Riz complet', gi: 50, level: 'low', category: 'Cereales', alternatives: [], tip: 'Riche en fibres et en magnesium.' },
  { id: 'c4', name: 'Pain blanc', gi: 75, level: 'high', category: 'Cereales', alternatives: ['Pain complet', 'Pain au levain'], tip: 'Le pain au levain a un IG beaucoup plus bas.' },
  { id: 'c5', name: 'Pain complet', gi: 53, level: 'low', category: 'Cereales', alternatives: [], tip: 'Privilegie le vrai pain complet artisanal.' },
  { id: 'c6', name: 'Pain au levain', gi: 48, level: 'low', category: 'Cereales', alternatives: [], tip: 'La fermentation au levain reduit l\'IG naturellement.' },
  { id: 'c7', name: 'Pates blanches', gi: 55, level: 'medium', category: 'Cereales', alternatives: ['Pates completes', 'Pates de lentilles'], tip: 'Cuites al dente, leur IG baisse a 45.' },
  { id: 'c8', name: 'Pates completes', gi: 42, level: 'low', category: 'Cereales', alternatives: [], tip: 'Excellente source de fibres.' },
  { id: 'c9', name: 'Pates de lentilles', gi: 22, level: 'low', category: 'Cereales', alternatives: [], tip: 'Superaliment : proteines + fibres + IG ultra bas.' },
  { id: 'c10', name: 'Quinoa', gi: 53, level: 'low', category: 'Cereales', alternatives: [], tip: 'Proteine complete et riche en magnesium.' },
  { id: 'c11', name: 'Avoine (flocons)', gi: 55, level: 'medium', category: 'Cereales', alternatives: [], tip: 'Ajoute des noix et graines pour baisser l\'IG du bol.' },
  { id: 'c12', name: 'Couscous', gi: 65, level: 'medium', category: 'Cereales', alternatives: ['Boulgour'], tip: 'Le boulgour est une meilleure alternative (IG 48).' },
  { id: 'c13', name: 'Boulgour', gi: 48, level: 'low', category: 'Cereales', alternatives: [], tip: 'Riche en fibres, ideal pour les salades.' },
  { id: 'c14', name: 'Pomme de terre cuite', gi: 78, level: 'high', category: 'Cereales', alternatives: ['Patate douce'], tip: 'La patate douce a un IG 30 points plus bas.' },
  { id: 'c15', name: 'Patate douce', gi: 50, level: 'low', category: 'Cereales', alternatives: [], tip: 'Riche en vitamine A et fibres.' },
  { id: 'c16', name: 'Semoule', gi: 65, level: 'medium', category: 'Cereales', alternatives: ['Boulgour', 'Quinoa'] },
  { id: 'c17', name: 'Corn flakes', gi: 81, level: 'high', category: 'Cereales', alternatives: ['Flocons d\'avoine', 'Muesli sans sucre'], tip: 'Un des cereales a l\'IG le plus eleve.' },
  { id: 'c18', name: 'Muesli sans sucre', gi: 49, level: 'low', category: 'Cereales', alternatives: [] },

  // Fruits
  { id: 'f1', name: 'Banane mure', gi: 62, level: 'medium', category: 'Fruits', alternatives: ['Banane verte'], tip: 'Plus la banane est verte, plus son IG est bas.' },
  { id: 'f2', name: 'Banane verte', gi: 42, level: 'low', category: 'Fruits', alternatives: [], tip: 'Riche en amidon resistant, bon pour le microbiote.' },
  { id: 'f3', name: 'Pomme', gi: 36, level: 'low', category: 'Fruits', alternatives: [], tip: 'Avec la peau pour plus de fibres.' },
  { id: 'f4', name: 'Poire', gi: 33, level: 'low', category: 'Fruits', alternatives: [] },
  { id: 'f5', name: 'Orange', gi: 42, level: 'low', category: 'Fruits', alternatives: [], tip: 'Prefere le fruit entier au jus.' },
  { id: 'f6', name: 'Jus d\'orange', gi: 50, level: 'low', category: 'Boissons', alternatives: ['Orange entiere'], tip: 'Le fruit entier a plus de fibres et un IG plus bas.' },
  { id: 'f7', name: 'Fraises', gi: 25, level: 'low', category: 'Fruits', alternatives: [], tip: 'Excellentes et IG tres bas !' },
  { id: 'f8', name: 'Myrtilles', gi: 25, level: 'low', category: 'Fruits', alternatives: [], tip: 'Super antioxydantes.' },
  { id: 'f9', name: 'Cerises', gi: 22, level: 'low', category: 'Fruits', alternatives: [] },
  { id: 'f10', name: 'Raisin', gi: 59, level: 'medium', category: 'Fruits', alternatives: ['Fraises', 'Myrtilles'] },
  { id: 'f11', name: 'Pasteque', gi: 72, level: 'high', category: 'Fruits', alternatives: ['Melon'], tip: 'IG eleve mais charge glycemique faible (beaucoup d\'eau).' },
  { id: 'f12', name: 'Mangue', gi: 56, level: 'medium', category: 'Fruits', alternatives: [] },
  { id: 'f13', name: 'Ananas', gi: 59, level: 'medium', category: 'Fruits', alternatives: [] },
  { id: 'f14', name: 'Kiwi', gi: 39, level: 'low', category: 'Fruits', alternatives: [], tip: 'Riche en vitamine C et en fibres.' },
  { id: 'f15', name: 'Abricot', gi: 34, level: 'low', category: 'Fruits', alternatives: [] },
  { id: 'f16', name: 'Dattes', gi: 70, level: 'high', category: 'Fruits', alternatives: ['Abricots secs'], tip: 'A consommer avec des noix pour ralentir l\'absorption.' },
  { id: 'f17', name: 'Avocat', gi: 10, level: 'low', category: 'Fruits', alternatives: [], tip: 'Riche en bonnes graisses et fibres.' },

  // Legumes
  { id: 'l1', name: 'Carottes cuites', gi: 39, level: 'low', category: 'Legumes', alternatives: [], tip: 'Crues, leur IG est encore plus bas (16).' },
  { id: 'l2', name: 'Carottes crues', gi: 16, level: 'low', category: 'Legumes', alternatives: [] },
  { id: 'l3', name: 'Brocoli', gi: 10, level: 'low', category: 'Legumes', alternatives: [], tip: 'Anti-inflammatoire et aide au metabolisme des oestrogenes.' },
  { id: 'l4', name: 'Epinards', gi: 15, level: 'low', category: 'Legumes', alternatives: [], tip: 'Riches en fer et magnesium.' },
  { id: 'l5', name: 'Courgette', gi: 15, level: 'low', category: 'Legumes', alternatives: [] },
  { id: 'l6', name: 'Tomate', gi: 15, level: 'low', category: 'Legumes', alternatives: [] },
  { id: 'l7', name: 'Haricots verts', gi: 15, level: 'low', category: 'Legumes', alternatives: [] },
  { id: 'l8', name: 'Pois chiches', gi: 28, level: 'low', category: 'Legumes', alternatives: [], tip: 'Excellente source de proteines vegetales.' },
  { id: 'l9', name: 'Lentilles', gi: 25, level: 'low', category: 'Legumes', alternatives: [], tip: 'Riches en fer — ideales pendant les regles.' },
  { id: 'l10', name: 'Haricots rouges', gi: 24, level: 'low', category: 'Legumes', alternatives: [] },

  // Produits laitiers
  { id: 'd1', name: 'Lait entier', gi: 27, level: 'low', category: 'Produits laitiers', alternatives: [] },
  { id: 'd2', name: 'Yaourt nature', gi: 36, level: 'low', category: 'Produits laitiers', alternatives: [], tip: 'Source de probiotiques, bon pour le microbiote.' },
  { id: 'd3', name: 'Yaourt aux fruits sucre', gi: 47, level: 'low', category: 'Produits laitiers', alternatives: ['Yaourt nature + fruits frais'], tip: 'Prefere un yaourt nature avec des fruits frais.' },
  { id: 'd4', name: 'Fromage blanc', gi: 30, level: 'low', category: 'Produits laitiers', alternatives: [], tip: 'Bonne source de proteines.' },

  // Sucres & Snacks
  { id: 's1', name: 'Sucre blanc', gi: 70, level: 'high', category: 'Sucres & snacks', alternatives: ['Sucre de coco', 'Miel'], tip: 'Le sucre de coco a un IG de 35.' },
  { id: 's2', name: 'Sucre de coco', gi: 35, level: 'low', category: 'Sucres & snacks', alternatives: [] },
  { id: 's3', name: 'Miel', gi: 55, level: 'medium', category: 'Sucres & snacks', alternatives: ['Sucre de coco'] },
  { id: 's4', name: 'Chocolat noir 70%', gi: 25, level: 'low', category: 'Sucres & snacks', alternatives: [], tip: 'Riche en magnesium. Le meilleur choix pour les envies de sucre.' },
  { id: 's5', name: 'Chocolat au lait', gi: 42, level: 'low', category: 'Sucres & snacks', alternatives: ['Chocolat noir 70%'] },
  { id: 's6', name: 'Biscuits secs', gi: 70, level: 'high', category: 'Sucres & snacks', alternatives: ['Amandes', 'Noix'], tip: 'Remplace par une poignee d\'oleagineux.' },
  { id: 's7', name: 'Chips', gi: 54, level: 'low', category: 'Sucres & snacks', alternatives: [] },
  { id: 's8', name: 'Pop-corn', gi: 65, level: 'medium', category: 'Sucres & snacks', alternatives: [], tip: 'Sans sucre ajoute, c\'est un snack acceptable.' },
  { id: 's9', name: 'Confiture', gi: 65, level: 'medium', category: 'Sucres & snacks', alternatives: ['Puree d\'oleagineux'], tip: 'Remplace par du beurre d\'amande sur tes tartines.' },

  // Oleagineux
  { id: 'n1', name: 'Amandes', gi: 15, level: 'low', category: 'Oleagineux', alternatives: [], tip: 'Le snack SOPK par excellence : proteines, fibres, magnesium.' },
  { id: 'n2', name: 'Noix', gi: 15, level: 'low', category: 'Oleagineux', alternatives: [], tip: 'Riches en omega-3 vegetaux.' },
  { id: 'n3', name: 'Noix de cajou', gi: 22, level: 'low', category: 'Oleagineux', alternatives: [] },
  { id: 'n4', name: 'Beurre de cacahuete', gi: 14, level: 'low', category: 'Oleagineux', alternatives: [], tip: 'Choisie-le sans sucre ajoute.' },

  // Boissons
  { id: 'b1', name: 'Soda sucre', gi: 68, level: 'medium', category: 'Boissons', alternatives: ['Eau petillante + citron'], tip: 'Un des pires choix pour l\'insuline. Evite au maximum.' },
  { id: 'b2', name: 'Boisson energisante', gi: 70, level: 'high', category: 'Boissons', alternatives: ['The vert', 'Mate'], tip: 'Sucre + cafeine : double impact sur l\'insuline.' },
  { id: 'b3', name: 'Lait d\'avoine', gi: 69, level: 'medium', category: 'Boissons', alternatives: ['Lait d\'amande'], tip: 'Le lait d\'amande a un IG bien plus bas.' },
  { id: 'b4', name: 'Lait d\'amande', gi: 25, level: 'low', category: 'Boissons', alternatives: [] },

  // Proteines
  { id: 'p1', name: 'Poulet', gi: 0, level: 'low', category: 'Proteines', alternatives: [], tip: 'Les proteines pures n\'ont pas d\'impact glycemique.' },
  { id: 'p2', name: 'Poisson', gi: 0, level: 'low', category: 'Proteines', alternatives: [], tip: 'Les poissons gras (saumon, sardines) sont riches en omega-3.' },
  { id: 'p3', name: 'Oeufs', gi: 0, level: 'low', category: 'Proteines', alternatives: [], tip: 'Source complete de proteines. 2-3 par jour c\'est ok.' },
  { id: 'p4', name: 'Tofu', gi: 15, level: 'low', category: 'Proteines', alternatives: [], tip: 'Bonne source de proteines vegetales.' },
];

export function searchGIDatabase(query: string): GIEntry[] {
  const normalized = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (normalized.length < 2) return [];

  return giDatabase.filter((entry) => {
    const entryName = entry.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return entryName.includes(normalized);
  });
}

export function getGIColor(level: GILevel): string {
  const colors: Record<GILevel, string> = {
    low: '#A8C5A0',
    medium: '#FFD166',
    high: '#E88D9E',
  };
  return colors[level];
}

export function getGIEmoji(level: GILevel): string {
  const emojis: Record<GILevel, string> = {
    low: '\uD83D\uDFE2',
    medium: '\uD83D\uDFE1',
    high: '\uD83D\uDD34',
  };
  return emojis[level];
}
