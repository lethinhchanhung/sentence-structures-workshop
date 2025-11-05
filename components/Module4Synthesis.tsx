import React, { useState, useEffect } from 'react';
import { SYNTHESIS_PROBLEMS } from '../constants';
import { SynthesisTile } from '../types';
import { useSound } from '../hooks/useSound';

type FeedbackState = 'correct' | 'incorrect' | 'neutral';
type TileSource = 'bank' | 'built';

const DraggableTile: React.FC<{ 
  tile: SynthesisTile, 
  source: TileSource,
  onDragStart: (e: React.DragEvent, tile: SynthesisTile, source: TileSource) => void 
}> = ({ tile, source, onDragStart }) => {
  const getTileStyle = () => {
    let baseStyle = 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800';
    if (tile.type === 'connector' || tile.type === 'punctuation') {
      return `${baseStyle} font-mono`;
    }
    return baseStyle;
  }
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, tile, source)}
      className={`p-2 border rounded-md shadow-sm cursor-grab text-center font-medium active:cursor-grabbing active:scale-110 active:shadow-xl transition-all duration-200 ${getTileStyle()}`}
    >
      {tile.text}
    </div>
  );
};

const Module4Synthesis: React.FC = () => {
  const [problemIndex, setProblemIndex] = useState(0);
  const currentProblem = SYNTHESIS_PROBLEMS[problemIndex];
  
  const [tileBank, setTileBank] = useState<SynthesisTile[]>(currentProblem.tiles);
  const [builtSentence, setBuiltSentence] = useState<SynthesisTile[]>([]);
  const [feedback, setFeedback] = useState<FeedbackState>('neutral');
  const [showExplanation, setShowExplanation] = useState(false);
  const [isOverBuild, setIsOverBuild] = useState(false);
  const [isOverBank, setIsOverBank] = useState(false);
  const { playSound } = useSound();

  useEffect(() => {
    setTileBank(currentProblem.tiles);
    setBuiltSentence([]);
    setFeedback('neutral');
    setShowExplanation(false);
  }, [currentProblem]);

  const onDragStart = (e: React.DragEvent, tile: SynthesisTile, source: TileSource) => {
    playSound('drag');
    e.dataTransfer.setData('application/json', JSON.stringify({ tile, source }));
  };
  
  const onDropOnBuild = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOverBuild(false);
    const { tile, source } = JSON.parse(e.dataTransfer.getData('application/json'));
    if (source === 'bank') {
      playSound('drop');
      setBuiltSentence(prev => [...prev, tile]);
      setTileBank(prev => prev.filter(t => t.id !== tile.id));
      setFeedback('neutral');
      setShowExplanation(false);
    }
  };

  const onDropOnBank = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOverBank(false);
    const { tile, source } = JSON.parse(e.dataTransfer.getData('application/json'));
    if (source === 'built') {
      playSound('drop');
      setTileBank(prev => [...prev, tile]);
      setBuiltSentence(prev => prev.filter(t => t.id !== tile.id));
       setFeedback('neutral');
       setShowExplanation(false);
    }
  };
  
  const checkAnswer = () => {
    const builtOrder = builtSentence.map(t => t.id);
    const isCorrect = JSON.stringify(builtOrder) === JSON.stringify(currentProblem.correctOrder);
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setShowExplanation(true);
    playSound(isCorrect ? 'correct' : 'incorrect');
  };

  const resetProblem = () => {
    setTileBank(currentProblem.tiles);
    setBuiltSentence([]);
    setFeedback('neutral');
    setShowExplanation(false);
  };
  
  const goToNextProblem = () => {
    setProblemIndex((prevIndex) => (prevIndex + 1) % SYNTHESIS_PROBLEMS.length);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Module 6: The Synthesis</h3>
          <p className="text-slate-600">Construct a sentence from the available tiles.</p>
        </div>
      </div>
      <div className="text-center p-4 bg-slate-100 border border-slate-200 rounded-lg mb-6">
        <p className="font-semibold text-slate-800">Your Goal: Construct a <span className="font-bold uppercase">{currentProblem.goal}</span> sentence.</p>
      </div>

      <h4 className="font-bold mb-2 text-slate-700">Your Sentence:</h4>
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsOverBuild(true); }}
        onDragLeave={() => setIsOverBuild(false)}
        onDrop={onDropOnBuild}
        className={`min-h-[120px] bg-slate-100 p-4 rounded-lg shadow-inner flex flex-wrap gap-2 items-center transition-all duration-300 border-2 ${isOverBuild ? 'bg-slate-200 ring-2 ring-slate-300 border-slate-400' : 'border-slate-200'} ${feedback === 'correct' ? 'border-slate-800 bg-white' : ''} ${feedback === 'incorrect' ? 'border-red-500 bg-red-50' : ''}`}
      >
        {builtSentence.length > 0 ? (
          builtSentence.map(tile => (
            <DraggableTile key={`built-${tile.id}`} tile={tile} source="built" onDragStart={onDragStart} />
          ))
        ) : (
          <p className="w-full text-center text-slate-500">Drag tiles from the bank here</p>
        )}
      </div>

       <div className="mt-8">
        <h4 className="font-bold text-center mb-4 text-slate-700">Tile Bank</h4>
        <div 
          onDragOver={(e) => { e.preventDefault(); setIsOverBank(true); }}
          onDragLeave={() => setIsOverBank(false)}
          onDrop={onDropOnBank}
          className={`flex flex-wrap gap-4 justify-center max-w-2xl mx-auto p-4 bg-slate-100/50 rounded-lg border min-h-[80px] transition-colors duration-300 ${isOverBank ? 'bg-slate-200 ring-2 ring-slate-300' : 'border-slate-200'}`}
        >
          {tileBank.map(tile => (
            <DraggableTile key={tile.id} tile={tile} source="bank" onDragStart={onDragStart} />
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        <button onClick={resetProblem} className="px-6 py-3 bg-slate-200 rounded-lg hover:bg-slate-300 font-semibold text-slate-800">Reset</button>
        <button onClick={checkAnswer} disabled={builtSentence.length === 0} className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:bg-slate-400 font-semibold">Check Answer</button>
        {feedback === 'correct' && (
           <button onClick={goToNextProblem} className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-semibold">Next Problem</button>
        )}
      </div>

      {showExplanation && (
        <div className={`mt-6 p-4 rounded-lg border-l-4 ${feedback === 'correct' ? 'bg-slate-50 border-slate-800' : 'bg-red-50 border-red-500'}`}>
          <h4 className={`font-bold ${feedback === 'correct' ? 'text-slate-800' : 'text-red-800'}`}>
            {feedback === 'correct' ? 'Correct!' : 'Feedback'}
          </h4>
          <p className={`mt-1 ${feedback === 'correct' ? 'text-slate-700' : 'text-red-700'}`}>
            {currentProblem.explanation}
          </p>
        </div>
      )}

    </div>
  );
};

export default Module4Synthesis;