import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, Shield } from 'lucide-react';
import logoUrl from '@assets/xconnect-logo.png';
import heroImageUrl from '@assets/landing-hero.png';

export default function About() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  const handleGetStarted = () => {
    setLocation('/');
  };

  return (
    <div className="bg-[#1a1221] min-h-screen flex flex-col">
      <header className="border-b border-[#7312d4] px-10 py-3">
        <div className="flex items-center justify-between">
          <img 
            src={logoUrl} 
            alt="XConnect" 
            className="h-11 w-[119px] rounded-full"
            data-testid="img-logo"
          />
          <nav className="flex items-center gap-9">
            <button 
              onClick={() => setLocation('/about')}
              className="text-white text-sm font-medium hover-elevate px-2 py-1 rounded"
              data-testid="link-about"
            >
              About
            </button>
            <button 
              onClick={() => setLocation('/')}
              className="text-white text-sm font-medium hover-elevate px-2 py-1 rounded"
              data-testid="link-home"
            >
              Home
            </button>
            <button 
              onClick={() => setLocation('/chat')}
              className="text-white text-sm font-medium hover-elevate px-2 py-1 rounded"
              data-testid="link-candela"
            >
              Candela
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-40 py-5 max-w-[1280px] mx-auto w-full">
        <section className="w-full max-w-[960px] mb-10">
          <div className="relative h-[480px] rounded-lg overflow-hidden">
            <img 
              src={heroImageUrl} 
              alt="Hero background" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/40" />
            
            <div className="relative h-full flex flex-col items-center justify-center px-8">
              <h1 
                className="text-5xl font-extrabold text-white text-center mb-4 tracking-tight"
                data-testid="text-hero-title"
              >
                Welcome to XConnect
              </h1>
              <p className="text-base text-white text-center mb-8 max-w-[640px]">
                Your partner in innovation and growth. Explore our solutions and discover how we can help you achieve your goals.
              </p>
              <Button
                onClick={handleGetStarted}
                className="bg-[#7312d4] hover:bg-[#8524e8] text-white font-bold text-base px-5 py-3 h-12 rounded-lg transition-colors"
                data-testid="button-get-started"
              >
                Get Started
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full max-w-[960px] py-10">
          <div className="mb-6">
            <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight" data-testid="text-features-title">
              Key Features
            </h2>
            <p className="text-base text-white">
              Explore the core features that make our platform stand out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div 
              className="bg-[#261a33] border border-[#4d3366] rounded-lg p-4 space-y-3"
              data-testid="card-feature-analytics"
            >
              <div className="w-6 h-6 text-white">
                <BarChart3 className="w-full h-full" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Data-Driven Insights
                </h3>
                <p className="text-sm text-[#ad91c9] leading-relaxed">
                  Gain actionable insights with our advanced analytics tools.
                </p>
              </div>
            </div>

            <div 
              className="bg-[#261a33] border border-[#4d3366] rounded-lg p-4 space-y-3"
              data-testid="card-feature-collaboration"
            >
              <div className="w-6 h-6 text-white">
                <Users className="w-full h-full" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Collaborative Workspaces
                </h3>
                <p className="text-sm text-[#ad91c9] leading-relaxed">
                  Work seamlessly with your team in shared workspaces.
                </p>
              </div>
            </div>

            <div 
              className="bg-[#261a33] border border-[#4d3366] rounded-lg p-4 space-y-3"
              data-testid="card-feature-security"
            >
              <div className="w-6 h-6 text-white">
                <Shield className="w-full h-full" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Secure and Reliable
                </h3>
                <p className="text-sm text-[#ad91c9] leading-relaxed">
                  Trust in our robust security measures to protect your data.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
