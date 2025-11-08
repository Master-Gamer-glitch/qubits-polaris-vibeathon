import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import logoUrl from '@assets/xconnect-logo.png';
import googleIconUrl from '@assets/google-icon.png';

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(email, password);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Failed to log in. Please check your credentials."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      await signInWithGoogle();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Google Login Failed",
        description: error.message || "Failed to log in with Google."
      });
    } finally {
      setIsLoading(false);
    }
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
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-[#3b096e] to-[#7312d4] text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
              data-testid="button-login"
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </Button>

            <Button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
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
