import React, { useState, useCallback, useEffect } from 'react';
import { CONCEPTS, DEFINITIONS } from '../constants';
import { Concept, Definition } from '../types';
import { useSound } from '../hooks/useSound';

type FeedbackState = 'correct' | 'incorrect' | 'neutral';

const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const DraggableConcept: React.FC<{ concept: Concept; isMatched: boolean }> = ({ concept, isMatched }) => {
  const { playSound } = useSound();
  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    playSound('drag');
    e.dataTransfer.setData('application/json', JSON.stringify(concept));
  };
  
  return (
    <div
      draggable={!isMatched}
      onDragStart={onDragStart}
      className={`p-3 border rounded-lg shadow-sm transition-all duration-200 active:cursor-grabbing active:scale-105 active:shadow-lg ${
        isMatched 
          ? 'bg-slate-100 border-slate-300 text-slate-500 cursor-not-allowed' 
          : 'bg-white border-slate-300 hover:bg-slate-50 hover:shadow-md cursor-grab'
      }`}
    >
      <p className="font-semibold text-slate-800">{concept.text}</p>
    </div>
  );
};

const DefinitionDropzone: React.FC<{ 
  definition: Definition;
  matchedConcept: Concept | null;
  feedback: FeedbackState;
  onDropConcept: (definitionId: string, concept: Concept) => void; 
}> = ({ definition, matchedConcept, feedback, onDropConcept }) => {
  const [isOver, setIsOver] = useState(false);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!matchedConcept) setIsOver(true);
  };
  
  const onDragLeave = () => setIsOver(false);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (matchedConcept) return;
    setIsOver(false);
    const concept = JSON.parse(e.dataTransfer.getData('application/json')) as Concept;
    onDropConcept(definition.id, concept);
  };
  
  const getBorderColor = () => {
    if (matchedConcept && feedback === 'correct') return 'border-slate-400 bg-slate-100';
    if (feedback === 'incorrect') return 'border-red-500 bg-red-50';
    if (isOver) return 'border-slate-500 bg-slate-100 ring-2 ring-slate-300';
    return 'border-slate-300';
  };

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`p-4 border-2 border-dashed rounded-lg transition-all duration-200 ${getBorderColor()}`}
    >
      <div className="flex items-center">
        <div className="flex-grow">
          <p className="font-bold text-slate-700">{definition.text}</p>
          <p className="text-sm text-slate-600 font-mono mt-1 bg-slate-200 inline-block px-2 py-1 rounded">{definition.formula}</p>
        </div>
        <div className="ml-4 w-48 flex-shrink-0 h-16 flex items-center justify-center text-sm text-slate-500">
          {matchedConcept ? (
            <div className={`w-full p-2 text-center font-semibold rounded-md ${feedback === 'correct' ? 'bg-slate-200 text-slate-800' : 'bg-red-200 text-red-800'}`}>
              {matchedConcept.text}
            </div>
          ) : (
            'Drop Concept Here'
          )}
        </div>
      </div>
    </div>
  );
};


const Module1Foundations: React.FC = () => {
  const [matches, setMatches] = useState<Record<string, Concept | null>>({});
  const [feedback, setFeedback] = useState<Record<string, FeedbackState>>({});
  const [shuffledConcepts, setShuffledConcepts] = useState<Concept[]>([]);
  const { playSound } = useSound();

  const initializeModule = useCallback(() => {
    setMatches(DEFINITIONS.reduce((acc, def) => ({ ...acc, [def.id]: null }), {}));
    setFeedback(DEFINITIONS.reduce((acc, def) => ({ ...acc, [def.id]: 'neutral' }), {}));
    setShuffledConcepts(shuffleArray(CONCEPTS));
  }, []);
  
  useEffect(() => {
    initializeModule();
  }, [initializeModule]);
  
  const handleDropConcept = useCallback((definitionId: string, concept: Concept) => {
    const isCorrect = concept.matchId === definitionId;
    playSound('drop');

    setMatches(prev => ({ ...prev, [definitionId]: concept }));
    setFeedback(prev => ({ ...prev, [definitionId]: isCorrect ? 'correct' : 'incorrect' }));
    
    if (isCorrect) {
      playSound('correct');
    } else {
      playSound('incorrect');
      setTimeout(() => {
        setMatches(prev => ({ ...prev, [definitionId]: null }));
        setFeedback(prev => ({ ...prev, [definitionId]: 'neutral' }));
      }, 1500);
    }
  }, [playSound]);
  
  const resetModule = () => {
    initializeModule();
  };

  const matchedConceptIds = Object.values(matches).filter(Boolean).map(c => c!.id);
  const conceptsToDisplay = shuffledConcepts.filter(c => !matchedConceptIds.includes(c.id));
  const correctMatches = Object.entries(feedback).filter(([,v]) => v === 'correct').length;
  const progressPercentage = (correctMatches / DEFINITIONS.length) * 100;

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Module 3: The Foundations</h3>
          <p className="text-slate-600">Drag each concept to its matching definition.</p>
        </div>
        <button
          onClick={resetModule}
          className="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors font-semibold"
        >
          Reset Module
        </button>
      </div>
      
      <div className="mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-slate-700">Progress</span>
            <span className="text-sm font-medium text-slate-700">{correctMatches} / {DEFINITIONS.length}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div className="bg-slate-800 h-2.5 rounded-full transition-all duration-500" style={{width: `${progressPercentage}%`}}></div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-slate-100 p-4 rounded-lg border border-slate-200">
          <h4 className="font-bold mb-4 text-center text-slate-700">Concepts Toolbox</h4>
          <div className="space-y-3">
            {conceptsToDisplay.length > 0 ? (
              conceptsToDisplay.map(concept => (
                <DraggableConcept key={concept.id} concept={concept} isMatched={matchedConceptIds.includes(concept.id)} />
              ))
            ) : (
               <div className="text-center p-6 bg-slate-200 text-slate-800 rounded-lg border border-slate-300">
                <p className="font-bold text-lg">All Concepts Matched!</p>
                <p className="mt-1">Great job! You've mastered the foundations.</p>
               </div>
            )}
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          {DEFINITIONS.map(definition => (
            <DefinitionDropzone 
              key={definition.id} 
              definition={definition}
              matchedConcept={matches[definition.id]}
              feedback={feedback[definition.id]}
              onDropConcept={handleDropConcept}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Module1Foundations;