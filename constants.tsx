import { SentenceType, Concept, Definition, Sentence, ConnectionProblem, SynthesisProblem, Connector, PhraseClauseItem, PhraseClauseType, ClauseTypeItem, ClauseType } from './types';

export const MODULES = [
  { id: 1, title: 'Phrases vs. Clauses', description: 'Learn the basic building blocks.' },
  { id: 2, title: 'Clause Types', description: 'Identify independent and dependent clauses.' },
  { id: 3, title: 'Foundations', description: 'Match concepts to their definitions.' },
  { id: 4, title: 'Analysis', description: 'Categorize sentences by structure.' },
  { id: 5, title: 'Connection', description: 'Join clauses with correct connectors.' },
  { id: 6, title: 'Synthesis', description: 'Build sentences from scratch.' },
];

// --- NEW MODULE 1: Phrases vs. Clauses Data ---
export const PHRASES_CLAUSES_TO_ANALYZE: PhraseClauseItem[] = [
  { id: 1, text: 'Under the ancient stone bridge', type: PhraseClauseType.Phrase },
  { id: 2, text: 'the galaxy shimmered', type: PhraseClauseType.Clause },
  { id: 3, text: 'after the storm had passed', type: PhraseClauseType.Clause },
  { id: 4, text: 'a forgotten melody', type: PhraseClauseType.Phrase },
  { id: 5, text: 'writing code all night', type: PhraseClauseType.Phrase },
  { id: 6, text: 'the AI became sentient', type: PhraseClauseType.Clause },
  { id: 7, text: 'because the sun was setting', type: PhraseClauseType.Clause },
  { id: 8, text: 'a relic from a lost civilization', type: PhraseClauseType.Phrase },
  { id: 9, text: 'to explore the final frontier', type: PhraseClauseType.Phrase },
  { id: 10, text: 'the detective found a clue', type: PhraseClauseType.Clause },
  { id: 11, text: 'running through the fields of lavender', type: PhraseClauseType.Phrase },
  { id: 12, text: 'if you solve the riddle', type: PhraseClauseType.Clause },
];

// --- NEW MODULE 2: Independent vs. Dependent Clauses Data ---
export const CLAUSE_TYPES_TO_ANALYZE: ClauseTypeItem[] = [
  { id: 1, text: 'the moon cast long shadows', type: ClauseType.Independent },
  { id: 2, text: 'while the city slept', type: ClauseType.Dependent },
  { id: 3, text: 'she is a brilliant scientist', type: ClauseType.Independent },
  { id: 4, text: 'who invented the time machine', type: ClauseType.Dependent },
  { id: 5, text: 'the system requires a password', type: ClauseType.Independent },
  { id: 6, text: 'unless you have clearance', type: ClauseType.Dependent },
  { id: 7, text: 'because he forgot the key', type: ClauseType.Dependent },
  { id: 8, text: 'the mission was a success', type: ClauseType.Independent },
  { id: 9, text: 'the message arrived too late', type: ClauseType.Independent },
  { id: 10, text: 'although the odds were against them', type: ClauseType.Dependent },
  { id: 11, text: 'the experiment yielded fascinating results', type: ClauseType.Independent },
  { id: 12, text: 'after the reactor stabilized', type: ClauseType.Dependent },
];


// --- MODULE 3: Foundations Data (Original Module 1) ---
export const CONCEPTS: Concept[] = [
  { id: 'c1', text: 'Independent Clause', matchId: 'd1' },
  { id: 'c2', text: 'Dependent Clause', matchId: 'd2' },
  { id: 'c3', text: 'Simple Sentence', matchId: 'd3' },
  { id: 'c4', text: 'Compound Sentence', matchId: 'd4' },
  { id: 'c5', text: 'Complex Sentence', matchId: 'd5' },
  { id: 'c6', text: 'Compound-Complex Sentence', matchId: 'd6' },
];

export const DEFINITIONS: Definition[] = [
  { id: 'd1', text: 'A group of words with a subject and verb that expresses a complete thought.', formula: 'Subject + Verb' },
  { id: 'd2', text: 'A group of words with a subject and verb that does not express a complete thought and cannot stand alone.', formula: 'Subordinating Conjunction + Subject + Verb' },
  { id: 'd3', text: 'A sentence consisting of only one independent clause.', formula: 'Independent Clause' },
  { id: 'd4', text: 'A sentence with two or more independent clauses, joined by a coordinating conjunction or a semicolon.', formula: 'Independent Clause + , and/but/so + Independent Clause' },
  { id: 'd5', text: 'A sentence containing a subordinate clause or clauses.', formula: 'Independent Clause + Dependent Clause' },
  { id: 'd6', text: 'A sentence having two or more coordinate independent clauses and one or more dependent clauses.', formula: 'Independent Clause + Independent Clause + Dependent Clause' },
];

// --- MODULE 4: Analysis Data (Original Module 2) ---
export const SENTENCES_TO_ANALYZE: Sentence[] = [
  { id: 1, text: 'The old library at the end of the street is being renovated.', type: SentenceType.Simple, explanation: "This is a SIMPLE sentence because it contains only one independent clause. The subject is 'library' and the verb is 'is being renovated'." },
  { id: 2, text: 'The project was challenging, but the team worked together to overcome the obstacles.', type: SentenceType.Compound, explanation: "This is a COMPOUND sentence. It joins two independent clauses ('The project was challenging' and 'the team worked together...') with the coordinating conjunction ', but'." },
  { id: 3, text: 'When the alarm rang, she quickly got out of bed and prepared for the day.', type: SentenceType.Complex, explanation: "This is a COMPLEX sentence. It has an independent clause ('she quickly got out of bed...') and a dependent clause ('When the alarm rang')." },
  { id: 4, text: 'Because he was late, he drove quickly, and he unfortunately got a speeding ticket.', type: SentenceType.CompoundComplex, explanation: "This is COMPOUND-COMPLEX. It has two independent clauses ('he drove quickly' and 'he unfortunately got a speeding ticket') and one dependent clause ('Because he was late')." },
  { id: 5, text: 'A lone wolf howled at the shimmering moon.', type: SentenceType.Simple, explanation: "This is a SIMPLE sentence. It has one subject ('wolf') and one verb ('howled'), forming a single independent clause." },
  { id: 6, text: 'You can either wait here, or you can come with me to the night market.', type: SentenceType.Compound, explanation: "This is a COMPOUND sentence because it connects two independent clauses ('You can either wait here' and 'you can come with me...') with the conjunction ', or'." },
  { id: 7, text: 'The interstellar message that we received was indecipherable.', type: SentenceType.Complex, explanation: "This is a COMPLEX sentence. It contains an independent clause ('The interstellar message was indecipherable') and a dependent clause ('that we received')." },
  { id: 8, text: 'While the ancient dragon slept, the thief tiptoed through the cavern, and the slightest sound meant certain doom.', type: SentenceType.CompoundComplex, explanation: "This is COMPOUND-COMPLEX. It has a dependent clause ('While the ancient dragon slept') and two independent clauses ('the thief tiptoed...' and 'the slightest sound meant...')." },
  { id: 9, text: 'The mysterious painting in the dusty attic held a secret.', type: SentenceType.Simple, explanation: "This is a SIMPLE sentence. Despite its descriptive phrases, it has only one subject ('painting') and one verb ('held'), forming a single independent clause." },
  { id: 10, text: 'He wanted to climb the mountain; she preferred to swim in the ocean.', type: SentenceType.Compound, explanation: "This is a COMPOUND sentence. It joins two related independent clauses with a semicolon (;), which functions like a coordinating conjunction." },
  { id: 11, text: 'Unless you have the correct password, you cannot access the system.', type: SentenceType.Complex, explanation: "This is a COMPLEX sentence. It starts with a dependent clause ('Unless you have the correct password') followed by an independent clause ('you cannot access the system')." },
  { id: 12, text: 'After the concert ended, we went for pizza, and we talked for hours about the music.', type: SentenceType.CompoundComplex, explanation: "This is COMPOUND-COMPLEX. It has a dependent clause ('After the concert ended') and two independent clauses ('we went for pizza' and 'we talked for hours...')." },
  { id: 13, text: 'Cybernetic implants are becoming increasingly common in the metropolis.', type: SentenceType.Simple, explanation: "This is a SIMPLE sentence because it contains one subject ('implants') and one verb phrase ('are becoming'), forming one independent clause." },
  { id: 14, text: 'The detective followed the clues, yet the case remained a baffling puzzle.', type: SentenceType.Compound, explanation: "This is a COMPOUND sentence. It joins two independent clauses using the coordinating conjunction ', yet' to show contrast." },
  { id: 15, text: 'The chef who won the competition trained in Paris for five years.', type: SentenceType.Complex, explanation: "This is a COMPLEX sentence. 'The chef trained in Paris...' is the independent clause, and 'who won the competition' is a dependent clause describing the chef." },
  { id: 16, text: 'As the storm raged, the lighthouse keeper checked the lamp, for he knew many ships depended on it.', type: SentenceType.CompoundComplex, explanation: "This is COMPOUND-COMPLEX. It has a dependent clause ('As the storm raged') and two independent clauses joined by ', for' (a formal synonym for 'because')." },
  { id: 17, text: 'The old clock tower chimed precisely at midnight.', type: SentenceType.Simple, explanation: "This is a SIMPLE sentence. It expresses a single complete thought with one subject ('tower') and one verb ('chimed')." },
  { id: 18, text: 'The engine roared to life, so the pilot prepared for takeoff.', type: SentenceType.Compound, explanation: "This is a COMPOUND sentence. It joins two independent clauses with ', so' to show a cause-and-effect relationship." },
  { id: 19, text: 'Since no one else volunteered, she took on the difficult task herself.', type: SentenceType.Complex, explanation: "This is a COMPLEX sentence, with a dependent clause ('Since no one else volunteered') explaining the reason for the independent clause ('she took on the difficult task herself')." },
  { id: 20, text: 'Whenever it rains, my cat finds a cozy spot to nap, and she purrs contentedly for hours.', type: SentenceType.CompoundComplex, explanation: "This is COMPOUND-COMPLEX. It contains a dependent clause ('Whenever it rains') and two independent clauses ('my cat finds...' and 'she purrs...')." },
];


// --- MODULE 5: Connection Data (Original Module 3) ---
const connectors: {[key: string]: Connector} = {
  and: { id: 'conn1', text: ', and' },
  but: { id: 'conn2', text: ', but' },
  so: { id: 'conn3', text: ', so' },
  semicolon: { id: 'conn4', text: ';' },
  however: { id: 'conn5', text: '; however,' },
  although: { id: 'conn6', text: 'although' },
  because: { id: 'conn7', text: 'because' },
  who: { id: 'conn8', text: 'who' },
  after: { id: 'conn9', text: 'after' },
  while: { id: 'conn10', text: 'while' },
  yet: { id: 'conn11', text: ', yet' },
  nor: { id: 'conn12', text: ', nor' },
  since: { id: 'conn13', text: 'since' },
  if: { id: 'conn14', text: 'if' },
  whose: { id: 'conn15', text: 'whose' },
};


export const CONNECTION_PROBLEMS: ConnectionProblem[] = [
  {
    id: 1,
    clauses: [
      { id: 'c1a', text: 'The sun was setting', isIndependent: true },
      { id: 'c1b', text: 'the sky turned a brilliant orange.', isIndependent: true },
    ],
    correctConnectorIds: ['conn1'],
    allConnectors: [connectors.and, connectors.but, connectors.because, connectors.who],
    explanation: "The two clauses describe events happening together. ', and' is used to join two related ideas or events in sequence."
  },
  {
    id: 2,
    clauses: [
      { id: 'c2a', text: 'She studied diligently for the exam', isIndependent: true },
      { id: 'c2b', text: 'she did not receive the grade she expected.', isIndependent: true },
    ],
    correctConnectorIds: ['conn2', 'conn11'],
    allConnectors: [connectors.so, connectors.but, connectors.yet, connectors.however],
    explanation: "The second clause presents a result that contrasts with the first. ', but' and ', yet' are both excellent choices to show this opposition."
  },
  {
    id: 3,
    clauses: [
      { id: 'c3a', text: 'He missed the bus', isIndependent: true },
      { id: 'c3b', text: 'he had to take a taxi to work.', isIndependent: true },
    ],
    correctConnectorIds: ['conn3'],
    allConnectors: [connectors.so, connectors.although, connectors.and, connectors.who],
    explanation: "The second clause is a direct result of the first. ', so' is the perfect connector to show this cause-and-effect relationship.",
  },
  {
    id: 4,
    clauses: [
      { id: 'c4a', text: 'The spaceship entered the asteroid field', isIndependent: true },
      { id: 'c4b', text: 'its pilot navigated with incredible skill.', isIndependent: true },
    ],
    correctConnectorIds: ['conn1'],
    allConnectors: [connectors.and, connectors.if, connectors.so, connectors.while],
    explanation: "These are two related actions occurring in sequence. ', and' is the ideal connector to link them into a single compound sentence."
  },
  {
    id: 5,
    clauses: [
      { id: 'c5a', text: 'The algorithm is highly efficient', isIndependent: true },
      { id: 'c5b', text: 'it requires a massive amount of data.', isIndependent: true },
    ],
    correctConnectorIds: ['conn2', 'conn5'],
    allConnectors: [connectors.so, connectors.but, connectors.however, connectors.nor],
    explanation: "There is a contrast between the algorithm's efficiency and its requirement. ', but' or the more formal '; however,' effectively shows this contrast."
  },
  {
    id: 6,
    clauses: [
      { id: 'c6a', text: 'The detective found a hidden clue', isIndependent: true },
      { id: 'c6b', text: 'he was searching the old mansion.', isIndependent: false },
    ],
    correctConnectorIds: ['conn10'],
    allConnectors: [connectors.who, connectors.while, connectors.and, connectors.so],
    explanation: "'while' is a subordinating conjunction that shows two actions happening at the same time, creating a complex sentence."
  },
  {
    id: 7,
    clauses: [
      { id: 'c7a', text: 'The enchanted forest is beautiful', isIndependent: true },
      { id: 'c7b', text: 'it is filled with hidden dangers.', isIndependent: true },
    ],
    correctConnectorIds: ['conn2', 'conn11'],
    allConnectors: [connectors.yet, connectors.so, connectors.and, connectors.but],
    explanation: "The beauty of the forest contrasts sharply with its dangers. Both ', but' and ', yet' are used to connect contrasting independent clauses."
  },
  {
    id: 8,
    clauses: [
      { id: 'c8a', text: 'The experiment was a success', isIndependent: true },
      { id: 'c8b', text: 'it had a few unexpected side effects.', isIndependent: false },
    ],
    correctConnectorIds: ['conn6'],
    allConnectors: [connectors.and, connectors.although, connectors.who, connectors.if],
    explanation: "'although' is a subordinating conjunction used to introduce a contrast or concession, making the second clause dependent."
  },
  {
    id: 9,
    clauses: [
      { id: 'c9a', text: 'The artist is globally renowned', isIndependent: true },
      { id: 'c9b', text: 'work is displayed in the finest galleries.', isIndependent: false },
    ],
    correctConnectorIds: ['conn15'],
    allConnectors: [connectors.whose, connectors.who, connectors.so, connectors.and],
    explanation: "'whose' is a relative pronoun that shows possession. It connects the 'work' to the 'artist' and creates a dependent clause."
  },
  {
    id: 10,
    clauses: [
      { id: 'c10a', text: 'We can restore the coral reefs', isIndependent: true },
      { id: 'c10b', text: 'we act immediately to reduce pollution.', isIndependent: false },
    ],
    correctConnectorIds: ['conn14'],
    allConnectors: [connectors.if, connectors.because, connectors.so, connectors.but],
    explanation: "'if' introduces a conditional clause. Restoring the reefs is dependent on the condition of acting immediately."
  },
  {
    id: 11,
    clauses: [
      { id: 'c11a', text: 'He is a brilliant coder', isIndependent: true },
      { id: 'c11b', text: 'he struggles with public speaking.', isIndependent: true },
    ],
    correctConnectorIds: ['conn2', 'conn11'],
    allConnectors: [connectors.and, connectors.yet, connectors.but, connectors.so],
    explanation: "The two clauses present contrasting aspects of his skills. ', but' and ', yet' are coordinating conjunctions that show this contrast."
  },
  {
    id: 12,
    clauses: [
      { id: 'c12a', text: 'The city was plunged into darkness', isIndependent: true },
      { id: 'c12b', text: 'the main power grid failed.', isIndependent: false },
    ],
    correctConnectorIds: ['conn7'],
    allConnectors: [connectors.because, connectors.although, connectors.who, connectors.if],
    explanation: "'because' is a subordinating conjunction that introduces the reason or cause for the main clause's action."
  },
  {
    id: 13,
    clauses: [
      { id: 'c13a', text: 'The ancient prophecy was fulfilled', isIndependent: true },
      { id: 'c13b', text: 'the twin moons aligned.', isIndependent: false },
    ],
    correctConnectorIds: ['conn9'],
    allConnectors: [connectors.after, connectors.who, connectors.but, connectors.so],
    explanation: "'after' is a subordinating conjunction that indicates sequence. The prophecy was fulfilled following the alignment of the moons."
  },
  {
    id: 14,
    clauses: [
      { id: 'c14a', text: 'She did not want to go to the party', isIndependent: true },
      { id: 'c14b', text: 'did she want to stay home alone.', isIndependent: true },
    ],
    correctConnectorIds: ['conn12'],
    allConnectors: [connectors.and, connectors.nor, connectors.so, connectors.but],
    explanation: "When joining two negative independent clauses, ', nor' is used. Note the inverted subject-verb order ('did she') in the second clause."
  },
  {
    id: 15,
    clauses: [
      { id: 'c15a', text: 'The secret agent neutralized the threat', isIndependent: true },
      { id: 'c15b', text: 'he did it without anyone noticing.', isIndependent: true },
    ],
    correctConnectorIds: ['conn1'],
    allConnectors: [connectors.and, connectors.but, connectors.if, connectors.who],
    explanation: "The two clauses are closely related actions that happened in sequence. ', and' is the most direct way to connect them."
  },
];


// --- MODULE 6: Synthesis Data (Original Module 4) ---
export const SYNTHESIS_PROBLEMS: SynthesisProblem[] = [
  {
    id: 1,
    goal: SentenceType.Compound,
    tiles: [
      { id: 's1t1', text: 'The company launched a new product', type: 'clause'},
      { id: 's1t2', text: ', so', type: 'connector'},
      { id: 's1t3', text: 'its stock price increased significantly.', type: 'clause'},
    ],
    correctOrder: ['s1t1', 's1t2', 's1t3'],
    explanation: "This is a correct COMPOUND sentence. It consists of two independent clauses joined by the coordinating conjunction ', so' to show a result."
  },
  {
    id: 2,
    goal: SentenceType.Complex,
    tiles: [
      { id: 's2t1', text: 'The manager approved the proposal', type: 'clause'},
      { id: 's2t2', text: 'although', type: 'connector'},
      { id: 's2t3', text: 'it had some minor flaws.', type: 'clause'},
    ],
    correctOrder: ['s2t1', 's2t2', 's2t3'],
    explanation: "This is a correct COMPLEX sentence. It contains an independent clause ('The manager approved...') and a dependent clause starting with 'although'."
  },
  {
    id: 3,
    goal: SentenceType.CompoundComplex,
    tiles: [
      { id: 's3t1', text: 'When the power went out', type: 'clause'},
      { id: 's3t2', text: ',', type: 'punctuation'},
      { id: 's3t3', text: 'we lit some candles', type: 'clause'},
      { id: 's3t4', text: ', and', type: 'connector'},
      { id: 's3t5', text: 'we told stories until dawn.', type: 'clause'},
    ],
    correctOrder: ['s3t1', 's3t2', 's3t3', 's3t4', 's3t5'],
    explanation: "This is a COMPOUND-COMPLEX sentence. It has a dependent clause ('When the power went out') and two independent clauses joined by ', and'."
  },
  {
    id: 4,
    goal: SentenceType.Simple,
    tiles: [
      { id: 's4t1', text: 'The old robotic gardener', type: 'clause'},
      { id: 's4t2', text: 'tended to the bio-dome.', type: 'clause'},
    ],
    correctOrder: ['s4t1', 's4t2'],
    explanation: "This is a correct SIMPLE sentence. It forms a single independent clause with a subject ('gardener') and a verb ('tended')."
  },
  {
    id: 5,
    goal: SentenceType.Compound,
    tiles: [
      { id: 's5t1', text: 'The hacker bypassed the firewall', type: 'clause'},
      { id: 's5t2', text: '; however,', type: 'connector'},
      { id: 's5t3', text: 'the AI detected the intrusion.', type: 'clause'},
    ],
    correctOrder: ['s5t1', 's5t2', 's5t3'],
    explanation: "This is a correct COMPOUND sentence. It uses a semicolon and a conjunctive adverb ('; however,') to join two contrasting independent clauses."
  },
  {
    id: 6,
    goal: SentenceType.Complex,
    tiles: [
      { id: 's6t1', text: 'The hero who wields the sword', type: 'clause'},
      { id: 's6t2', text: 'must first prove their worth.', type: 'clause'},
    ],
    correctOrder: ['s6t1', 's6t2'],
    explanation: "This is a correct COMPLEX sentence. The dependent clause 'who wields the sword' is placed inside the independent clause ('The hero must first...')."
  },
  {
    id: 7,
    goal: SentenceType.CompoundComplex,
    tiles: [
      { id: 's7t1', text: 'As the alien fleet approached', type: 'clause'},
      { id: 's7t2', text: ',', type: 'punctuation'},
      { id: 's7t3', text: 'the world held its breath', type: 'clause'},
      { id: 's7t4', text: ', but', type: 'connector'},
      { id: 's7t5', text: 'the diplomats remained calm.', type: 'clause'},
    ],
    correctOrder: ['s7t1', 's7t2', 's7t3', 's7t4', 's7t5'],
    explanation: "This is a COMPOUND-COMPLEX sentence. It has one dependent clause ('As the alien fleet approached') and two independent clauses joined by ', but'."
  },
  {
    id: 8,
    goal: SentenceType.Compound,
    tiles: [
      { id: 's8t1', text: 'He did not enjoy the opera', type: 'clause'},
      { id: 's8t2', text: ', nor', type: 'connector'},
      { id: 's8t3', text: 'did he understand the story.', type: 'clause'},
    ],
    correctOrder: ['s8t1', 's8t2', 's8t3'],
    explanation: "This is a correct COMPOUND sentence joining two negative clauses with ', nor'. Notice the subject-verb inversion ('did he') in the second clause."
  },
  {
    id: 9,
    goal: SentenceType.Complex,
    tiles: [
      { id: 's9t1', text: 'She returned to the village', type: 'clause'},
      { id: 's9t2', text: 'where she had grown up.', type: 'clause'},
    ],
    correctOrder: ['s9t1', 's9t2'],
    explanation: "This is a correct COMPLEX sentence. The dependent clause 'where she had grown up' provides more information about the 'village'."
  },
  {
    id: 10,
    goal: SentenceType.CompoundComplex,
    tiles: [
      { id: 's10t1', text: 'The artifact was ancient', type: 'clause'},
      { id: 's10t2', text: ', yet', type: 'connector'},
      { id: 's10t3', text: 'it hummed with a power', type: 'clause'},
      { id: 's10t4', text: 'that felt entirely new.', type: 'clause'},
    ],
    correctOrder: ['s10t1', 's10t2', 's10t3', 's10t4'],
    explanation: "This is COMPOUND-COMPLEX. It has two independent clauses joined by ', yet', and the second one contains a dependent clause ('that felt entirely new')."
  },
  {
    id: 11,
    goal: SentenceType.Simple,
    tiles: [
      { id: 's11t1', text: 'A single red flower grew', type: 'clause'},
      { id: 's11t2', text: 'through the cracked pavement.', type: 'clause'},
    ],
    correctOrder: ['s11t1', 's11t2'],
    explanation: "This is a correct SIMPLE sentence. It forms one complete thought, with 'through the cracked pavement' acting as a prepositional phrase."
  },
  {
    id: 12,
    goal: SentenceType.Compound,
    tiles: [
      { id: 's12t1', text: 'The journey was perilous', type: 'clause'},
      { id: 's12t2', text: ', but', type: 'connector'},
      { id: 's12t3', text: 'the reward was worth the risk.', type: 'clause'},
    ],
    correctOrder: ['s12t1', 's12t2', 's12t3'],
    explanation: "This is a correct COMPOUND sentence. It joins two contrasting independent clauses with the coordinating conjunction ', but'."
  },
  {
    id: 13,
    goal: SentenceType.Complex,
    tiles: [
      { id: 's13t1', text: 'Because the evidence was overwhelming', type: 'clause'},
      { id: 's13t2', text: ',', type: 'punctuation'},
      { id: 's13t3', text: 'the jury reached a quick verdict.', type: 'clause'},
    ],
    correctOrder: ['s13t1', 's13t2', 's13t3'],
    explanation: "This is a correct COMPLEX sentence. It starts with a dependent clause giving a reason, followed by an independent clause stating the result."
  },
  {
    id: 14,
    goal: SentenceType.CompoundComplex,
    tiles: [
      { id: 's14t1', text: 'The musician who wrote this song is unknown', type: 'clause'},
      { id: 's14t2', text: ', but', type: 'connector'},
      { id: 's14t3', text: 'their melody is famous worldwide.', type: 'clause'},
    ],
    correctOrder: ['s14t1', 's14t2', 's14t3'],
    explanation: "This is COMPOUND-COMPLEX. The first independent clause contains a dependent clause ('who wrote this song'), and it is joined to a second independent clause with ', but'."
  },
  {
    id: 15,
    goal: SentenceType.Compound,
    tiles: [
      { id: 's15t1', text: 'You can take the high road', type: 'clause'},
      { id: 's15t2', text: ', or', type: 'connector'},
      { id: 's15t3', text: 'you can take the low road.', type: 'clause'},
    ],
    correctOrder: ['s15t1', 's15t2', 's15t3'],
    explanation: "This is a correct COMPOUND sentence. It joins two independent clauses with ', or' to present two alternative choices."
  },
];