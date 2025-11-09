import { useLocation } from 'wouter';
import { Home, Users, Compass, User, Settings, LogOut, Code, Smartphone, Cloud, Shield, Brain, GitBranch, Bitcoin, Database, Server } from 'lucide-react';
import logoUrl from '@assets/xconnect-logo.png';

interface Topic {
  id: number;
  icon: any;
  title: string;
  description: string;
}

const topics: Topic[] = [
  {
    id: 1,
    icon: Code,
    title: "Software Development",
    description: "Building and maintaining software applications"
  },
  {
    id: 2,
    icon: Smartphone,
    title: "Mobile Development",
    description: "Developing applications for mobile devices"
  },
  {
    id: 3,
    icon: Cloud,
    title: "Cloud Computing",
    description: "Managing and deploying applications on cloud platforms"
  },
  {
    id: 4,
    icon: Shield,
    title: "Cybersecurity",
    description: "Protecting systems and data from cyber threats"
  },
  {
    id: 5,
    icon: Brain,
    title: "Artificial Intelligence",
    description: "Developing intelligent systems and automation"
  },
  {
    id: 6,
    icon: GitBranch,
    title: "DevOps Practices",
    description: "Automating and streamlining software development processes"
  },
  {
    id: 7,
    icon: Bitcoin,
    title: "Blockchain Technology",
    description: "Implementing blockchain solutions"
  },
  {
    id: 8,
    icon: Database,
    title: "Data Science",
    description: "Analyzing data to extract insights and make predictions"
  },
  {
    id: 9,
    icon: Server,
    title: "Server Management",
    description: "Managing and maintaining server infrastructure"
  },
];

export default function Explore() {
  const [, setLocation] = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Users, label: 'Connect', path: '/connect' },
    { icon: Compass, label: 'Explore', path: '/explore', active: true },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#1a1221] flex">
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
            data-testid="nav-developer"
          >
            Developer
          </button>
        </header>

        <main className="flex-1 p-10">
          <h1 className="text-4xl font-bold text-white mb-10" data-testid="text-title">
            Explore
          </h1>

          <div className="grid grid-cols-3 gap-6 max-w-6xl">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="bg-gradient-to-br from-[#5a4068] to-[#3d2554] rounded-lg p-6 space-y-3 cursor-pointer hover:opacity-90 transition-opacity"
                data-testid={`card-topic-${topic.id}`}
              >
                <div className="w-10 h-10 text-white">
                  <topic.icon className="w-full h-full" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2" data-testid={`text-title-${topic.id}`}>
                    {topic.title}
                  </h3>
                  <p className="text-sm text-gray-300" data-testid={`text-description-${topic.id}`}>
                    {topic.description}
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
