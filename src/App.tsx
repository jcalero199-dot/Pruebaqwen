import { useState, useEffect } from 'react';

// Quiz questions about Meta Ads
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
    explanation: "Meta Ads te permite segmentar con precisión demográfica, intereses y comportamientos para llegar exactamente a quien necesita tu producto."
  },
  {
    id: 2,
    question: "¿Qué es el ROAS en Meta Ads?",
    options: [
      "Return on Ad Spend - Retorno por cada dólar invertido",
      "Rate of Advertising Sales",
      "Reach on All Social media",
      "Revenue of Ad Strategy"
    ],
    correct: 0,
    explanation: "ROAS mide cuánto ingreso generas por cada unidad monetaria invertida en publicidad. Es la métrica reina del rendimiento."
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
    explanation: "La jerarquía es: Campaña (objetivo) → Conjunto de anuncios (público, presupuesto) → Anuncio (creativo). Dominar esto es clave."
  },
  {
    id: 4,
    question: "¿Qué porcentaje de usuarios ven un anuncio al menos 7 veces antes de tomar acción?",
    options: [
      "20%",
      "45%",
      "70%",
      "85%"
    ],
    correct: 2,
    explanation: "El 70% de los usuarios necesitan ver un anuncio múltiples veces. Por eso la consistencia y la frecuencia son cruciales en tu estrategia."
  },
  {
    id: 5,
    question: "¿Cuál es el error #1 que cometen los principiantes en Meta Ads?",
    options: [
      "Usar imágenes de baja calidad",
      "No tener un pixel instalado",
      "Escalar demasiado rápido sin datos",
      "No usar videos"
    ],
    correct: 2,
    explanation: "Escalar sin datos suficientes es el error más costoso. Necesitas validar con datos antes de invertir más presupuesto."
  }
];

// Achievements
const achievements = [
  { id: 1, name: "Primer Paso", icon: "🎯", description: "Completaste tu primera pregunta" },
  { id: 2, name: "En Racha", icon: "🔥", description: "3 respuestas correctas seguidas" },
  { id: 3, name: "Experto", icon: "🏆", description: "Completaste todo el desafío" },
];

function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 3 + Math.random() * 4,
    size: 2 + Math.random() * 4,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: 0.3 + Math.random() * 0.4,
          }}
        />
      ))}
    </div>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const percentage = (current / total) * 100;
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-blue-200 text-sm font-medium">Progreso del Desafío</span>
        <span className="text-blue-300 text-sm font-bold">{current}/{total}</span>
      </div>
      <div className="w-full h-3 bg-blue-900/50 rounded-full overflow-hidden border border-blue-700/30">
        <div
          className="progress-bar h-full rounded-full relative"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 animate-shimmer rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

function ScoreDisplay({ score, streak }: { score: number; streak: number }) {
  return (
    <div className="flex items-center gap-4">
      <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-2">
        <span className="text-2xl">⭐</span>
        <span className="text-blue-100 font-bold text-lg">{score}</span>
        <span className="text-blue-300 text-sm">pts</span>
      </div>
      {streak > 1 && (
        <div className="glass-card rounded-xl px-4 py-2 flex items-center gap-2 animate-bounce-in">
          <span className="text-2xl">🔥</span>
          <span className="text-orange-300 font-bold text-lg">{streak}x</span>
          <span className="text-orange-200 text-sm">racha</span>
        </div>
      )}
    </div>
  );
}

function QuizOption({ 
  option, 
  index, 
  selected, 
  isCorrect, 
  showResult, 
  onClick 
}: { 
  option: string; 
  index: number; 
  selected: boolean; 
  isCorrect: boolean; 
  showResult: boolean; 
  onClick: () => void;
}) {
  let className = "quiz-option glass-card rounded-xl p-4 cursor-pointer border border-blue-700/30";
  
  if (showResult) {
    if (isCorrect) className += " correct";
    else if (selected) className += " incorrect";
  } else if (selected) {
    className += " selected";
  }

  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className={className} onClick={!showResult ? onClick : undefined}>
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
          showResult && isCorrect ? 'bg-green-500/30 text-green-300' :
          showResult && selected && !isCorrect ? 'bg-red-500/30 text-red-300' :
          selected ? 'bg-blue-500/30 text-blue-300' : 'bg-blue-800/50 text-blue-300'
        }`}>
          {letters[index]}
        </div>
        <span className="text-blue-100 font-medium">{option}</span>
        {showResult && isCorrect && <span className="ml-auto text-green-400">✓</span>}
        {showResult && selected && !isCorrect && <span className="ml-auto text-red-400">✗</span>}
      </div>
    </div>
  );
}

function HeroSection({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative">
      <div className="text-center max-w-4xl mx-auto animate-slide-up">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-blue-200 text-sm font-medium">Desafío Interactivo 2026</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
          <span className="text-white">Descubre tu </span>
          <span className="gradient-text">Nivel en</span>
          <br />
          <span className="gradient-text">Meta Ads</span>
        </h1>

        {/* Subtitle */}
        <p className="text-blue-200 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          Responde 5 preguntas estratégicas y descubre qué tan lejos estás de 
          <span className="text-blue-300 font-semibold"> dominar la publicidad en Meta</span>. 
          Al final, recibe tu diagnóstico personalizado y acceso a recursos exclusivos.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <div className="glass-card rounded-xl px-6 py-4 text-center">
            <div className="text-3xl font-bold text-blue-300">5</div>
            <div className="text-blue-400 text-sm">Preguntas</div>
          </div>
          <div className="glass-card rounded-xl px-6 py-4 text-center">
            <div className="text-3xl font-bold text-blue-300">2 min</div>
            <div className="text-blue-400 text-sm">Duración</div>
          </div>
          <div className="glass-card rounded-xl px-6 py-4 text-center">
            <div className="text-3xl font-bold text-blue-300">100%</div>
            <div className="text-blue-400 text-sm">Gratis</div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="btn-primary text-white font-bold text-lg px-10 py-5 rounded-2xl animate-pulse-glow"
        >
          🚀 Comenzar el Desafío
        </button>

        {/* Social proof */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="flex -space-x-2">
            {['🧑‍💼', '👩‍💻', '🧑‍🎨', '👨‍💼'].map((emoji, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-blue-800 border-2 border-blue-600 flex items-center justify-center text-sm">
                {emoji}
              </div>
            ))}
          </div>
          <span className="text-blue-300 text-sm">+2,847 personas ya completaron el desafío</span>
        </div>
      </div>
    </div>
  );
}

function QuizSection({ 
  onComplete 
}: { 
  onComplete: (score: number, answers: number[]) => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showAchievement, setShowAchievement] = useState<string | null>(null);

  const question = quizQuestions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect = index === question.correct;
    const newStreak = isCorrect ? streak + 1 : 0;
    const points = isCorrect ? 100 + (newStreak * 25) : 0;
    
    setScore(prev => prev + points);
    setStreak(newStreak);
    setAnswers(prev => [...prev, index]);

    // Check achievements
    if (currentQuestion === 0 && isCorrect) {
      setTimeout(() => setShowAchievement(achievements[0].name), 500);
    }
    if (newStreak === 3) {
      setTimeout(() => setShowAchievement(achievements[1].name), 500);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      onComplete(score, answers);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <ProgressBar current={currentQuestion + 1} total={quizQuestions.length} />
          <ScoreDisplay score={score} streak={streak} />
        </div>

        {/* Achievement popup */}
        {showAchievement && (
          <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 animate-bounce-in">
            <div className="glass-card rounded-2xl px-6 py-4 border border-yellow-500/30 flex items-center gap-3">
              <span className="text-3xl">🏅</span>
              <div>
                <div className="text-yellow-300 font-bold">¡Logro desbloqueado!</div>
                <div className="text-blue-200 text-sm">{showAchievement}</div>
              </div>
            </div>
          </div>
        )}

        {/* Question card */}
        <div className="glass-card rounded-3xl p-8 mb-6 animate-slide-up" key={currentQuestion}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <span className="text-blue-300 font-bold">{currentQuestion + 1}</span>
            </div>
            <span className="text-blue-400 text-sm font-medium">Pregunta {currentQuestion + 1} de {quizQuestions.length}</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed">
            {question.question}
          </h2>

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
            <div className="mt-6 p-4 rounded-xl bg-blue-900/40 border border-blue-600/20 animate-slide-up">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{selectedAnswer === question.correct ? '🎉' : '💡'}</span>
                <div>
                  <div className="text-blue-300 font-semibold mb-1">
                    {selectedAnswer === question.correct ? '¡Correcto!' : 'Dato clave:'}
                  </div>
                  <p className="text-blue-200 text-sm leading-relaxed">{question.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Next button */}
        {showResult && (
          <div className="text-center animate-slide-up">
            <button
              onClick={handleNext}
              className="btn-primary text-white font-bold text-lg px-8 py-4 rounded-2xl"
            >
              {currentQuestion < quizQuestions.length - 1 ? '→ Siguiente Pregunta' : '🎯 Ver Mi Resultado'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultSection({ 
  score, 
  answers, 
  onGetResource 
}: { 
  score: number; 
  answers: number[];
  onGetResource: () => void;
}) {
  const correctCount = answers.filter((a, i) => a === quizQuestions[i].correct).length;
  const percentage = (correctCount / quizQuestions.length) * 100;
  
  let level = '';
  let levelIcon = '';
  let levelDescription = '';
  let levelColor = '';

  if (percentage >= 80) {
    level = 'Experto en Meta Ads';
    levelIcon = '🏆';
    levelDescription = '¡Impresionante! Tienes un conocimiento sólido. Es hora de llevar tu estrategia al siguiente nivel con técnicas avanzadas.';
    levelColor = 'from-yellow-400 to-orange-500';
  } else if (percentage >= 60) {
    level = 'Intermedio Avanzado';
    levelIcon = '🚀';
    levelDescription = '¡Muy bien! Tienes buenas bases. Con algunos ajustes estratégicos puedes multiplicar tus resultados.';
    levelColor = 'from-blue-400 to-cyan-400';
  } else if (percentage >= 40) {
    level = 'En Desarrollo';
    levelIcon = '📈';
    levelDescription = 'Vas por buen camino. Hay áreas clave que dominar para escalar tus campañas de forma rentable.';
    levelColor = 'from-blue-500 to-blue-300';
  } else {
    level = 'Principiante con Potencial';
    levelIcon = '🌱';
    levelDescription = 'Todos empezamos desde cero. Lo importante es que estás aquí buscando mejorar. Tenemos el recurso perfecto para ti.';
    levelColor = 'from-green-400 to-emerald-400';
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Score circle */}
        <div className="relative w-40 h-40 mx-auto mb-8 animate-bounce-in">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="8" />
            <circle 
              cx="50" cy="50" r="45" fill="none" 
              stroke="url(#gradient)" strokeWidth="8"
              strokeDasharray={`${percentage * 2.83} 283`}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl">{levelIcon}</span>
            <span className="text-blue-100 font-bold text-lg">{score} pts</span>
          </div>
        </div>

        {/* Level */}
        <div className="animate-slide-up">
          <h2 className={`text-3xl md:text-4xl font-black mb-3 bg-gradient-to-r ${levelColor} bg-clip-text text-transparent`}>
            {level}
          </h2>
          <p className="text-blue-200 text-lg max-w-lg mx-auto mb-8 leading-relaxed">
            {levelDescription}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-4 mb-10 animate-slide-up">
          <div className="glass-card rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-300">{correctCount}/{quizQuestions.length}</div>
            <div className="text-blue-400 text-xs mt-1">Correctas</div>
          </div>
          <div className="glass-card rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-300">{percentage}%</div>
            <div className="text-blue-400 text-xs mt-1">Acierto</div>
          </div>
          <div className="glass-card rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-300">{score}</div>
            <div className="text-blue-400 text-xs mt-1">Puntos</div>
          </div>
        </div>

        {/* CTA */}
        <div className="glass-card rounded-3xl p-8 animate-slide-up">
          <div className="text-3xl mb-4">🎁</div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Desbloquea tu Guía Personalizada
          </h3>
          <p className="text-blue-200 mb-6">
            Basado en tu resultado, hemos preparado una guía con las estrategias exactas que necesitas para escalar tus campañas en Meta Ads.
          </p>
          <ul className="text-left text-blue-200 space-y-2 mb-6">
            <li className="flex items-center gap-2"><span className="text-blue-400">✓</span> Plantillas de campañas probadas</li>
            <li className="flex items-center gap-2"><span className="text-blue-400">✓</span> Checklist de optimización diaria</li>
            <li className="flex items-center gap-2"><span className="text-blue-400">✓</span> Guía de segmentación avanzada</li>
            <li className="flex items-center gap-2"><span className="text-blue-400">✓</span> Framework de escalado rentable</li>
          </ul>
          <button
            onClick={onGetResource}
            className="btn-primary text-white font-bold text-lg px-8 py-4 rounded-2xl w-full animate-pulse-glow"
          >
            📥 Obtener Guía Gratuita
          </button>
        </div>
      </div>
    </div>
  );
}

function LeadForm({ onSubmit, initialSubmitted = false }: { onSubmit: (data: { name: string; email: string; phone: string }) => void; initialSubmitted?: boolean }) {
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
      onSubmit({ name, email, phone });
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center max-w-lg animate-bounce-in">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-4">¡Listo{name ? `, ${name.split(' ')[0]}` : ''}!</h2>
          <p className="text-blue-200 text-lg mb-6">
            Tu guía personalizada está en camino. Revisa tu bandeja de entrada en los próximos minutos.
          </p>
          <div className="glass-card rounded-2xl p-6 text-left">
            <div className="text-blue-300 font-semibold mb-3">📧 ¿Qué sigue?</div>
            <ol className="text-blue-200 space-y-2 text-sm">
              <li>1. Revisa tu email (y spam por si acaso)</li>
              <li>2. Descarga la guía y empieza a aplicarla HOY</li>
              <li>3. Únete a nuestra comunidad exclusiva</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8 animate-slide-up">
          <div className="text-4xl mb-4">🔓</div>
          <h2 className="text-3xl font-bold text-white mb-3">
            Último Paso
          </h2>
          <p className="text-blue-200">
            Ingresa tus datos para desbloquear tu guía personalizada de Meta Ads
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 space-y-5 animate-slide-up">
          <div>
            <label className="text-blue-200 text-sm font-medium mb-2 block">Nombre completo</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className="w-full bg-blue-900/40 border border-blue-700/30 rounded-xl px-4 py-3 text-white placeholder-blue-400/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="text-blue-200 text-sm font-medium mb-2 block">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full bg-blue-900/40 border border-blue-700/30 rounded-xl px-4 py-3 text-white placeholder-blue-400/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="text-blue-200 text-sm font-medium mb-2 block">WhatsApp (opcional)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+52 123 456 7890"
              className="w-full bg-blue-900/40 border border-blue-700/30 rounded-xl px-4 py-3 text-white placeholder-blue-400/50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary text-white font-bold text-lg px-8 py-4 rounded-2xl w-full disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Enviando...
              </span>
            ) : (
              '🚀 Desbloquear Mi Guía'
            )}
          </button>

          <p className="text-blue-400/60 text-xs text-center">
            🔒 Tus datos están seguros. No compartimos tu información con terceros.
          </p>
        </form>
      </div>
    </div>
  );
}

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
    <div className="relative min-h-screen">
      <Particles />
      
      {/* Navigation dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
        {['hero', 'quiz', 'result', 'form'].map((s, i) => (
          <div
            key={s}
            className={`w-3 h-3 rounded-full transition-all ${
              stage === s ? 'bg-blue-400 scale-125' : 
              ['hero', 'quiz', 'result', 'form'].indexOf(stage) > i ? 'bg-blue-600' : 'bg-blue-800'
            }`}
          />
        ))}
      </div>

      {stage === 'hero' && <HeroSection onStart={() => setStage('quiz')} />}
      {stage === 'quiz' && <QuizSection onComplete={handleQuizComplete} />}
      {stage === 'result' && <ResultSection score={score} answers={answers} onGetResource={() => setStage('form')} />}
      {stage === 'form' && <LeadForm onSubmit={() => setStage('success')} />}
      {stage === 'success' && <LeadForm onSubmit={() => {}} initialSubmitted={true} />}
    </div>
  );
}
