import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home, Users, Compass, User, Settings, LogOut } from 'lucide-react';
import logoUrl from '@assets/xconnect-logo.png';

interface Profile {
  id: number;
  name: string;
  experience: string;
  country: string;
  organizations: string;
  assisted: string;
  image: string;
}

const mockProfiles: Profile[] = [
  {
    id: 1,
    name: "Olivia Harper",
    experience: "7 years",
    country: "Canada",
    organizations: "Creative Minds",
    assisted: "220 people",
    image: "OH"
  },
  {
    id: 2,
    name: "Olivia Harper",
    experience: "7 years",
    country: "Canada",
    organizations: "Creative Minds",
    assisted: "220 people",
    image: "OH"
  },
  {
    id: 3,
    name: "Olivia Harper",
    experience: "7 years",
    country: "Canada",
    organizations: "Creative Minds",
    assisted: "220 people",
    image: "OH"
  },
  {
    id: 4,
    name: "Olivia Harper",
    experience: "7 years",
    country: "Canada",
    organizations: "Creative Minds",
    assisted: "220 people",
    image: "OH"
  },
];

export default function Connect() {
  const [, setLocation] = useLocation();
  const [selectedInterest, setSelectedInterest] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");

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

        <div className="p-3">
          <button
            onClick={() => setLocation('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-[#2d1f3d] transition-colors"
            data-testid="nav-logout"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
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
            data-testid="nav-developer"
          >
            Developer
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-10">
          <h1 className="text-4xl font-bold text-white mb-8" data-testid="text-title">
            Connect
          </h1>

          {/* Filters */}
          <div className="flex gap-4 mb-10">
            <Select value={selectedInterest} onValueChange={setSelectedInterest}>
              <SelectTrigger 
                className="w-[180px] bg-[#2d1f3d] border-[#3d2554] text-white"
                data-testid="select-interests"
              >
                <SelectValue placeholder="Interests" />
              </SelectTrigger>
              <SelectContent className="bg-[#2d1f3d] border-[#3d2554]">
                <SelectItem value="design" className="text-white">Design</SelectItem>
                <SelectItem value="development" className="text-white">Development</SelectItem>
                <SelectItem value="business" className="text-white">Business</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger 
                className="w-[180px] bg-[#2d1f3d] border-[#3d2554] text-white"
                data-testid="select-location"
              >
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="bg-[#2d1f3d] border-[#3d2554]">
                <SelectItem value="canada" className="text-white">Canada</SelectItem>
                <SelectItem value="usa" className="text-white">USA</SelectItem>
                <SelectItem value="uk" className="text-white">UK</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
              <SelectTrigger 
                className="w-[180px] bg-[#2d1f3d] border-[#3d2554] text-white"
                data-testid="select-availability"
              >
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent className="bg-[#2d1f3d] border-[#3d2554]">
                <SelectItem value="available" className="text-white">Available</SelectItem>
                <SelectItem value="busy" className="text-white">Busy</SelectItem>
                <SelectItem value="offline" className="text-white">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Profile Grid */}
          <div className="grid grid-cols-2 gap-6 max-w-5xl">
            {mockProfiles.map((profile) => (
              <div
                key={profile.id}
                className="bg-gradient-to-br from-[#5a4068] to-[#3d2554] rounded-lg p-6 flex gap-6"
                data-testid={`card-profile-${profile.id}`}
              >
                {/* Profile Image */}
                <div className="w-28 h-28 rounded-lg bg-gradient-to-br from-[#e8c4a0] to-[#d4b294] flex items-center justify-center flex-shrink-0">
                  <div className="w-full h-full rounded-lg bg-[#e8c4a0] flex items-center justify-center">
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
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-white space-y-1">
                  <h3 className="text-lg font-semibold mb-2" data-testid={`text-name-${profile.id}`}>
                    {profile.name}
                  </h3>
                  <p className="text-sm text-gray-300" data-testid={`text-experience-${profile.id}`}>
                    Experience: {profile.experience}
                  </p>
                  <p className="text-sm text-gray-300" data-testid={`text-country-${profile.id}`}>
                    Country: {profile.country}
                  </p>
                  <p className="text-sm text-gray-300" data-testid={`text-organizations-${profile.id}`}>
                    Organizations: {profile.organizations}
                  </p>
                  <p className="text-sm text-gray-300" data-testid={`text-assisted-${profile.id}`}>
                    Assisted: {profile.assisted}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
