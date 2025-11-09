import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Settings, BarChart3, Users } from 'lucide-react';
import logoUrl from '@assets/xconnect-logo.png';
import heroImageUrl from '@assets/about-hero.png';

export default function About() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  const handleConnect = () => {
    if (user) {
      setLocation('/chat');
    } else {
      setLocation('/login');
    }
  };

  return (
    <div className="bg-[#1a1221] min-h-screen flex flex-col">
      <header className="border-b border-[#e5e8eb] px-10 py-3">
        <div className="flex items-center justify-between">
          <img 
            src={logoUrl} 
            alt="XConnect" 
            className="h-11 w-[119px] rounded-full"
            data-testid="img-logo"
          />
          <nav className="flex items-center gap-9">
            <a 
              href="#about" 
              className="text-white text-sm font-medium hover-elevate px-2 py-1 rounded"
              data-testid="link-about"
            >
              About
            </a>
            <a 
              href="#home" 
              className="text-white text-sm font-medium hover-elevate px-2 py-1 rounded"
              data-testid="link-home"
            >
              Home
            </a>
            <button 
              onClick={handleConnect}
              className="text-white text-sm font-medium hover-elevate px-2 py-1 rounded"
              data-testid="link-developer"
            >
              Developer
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-40 py-5 max-w-[1280px] mx-auto w-full">
        <section className="w-full max-w-[960px] mb-0">
          <div className="relative h-[480px] rounded-lg overflow-hidden">
            <img 
              src={heroImageUrl} 
              alt="Hero background" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/40" />
            
            <div className="relative h-full flex flex-col items-center justify-center px-8 gap-0">
              <h1 
                className="text-5xl font-extrabold text-white text-center mb-0 tracking-tight"
                data-testid="text-hero-title"
              >
                Welcome to XConnect
              </h1>
              <div className="flex gap-3 mt-4">
                <Button
                  className="bg-[#2a0c48] hover:bg-[#3a1558] text-white font-bold text-base px-5 py-3 h-12 rounded-lg transition-colors"
                  data-testid="button-explore"
                >
                  Explore
                </Button>
                <Button
                  onClick={handleConnect}
                  className="bg-[#2a0c48] hover:bg-[#3a1558] text-white font-bold text-base px-5 py-3 h-12 rounded-lg transition-colors"
                  data-testid="button-connect"
                >
                  Connect
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full max-w-[960px] py-5">
          <h2 className="text-2xl font-bold text-white mb-3 px-4" data-testid="text-services-title">
            Our Services
          </h2>

          <div className="px-4 py-10 space-y-6">
            <div>
              <h3 className="text-4xl font-extrabold text-white mb-4 tracking-tight max-w-[720px]">
                Comprehensive Solutions for Your Tech Problems
              </h3>
              <p className="text-base text-white max-w-[720px]">
                We offer a range of services designed to help your business thrive in today's competitive landscape.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div 
                className="bg-[#261a33] border border-[#4d3366] rounded-lg p-4 space-y-3"
                data-testid="card-service-consulting"
              >
                <div className="w-6 h-6 text-white">
                  <Settings className="w-full h-full" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    Technology Consulting
                  </h3>
                  <p className="text-sm text-[#ad91c9] leading-relaxed">
                    Expert guidance on leveraging technology to achieve your business goals.
                  </p>
                </div>
              </div>

              <div 
                className="bg-[#261a33] border border-[#4d3366] rounded-lg p-4 space-y-3"
                data-testid="card-service-community"
              >
                <div className="w-6 h-6 text-white">
                  <BarChart3 className="w-full h-full" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    Large Community
                  </h3>
                  <p className="text-sm text-[#ad91c9] leading-relaxed">
                    Tailored strategies to optimize your operations and maximize your potential.
                  </p>
                </div>
              </div>

              <div 
                className="bg-[#261a33] border border-[#4d3366] rounded-lg p-4 space-y-3"
                data-testid="card-service-team"
              >
                <div className="w-6 h-6 text-white">
                  <Users className="w-full h-full" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    Team Development
                  </h3>
                  <p className="text-sm text-[#ad91c9] leading-relaxed">
                    Building high-performing teams that drive innovation and success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full max-w-[960px] py-5">
          <h2 className="text-2xl font-bold text-white mb-3 px-4" data-testid="text-about-title">
            About Us
          </h2>

          <div className="px-4 py-10 space-y-10">
            <div>
              <h3 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
                Our Mission
              </h3>
              <div className="text-base text-white space-y-4 max-w-[887px]">
                <p>
                  At XConnect, our mission is to simplify how people work, learn, and solve problems online. We bring AI, community, and intuitive design together so users can focus on creating—not searching.
                </p>
                <p>
                  We unify leading AI systems like ChatGPT, Gemini, and Perplexity into one streamlined workspace, eliminating the need to switch between platforms for the same prompt. We empower users to exchange skills through a community-driven trade-off system that makes learning and troubleshooting faster and more collaborative. We enhance accessibility with voice-read responses, and we deliver all of this through a clean, secure, and easy-to-navigate interface with seamless Google login.
                </p>
                <p>
                  Our goal is to build a space where productivity feels effortless, help is always within reach, and every user gets more done with less friction.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
                OUR FEATURE
              </h3>
              <ul className="text-base text-white space-y-2 list-none">
                <li>Unified AI workspace integrating ChatGPT, Gemini, and Perplexity so users don't need to switch platforms for the same prompt.</li>
                <li>Skill Tradeoff system where users can post their stuck tasks and get help from others in exchange for their own expertise.</li>
                <li>Candela AI voice output that reads responses aloud for hands-free convenience.</li>
                <li>Clean, intuitive, and smooth UI designed for fast navigation and minimal friction.</li>
                <li>Secure database architecture with seamless Google Login for safe and convenient access.</li>
                <li>In app Spotify integration for music or soothing sounds on the Go</li>
              </ul>
            </div>

            <div className="text-center py-20 space-y-8">
              <h3 className="text-4xl font-extrabold text-white tracking-tight">
                Let's Work Together
              </h3>
              <Button
                onClick={handleConnect}
                className="bg-[#7312d4] hover:bg-[#8524e8] text-white font-bold text-base px-5 py-3 h-12 rounded-lg transition-colors"
                data-testid="button-get-in-touch"
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </section>

        <footer className="w-full max-w-[960px] px-5 py-10">
          <div className="flex flex-wrap gap-6 items-center justify-center mb-6">
            <a href="#home" className="text-[#ad91c9] text-base text-center min-w-[160px] hover:text-white transition-colors">
              Home
            </a>
            <a href="#services" className="text-[#ad91c9] text-base text-center min-w-[160px] hover:text-white transition-colors">
              Services
            </a>
            <a href="#about" className="text-[#ad91c9] text-base text-center min-w-[160px] hover:text-white transition-colors">
              About
            </a>
            <a href="#contact" className="text-[#ad91c9] text-base text-center min-w-[160px] hover:text-white transition-colors">
              Contact
            </a>
          </div>
          
          <p className="text-[#ad91c9] text-base text-center">
            © 2024 Innovatech Solutions. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
