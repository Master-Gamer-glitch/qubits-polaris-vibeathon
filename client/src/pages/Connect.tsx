import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Users, Compass, User, Settings, Plus, MessageCircle } from 'lucide-react';
import logoUrl from '@assets/xconnect-logo.png';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';

interface SkillSwap {
  id: string;
  userId: string;
  userName: string;
  offer: string;
  need: string;
  tags: string[];
  commentsCount: number;
  createdAt: string;
}

const mockSwaps: SkillSwap[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Sarah Chen',
    offer: 'Logo & Branding',
    need: 'Help with Flask API',
    tags: ['design', 'python'],
    commentsCount: 2,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Alex Kumar',
    offer: 'React Development',
    need: 'UI/UX Design Review',
    tags: ['react', 'javascript', 'frontend'],
    commentsCount: 5,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Maria Lopez',
    offer: 'Database Design',
    need: 'Mobile App Testing',
    tags: ['sql', 'database', 'testing'],
    commentsCount: 0,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    userId: 'user4',
    userName: 'James Wilson',
    offer: 'SEO Optimization',
    need: 'Backend API Integration',
    tags: ['seo', 'marketing', 'api'],
    commentsCount: 3,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

function getTimeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

export default function Connect() {
  const [, setLocation] = useLocation();
  const [swaps, setSwaps] = useState<SkillSwap[]>(mockSwaps);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newOffer, setNewOffer] = useState('');
  const [newNeed, setNewNeed] = useState('');
  const [newTags, setNewTags] = useState('');
  const { user } = useAuth();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Users, label: 'Connect', path: '/connect', active: true },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#1a1221] flex">
      {/* Sidebar */}
      <aside className="w-[170px] bg-[#1a1221] border-r border-[#2d1f3d] flex flex-col">
        <div className="p-6">
          <img 
            src={logoUrl} 
            alt="XCONNECT" 
            className="h-10 w-auto"
            data-testid="img-logo"
          />
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setLocation(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? 'bg-[#3d2554] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-[#2d1f3d]'
              }`}
              data-testid={`nav-${item.label.toLowerCase()}`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="h-16 border-b border-[#2d1f3d] flex items-center justify-end px-10 gap-8">
          <button
            onClick={() => setLocation('/about')}
            className="text-white text-sm font-medium hover:text-[#9d7dc5] transition-colors"
            data-testid="nav-about"
          >
            About
          </button>
          <button
            onClick={() => setLocation('/')}
            className="text-white text-sm font-medium hover:text-[#9d7dc5] transition-colors"
            data-testid="nav-home"
          >
            Home
          </button>
          <button
            onClick={() => setLocation('/chat')}
            className="text-white text-sm font-medium hover:text-[#9d7dc5] transition-colors"
            data-testid="nav-candela"
          >
            Candela
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-white" data-testid="text-title">
              Skill Swaps
            </h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-[#7312d4] hover:bg-[#5d0fb0] text-white"
                  data-testid="button-new-swap"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Swap
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#2d1f3d] border-[#3d2554] text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">Create New Skill Swap</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="offer" className="text-white">What can you offer?</Label>
                    <Input
                      id="offer"
                      placeholder="e.g., Logo & Branding"
                      value={newOffer}
                      onChange={(e) => setNewOffer(e.target.value)}
                      className="bg-[#1a1221] border-[#3d2554] text-white"
                      data-testid="input-offer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="need" className="text-white">What do you need?</Label>
                    <Input
                      id="need"
                      placeholder="e.g., Help with Flask API"
                      value={newNeed}
                      onChange={(e) => setNewNeed(e.target.value)}
                      className="bg-[#1a1221] border-[#3d2554] text-white"
                      data-testid="input-need"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags" className="text-white">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      placeholder="e.g., design, python, api"
                      value={newTags}
                      onChange={(e) => setNewTags(e.target.value)}
                      className="bg-[#1a1221] border-[#3d2554] text-white"
                      data-testid="input-tags"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      if (newOffer && newNeed && user) {
                        const newSwap: SkillSwap = {
                          id: Date.now().toString(),
                          userId: user.uid,
                          userName: user.email || 'Anonymous',
                          offer: newOffer,
                          need: newNeed,
                          tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
                          commentsCount: 0,
                          createdAt: new Date().toISOString(),
                        };
                        setSwaps([newSwap, ...swaps]);
                        setNewOffer('');
                        setNewNeed('');
                        setNewTags('');
                        setIsDialogOpen(false);
                      }
                    }}
                    className="w-full bg-[#7312d4] hover:bg-[#5d0fb0] text-white"
                    data-testid="button-create-swap"
                  >
                    Create Swap
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Skill Swaps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
            {swaps.map((swap) => (
              <div
                key={swap.id}
                className="bg-[#2d1f3d] rounded-lg p-6 border border-[#3d2554] hover-elevate"
                data-testid={`card-swap-${swap.id}`}
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-white font-semibold mb-1" data-testid={`text-offer-${swap.id}`}>
                      Offer: {swap.offer}
                    </h3>
                    <p className="text-gray-400 text-sm" data-testid={`text-need-${swap.id}`}>
                      Need: {swap.need}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {swap.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-[#3d2554] text-[#9d7dc5] hover:bg-[#4d3564] border-0"
                        data-testid={`badge-tag-${tag}`}
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                      <span className="flex items-center gap-1" data-testid={`text-comments-${swap.id}`}>
                        <MessageCircle className="h-4 w-4" />
                        {swap.commentsCount} {swap.commentsCount === 1 ? 'comment' : 'comments'}
                      </span>
                      <span data-testid={`text-time-${swap.id}`}>• {getTimeAgo(swap.createdAt)}</span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-[#7312d4] hover:bg-[#5d0fb0] text-white"
                      data-testid={`button-view-swap-${swap.id}`}
                    >
                      View Swap
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
