import { useState, useEffect } from 'react';
import Menu from './components/Menu';
import Game from './components/Game';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('menu');
  const [level, setLevel] = useState(null);
  const [scores, setScores] = useState({});

  useEffect(() => {
    const savedScores = localStorage.getItem('zombiePuzzleScores');
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }
  }, []);

  const startGame = (selectedLevel) => {
    setLevel(selectedLevel);
    setGameState('playing');
  };

  const endGame = (time) => {
    const newScores = { ...scores };
    if (!newScores[level] || time < newScores[level]) {
      newScores[level] = time;
      setScores(newScores);
      localStorage.setItem('zombiePuzzleScores', JSON.stringify(newScores));
    }
    setGameState('menu');
  };

  const backToMenu = () => {
    setGameState('menu');
  };

  return (
    <div className="app">
      {gameState === 'menu' ? (
        <Menu onStartGame={startGame} scores={scores} />
      ) : (
        <Game level={level} onComplete={endGame} onBack={backToMenu} />
      )}
    </div>
  );
}

export default App;
