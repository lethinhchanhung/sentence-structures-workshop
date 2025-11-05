
export enum SentenceType {
  Simple = 'Simple',
  Compound = 'Compound',
  Complex = 'Complex',
  CompoundComplex = 'Compound-Complex',
}

export enum PhraseClauseType {
  Phrase = 'Phrase',
  Clause = 'Clause',
}

export interface PhraseClauseItem {
  id: number;
  text: string;
  type: PhraseClauseType;
}

export enum ClauseType {
  Independent = 'Independent',
  Dependent = 'Dependent',
}

export interface ClauseTypeItem {
  id: number;
  text: string;
  type: ClauseType;
}

export interface Concept {
  id: string;
  text: string;
  matchId: string;
}

export interface Definition {
  id: string;
  text: string;
  formula: string;
}

export interface Sentence {
  id: number;
  text: string;
  type: SentenceType;
  explanation: string;
}

export interface Clause {
  id: string;
  text: string;
  isIndependent: boolean;
}

export interface Connector {
  id: string;
  text: string;
}

export interface ConnectionProblem {
  id: number;
  clauses: [Clause, Clause];
  correctConnectorIds: string[];
  allConnectors: Connector[];
  explanation: string;
}

export interface SynthesisTile {
  id: string;
  text: string;
  type: 'clause' | 'connector' | 'punctuation';
}

export interface SynthesisProblem {
  id: number;
  goal: SentenceType;
  tiles: SynthesisTile[];
  correctOrder: string[];
  explanation: string;
}