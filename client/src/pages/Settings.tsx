import { useLocation } from 'wouter';
import { Home, Users, Compass, User, Settings as SettingsIcon, LogOut, Paintbrush, Lock, Bell } from 'lucide-react';
import logoUrl from '@assets/xconnect-logo.png';

interface SettingItem {
  icon: any;
  title: string;
  description: string;
}

interface SettingSection {
  title: string;
  items: SettingItem[];
}

const settingSections: SettingSection[] = [
  {
    title: "App Customization",
    items: [
      {
        icon: Paintbrush,
        title: "Appearance",
        description: "Personalize the app's appearance and behavior to suit your preferences."
      }
    ]
  },
  {
    title: "Privacy",
    items: [
      {
        icon: Lock,
        title: "Privacy Controls",
        description: "Control who can see your profile, posts, and other information."
      }
    ]
  },
  {
    title: "Account",
    items: [
      {
        icon: User,
        title: "Account Preferences",
        description: "Manage your account details, including your name, email, and password."
      }
    ]
  },
  {
    title: "Notifications",
    items: [
      {
        icon: Bell,
        title: "Notification Settings",
        description: "Customize how you receive notifications for new messages, updates, and more."
      }
    ]
  }
];

export default function Settings() {
  const [, setLocation] = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Users, label: 'Connect', path: '/connect' },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: SettingsIcon, label: 'Settings', path: '/settings', active: true },
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
            data-testid="nav-candela"
          >
            Candela
          </button>
        </header>

        <main className="flex-1 p-10 overflow-y-auto">
          <h1 className="text-4xl font-bold text-white mb-10" data-testid="text-title">
            Settings
          </h1>

          <div className="max-w-3xl space-y-8">
            {settingSections.map((section, sectionIndex) => (
              <div key={section.title}>
                <h2 className="text-xl font-semibold text-white mb-4" data-testid={`text-section-${sectionIndex}`}>
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <div 
                      key={item.title}
                      className="flex items-start gap-4 p-4 bg-[#2d1f3d] rounded-lg cursor-pointer hover:bg-[#3d2554] transition-colors"
                      data-testid={`setting-item-${sectionIndex}-${itemIndex}`}
                    >
                      <div className="w-12 h-12 bg-[#3d2554] rounded flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium mb-1" data-testid={`text-setting-title-${sectionIndex}-${itemIndex}`}>
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-sm" data-testid={`text-setting-description-${sectionIndex}-${itemIndex}`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
