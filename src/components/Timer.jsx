import './Timer.css';

function Timer({ time }) {
  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <span className="timer-icon">⏱️</span>
      <span className="timer-value">{formatTime()}</span>
    </div>
  );
}

export default Timer;
