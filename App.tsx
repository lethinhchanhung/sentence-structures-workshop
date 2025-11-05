import React, { useState, useCallback, useEffect } from 'react';
import { MODULES } from './constants';
import Module1PhrasesClauses from './components/Module1PhrasesClauses';
import Module2ClauseTypes from './components/Module2ClauseTypes';
import Module1Foundations from './components/Module1Foundations';
import Module2Analysis from './components/Module2Analysis';
import Module3Connection from './components/Module3Connection';
import Module4Synthesis from './components/Module4Synthesis';
import { SoundProvider, useSound } from './hooks/useSound';
import IntroductionModal from './components/IntroductionModal';

const MuteButton: React.FC = () => {
  const { isMuted, toggleMute } = useSound();
  
  return (
    <button onClick={toggleMute} className="absolute top-4 right-4 sm:right-6 lg:right-8 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
      {isMuted ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )}
    </button>
  )
}

const AppContent: React.FC = () => {
  const [activeModule, setActiveModule] = useState<number>(1);
  const [showIntro, setShowIntro] = useState(true);

  const handleStart = () => {
    setShowIntro(false);
    // This interaction unlocks audio playback in the browser.
    const soundIds = ['sfx-correct', 'sfx-incorrect', 'sfx-drag', 'sfx-drop'];
    soundIds.forEach(id => {
      const audio = document.getElementById(id) as HTMLAudioElement;
      if (audio) {
        audio.play().catch(() => {});
        audio.pause();
        audio.currentTime = 0;
      }
    });
  };

  const renderActiveModule = useCallback(() => {
    switch (activeModule) {
      case 1:
        return <Module1PhrasesClauses />;
      case 2:
        return <Module2ClauseTypes />;
      case 3:
        return <Module1Foundations />;
      case 4:
        return <Module2Analysis />;
      case 5:
        return <Module3Connection />;
      case 6:
        return <Module4Synthesis />;
      default:
        return <Module1PhrasesClauses />;
    }
  }, [activeModule]);

  return (
    <div className="min-h-screen font-sans">
      {showIntro && <IntroductionModal onClose={handleStart} />}
      <header className="bg-white/70 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 relative">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Sentence Structures Workshop</h1>
          <p className="text-slate-500 mt-1">Move beyond basic English and master sentence variety.</p>
          <MuteButton />
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
          <nav className="mb-8">
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {MODULES.map((module) => (
                <li key={module.id}>
                  <button
                    onClick={() => setActiveModule(module.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 border ${
                      activeModule === module.id
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'bg-white hover:bg-slate-100 hover:shadow-sm border-slate-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-200 ${
                        activeModule === module.id ? 'bg-white text-slate-900' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {module.id}
                      </div>
                      <div className="ml-4">
                        <h2 className="font-semibold text-base">{`Module ${module.id}: ${module.title}`}</h2>
                        <p className={`text-sm transition-colors duration-200 ${activeModule === module.id ? 'text-slate-300' : 'text-slate-500'}`}>{module.description}</p>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
          
          <div className="min-h-[400px] border-t border-slate-200 pt-8">
            {renderActiveModule()}
          </div>
        </div>
      </main>

      <footer className="text-center py-6 text-slate-500 text-sm">
        <p>Built for B2+ English Learners. Enhance your communication skills.</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
    return (
        <SoundProvider>
            <AppContent />
        </SoundProvider>
    )
}

export default App;