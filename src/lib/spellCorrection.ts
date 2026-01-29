// Spell Correction Utility using Levenshtein Distance
import { symptoms } from '@/data/healthData';

// Calculate Levenshtein distance between two strings
function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,     // deletion
          dp[i][j - 1] + 1,     // insertion
          dp[i - 1][j - 1] + 1  // substitution
        );
      }
    }
  }
  
  return dp[m][n];
}

// Common symptom-related words for better matching
const commonSymptomWords = [
  'pain', 'ache', 'sore', 'tired', 'weak', 'dizzy', 'nausea', 'fever',
  'cough', 'cold', 'hot', 'sweat', 'rash', 'itch', 'burn', 'numb',
  'headache', 'stomachache', 'backache', 'toothache', 'earache',
  'vomit', 'diarrhea', 'constipation', 'bloat', 'cramp',
  'breath', 'wheeze', 'sneeze', 'runny', 'stuffy', 'congestion',
  'fatigue', 'exhausted', 'tired', 'sleepy', 'insomnia',
  'swelling', 'swollen', 'inflammation', 'stiff', 'stiffness'
];

// Get all known words from symptoms
function getKnownWords(): string[] {
  const words = new Set<string>();
  
  symptoms.forEach(symptom => {
    symptom.name.toLowerCase().split(/\s+/).forEach(word => {
      if (word.length > 2) words.add(word);
    });
  });
  
  commonSymptomWords.forEach(word => words.add(word));
  
  return Array.from(words);
}

// Find the best spelling correction for a word
function correctWord(word: string, knownWords: string[]): string {
  const lowerWord = word.toLowerCase();
  
  // If word is known, return it
  if (knownWords.includes(lowerWord)) return word;
  
  let bestMatch = word;
  let minDistance = Infinity;
  
  for (const known of knownWords) {
    const distance = levenshteinDistance(lowerWord, known);
    // Only suggest if distance is small relative to word length
    const threshold = Math.max(2, Math.floor(known.length / 3));
    
    if (distance < minDistance && distance <= threshold) {
      minDistance = distance;
      bestMatch = known;
    }
  }
  
  return bestMatch;
}

// Correct a full phrase
export function correctSpelling(input: string): { corrected: string; wasChanged: boolean; suggestions: string[] } {
  const knownWords = getKnownWords();
  const symptomNames = symptoms.map(s => s.name.toLowerCase());
  
  const inputLower = input.toLowerCase().trim();
  
  // First, try to find a close match to full symptom names
  const suggestions: string[] = [];
  
  for (const symptom of symptoms) {
    const symptomLower = symptom.name.toLowerCase();
    const distance = levenshteinDistance(inputLower, symptomLower);
    const threshold = Math.max(3, Math.floor(symptomLower.length / 2));
    
    if (distance <= threshold) {
      suggestions.push(symptom.name);
    }
  }
  
  // Sort suggestions by distance (best matches first)
  suggestions.sort((a, b) => {
    const distA = levenshteinDistance(inputLower, a.toLowerCase());
    const distB = levenshteinDistance(inputLower, b.toLowerCase());
    return distA - distB;
  });
  
  // Correct individual words
  const words = input.split(/\s+/);
  const correctedWords = words.map(word => correctWord(word, knownWords));
  const corrected = correctedWords.join(' ');
  
  const wasChanged = corrected.toLowerCase() !== input.toLowerCase();
  
  return {
    corrected,
    wasChanged,
    suggestions: suggestions.slice(0, 5)
  };
}

// Get suggestions as user types (for autocomplete)
export function getSuggestions(input: string, maxSuggestions: number = 5): string[] {
  if (input.length < 2) return [];
  
  const inputLower = input.toLowerCase().trim();
  const matches: { name: string; score: number }[] = [];
  
  for (const symptom of symptoms) {
    const symptomLower = symptom.name.toLowerCase();
    
    // Check if input matches start of symptom name
    if (symptomLower.startsWith(inputLower)) {
      matches.push({ name: symptom.name, score: 0 });
      continue;
    }
    
    // Check if any word in symptom name starts with input
    const words = symptomLower.split(/\s+/);
    if (words.some(word => word.startsWith(inputLower))) {
      matches.push({ name: symptom.name, score: 1 });
      continue;
    }
    
    // Check if input is contained in symptom name
    if (symptomLower.includes(inputLower)) {
      matches.push({ name: symptom.name, score: 2 });
      continue;
    }
    
    // Fuzzy match with Levenshtein
    const distance = levenshteinDistance(inputLower, symptomLower);
    if (distance <= Math.max(3, Math.floor(symptomLower.length / 2))) {
      matches.push({ name: symptom.name, score: 3 + distance });
    }
  }
  
  return matches
    .sort((a, b) => a.score - b.score)
    .slice(0, maxSuggestions)
    .map(m => m.name);
}
