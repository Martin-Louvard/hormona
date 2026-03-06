import type { CyclePhase } from '@/types';
import { getPhaseEmoji } from '@/lib/cycle';

interface GreetingProps {
  displayName?: string;
  phase?: CyclePhase;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Bonjour';
  if (hour >= 12 && hour < 18) return 'Bon apres-midi';
  if (hour >= 18 && hour < 22) return 'Bonsoir';
  return 'Bonne nuit';
}

export function Greeting({ displayName, phase }: GreetingProps) {
  const greeting = getGreeting();
  const emoji = phase ? getPhaseEmoji(phase) : '';

  return (
    <h1 className="font-serif text-display text-deep-plum">
      {greeting}{displayName ? `, ${displayName}` : ''} {emoji}
    </h1>
  );
}
