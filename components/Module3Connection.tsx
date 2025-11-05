import React, { useState, useEffect } from 'react';
import { CONNECTION_PROBLEMS } from '../constants';
import { Connector } from '../types';
import { useSound } from '../hooks/useSound';

type FeedbackState = 'correct' | 'incorrect' | 'neutral';

const DraggableConnector: React.FC<{ connector: Connector }> = ({ connector }) => {
  const { playSound } = useSound();
  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    playSound('drag');
    e.dataTransfer.setData('application/json', JSON.stringify(connector));
  };
  
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="p-2 border rounded-lg shadow-sm cursor-grab bg-white hover:bg-slate-100 border-slate-300 text-center font-mono font-semibold text-slate-800 active:cursor-grabbing active:scale-110 transition-all duration-200"
    >
      {connector.text}
    </div>
  );
};

const Module3Connection: React.FC = () => {
  const [problemIndex, setProblemIndex] = useState(0);
  const [droppedConnector, setDroppedConnector] = useState<Connector | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>('neutral');
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isOver, setIsOver] = useState(false);
  const { playSound } = useSound();

  const currentProblem = CONNECTION_PROBLEMS[problemIndex];

  useEffect(() => {
    setDroppedConnector(null);
    setFeedback('neutral');
    setExplanation(null);
  }, [problemIndex]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
    if (droppedConnector) return;
    
    playSound('drop');
    const connector = JSON.parse(e.dataTransfer.getData('application/json')) as Connector;
    setDroppedConnector(connector);
    setExplanation(currentProblem.explanation);

    const isCorrect = currentProblem.correctConnectorIds.includes(connector.id);

    if (isCorrect) {
      setFeedback('correct');
      playSound('correct');
    } else {
      setFeedback('incorrect');
      playSound('incorrect');
      setTimeout(() => {
        setDroppedConnector(null);
        setFeedback('neutral');
      }, 3000);
    }
  };

  const goToNextProblem = () => {
    setProblemIndex((prev) => (prev + 1) % CONNECTION_PROBLEMS.length);
  };
  
  const resetProblem = () => {
    setDroppedConnector(null);
    setFeedback('neutral');
    setExplanation(null);
  };

  const getDropzoneStyle = () => {
    if (feedback === 'correct') return 'border-slate-800 bg-slate-100';
    if (feedback === 'incorrect') return 'border-red-500 bg-red-50';
    if (isOver) return 'border-slate-500 bg-slate-100 ring-2 ring-slate-300';
    return 'border-slate-400';
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Module 5: The Connection</h3>
          <p className="text-slate-600">Drag the correct connector to join the clauses.</p>
        </div>
        <div className="space-x-2">
            <button
              onClick={resetProblem}
              className="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors font-semibold"
            >
              Reset
            </button>
            <button
              onClick={goToNextProblem}
              className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-semibold"
            >
              Next Problem
            </button>
        </div>
      </div>
      <p className="mb-6 font-semibold text-lg text-slate-700">Problem: {problemIndex + 1} / {CONNECTION_PROBLEMS.length}</p>

      <div className="bg-slate-100 p-6 rounded-lg shadow-inner border border-slate-200">
        <div className="flex flex-col md:flex-row items-center justify-center text-center text-lg md:text-xl space-y-4 md:space-y-0 md:space-x-4">
          <p className="bg-white p-4 rounded-md shadow-sm border border-slate-200">{currentProblem.clauses[0].text}</p>
          <div
            onDragOver={(e) => { e.preventDefault(); if(!droppedConnector) setIsOver(true); }}
            onDragLeave={() => setIsOver(false)}
            onDrop={handleDrop}
            className={`w-40 h-16 border-2 border-dashed rounded-md flex items-center justify-center transition-all duration-200 ${getDropzoneStyle()}`}
          >
            {droppedConnector ? (
              <span className="font-mono font-semibold text-slate-800">{droppedConnector.text}</span>
            ) : (
              <span className="text-slate-500 text-sm">Drop here</span>
            )}
          </div>
          <p className="bg-white p-4 rounded-md shadow-sm border border-slate-200">{currentProblem.clauses[1].text}</p>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="font-bold text-center mb-4 text-slate-700">Connectors Toolbox</h4>
        <div className="flex flex-wrap gap-4 justify-center max-w-lg mx-auto">
          {currentProblem.allConnectors.map(connector => (
            <DraggableConnector key={connector.id} connector={connector} />
          ))}
        </div>
      </div>
      
      {explanation && (
        <div className={`mt-6 p-4 rounded-lg border-l-4 min-h-[92px] ${feedback === 'correct' ? 'bg-slate-50 border-slate-800' : 'bg-red-50 border-red-500'}`}>
          <h4 className={`font-bold ${feedback === 'correct' ? 'text-slate-800' : 'text-red-800'}`}>
            {feedback === 'correct' ? 'Correct!' : 'Explanation'}
          </h4>
          <p className={`mt-1 ${feedback === 'correct' ? 'text-slate-700' : 'text-red-700'}`}>
            {explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default Module3Connection;