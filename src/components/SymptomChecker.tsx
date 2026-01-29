import { useState, useEffect } from 'react';
import { symptoms, symptomCategories, matchDisease, Disease } from '@/data/healthData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Stethoscope, 
  Plus, 
  X, 
  Search, 
  AlertCircle,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Clock,
  Leaf,
  Sparkles
} from 'lucide-react';
import { correctSpelling, getSuggestions } from '@/lib/spellCorrection';

interface SymptomCheckerProps {
  onResultsFound: (diseases: Disease[]) => void;
}

export function SymptomChecker({ onResultsFound }: SymptomCheckerProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState('');
  const [customSymptoms, setCustomSymptoms] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState(symptomCategories[0]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [spellingCorrection, setSpellingCorrection] = useState<{ corrected: string; show: boolean }>({ corrected: '', show: false });

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  // Update suggestions as user types
  useEffect(() => {
    if (customSymptom.length >= 2) {
      const newSuggestions = getSuggestions(customSymptom);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
      
      // Check for spelling corrections
      const { corrected, wasChanged } = correctSpelling(customSymptom);
      if (wasChanged && corrected !== customSymptom) {
        setSpellingCorrection({ corrected, show: true });
      } else {
        setSpellingCorrection({ corrected: '', show: false });
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setSpellingCorrection({ corrected: '', show: false });
    }
  }, [customSymptom]);

  const addCustomSymptom = (symptomToAdd?: string) => {
    const symptomValue = symptomToAdd || customSymptom.trim();
    if (symptomValue && !customSymptoms.includes(symptomValue.toLowerCase())) {
      setCustomSymptoms(prev => [...prev, symptomValue.toLowerCase()]);
      setCustomSymptom('');
      setShowSuggestions(false);
      setSpellingCorrection({ corrected: '', show: false });
    }
  };

  const selectSuggestion = (suggestion: string) => {
    // Find if this matches an existing symptom
    const matchedSymptom = symptoms.find(s => s.name.toLowerCase() === suggestion.toLowerCase());
    if (matchedSymptom && !selectedSymptoms.includes(matchedSymptom.id)) {
      setSelectedSymptoms(prev => [...prev, matchedSymptom.id]);
    } else {
      addCustomSymptom(suggestion);
    }
    setCustomSymptom('');
    setShowSuggestions(false);
  };

  const applySpellingCorrection = () => {
    setCustomSymptom(spellingCorrection.corrected);
    setSpellingCorrection({ corrected: '', show: false });
  };

  const removeCustomSymptom = (symptom: string) => {
    setCustomSymptoms(prev => prev.filter(s => s !== symptom));
  };

  const handleAnalyze = () => {
    const allSymptoms = [...selectedSymptoms];
    // For custom symptoms, we try to match them to existing symptom IDs
    customSymptoms.forEach(custom => {
      const matchedSymptom = symptoms.find(s => 
        s.name.toLowerCase().includes(custom) || custom.includes(s.name.toLowerCase())
      );
      if (matchedSymptom && !allSymptoms.includes(matchedSymptom.id)) {
        allSymptoms.push(matchedSymptom.id);
      }
    });
    
    const results = matchDisease(allSymptoms);
    onResultsFound(results);
  };

  const clearAll = () => {
    setSelectedSymptoms([]);
    setCustomSymptoms([]);
  };

  const totalSelected = selectedSymptoms.length + customSymptoms.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
          <Stethoscope className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Symptom Checker</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Select your symptoms below or add custom ones to get personalized health guidance
        </p>
      </div>

      {/* Selected Symptoms Summary */}
      {totalSelected > 0 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-primary">
                {totalSelected} symptom{totalSelected > 1 ? 's' : ''} selected
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAll}
                className="text-muted-foreground hover:text-destructive"
              >
                Clear all
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map(id => {
                const symptom = symptoms.find(s => s.id === id);
                return symptom ? (
                  <Badge 
                    key={id} 
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    {symptom.name}
                    <button 
                      onClick={() => handleSymptomToggle(id)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ) : null;
              })}
              {customSymptoms.map(symptom => (
                <Badge 
                  key={symptom} 
                  variant="secondary"
                  className="bg-accent/20 text-accent-foreground border-accent/30"
                >
                  {symptom}
                  <button 
                    onClick={() => removeCustomSymptom(symptom)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Custom Symptom Input with Spell Correction */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Plus className="w-5 h-5 text-accent" />
            Add Custom Symptom
            <Badge variant="outline" className="ml-2 text-xs font-normal">
              <Sparkles className="w-3 h-3 mr-1" />
              Auto-correct
            </Badge>
          </CardTitle>
          <CardDescription>
            Can't find your symptom? Type it here with spelling assistance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="relative">
            <div className="flex gap-2">
              <Input
                placeholder="Describe your symptom..."
                value={customSymptom}
                onChange={(e) => setCustomSymptom(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomSymptom()}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="flex-1"
              />
              <Button onClick={() => addCustomSymptom()} variant="secondary">
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
            
            {/* Spelling Correction Suggestion */}
            {spellingCorrection.show && (
              <div className="mt-2 p-2 rounded-md bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-sm text-blue-700 dark:text-blue-300">
                  Did you mean: 
                  <button 
                    onClick={applySpellingCorrection}
                    className="font-semibold ml-1 underline hover:text-blue-900 dark:hover:text-blue-100"
                  >
                    {spellingCorrection.corrected}
                  </button>
                  ?
                </span>
              </div>
            )}
            
            {/* Autocomplete Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-md shadow-lg max-h-48 overflow-auto">
                <div className="p-2 text-xs text-muted-foreground border-b border-border">
                  Suggestions
                </div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => selectSuggestion(suggestion)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors flex items-center gap-2"
                  >
                    <Search className="w-3 h-3 text-muted-foreground" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Symptom Categories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Select Symptoms by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
              {symptomCategories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {symptomCategories.map(category => (
              <TabsContent key={category} value={category} className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {symptoms
                    .filter(s => s.category === category)
                    .map(symptom => (
                      <label
                        key={symptom.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedSymptoms.includes(symptom.id)
                            ? 'border-primary bg-primary/5 shadow-sm'
                            : 'border-border hover:border-primary/50 hover:bg-muted/50'
                        }`}
                      >
                        <Checkbox
                          checked={selectedSymptoms.includes(symptom.id)}
                          onCheckedChange={() => handleSymptomToggle(symptom.id)}
                        />
                        <span className="text-sm font-medium">{symptom.name}</span>
                      </label>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Analyze Button */}
      <Button 
        onClick={handleAnalyze}
        disabled={totalSelected < 2}
        className="w-full h-12 text-base font-semibold"
        size="lg"
      >
        <Search className="w-5 h-5 mr-2" />
        Analyze Symptoms
        {totalSelected >= 2 && (
          <Badge variant="secondary" className="ml-2 bg-primary-foreground/20">
            {totalSelected}
          </Badge>
        )}
      </Button>
      
      {totalSelected < 2 && totalSelected > 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Please select at least 2 symptoms for accurate analysis
        </p>
      )}

      {/* Disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800 dark:text-amber-200">
          <strong>Disclaimer:</strong> This tool provides general health guidance only and is not a substitute for professional medical advice. Always consult a healthcare provider for proper diagnosis and treatment.
        </p>
      </div>
    </div>
  );
}

interface ResultsDisplayProps {
  diseases: Disease[];
  onBack: () => void;
}

export function ResultsDisplay({ diseases, onBack }: ResultsDisplayProps) {
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(
    diseases.length > 0 ? diseases[0] : null
  );

  if (diseases.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted">
          <AlertCircle className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold">No Matches Found</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We couldn't find a matching condition. Please try adding more symptoms or consult a healthcare professional.
        </p>
        <Button onClick={onBack} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analysis Results</h2>
          <p className="text-muted-foreground">
            Based on your symptoms, here are possible conditions
          </p>
        </div>
        <Button onClick={onBack} variant="outline">
          New Analysis
        </Button>
      </div>

      {/* Disease Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {diseases.map((disease, index) => (
          <Card 
            key={disease.id}
            className={`cursor-pointer transition-all ${
              selectedDisease?.id === disease.id 
                ? 'border-primary shadow-lg ring-2 ring-primary/20' 
                : 'hover:border-primary/50'
            }`}
            onClick={() => setSelectedDisease(disease)}
          >
            <CardContent className="pt-4">
              <div className="flex items-start justify-between mb-2">
                <Badge 
                  variant={
                    disease.severity === 'mild' ? 'secondary' : 
                    disease.severity === 'moderate' ? 'default' : 'destructive'
                  }
                  className="text-xs"
                >
                  {disease.severity}
                </Badge>
                <span className="text-xs text-muted-foreground">#{index + 1} Match</span>
              </div>
              <h3 className="font-semibold text-lg mb-1">{disease.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {disease.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Diet Plan Display */}
      {selectedDisease && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-bold">Recovery Diet Plan</h3>
            <Badge variant="outline" className="ml-auto">
              <Clock className="w-3 h-3 mr-1" />
              {selectedDisease.dietPlan.duration}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Recommended Foods */}
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader className="pb-3 bg-green-50 dark:bg-green-950/30">
                <CardTitle className="text-lg flex items-center gap-2 text-green-700 dark:text-green-300">
                  <CheckCircle2 className="w-5 h-5" />
                  Recommended Foods
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  {selectedDisease.dietPlan.recommended.map((food, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-green-600 mt-1">•</span>
                      <span>{food}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Foods to Avoid */}
            <Card className="border-red-200 dark:border-red-800">
              <CardHeader className="pb-3 bg-red-50 dark:bg-red-950/30">
                <CardTitle className="text-lg flex items-center gap-2 text-red-700 dark:text-red-300">
                  <XCircle className="w-5 h-5" />
                  Foods to Avoid
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  {selectedDisease.dietPlan.avoid.map((food, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-red-600 mt-1">•</span>
                      <span>{food}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Recovery Tips */}
          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader className="pb-3 bg-amber-50 dark:bg-amber-950/30">
              <CardTitle className="text-lg flex items-center gap-2 text-amber-700 dark:text-amber-300">
                <Lightbulb className="w-5 h-5" />
                Recovery Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedDisease.dietPlan.tips.map((tip, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-2 p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/20"
                  >
                    <span className="text-amber-600 font-bold">{index + 1}.</span>
                    <span className="text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Medical Disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Important:</strong> This analysis is for informational purposes only. If symptoms persist or worsen, please consult a healthcare professional immediately. Diet recommendations may vary based on individual health conditions.
        </div>
      </div>
    </div>
  );
}
