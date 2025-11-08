import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import logoUrl from '@assets/xconnect-logo.png';
import googleIconUrl from '@assets/google-icon.png';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleGoogleLogin = () => {
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#1a1221] flex flex-col">
      <header className="border-b border-[#7312d4] px-10 py-3">
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
            <a 
              href="#contact" 
              className="text-white text-sm font-medium hover-elevate px-2 py-1 rounded"
              data-testid="link-contact"
            >
              Contact Us
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-40 py-5">
        <div className="w-full max-w-[480px] space-y-5">
          <h1 className="text-5xl font-bold text-white text-center mb-8" data-testid="text-title">
            Create Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-base font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 bg-gradient-to-r from-[#362447] to-[#8257ad] border-0 text-white placeholder:text-[#ad91c9] rounded-lg"
                data-testid="input-email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white text-base font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 bg-gradient-to-r from-[#402957] to-[#8b5abd] border-0 text-white placeholder:text-[#b093cd] rounded-lg"
                data-testid="input-password"
                required
              />
            </div>

            <button
              type="button"
              className="text-[#ad91c9] text-sm hover:text-white transition-colors"
              data-testid="link-forgot-password"
            >
              Forgot password?
            </button>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-[#3b096e] to-[#7312d4] text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
              data-testid="button-login"
            >
              Log in
            </Button>

            <Button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full h-12 bg-gradient-to-r from-[#3b096e] to-[#7312d4] text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-3"
              data-testid="button-google-login"
            >
              <img src={googleIconUrl} alt="" className="w-7 h-7" />
              Continue with google
            </Button>
          </form>

          <p className="text-center text-[#ad91c9] text-sm" data-testid="text-signup-prompt">
            Don't have an account?{' '}
            <button
              onClick={() => setLocation('/signup')}
              className="hover:text-white transition-colors underline"
              data-testid="link-signup"
            >
              Sign up
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
