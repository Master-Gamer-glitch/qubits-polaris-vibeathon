import { useLocation } from 'wouter';
import { Home, Users, Compass, User, Settings, Github } from 'lucide-react';
import { SiX, SiInstagram, SiLinkedin } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import logoUrl from '@assets/xconnect-logo.png';

export default function Profile() {
  const [, setLocation] = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Users, label: 'Connect', path: '/connect' },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: User, label: 'Profile', path: '/profile', active: true },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#1a1221] flex">
      <aside className="w-[170px] bg-[#1a1221] border-r border-[#2d1f3d] flex flex-col">
        <div className="p-6">
          <img 
            src={logoUrl} 
            alt="XCONNECT" 
            className="h-10 w-10"
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

      <div className="flex-1 flex flex-col">
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

        <main className="flex-1 p-10 overflow-y-auto">
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-12">
            <div className="w-36 h-36 rounded-full bg-gradient-to-br from-[#e8c4a0] to-[#d4b294] mb-4 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="35" r="15" fill="#4a3830" />
                <ellipse cx="50" cy="70" rx="25" ry="20" fill="#f5e6d3" />
                <path d="M 30 30 Q 35 25 40 30" stroke="#4a3830" strokeWidth="2" fill="none" />
                <path d="M 60 30 Q 65 25 70 30" stroke="#4a3830" strokeWidth="2" fill="none" />
                <ellipse cx="38" cy="35" rx="2" ry="3" fill="#2d2420" />
                <ellipse cx="62" cy="35" rx="2" ry="3" fill="#2d2420" />
                <path d="M 45 42 Q 50 45 55 42" stroke="#4a3830" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1" data-testid="text-name">
              Sophia Bennett
            </h1>
            <p className="text-gray-400 text-sm mb-6" data-testid="text-email">
              sophia.bennett@email.com
            </p>
            <Button
              className="bg-[#5a4068] hover:bg-[#6b4f7a] text-white font-medium px-8 py-2 h-12 rounded-lg"
              data-testid="button-edit-profile"
            >
              Edit Profile
            </Button>
          </div>

          {/* Account Details and Social */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white" data-testid="text-account-details">
                Account Details
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-white font-medium" data-testid="text-social">Social</span>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-[#3d2554] rounded flex items-center justify-center" data-testid="icon-github">
                    <Github className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-[#3d2554] rounded flex items-center justify-center" data-testid="icon-x">
                    <SiX className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-[#3d2554] rounded flex items-center justify-center" data-testid="icon-instagram">
                    <SiInstagram className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-[#3d2554] rounded flex items-center justify-center" data-testid="icon-linkedin">
                    <SiLinkedin className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-12">
              <div>
                <p className="text-gray-400 text-sm mb-1">Name</p>
                <p className="text-white" data-testid="text-detail-name">Sophia Bennett</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Email</p>
                <p className="text-white" data-testid="text-detail-email">sophia.bennett@email.com</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Phone</p>
                <p className="text-white" data-testid="text-detail-phone">997356XXXX</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Password</p>
                <p className="text-white" data-testid="text-detail-password">••••••••</p>
              </div>
            </div>
          </div>

          {/* I OFFER Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-white mb-6" data-testid="text-i-offer">
              I OFFER
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#2d1f3d] rounded-lg p-6 flex items-center gap-4" data-testid="card-offer-1">
                <div className="w-12 h-12 bg-[#3d2554] rounded flex-shrink-0"></div>
                <div>
                  <h3 className="text-white font-semibold mb-1">DESIGNING</h3>
                  <p className="text-gray-400 text-sm">UI/UX DESIGNS</p>
                </div>
              </div>
              <div className="bg-[#2d1f3d] rounded-lg p-6 flex items-center gap-4" data-testid="card-offer-2">
                <div className="w-12 h-12 bg-[#3d2554] rounded flex-shrink-0"></div>
                <div>
                  <h3 className="text-white font-semibold mb-1">DEVELOPMENT</h3>
                  <p className="text-gray-400 text-sm">STRONG KNOWLEDGE OF HTML AND CSS</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
