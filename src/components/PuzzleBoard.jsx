import { useEffect, useRef, useState } from 'react';
import './PuzzleBoard.css';

const zombieImages = [
  'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1570662472326-f7b958d6400c?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1604431696980-07b5ee6c1d00?w=800&h=800&fit=crop',
];

function PuzzleBoard({ tiles, gridSize, selectedTile, onTileClick, isComplete }) {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageIndex = Math.min(Math.floor((gridSize - 3)), zombieImages.length - 1);
  const currentImage = zombieImages[imageIndex];

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageRef.current = img;
      setImageLoaded(true);
    };
    img.src = currentImage;
  }, [currentImage]);

  useEffect(() => {
    if (!imageLoaded || !imageRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const img = imageRef.current;
    
    const tileSize = canvas.width / gridSize;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    tiles.forEach((tileValue, index) => {
      const currentRow = Math.floor(index / gridSize);
      const currentCol = index % gridSize;
      
      const correctRow = Math.floor(tileValue / gridSize);
      const correctCol = tileValue % gridSize;

      const sx = correctCol * (img.width / gridSize);
      const sy = correctRow * (img.height / gridSize);
      const sWidth = img.width / gridSize;
      const sHeight = img.height / gridSize;

      const dx = currentCol * tileSize;
      const dy = currentRow * tileSize;

      ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, tileSize, tileSize);

      // Draw border
      ctx.strokeStyle = '#ff6600';
      ctx.lineWidth = 2;
      ctx.strokeRect(dx, dy, tileSize, tileSize);

      // Highlight selected tile
      if (index === selectedTile) {
        ctx.fillStyle = 'rgba(255, 170, 0, 0.4)';
        ctx.fillRect(dx, dy, tileSize, tileSize);
        ctx.strokeStyle = '#ffaa00';
        ctx.lineWidth = 4;
        ctx.strokeRect(dx, dy, tileSize, tileSize);
      }
    });

    if (isComplete) {
      ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [tiles, gridSize, selectedTile, isComplete, imageLoaded]);

  const handleCanvasClick = (e) => {
    if (!imageLoaded) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    const tileSize = canvas.width / gridSize;
    const col = Math.floor(x / tileSize);
    const row = Math.floor(y / tileSize);
    const index = row * gridSize + col;
    
    if (index >= 0 && index < tiles.length) {
      onTileClick(index);
    }
  };

  const canvasSize = Math.min(600, window.innerWidth - 40);

  return (
    <div className="puzzle-board">
      {!imageLoaded && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading zombie puzzle...</p>
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        onClick={handleCanvasClick}
        className={`puzzle-canvas ${isComplete ? 'complete' : ''} ${!imageLoaded ? 'hidden' : ''}`}
      />
    </div>
  );
}

export default PuzzleBoard;
https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800&h=800&fit=crop
https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?w=800&h=800&fit=crop
https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=800&h=800&fit=crop
https://images.unsplash.com/photo-1570662472326-f7b958d6400c?w=800&h=800&fit=crop
https://images.unsplash.com/photo-1604431696980-07b5ee6c1d00?w=800&h=800&fit=crop
zombieImages.lengthimg.crossOriginimg.onloadimageRef.currentimg.srccanvas.widthimg.widthimg.heightctx.strokeStylectx.lineWidthctx.fillStylecanvas.heightrect.top0window.innerWidth
