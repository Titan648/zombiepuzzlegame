import { useState, useEffect } from 'react';
import PuzzleBoard from './PuzzleBoard';
import Timer from './Timer';
import './Game.css';

const levels = {
  1: 3,
  2: 4,
  3: 5,
  4: 6,
  5: 7
};

function Game({ level, onComplete, onBack }) {
  const [tiles, setTiles] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const gridSize = levels[level];

  useEffect(() => {
    initializePuzzle();
  }, [level]);

  useEffect(() => {
    let interval;
    if (isRunning && !isComplete) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isComplete]);

  const initializePuzzle = () => {
    const totalTiles = gridSize * gridSize;
    const tileArray = Array.from({ length: totalTiles }, (_, i) => i);
    
    // Shuffle tiles
    const shuffled = [...tileArray].sort(() => Math.random() - 0.5);
    
    // Ensure puzzle is solvable and not already solved
    let attempts = 0;
    while (isSolved(shuffled) && attempts < 10) {
      shuffled.sort(() => Math.random() - 0.5);
      attempts++;
    }
    
    setTiles(shuffled);
    setSelectedTile(null);
    setIsComplete(false);
    setTime(0);
    setIsRunning(false);
  };

  const isSolved = (tileArray) => {
    return tileArray.every((tile, index) => tile === index);
  };

  const handleTileClick = (index) => {
    if (!isRunning) {
      setIsRunning(true);
    }

    if (selectedTile === null) {
      setSelectedTile(index);
    } else {
      // Swap tiles
      const newTiles = [...tiles];
      [newTiles[selectedTile], newTiles[index]] = [newTiles[index], newTiles[selectedTile]];
      setTiles(newTiles);
      setSelectedTile(null);

      // Check if puzzle is solved
      if (isSolved(newTiles)) {
        setIsComplete(true);
        setIsRunning(false);
        setTimeout(() => {
          onComplete(time + 1);
        }, 1500);
      }
    }
  };

  return (
    <div className="game">
      <div className="game-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <Timer time={time} />
        <button className="reset-button" onClick={initializePuzzle}>
          🔄 Reset
        </button>
      </div>

      <PuzzleBoard
        tiles={tiles}
        gridSize={gridSize}
        selectedTile={selectedTile}
        onTileClick={handleTileClick}
        isComplete={isComplete}
      />

      {isComplete && (
        <div className="completion-message">
          <h2>🎉 PUZZLE SOLVED! 🎉</h2>
          <p>Time: {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</p>
        </div>
      )}
    </div>
  );
}

export default Game;
    
