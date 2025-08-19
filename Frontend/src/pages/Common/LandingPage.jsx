import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, DollarSign, Users, BarChart3, Shield } from 'lucide-react';
import Button from '../../components/Button';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-400/20 rounded-lg rotate-45 animate-spin" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-indigo-400/20 rounded-full animate-pulse" style={{ animationDuration: '2s' }}></div>
        <div className="absolute bottom-20 right-40 w-12 h-12 bg-pink-400/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl animate-pulse" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '4s' }}></div>
        
        {/* Floating icons */}
        <div className="absolute top-32 right-1/4 animate-float">
          <DollarSign className="w-8 h-8 text-green-400/60" />
        </div>
        <div className="absolute bottom-1/2 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
          <Users className="w-6 h-6 text-blue-400/60" />
        </div>
        <div className="absolute top-1/3 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <BarChart3 className="w-7 h-7 text-purple-400/60" />
        </div>
        <div className="absolute bottom-20 left-1/3 animate-float" style={{ animationDelay: '3s' }}>
          <Shield className="w-6 h-6 text-indigo-400/60" />
        </div>
      </div>

      {/* Particle effect overlay */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo/Title Animation */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
              <span className="text-yellow-400 animate-pulse">
                Pay Track 
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Streamline your payroll management with our comprehensive solution. 
              Track salaries, manage employees, and generate reports with ease.
            </p>
          </div>

          {/* Features Preview */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform shadow-lg hover:shadow-2xl rounded-xl">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-sm text-gray-400">Employee Management</span>
              </div>
              <div className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform shadow-lg hover:shadow-2xl rounded-xl">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
                <span className="text-sm text-gray-400">Salary Tracking</span>
              </div>
              <div className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform shadow-lg hover:shadow-2xl rounded-xl">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-sm text-gray-400">Analytics</span>
              </div>
              <div className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform shadow-lg hover:shadow-2xl rounded-xl">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-indigo-400" />
                </div>
                <span className="text-sm text-gray-400">Secure</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-scale-in" style={{ animationDelay: '1.5s' }}>
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="relative text-lg px-24 py-3 rounded-2xl 
                          bg-accent 
                          hover:bg-accent/90 
                          transition-all duration-300 transform hover:scale-105 
                          shadow-[0_8px_30px_theme(colors.accent/0.4)] 
                          text-white backdrop-blur-md border border-white/20"
            >
              <span className="relative z-10 flex items-center">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </span>
              {/* Optional glow effect behind button */}
              <div className="absolute inset-0 rounded-2xl bg-white/10 blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 animate-fade-in" style={{ animationDelay: '2s' }}>
            <p className="text-gray-500 text-sm">
              Join thousands of businesses managing payroll efficiently
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
