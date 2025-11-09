import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Music, X, Minimize2, Maximize2 } from 'lucide-react';

export default function SpotifyPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 bg-[#1DB954] hover:bg-[#1ed760] text-white shadow-lg z-50"
        size="icon"
        data-testid="button-open-spotify"
      >
        <Music className="h-6 w-6" />
      </Button>
    );
  }

  if (isMinimized) {
    return (
      <Card className="fixed bottom-6 right-6 bg-[#1a1221] border-[#3d2554] shadow-xl z-50 p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded bg-[#1DB954] flex items-center justify-center">
            <Music className="h-5 w-5 text-white" />
          </div>
          <span className="text-white text-sm font-medium">Spotify Player</span>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(false)}
              className="h-8 w-8 text-gray-400 hover:text-white"
              data-testid="button-maximize-spotify"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-gray-400 hover:text-white"
              data-testid="button-close-spotify"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 bg-[#1a1221] border-[#3d2554] shadow-xl z-50 w-[400px]">
      <div className="p-4 border-b border-[#3d2554] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded bg-[#1DB954] flex items-center justify-center">
            <Music className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-white text-sm font-semibold">Spotify Player</h3>
            <p className="text-gray-400 text-xs">Listen while you work</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(true)}
            className="h-8 w-8 text-gray-400 hover:text-white"
            data-testid="button-minimize-spotify"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 text-gray-400 hover:text-white"
            data-testid="button-close-spotify-expanded"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <iframe
          style={{ borderRadius: '12px' }}
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO?utm_source=generator&theme=0"
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Player"
          data-testid="iframe-spotify"
        ></iframe>
      </div>
    </Card>
  );
}
