import { useState } from 'react';
import { SymptomChecker, ResultsDisplay } from '@/components/SymptomChecker';
import { Disease } from '@/data/healthData';
import { Heart, Shield, Utensils, Activity } from 'lucide-react';

const Index = () => {
  const [results, setResults] = useState<Disease[] | null>(null);

  const features = [
    {
      icon: Shield,
      title: 'Verified Guidance',
      description: 'Evidence-based symptom analysis'
    },
    {
      icon: Utensils,
      title: 'Diet Plans',
      description: 'Personalized recovery nutrition'
    },
    {
      icon: Activity,
      title: 'Quick Analysis',
      description: 'Instant health insights'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  HealthGuide AI
                </h1>
                <p className="text-xs text-muted-foreground">Symptom Checker & Diet Planner</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Verified Data
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Only show when no results */}
      {!results && (
        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Personal{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Health Assistant
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Get verified symptom guidance and personalized diet recommendations to support your recovery journey.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-8">
            {features.map((feature) => (
              <div 
                key={feature.title}
                className="text-center p-4 rounded-xl bg-card border border-border/50 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        <div className="max-w-3xl mx-auto">
          {results === null ? (
            <SymptomChecker onResultsFound={setResults} />
          ) : (
            <ResultsDisplay 
              diseases={results} 
              onBack={() => setResults(null)} 
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>HealthGuide AI</strong> - Lenovo Leap AI Hackathon Project
            </p>
            <p className="text-xs">
              This application provides general health guidance only. Always consult healthcare professionals for medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
