import React, { useState, useCallback } from 'react';
import { SENTENCES_TO_ANALYZE } from '../constants';
import { Sentence, SentenceType } from '../types';
import { useSound } from '../hooks/useSound';

type PlacedSentence = Sentence & { status: 'correct' | 'incorrect' };

const DraggableSentence: React.FC<{ sentence: Sentence }> = ({ sentence }) => {
  const { playSound } = useSound();
  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    playSound('drag');
    e.dataTransfer.setData('application/json', JSON.stringify(sentence));
  };
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="p-4 bg-white border border-slate-300 rounded-lg shadow-sm cursor-grab active:cursor-grabbing active:scale-105 active:shadow-lg transition-all duration-200"
    >
      {sentence.text}
    </div>
  );
};

const CategoryDropzone: React.FC<{
  category: SentenceType;
  placedSentences: PlacedSentence[];
  onDropSentence: (category: SentenceType, sentence: Sentence) => void;
}> = ({ category, placedSentences, onDropSentence }) => {
  const [isOver, setIsOver] = useState(false);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
    const sentence = JSON.parse(e.dataTransfer.getData('application/json')) as Sentence;
    onDropSentence(category, sentence);
  };

  return (
    <div 
      className="bg-slate-100 p-4 rounded-lg flex flex-col h-full border border-slate-200"
      onDragOver={(e) => {e.preventDefault(); setIsOver(true);}}
      onDragLeave={() => setIsOver(false)}
      onDrop={onDrop}
    >
      <h4 className="font-bold text-lg mb-3 border-b-2 pb-2 text-slate-800 border-slate-300">{category}</h4>
      <div className={`flex-grow p-2 rounded-md transition-all duration-300 min-h-[150px] ${isOver ? 'bg-slate-200 ring-2 ring-slate-300' : ''}`}>
        {placedSentences.length > 0 ? (
          <ul className="space-y-2">
            {placedSentences.map(ps => (
              <li key={ps.id} className={`p-3 rounded-md text-sm border-l-4 flex items-start gap-3 transition-all duration-300 ${ps.status === 'correct' ? 'bg-white border-slate-800' : 'bg-red-50 border-red-500'}`}>
                <span>
                  {ps.status === 'correct' ? (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
                <span className={ps.status === 'correct' ? 'text-slate-700' : 'text-red-900'}>{ps.text}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            <p>Drop sentences here</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Module2Analysis: React.FC = () => {
  const [unplacedSentences, setUnplacedSentences] = useState(SENTENCES_TO_ANALYZE);
  const [placements, setPlacements] = useState<Record<SentenceType, PlacedSentence[]>>({
    [SentenceType.Simple]: [],
    [SentenceType.Compound]: [],
    [SentenceType.Complex]: [],
    [SentenceType.CompoundComplex]: [],
  });
  const [explanation, setExplanation] = useState<{ text: string, correct: boolean } | null>(null);
  const { playSound } = useSound();
  
  const handleDropSentence = useCallback((category: SentenceType, sentence: Sentence) => {
    if (unplacedSentences.find(s => s.id === sentence.id)) {
      playSound('drop');
      const isCorrect = sentence.type === category;
      const newPlacedSentence: PlacedSentence = { ...sentence, status: isCorrect ? 'correct' : 'incorrect' };
      
      setExplanation({ text: sentence.explanation, correct: isCorrect });
      
      if (isCorrect) {
          playSound('correct');
      } else {
          playSound('incorrect');
          setTimeout(() => {
            setPlacements(prev => ({
              ...prev,
              [category]: prev[category].filter(s => s.id !== sentence.id)
            }));
            setUnplacedSentences(prev => [...prev, SENTENCES_TO_ANALYZE.find(s => s.id === sentence.id)!]);
          }, 3000);
      }

      setPlacements(prev => ({
        ...prev,
        [category]: [...prev[category], newPlacedSentence],
      }));
      setUnplacedSentences(prev => prev.filter(s => s.id !== sentence.id));
    }
  }, [unplacedSentences, playSound]);
  
  const resetModule = () => {
    setUnplacedSentences(SENTENCES_TO_ANALYZE);
    setPlacements({
      [SentenceType.Simple]: [],
      [SentenceType.Compound]: [],
      [SentenceType.Complex]: [],
      [SentenceType.CompoundComplex]: [],
    });
    setExplanation(null);
  };

  const correctPlacements = Object.values(placements).flat().filter(s => s.status === 'correct').length;
  const totalPlaced = Object.values(placements).flat().length;

  return (
    <div>
       <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Module 4: The Analysis</h3>
          <p className="text-slate-600">Drag each sentence into its correct structural category.</p>
        </div>
        <button
          onClick={resetModule}
          className="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors font-semibold"
        >
          Reset Module
        </button>
      </div>
      <p className="mb-6 font-semibold text-lg text-slate-700">Progress: {correctPlacements} / {SENTENCES_TO_ANALYZE.length} Correct ({totalPlaced} placed)</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-slate-100 p-4 rounded-lg border border-slate-200">
          <h4 className="font-bold text-center mb-4 text-slate-700">Sentences to Analyze</h4>
          {unplacedSentences.length > 0 ? (
            <div className="space-y-3">
            {unplacedSentences.map(sentence => (
              <DraggableSentence key={sentence.id} sentence={sentence} />
            ))}
            </div>
          ) : (
            <div className="text-center p-6 bg-slate-200 text-slate-800 rounded-lg border border-slate-300">
              <p className="font-bold text-lg">All Sentences Categorized!</p>
              <p className="mt-1">Fantastic work, your analysis is sharp!</p>
            </div>
          )}
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(SentenceType).map(category => (
            <CategoryDropzone 
              key={category}
              category={category}
              placedSentences={placements[category]}
              onDropSentence={handleDropSentence}
            />
          ))}
        </div>
      </div>

      {explanation && (
        <div className={`mt-6 p-4 rounded-lg border-l-4 ${explanation.correct ? 'bg-slate-50 border-slate-800' : 'bg-red-50 border-red-500'}`}>
          <h4 className={`font-bold ${explanation.correct ? 'text-slate-800' : 'text-red-800'}`}>
            {explanation.correct ? 'Correct!' : 'Not Quite...'}
          </h4>
          <p className={`mt-1 ${explanation.correct ? 'text-slate-700' : 'text-red-700'}`}>
            {explanation.text}
          </p>
        </div>
      )}
    </div>
  );
};

export default Module2Analysis;