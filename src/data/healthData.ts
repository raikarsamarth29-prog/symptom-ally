// Health Data - Symptoms, Diseases, and Diet Plans

export interface Symptom {
  id: string;
  name: string;
  category: string;
}

export interface Disease {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  severity: 'mild' | 'moderate' | 'severe';
  dietPlan: DietPlan;
}

export interface DietPlan {
  recommended: string[];
  avoid: string[];
  tips: string[];
  duration: string;
}

export const symptomCategories = [
  'General',
  'Respiratory',
  'Digestive',
  'Neurological',
  'Musculoskeletal',
  'Skin',
  'Cardiovascular'
];

export const symptoms: Symptom[] = [
  // General
  { id: 'fever', name: 'Fever', category: 'General' },
  { id: 'fatigue', name: 'Fatigue', category: 'General' },
  { id: 'weakness', name: 'Weakness', category: 'General' },
  { id: 'chills', name: 'Chills', category: 'General' },
  { id: 'night_sweats', name: 'Night Sweats', category: 'General' },
  { id: 'weight_loss', name: 'Unexplained Weight Loss', category: 'General' },
  
  // Respiratory
  { id: 'cough', name: 'Cough', category: 'Respiratory' },
  { id: 'sore_throat', name: 'Sore Throat', category: 'Respiratory' },
  { id: 'runny_nose', name: 'Runny Nose', category: 'Respiratory' },
  { id: 'shortness_breath', name: 'Shortness of Breath', category: 'Respiratory' },
  { id: 'chest_congestion', name: 'Chest Congestion', category: 'Respiratory' },
  { id: 'wheezing', name: 'Wheezing', category: 'Respiratory' },
  
  // Digestive
  { id: 'nausea', name: 'Nausea', category: 'Digestive' },
  { id: 'vomiting', name: 'Vomiting', category: 'Digestive' },
  { id: 'diarrhea', name: 'Diarrhea', category: 'Digestive' },
  { id: 'constipation', name: 'Constipation', category: 'Digestive' },
  { id: 'abdominal_pain', name: 'Abdominal Pain', category: 'Digestive' },
  { id: 'bloating', name: 'Bloating', category: 'Digestive' },
  { id: 'loss_appetite', name: 'Loss of Appetite', category: 'Digestive' },
  
  // Neurological
  { id: 'headache', name: 'Headache', category: 'Neurological' },
  { id: 'dizziness', name: 'Dizziness', category: 'Neurological' },
  { id: 'confusion', name: 'Confusion', category: 'Neurological' },
  { id: 'numbness', name: 'Numbness/Tingling', category: 'Neurological' },
  { id: 'memory_issues', name: 'Memory Issues', category: 'Neurological' },
  
  // Musculoskeletal
  { id: 'muscle_pain', name: 'Muscle Pain', category: 'Musculoskeletal' },
  { id: 'joint_pain', name: 'Joint Pain', category: 'Musculoskeletal' },
  { id: 'back_pain', name: 'Back Pain', category: 'Musculoskeletal' },
  { id: 'stiffness', name: 'Stiffness', category: 'Musculoskeletal' },
  { id: 'swelling', name: 'Swelling', category: 'Musculoskeletal' },
  
  // Skin
  { id: 'rash', name: 'Rash', category: 'Skin' },
  { id: 'itching', name: 'Itching', category: 'Skin' },
  { id: 'dry_skin', name: 'Dry Skin', category: 'Skin' },
  { id: 'skin_discoloration', name: 'Skin Discoloration', category: 'Skin' },
  
  // Cardiovascular
  { id: 'chest_pain', name: 'Chest Pain', category: 'Cardiovascular' },
  { id: 'palpitations', name: 'Palpitations', category: 'Cardiovascular' },
  { id: 'high_bp', name: 'High Blood Pressure', category: 'Cardiovascular' },
  { id: 'swollen_legs', name: 'Swollen Legs', category: 'Cardiovascular' },
];

export const diseases: Disease[] = [
  {
    id: 'common_cold',
    name: 'Common Cold',
    description: 'A viral infection of the upper respiratory tract. Usually harmless and resolves within 7-10 days.',
    symptoms: ['fever', 'cough', 'sore_throat', 'runny_nose', 'fatigue', 'headache'],
    severity: 'mild',
    dietPlan: {
      recommended: [
        'Warm chicken soup or vegetable broth',
        'Citrus fruits (oranges, lemons, grapefruits)',
        'Ginger tea with honey',
        'Garlic-rich foods',
        'Leafy green vegetables',
        'Warm water with lemon',
        'Probiotic-rich yogurt'
      ],
      avoid: [
        'Dairy products (may increase mucus)',
        'Fried and fatty foods',
        'Sugary drinks and sodas',
        'Alcohol',
        'Processed foods',
        'Spicy foods (if sore throat)'
      ],
      tips: [
        'Stay hydrated - drink 8-10 glasses of water daily',
        'Get plenty of rest (7-9 hours sleep)',
        'Use a humidifier to ease congestion',
        'Gargle with warm salt water for sore throat'
      ],
      duration: '7-10 days'
    }
  },
  {
    id: 'flu',
    name: 'Influenza (Flu)',
    description: 'A contagious respiratory illness caused by influenza viruses. More severe than common cold.',
    symptoms: ['fever', 'cough', 'fatigue', 'muscle_pain', 'headache', 'chills', 'weakness'],
    severity: 'moderate',
    dietPlan: {
      recommended: [
        'Clear broths and soups',
        'Bananas and bland fruits',
        'Rice and plain toast',
        'Electrolyte drinks',
        'Herbal teas (chamomile, peppermint)',
        'Lean proteins when appetite returns',
        'Vitamin C rich foods'
      ],
      avoid: [
        'Heavy, greasy foods',
        'Caffeine',
        'Alcohol',
        'Sugary foods',
        'Raw vegetables (hard to digest)',
        'Spicy foods'
      ],
      tips: [
        'Rest as much as possible',
        'Drink fluids every 15-20 minutes',
        'Eat small, frequent meals',
        'Monitor temperature and seek help if over 103°F'
      ],
      duration: '1-2 weeks'
    }
  },
  {
    id: 'gastroenteritis',
    name: 'Gastroenteritis (Stomach Flu)',
    description: 'Inflammation of the stomach and intestines, usually caused by viral or bacterial infection.',
    symptoms: ['nausea', 'vomiting', 'diarrhea', 'abdominal_pain', 'fever', 'fatigue', 'loss_appetite'],
    severity: 'moderate',
    dietPlan: {
      recommended: [
        'BRAT diet: Bananas, Rice, Applesauce, Toast',
        'Clear broths',
        'Oral rehydration solutions',
        'Crackers and pretzels',
        'Boiled potatoes',
        'Plain pasta',
        'Lean chicken (when recovering)'
      ],
      avoid: [
        'Dairy products',
        'Fatty and fried foods',
        'Caffeine',
        'Alcohol',
        'Raw fruits and vegetables',
        'Spicy foods',
        'Acidic foods'
      ],
      tips: [
        'Stay hydrated - small sips frequently',
        'Start with ice chips if vomiting persists',
        'Gradually reintroduce solid foods',
        'Wash hands frequently to prevent spread'
      ],
      duration: '3-7 days'
    }
  },
  {
    id: 'migraine',
    name: 'Migraine',
    description: 'A neurological condition causing intense, debilitating headaches often with other symptoms.',
    symptoms: ['headache', 'nausea', 'dizziness', 'fatigue', 'numbness', 'weakness'],
    severity: 'moderate',
    dietPlan: {
      recommended: [
        'Magnesium-rich foods (spinach, almonds)',
        'Omega-3 fatty acids (salmon, sardines)',
        'Riboflavin-rich foods (eggs, lean meats)',
        'Fresh fruits (non-citrus)',
        'Whole grains',
        'Ginger tea',
        'Plenty of water'
      ],
      avoid: [
        'Aged cheeses',
        'Processed meats',
        'Chocolate (for some)',
        'Alcohol, especially red wine',
        'MSG-containing foods',
        'Artificial sweeteners',
        'Caffeine (limit or avoid)'
      ],
      tips: [
        'Maintain regular meal times',
        'Keep a food diary to identify triggers',
        'Stay well-hydrated',
        'Get adequate sleep',
        'Rest in a dark, quiet room during attacks'
      ],
      duration: 'Ongoing management'
    }
  },
  {
    id: 'arthritis',
    name: 'Arthritis',
    description: 'Inflammation of one or more joints, causing pain and stiffness that can worsen with age.',
    symptoms: ['joint_pain', 'stiffness', 'swelling', 'fatigue', 'weakness', 'muscle_pain'],
    severity: 'moderate',
    dietPlan: {
      recommended: [
        'Fatty fish (salmon, mackerel, sardines)',
        'Olive oil (extra virgin)',
        'Berries and cherries',
        'Leafy greens (spinach, kale)',
        'Nuts (walnuts, almonds)',
        'Beans and lentils',
        'Turmeric and ginger'
      ],
      avoid: [
        'Processed and fried foods',
        'Sugary foods and drinks',
        'Red meat (limit)',
        'Refined carbohydrates',
        'Alcohol',
        'Salt (excess)',
        'Omega-6 fatty acids (corn oil, soybean oil)'
      ],
      tips: [
        'Maintain a healthy weight',
        'Stay active with low-impact exercises',
        'Apply heat or cold therapy',
        'Consider anti-inflammatory supplements (consult doctor)'
      ],
      duration: 'Ongoing management'
    }
  },
  {
    id: 'allergies',
    name: 'Allergic Reaction',
    description: 'Immune system response to substances that are usually harmless.',
    symptoms: ['rash', 'itching', 'runny_nose', 'shortness_breath', 'swelling', 'fatigue'],
    severity: 'mild',
    dietPlan: {
      recommended: [
        'Quercetin-rich foods (onions, apples)',
        'Vitamin C rich foods (bell peppers, broccoli)',
        'Probiotic foods (yogurt, kefir)',
        'Local honey',
        'Green tea',
        'Omega-3 fatty acids',
        'Pineapple (contains bromelain)'
      ],
      avoid: [
        'Known allergens',
        'Histamine-rich foods (aged cheese, alcohol)',
        'Processed foods with additives',
        'Artificial colors and preservatives',
        'Foods cross-reactive with your allergens'
      ],
      tips: [
        'Keep an allergy diary',
        'Read food labels carefully',
        'Carry antihistamines if prescribed',
        'Seek emergency help for severe reactions'
      ],
      duration: 'Ongoing management'
    }
  },
  {
    id: 'hypertension',
    name: 'Hypertension (High Blood Pressure)',
    description: 'A condition where blood pressure against artery walls is consistently too high.',
    symptoms: ['high_bp', 'headache', 'dizziness', 'chest_pain', 'shortness_breath', 'fatigue'],
    severity: 'moderate',
    dietPlan: {
      recommended: [
        'DASH diet foods',
        'Potassium-rich foods (bananas, potatoes)',
        'Leafy greens',
        'Berries',
        'Fatty fish',
        'Oatmeal and whole grains',
        'Garlic',
        'Beets'
      ],
      avoid: [
        'Salt and high-sodium foods',
        'Processed and canned foods',
        'Red meat',
        'Sugary beverages',
        'Alcohol (limit)',
        'Caffeine (limit)',
        'Fried foods'
      ],
      tips: [
        'Monitor blood pressure regularly',
        'Exercise for 30 minutes daily',
        'Maintain healthy weight',
        'Reduce stress',
        'Limit sodium to 1500mg/day'
      ],
      duration: 'Ongoing management'
    }
  },
  {
    id: 'bronchitis',
    name: 'Bronchitis',
    description: 'Inflammation of the bronchial tubes that carry air to your lungs.',
    symptoms: ['cough', 'chest_congestion', 'fatigue', 'shortness_breath', 'wheezing', 'fever', 'chills'],
    severity: 'moderate',
    dietPlan: {
      recommended: [
        'Warm liquids (herbal tea, broth)',
        'Honey (natural cough suppressant)',
        'Ginger and turmeric',
        'Citrus fruits',
        'Leafy greens',
        'Garlic',
        'Almonds and nuts'
      ],
      avoid: [
        'Dairy products',
        'Fried foods',
        'Processed foods',
        'Sugary foods',
        'Cold drinks',
        'Alcohol',
        'Caffeine'
      ],
      tips: [
        'Use a humidifier',
        'Avoid smoke and irritants',
        'Rest your voice',
        'Sleep with head elevated',
        'Stay hydrated'
      ],
      duration: '2-3 weeks'
    }
  },
  {
    id: 'food_poisoning',
    name: 'Food Poisoning',
    description: 'Illness caused by eating contaminated food with bacteria, viruses, or parasites.',
    symptoms: ['nausea', 'vomiting', 'diarrhea', 'abdominal_pain', 'fever', 'weakness', 'loss_appetite'],
    severity: 'moderate',
    dietPlan: {
      recommended: [
        'Clear fluids initially',
        'Oral rehydration solutions',
        'BRAT diet when tolerated',
        'Plain crackers',
        'Clear broths',
        'Ice chips',
        'Coconut water'
      ],
      avoid: [
        'Solid foods initially',
        'Dairy products',
        'Fatty foods',
        'Spicy foods',
        'Caffeine',
        'Alcohol',
        'Raw foods'
      ],
      tips: [
        'Rest and stay hydrated',
        'Start with small sips of liquid',
        'Gradually introduce bland foods',
        'Seek medical help if symptoms persist 48+ hours'
      ],
      duration: '1-3 days'
    }
  },
  {
    id: 'anemia',
    name: 'Anemia',
    description: 'A condition where you lack enough healthy red blood cells to carry adequate oxygen.',
    symptoms: ['fatigue', 'weakness', 'dizziness', 'shortness_breath', 'chest_pain', 'headache', 'numbness'],
    severity: 'moderate',
    dietPlan: {
      recommended: [
        'Iron-rich foods (red meat, liver)',
        'Dark leafy greens (spinach, kale)',
        'Legumes (lentils, beans)',
        'Fortified cereals',
        'Vitamin C foods (to enhance iron absorption)',
        'Eggs',
        'Dried fruits (raisins, apricots)'
      ],
      avoid: [
        'Tea and coffee with meals (inhibit iron absorption)',
        'Calcium-rich foods during iron intake',
        'Processed foods',
        'Excessive fiber during iron absorption',
        'Alcohol'
      ],
      tips: [
        'Pair iron-rich foods with vitamin C',
        'Cook in cast iron pans',
        'Take iron supplements as prescribed',
        'Get regular blood tests',
        'Avoid antacids near iron intake'
      ],
      duration: 'Ongoing management'
    }
  }
];

// Function to match symptoms to diseases
export function matchDisease(selectedSymptoms: string[]): Disease[] {
  if (selectedSymptoms.length === 0) return [];
  
  const matches = diseases.map(disease => {
    const matchingSymptoms = disease.symptoms.filter(symptom => 
      selectedSymptoms.includes(symptom)
    );
    const matchPercentage = (matchingSymptoms.length / disease.symptoms.length) * 100;
    const coveragePercentage = (matchingSymptoms.length / selectedSymptoms.length) * 100;
    
    return {
      disease,
      matchScore: (matchPercentage + coveragePercentage) / 2,
      matchingSymptoms: matchingSymptoms.length
    };
  }).filter(match => match.matchingSymptoms >= 2) // At least 2 matching symptoms
    .sort((a, b) => b.matchScore - a.matchScore);
  
  return matches.slice(0, 3).map(m => m.disease);
}
