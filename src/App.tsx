import { useState, useEffect, useCallback } from 'react';

// Quiz data
const quizQuestions = [
  {
    id: 1,
    question: "¿Cuál es el principal beneficio de usar Meta Ads para tu negocio?",
    options: [
      "Aumentar seguidores orgánicos",
      "Llegar a tu audiencia ideal con precisión quirúrgica",
      "Crear contenido viral automáticamente",
      "Reducir costos de producción"
    ],
    correct: 1,
    explanation: "Meta Ads te permite segmentar con precisión demográfica, intereses y comportamientos para llegar exactamente a quien necesita tu producto o servicio."
  },
  {
    id: 2,
    question: "¿Qué es el ROAS en Meta Ads?",
    options: [
      "Return on Ad Spend — Retorno por cada dólar invertido",
      "Rate of Advertising Sales",
      "Reach on All Social media",
      "Revenue of Ad Strategy"
    ],
    correct: 0,
    explanation: "ROAS mide cuánto ingreso generas por cada unidad monetaria invertida en publicidad. Es la métrica reina del rendimiento publicitario."
  },
  {
    id: 3,
    question: "¿Cuál es la estructura correcta de una campaña en Meta Ads?",
    options: [
      "Campaña → Anuncio → Público",
      "Campaña → Conjunto de anuncios → Anuncio",
      "Anuncio → Campaña → Pixel",
      "Público → Anuncio → Campaña"
    ],
    correct: 1,
    explanation: "La jerarquía es: Campaña (objetivo) → Conjunto de anuncios (público, presupuesto, ubicación) → Anuncio (creativo y copy). Dominar esto es clave para escalar."
  },
  {
    id: 4,
    question: "¿Qué porcentaje de usuarios necesitan ver un anuncio al menos 7 veces antes de actuar?",
    options: [
      "20%",
      "45%",
      "70%",
      "85%"
    ],
    correct: 2,
    explanation: "El 70% de los usuarios necesitan ver un anuncio múltiples veces. Por eso la consistencia y la frecuencia son cruciales en tu estrategia de retargeting."
  },
  {
    id: 5,
    question: "¿Cuál es el error #1 que cometen los principiantes en Meta Ads?",
    options: [
      "Usar imágenes de baja calidad",
      "No tener un pixel instalado",
      "Escalar demasiado rápido sin datos suficientes",
      "No usar videos en sus campañas"
    ],
    correct: 2,
    explanation: "Escalar sin datos suficientes es el error más costoso. Necesitas validar con datos reales antes de aumentar tu presupuesto significativamente."
  }
];

// SVG Icons
const Icons = {
  Target: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Chart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M3 3v18h18" /><path d="M7 16l4-6 4 3 5-7" />
    </svg>
  ),
  Rocket: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  Clock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  Fire: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  Download: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" />
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 7L2 7" />
    </svg>
  ),
  Lock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  ),
  Sparkle: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8L12 2Z" />
    </svg>
  ),
  Trophy: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M6 9H4.5a2.5 2.5 0 010-5H6" /><path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
      <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0012 0V2z" />
    </svg>
  ),
};

// Background effects component
function BackgroundEffects() {
  return (
    <>
      <div className="bg-scene" />
      <div className="bg-grid" />
      <div className="bg-noise" />
      
      {/* Floating orbs */}
      <div className="glow-orb w-96 h-96 bg-blue-500/20 -top-48 -left-48 animate-float" />
      <div className="glow-orb w-80 h-80 bg-blue-600/15 top-1/3 -right-40 animate-float-delayed" />
      <div className="glow-orb w-64 h-64 bg-blue-400/10 bottom-20 left-1/4 animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Particles */}
      <Particles />
    </>
  );
}

function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 4 + Math.random() * 6,
    size: 2 + Math.random() * 6,
    type: Math.random() > 0.5 ? 'particle-blue' : 'particle-light',
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`particle ${p.type} animate-float`}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

// Progress component
function ProgressBar({ current, total }: { current: number; total: number }) {
  const percentage = (current / total) * 100;
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2.5">
        <span className="text-blue-300/80 text-xs font-semibold uppercase tracking-wider">Progreso</span>
        <span className="text-blue-200 text-sm font-bold">{current}<span className="text-blue-400/50">/{total}</span></span>
      </div>
      <div className="progress-track w-full h-2 rounded-full overflow-hidden">
        <div
          className="progress-fill h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Score display
function ScoreDisplay({ score, streak }: { score: number; streak: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="score-badge rounded-xl px-4 py-2.5 flex items-center gap-2.5">
        <div className="text-yellow-400">
          <Icons.Star />
        </div>
        <span className="text-white font-bold text-lg tabular-nums">{score}</span>
        <span className="text-blue-400/60 text-xs font-medium">PTS</span>
      </div>
      {streak > 1 && (
        <div className="score-badge rounded-xl px-4 py-2.5 flex items-center gap-2 animate-bounce-in border-orange-500/30">
          <div className="text-orange-400">
            <Icons.Fire />
          </div>
          <span className="text-orange-300 font-bold text-lg tabular-nums">{streak}x</span>
        </div>
      )}
    </div>
  );
}

// Quiz option component
function QuizOption({ 
  option, index, selected, isCorrect, showResult, onClick 
}: { 
  option: string; index: number; selected: boolean; isCorrect: boolean; showResult: boolean; onClick: () => void;
}) {
  let className = "quiz-option glass-card rounded-2xl p-5 border border-blue-700/20";
  
  if (showResult) {
    if (isCorrect) className += " correct";
    else if (selected) className += " incorrect";
  } else if (selected) {
    className += " selected";
  }

  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className={className} onClick={!showResult ? onClick : undefined} role="button" tabIndex={0}>
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300 ${
          showResult && isCorrect 
            ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
            : showResult && selected && !isCorrect 
            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
            : selected 
            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
            : 'bg-blue-900/40 text-blue-400/70 border border-blue-800/30'
        }`}>
          {showResult && isCorrect ? <Icons.Check /> : showResult && selected && !isCorrect ? <Icons.X /> : letters[index]}
        </div>
        <span className="text-blue-100/90 font-medium text-[15px] leading-relaxed flex-1">{option}</span>
      </div>
    </div>
  );
}

// Hero Section
function HeroSection({ onStart }: { onStart: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative z-10">
      <div className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Top badge */}
        <div className="inline-flex items-center gap-2.5 glass-card rounded-full px-5 py-2.5 mb-10">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-emerald-400/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <span className="text-blue-200/80 text-sm font-medium tracking-wide">Desafío Interactivo 2026</span>
          <div className="w-px h-4 bg-blue-700/40" />
          <span className="text-blue-400/80 text-sm">Gratis</span>
        </div>

        {/* Main heading */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.05] tracking-tight">
          <span className="text-white block">Descubre tu</span>
          <span className="gradient-text block mt-1">Nivel en Meta Ads</span>
        </h1>

        {/* Subtitle */}
        <p className="text-blue-200/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          Responde <span className="text-blue-300 font-medium">5 preguntas estratégicas</span> y descubre 
          qué tan lejos estás de dominar la publicidad en Meta. 
          Recibe tu diagnóstico personalizado al instante.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
          {[
            { icon: <Icons.Target />, value: '5', label: 'Preguntas' },
            { icon: <Icons.Clock />, value: '2 min', label: 'Duración' },
            { icon: <Icons.Shield />, value: '100%', label: 'Gratis' },
          ].map((stat, i) => (
            <div key={i} className="glass-card-hover glass-card rounded-2xl px-6 py-4 flex items-center gap-3.5 min-w-[140px]">
              <div className="text-blue-400/80">{stat.icon}</div>
              <div className="text-left">
                <div className="text-white font-bold text-lg">{stat.value}</div>
                <div className="text-blue-400/60 text-xs font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl animate-scale-pulse" />
          <button
            onClick={onStart}
            className="btn-primary relative text-white font-semibold text-lg px-10 py-5 rounded-2xl flex items-center gap-3 group"
          >
            <span>Comenzar el Desafío</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              <Icons.ArrowRight />
            </span>
          </button>
        </div>

        {/* Social proof */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {['#1e40af', '#2563eb', '#3b82f6', '#1d4ed8'].map((color, i) => (
                <div 
                  key={i} 
                  className="w-8 h-8 rounded-full border-2 border-blue-950 flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: color }}
                >
                  {['M', 'A', 'L', 'R'][i]}
                </div>
              ))}
            </div>
            <span className="text-blue-300/60 text-sm ml-2">
              <span className="text-blue-200/80 font-medium">+2,847</span> personas ya completaron el desafío
            </span>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050d1a] to-transparent pointer-events-none" />
    </div>
  );
}

// Quiz Section
function QuizSection({ onComplete }: { onComplete: (score: number, answers: number[]) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showAchievement, setShowAchievement] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState(0);

  const question = quizQuestions[currentQuestion];

  const handleAnswer = useCallback((index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect = index === question.correct;
    const newStreak = isCorrect ? streak + 1 : 0;
    const points = isCorrect ? 100 + (newStreak * 25) : 0;
    
    setScore(prev => prev + points);
    setStreak(newStreak);
    setAnswers(prev => [...prev, index]);

    if (currentQuestion === 0 && isCorrect) {
      setTimeout(() => {
        setShowAchievement('Primer Acierto');
        setTimeout(() => setShowAchievement(null), 3000);
      }, 600);
    }
    if (newStreak === 3) {
      setTimeout(() => {
        setShowAchievement('¡Racha de 3!');
        setTimeout(() => setShowAchievement(null), 3000);
      }, 600);
    }
  }, [showResult, question.correct, streak, currentQuestion]);

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setAnimKey(prev => prev + 1);
    } else {
      onComplete(score + (selectedAnswer === question.correct ? 0 : 0), answers);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative z-10">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-10">
          <div className="w-full sm:w-auto sm:flex-1">
            <ProgressBar current={currentQuestion + 1} total={quizQuestions.length} />
          </div>
          <ScoreDisplay score={score} streak={streak} />
        </div>

        {/* Achievement popup */}
        {showAchievement && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce-in">
            <div className="glass-card-premium rounded-2xl px-6 py-4 border border-yellow-500/20 flex items-center gap-4 shadow-2xl">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-400">
                <Icons.Trophy />
              </div>
              <div>
                <div className="text-yellow-300 font-bold text-sm uppercase tracking-wider">Logro Desbloqueado</div>
                <div className="text-white font-semibold">{showAchievement}</div>
              </div>
            </div>
          </div>
        )}

        {/* Question card */}
        <div className="glass-card-premium rounded-3xl p-6 sm:p-10 mb-8 animate-slide-up" key={animKey}>
          {/* Question header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 flex items-center justify-center">
              <span className="text-blue-300 font-bold text-sm">{String(currentQuestion + 1).padStart(2, '0')}</span>
            </div>
            <div>
              <div className="text-blue-400/60 text-xs font-semibold uppercase tracking-wider">Pregunta</div>
              <div className="text-blue-200/80 text-sm">de {quizQuestions.length}</div>
            </div>
          </div>

          {/* Question text */}
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white mb-8 leading-snug">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <QuizOption
                key={index}
                option={option}
                index={index}
                selected={selectedAnswer === index}
                isCorrect={index === question.correct}
                showResult={showResult}
                onClick={() => handleAnswer(index)}
              />
            ))}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-blue-900/30 to-blue-950/40 border border-blue-700/20 animate-slide-up-fast">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  selectedAnswer === question.correct ? 'bg-green-500/15 text-green-400' : 'bg-blue-500/15 text-blue-400'
                }`}>
                  {selectedAnswer === question.correct ? <Icons.Check /> : <Icons.Sparkle />}
                </div>
                <div>
                  <div className={`font-semibold mb-1.5 ${
                    selectedAnswer === question.correct ? 'text-green-300' : 'text-blue-300'
                  }`}>
                    {selectedAnswer === question.correct ? '¡Excelente!' : 'Dato importante'}
                  </div>
                  <p className="text-blue-200/70 text-sm leading-relaxed">{question.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Next button */}
        {showResult && (
          <div className="text-center animate-slide-up-fast">
            <button
              onClick={handleNext}
              className="btn-primary text-white font-semibold text-base px-8 py-4 rounded-2xl inline-flex items-center gap-3 group"
            >
              <span>{currentQuestion < quizQuestions.length - 1 ? 'Siguiente Pregunta' : 'Ver Mi Resultado'}</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                <Icons.ArrowRight />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Result Section
function ResultSection({ score, answers, onGetResource }: { score: number; answers: number[]; onGetResource: () => void }) {
  const correctCount = answers.filter((a, i) => a === quizQuestions[i].correct).length;
  const percentage = Math.round((correctCount / quizQuestions.length) * 100);
  
  let level = '', levelDescription = '', levelGradient = '', levelEmoji = '';

  if (percentage >= 80) {
    level = 'Experto en Meta Ads';
    levelEmoji = '🏆';
    levelDescription = '¡Impresionante! Tienes un conocimiento sólido. Es hora de llevar tu estrategia al siguiente nivel con técnicas avanzadas de escalado.';
    levelGradient = 'from-amber-400 via-yellow-300 to-orange-400';
  } else if (percentage >= 60) {
    level = 'Intermedio Avanzado';
    levelEmoji = '🚀';
    levelDescription = '¡Muy bien! Tienes buenas bases. Con algunos ajustes estratégicos puedes multiplicar tus resultados significativamente.';
    levelGradient = 'from-blue-400 via-cyan-300 to-blue-300';
  } else if (percentage >= 40) {
    level = 'En Desarrollo';
    levelEmoji = '📈';
    levelDescription = 'Vas por buen camino. Hay áreas clave que dominar para escalar tus campañas de forma rentable y predecible.';
    levelGradient = 'from-blue-500 via-blue-400 to-indigo-400';
  } else {
    level = 'Principiante con Potencial';
    levelEmoji = '🌱';
    levelDescription = 'Todos empezamos desde cero. Lo importante es que estás aquí buscando mejorar. Tenemos el recurso perfecto para ti.';
    levelGradient = 'from-emerald-400 via-green-300 to-teal-400';
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative z-10">
      <div className="w-full max-w-2xl mx-auto text-center">
        
        {/* Score circle */}
        <div className="relative w-44 h-44 mx-auto mb-10 animate-bounce-in">
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-2xl animate-scale-pulse" />
          
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(59,130,246,0.1)" strokeWidth="6" />
            <circle 
              cx="50" cy="50" r="42" fill="none" 
              stroke="url(#scoreGradient)" strokeWidth="6"
              strokeDasharray={`${percentage * 2.64} 264`}
              strokeLinecap="round"
              className="transition-all duration-1000"
              style={{ animation: 'draw-line 1.5s ease-out forwards' }}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1d4ed8" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl mb-1">{levelEmoji}</span>
            <span className="text-white font-bold text-xl">{score}</span>
            <span className="text-blue-400/60 text-xs font-medium">PUNTOS</span>
          </div>
        </div>

        {/* Level title */}
        <div className="animate-slide-up mb-4">
          <div className="text-blue-400/60 text-xs font-semibold uppercase tracking-widest mb-3">Tu Nivel</div>
          <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r ${levelGradient} bg-clip-text text-transparent`}>
            {level}
          </h2>
          <p className="text-blue-200/60 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            {levelDescription}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 my-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {[
            { value: `${correctCount}/${quizQuestions.length}`, label: 'Correctas' },
            { value: `${percentage}%`, label: 'Acierto' },
            { value: `${score}`, label: 'Puntos' },
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-2xl p-4 sm:p-5">
              <div className="text-white font-bold text-xl sm:text-2xl">{stat.value}</div>
              <div className="text-blue-400/50 text-xs font-medium uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="glass-card-premium rounded-3xl p-8 sm:p-10 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-6">
            <div className="text-blue-400">
              <Icons.Download />
            </div>
          </div>
          
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            Desbloquea tu Guía Personalizada
          </h3>
          <p className="text-blue-200/60 mb-8 max-w-md mx-auto">
            Basado en tu resultado, preparamos una guía con las estrategias exactas que necesitas para escalar.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-8">
            {[
              'Plantillas de campañas probadas',
              'Checklist de optimización diaria',
              'Guía de segmentación avanzada',
              'Framework de escalado rentable',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-blue-900/20 border border-blue-800/20">
                <div className="w-6 h-6 rounded-lg bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                  <div className="text-blue-400"><Icons.Check /></div>
                </div>
                <span className="text-blue-200/80 text-sm">{item}</span>
              </div>
            ))}
          </div>

          <button
            onClick={onGetResource}
            className="btn-primary text-white font-semibold text-lg px-8 py-5 rounded-2xl w-full flex items-center justify-center gap-3 group"
          >
            <Icons.Download />
            <span>Obtener Guía Gratuita</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              <Icons.ArrowRight />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Lead Form
function LeadForm({ onSubmit, initialSubmitted = false }: { onSubmit: () => void; initialSubmitted?: boolean }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(initialSubmitted);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      onSubmit();
    }, 1800);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative z-10">
        <div className="text-center max-w-lg animate-bounce-in">
          {/* Success icon */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-xl animate-scale-pulse" />
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10 text-emerald-400">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            ¡Listo{name ? `, ${name.split(' ')[0]}` : ''}!
          </h2>
          <p className="text-blue-200/60 text-lg mb-10 leading-relaxed">
            Tu guía personalizada está en camino. Revisa tu bandeja de entrada en los próximos minutos.
          </p>

          <div className="glass-card-premium rounded-3xl p-8 text-left">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400">
                <Icons.Mail />
              </div>
              <div>
                <div className="text-white font-semibold">¿Qué sigue?</div>
                <div className="text-blue-400/60 text-sm">Tres pasos simples</div>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { num: '01', text: 'Revisa tu email (y la carpeta de spam)' },
                { num: '02', text: 'Descarga la guía y empieza a aplicarla HOY' },
                { num: '03', text: 'Únete a nuestra comunidad exclusiva de anunciantes' },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-blue-900/20 border border-blue-800/15">
                  <span className="text-blue-500/50 font-mono font-bold text-sm">{step.num}</span>
                  <span className="text-blue-200/70 text-sm">{step.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative z-10">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-10 animate-slide-up">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-6">
            <div className="text-blue-400">
              <Icons.Lock />
            </div>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
            Último Paso
          </h2>
          <p className="text-blue-200/60 text-base">
            Ingresa tus datos para desbloquear tu guía personalizada
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card-premium rounded-3xl p-8 space-y-5 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div>
            <label className="text-blue-200/70 text-sm font-medium mb-2 block">Nombre completo</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className="input-premium w-full rounded-xl px-5 py-4 text-white text-base"
            />
          </div>
          <div>
            <label className="text-blue-200/70 text-sm font-medium mb-2 block">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="input-premium w-full rounded-xl px-5 py-4 text-white text-base"
            />
          </div>
          <div>
            <label className="text-blue-200/70 text-sm font-medium mb-2 block">
              WhatsApp <span className="text-blue-400/40">(opcional)</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+52 123 456 7890"
              className="input-premium w-full rounded-xl px-5 py-4 text-white text-base"
            />
          </div>

          <div className="divider-glow my-6" />

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary text-white font-semibold text-base px-8 py-5 rounded-2xl w-full flex items-center justify-center gap-3 disabled:opacity-60"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-3">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Procesando...</span>
              </span>
            ) : (
              <>
                <Icons.Download />
                <span>Desbloquear Mi Guía</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="text-blue-500/40">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
            <p className="text-blue-400/40 text-xs">
              Tus datos están seguros. No compartimos tu información.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

// Step indicator
function StepIndicator({ stage }: { stage: string }) {
  const steps = ['hero', 'quiz', 'result', 'form'];
  const currentIndex = steps.indexOf(stage);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4">
      {steps.map((s, i) => (
        <div key={s} className="relative flex items-center">
          <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
            i === currentIndex 
              ? 'bg-blue-400 scale-150 shadow-lg shadow-blue-500/30' 
              : i < currentIndex 
              ? 'bg-blue-500/60' 
              : 'bg-blue-800/40'
          }`} />
          {i < steps.length - 1 && (
            <div className={`absolute top-4 w-px h-6 transition-colors duration-500 ${
              i < currentIndex ? 'bg-blue-500/40' : 'bg-blue-800/30'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}

// Main App
export default function App() {
  const [stage, setStage] = useState<'hero' | 'quiz' | 'result' | 'form' | 'success'>('hero');
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stage]);

  const handleQuizComplete = (finalScore: number, finalAnswers: number[]) => {
    setScore(finalScore);
    setAnswers(finalAnswers);
    setStage('result');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundEffects />
      <StepIndicator stage={stage} />

      <div className="relative z-10">
        {stage === 'hero' && <HeroSection onStart={() => setStage('quiz')} />}
        {stage === 'quiz' && <QuizSection onComplete={handleQuizComplete} />}
        {stage === 'result' && <ResultSection score={score} answers={answers} onGetResource={() => setStage('form')} />}
        {stage === 'form' && <LeadForm onSubmit={() => setStage('success')} />}
        {stage === 'success' && <LeadForm onSubmit={() => {}} initialSubmitted={true} />}
      </div>
    </div>
  );
}
