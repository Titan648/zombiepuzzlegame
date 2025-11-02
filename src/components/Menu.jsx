import './Menu.css';

const levels = [
  { id: 1, name: 'Easy', grid: 3, description: '3x3 Grid' },
  { id: 2, name: 'Medium', grid: 4, description: '4x4 Grid' },
  { id: 3, name: 'Hard', grid: 5, description: '5x5 Grid' },
  { id: 4, name: 'Expert', grid: 6, description: '6x6 Grid' },
  { id: 5, name: 'Nightmare', grid: 7, description: '7x7 Grid' }
];

function Menu({ onStartGame, scores }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="menu">
      <div className="menu-container">
        <h1 className="title">
          🧟 ZOMBIE PUZZLE 🧟
        </h1>
        <p className="subtitle">Solve the distorted zombie puzzle!</p>
        
        <div className="levels">
          {levels.map((level) => (
            <button
              key={level.id}
              className="level-button"
              onClick={() => onStartGame(level.id)}
            >
              <div className="level-info">
                <span className="level-name">{level.name}</span>
                <span className="level-desc">{level.description}</span>
              </div>
              {scores[level.id] && (
                <div className="best-time">
                  ⏱️ {formatTime(scores[level.id])}
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="instructions">
          <h3>How to Play:</h3>
          <ul>
            <li>Click tiles to swap them</li>
            <li>Arrange the zombie image correctly</li>
            <li>Beat your best time!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Menu;
