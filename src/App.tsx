import React, { useState } from 'react';
import { CheckCircle2, XCircle, Trophy, BookOpen, ChevronRight, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Question {
  id: number;
  section: string;
  paragraph: string;
  options: {
    A: string;
    B: string;
    C: string;
  };
  correct: 'A' | 'B' | 'C';
}

const questions: Question[] = [
  // Part 1
  {
    id: 31,
    section: "Phần 1: Công nghệ & Kỹ thuật",
    paragraph: "While artificial intelligence (AI) can process data at lightning speed, it lacks \"emotional intelligence.\" It cannot understand sarcasm or empathy, which are vital in sectors like mental health counseling or high-level negotiation.",
    options: { A: "The efficiency of data processing", B: "Human traits that AI cannot replicate", C: "Careers replaced by robots" },
    correct: 'B'
  },
  {
    id: 32,
    section: "Phần 1: Công nghệ & Kỹ thuật",
    paragraph: "Blockchain was originally designed for Bitcoin, but its potential goes far beyond currency. Its decentralized ledger system can secure medical records, track supply chains, and even prevent voter fraud in elections.",
    options: { A: "The volatility of digital currencies", B: "Diverse applications of a secure system", C: "How to mine Bitcoin safely" },
    correct: 'B'
  },
  {
    id: 33,
    section: "Phần 1: Công nghệ & Kỹ thuật",
    paragraph: "Early steam engines were notoriously inefficient, losing most of their heat. James Watt’s invention of the separate condenser transformed the engine into a powerful, viable tool for the entire Industrial Revolution.",
    options: { A: "A critical technical improvement", B: "The dangers of steam power", C: "The end of the industrial era" },
    correct: 'A'
  },
  // Part 2
  {
    id: 34,
    section: "Phần 2: Môi trường & Khí hậu",
    paragraph: "The \"Great Pacific Garbage Patch\" is not a solid island of trash. Instead, it is a soup of microplastics, many invisible to the naked eye, which are ingested by plankton and eventually enter the human food chain.",
    options: { A: "Visualizing a massive island", B: "The hidden nature of oceanic pollution", C: "Cleaning up the world's oceans" },
    correct: 'B'
  },
  {
    id: 35,
    section: "Phần 2: Môi trường & Khí hậu",
    paragraph: "Desalination plants turn seawater into drinking water, providing a lifeline for arid regions. However, the process is energy-intensive and produces a salty brine byproduct that can harm local marine ecosystems.",
    options: { A: "A solution with environmental costs", B: "The scarcity of freshwater", C: "New methods of salt production" },
    correct: 'A'
  },
  {
    id: 36,
    section: "Phần 2: Môi trường & Khí hậu",
    paragraph: "Permafrost in Siberia is thawing at an alarming rate. As it melts, it releases ancient methane and carbon dioxide trapped for millennia, further accelerating global temperature rises.",
    options: { A: "The freezing of the Siberian tundra", B: "A feedback loop from melting ground", C: "Ancient life discovered in ice" },
    correct: 'B'
  },
  // Part 3
  {
    id: 37,
    section: "Phần 3: Kinh tế & Quản lý",
    paragraph: "\"Planned obsolescence\" is a strategy where products are designed to break or become outdated quickly. This forces consumers to buy new models, increasing company profits but creating massive amounts of electronic waste.",
    options: { A: "Improving product durability", B: "A deliberate policy for repeat sales", C: "The history of consumer electronics" },
    correct: 'B'
  },
  {
    id: 38,
    section: "Phần 3: Kinh tế & Quản lý",
    paragraph: "The \"Glass Ceiling\" remains a barrier for many women in corporate environments. Despite having the same qualifications as men, many find that invisible biases prevent them from reaching top executive positions.",
    options: { A: "Transparent hiring practices", B: "Hidden obstacles to career advancement", C: "The benefits of female leadership" },
    correct: 'B'
  },
  {
    id: 39,
    section: "Phần 3: Kinh tế & Quản lý",
    paragraph: "Inflation isn't always bad. A small, predictable amount of inflation encourages people to spend rather than hoard cash, which keeps the economy moving and businesses growing.",
    options: { A: "The dangers of rising prices", B: "A positive perspective on inflation", C: "How to calculate the cost of living" },
    correct: 'B'
  },
  // Part 4
  {
    id: 40,
    section: "Phần 4: Lịch sử & Văn hóa",
    paragraph: "The Library of Alexandria was the largest repository of knowledge in the ancient world. Its destruction did not happen in one fire, but rather through centuries of neglect, budget cuts, and various conflicts.",
    options: { A: "A sudden catastrophic event", B: "The gradual decline of a cultural giant", C: "Rebuilding ancient monuments" },
    correct: 'B'
  },
  {
    id: 41,
    section: "Phần 4: Lịch sử & Văn hóa",
    paragraph: "The concept of \"zero\" was a revolutionary mathematical leap. Developed independently by the Mayans and Indians, it allowed for complex calculations and the eventual birth of modern physics and computer science.",
    options: { A: "The origin and impact of a numerical idea", B: "Differences between Mayan and Indian math", C: "Why computer science needs numbers" },
    correct: 'A'
  },
  {
    id: 42,
    section: "Phần 4: Lịch sử & Văn hóa",
    paragraph: "Tea was once so expensive in 18th-century England that it was kept in locked caddies. It only became a national drink when taxes were lowered and trade with India expanded.",
    options: { A: "The health benefits of drinking tea", B: "Factors making a luxury item accessible", C: "The tea trade in modern England" },
    correct: 'B'
  },
  // Part 5
  {
    id: 43,
    section: "Phần 5: Sinh học & Động vật",
    paragraph: "Honeybees communicate the location of flowers using a \"waggle dance.\" The angle of the dance relative to the sun tells other bees which direction to fly, while the duration indicates the distance.",
    options: { A: "The social hierarchy of a beehive", B: "A sophisticated system of navigation", C: "Why bees prefer certain flowers" },
    correct: 'B'
  },
  {
    id: 44,
    section: "Phần 5: Sinh học & Động vật",
    paragraph: "Axolotls have the extraordinary ability to regenerate lost limbs, heart tissue, and even parts of their brain. Scientists are studying them to see if these regenerative powers can be applied to human medicine.",
    options: { A: "The extinction of rare amphibians", B: "Biological traits with medical potential", C: "How animals survive in the wild" },
    correct: 'B'
  },
  {
    id: 45,
    section: "Phần 5: Sinh học & Động vật",
    paragraph: "Invasive species, like the cane toad in Australia, often devastate local wildlife. Because they have no natural predators in their new environment, their populations explode, outcompeting native animals for food.",
    options: { A: "The benefits of introducing new species", B: "Consequences of ecological imbalance", C: "Protecting native Australian birds" },
    correct: 'B'
  },
  // Part 6
  {
    id: 46,
    section: "Phần 6: Tâm lý & Xã hội",
    paragraph: "The \"Bystander Effect\" suggests that individuals are less likely to help a victim when others are present. Everyone assumes someone else will take action, leading to a collective paralysis.",
    options: { A: "The courage of large crowds", B: "Why numbers decrease individual responsibility", C: "Training people to be more helpful" },
    correct: 'B'
  },
  {
    id: 47,
    section: "Phần 6: Tâm lý & Xã hội",
    paragraph: "Gamification involves adding game-like elements, such as points or leaderboards, to non-game contexts like education. This increases engagement by tapping into the human desire for competition and achievement.",
    options: { A: "The addiction to video games", B: "Using play to improve motivation", C: "Designing better school curriculums" },
    correct: 'B'
  },
  {
    id: 48,
    section: "Phần 6: Tâm lý & Xã hội",
    paragraph: "Urban legends often spread because they tap into deep-seated cultural fears. Whether they are true or not, these stories serve as modern myths that reinforce social rules or warnings.",
    options: { A: "The scientific proof behind legends", B: "Why we share cautionary tales", C: "How rumors destroy reputations" },
    correct: 'B'
  },
  // Part 7
  {
    id: 49,
    section: "Phần 7: Sức khỏe & Dinh dưỡng",
    paragraph: "Intermittent fasting focuses on when you eat rather than what you eat. By giving the body long breaks from digestion, it can trigger \"autophagy,\" a process where cells clean out damaged components.",
    options: { A: "The best foods for weight loss", B: "A cellular benefit of timed eating", C: "The history of religious fasting" },
    correct: 'B'
  },
  {
    id: 50,
    section: "Phần 7: Sức khỏe & Dinh dưỡng",
    paragraph: "Placebos are inactive substances that can nonetheless cause real improvements in a patient's condition. This happens because the patient's expectation of healing triggers the brain to release its own pain-relieving chemicals.",
    options: { A: "The power of the mind in healing", B: "Fraudulent practices in medicine", C: "Why some drugs fail clinical trials" },
    correct: 'A'
  },
  {
    id: 51,
    section: "Phần 7: Sức khỏe & Dinh dưỡng",
    paragraph: "Sedentary lifestyles are becoming a global health crisis. Experts suggest that \"sitting is the new smoking,\" as lack of movement is linked to heart disease even in people who exercise occasionally.",
    options: { A: "The dangers of prolonged inactivity", B: "Smoking vs. Heart disease", C: "Designing better office chairs" },
    correct: 'A'
  },
  // Part 8
  {
    id: 52,
    section: "Phần 8: Không gian & Vật lý",
    paragraph: "Dark matter makes up about 85% of the universe's mass, yet it does not emit light or energy. We only know it exists because of its gravitational pull on visible stars and galaxies.",
    options: { A: "Finding light in the deep universe", B: "Detecting the invisible", C: "The collapse of distant stars" },
    correct: 'B'
  },
  {
    id: 53,
    section: "Phần 8: Không gian & Vật lý",
    paragraph: "Terraforming Mars would involve creating an atmosphere thick enough to trap heat and support liquid water. This might be achieved by releasing greenhouse gases to warm the planet artificially.",
    options: { A: "Why Mars is currently frozen", B: "The challenges of colonizing the Moon", C: "Modifying a planet for human life" },
    correct: 'C'
  },
  {
    id: 54,
    section: "Phần 8: Không gian & Vật lý",
    paragraph: "The \"Golden Record\" on the Voyager spacecraft contains sounds and images from Earth. It is intended as a time capsule, designed to communicate the story of our world to any extraterrestrials who might find it.",
    options: { A: "A message to the stars", B: "Evidence of life on other planets", C: "The technology of long-range probes" },
    correct: 'A'
  },
  // Part 9
  {
    id: 55,
    section: "Phần 9: Ngôn ngữ & Truyền thông",
    paragraph: "Languages are disappearing at an alarming rate. When a language dies, it’s not just words that are lost, but also unique ways of interpreting the world and traditional knowledge about local plants and animals.",
    options: { A: "The evolution of new dialects", B: "The cultural cost of linguistic loss", C: "Why English is a global language" },
    correct: 'B'
  },
  {
    id: 56,
    section: "Phần 9: Ngôn ngữ & Truyền thông",
    paragraph: "\"Echo chambers\" on social media occur when algorithms show users content that only aligns with their existing beliefs. This prevents people from seeing opposing viewpoints and increases social polarization.",
    options: { A: "The speed of online news", B: "How technology limits perspective", C: "The benefits of connecting with friends" },
    correct: 'B'
  },
  {
    id: 57,
    section: "Phần 9: Ngôn ngữ & Truyền thông",
    paragraph: "Speed reading techniques often involve suppressing \"sub-vocalization\" — the habit of saying words in your head. While this increases speed, it can significantly reduce the comprehension of complex texts.",
    options: { A: "A trade-off between pace and understanding", B: "The history of silent reading", C: "Why children should read aloud" },
    correct: 'A'
  },
  // Part 10
  {
    id: 58,
    section: "Phần 10: Kiến trúc & Đô thị",
    paragraph: "\"Brutalist\" architecture is characterized by raw concrete and massive, block-like structures. While once hated for being \"ugly,\" many of these buildings are now being protected as historical landmarks of the post-war era.",
    options: { A: "The durability of concrete", B: "Changing attitudes toward a bold style", C: "How to demolish old buildings" },
    correct: 'B'
  },
  {
    id: 59,
    section: "Phần 10: Kiến trúc & Đô thị",
    paragraph: "The \"15-minute city\" is an urban planning concept where all essential needs — work, groceries, health — are within a short walk or bike ride from home. This aims to reduce car dependency and improve quality of life.",
    options: { A: "Reducing the need for long commutes", B: "Increasing the speed of public transport", C: "The rise of suburban shopping malls" },
    correct: 'A'
  },
  {
    id: 60,
    section: "Phần 10: Kiến trúc & Đô thị",
    paragraph: "Ancient Roman roads were so well-built that many are still in use today. They used a multi-layered technique involving sand, gravel, and stone slabs, which allowed for excellent drainage and durability.",
    options: { A: "The expansion of the Roman Empire", B: "Superior engineering of early transport routes", C: "Why modern roads break easily" },
    correct: 'B'
  }
];

const keywordTable = [
  { id: 31, heading: "Human traits (Đặc điểm con người)", paragraph: "\"Emotional intelligence, sarcasm, empathy\"" },
  { id: 32, heading: "Diverse applications (Ứng dụng đa dạng)", paragraph: "\"Secure medical records, track supply chains, prevent voter fraud\"" },
  { id: 34, heading: "Hidden nature (Bản chất bị che giấu)", paragraph: "\"Microplastics, invisible to the naked eye\"" },
  { id: 35, heading: "Environmental costs (Cái giá môi trường)", paragraph: "\"Energy-intensive, salty brine byproduct, harm marine ecosystems\"" },
  { id: 37, heading: "Deliberate policy (Chính sách cố ý)", paragraph: "\"Planned obsolescence, designed to break or become outdated\"" },
  { id: 42, heading: "Luxury item accessible (Món đồ xa xỉ trở nên dễ tiếp cận)", paragraph: "Once so expensive... became a national drink when taxes were lowered" },
  { id: 46, heading: "Decrease individual responsibility (Giảm trách nhiệm cá nhân)", paragraph: "\"Assume someone else will take action, collective paralysis\"" },
  { id: 49, heading: "Cellular benefit (Lợi ích ở cấp độ tế bào)", paragraph: "\"Trigger \"autophagy\", cells clean out damaged components\"" },
  { id: 52, heading: "Detecting the invisible (Phát hiện thứ vô hình)", paragraph: "Does not emit light... know it exists because of its gravitational pull" },
  { id: 57, heading: "Trade-off (Sự đánh đổi)", paragraph: "Increases speed... significantly reduce comprehension" }
];

export default function App() {
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showKeywordTable, setShowKeywordTable] = useState(false);

  const handleSelect = (questionId: number, option: string) => {
    if (submitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correct) {
        correctCount++;
      }
    });
    return (10 * correctCount / questions.length).toFixed(1);
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setSubmitted(false);
    setShowKeywordTable(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalAnswered = Object.keys(userAnswers).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <BookOpen className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">IELTS Heading Matching</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-500">
              {totalAnswered} / {questions.length} Questions
            </span>
            {submitted && (
              <div className="flex items-center gap-2 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
                <Trophy className="w-4 h-4 text-indigo-600" />
                <span className="text-indigo-700 font-bold">Score: {calculateScore()}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Reading Practice: Matching Headings</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Read each paragraph carefully and choose the most suitable heading from the options provided. 
            Focus on the main idea of the paragraph rather than specific details.
          </p>
        </div>

        {/* Questions List */}
        <div className="space-y-8">
          {questions.map((q, index) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{q.section}</span>
                <span className="text-sm font-bold text-slate-500">Question {q.id}</span>
              </div>
              <div className="p-6">
                <p className="text-lg leading-relaxed text-slate-700 mb-8 font-medium italic">
                  "{q.paragraph}"
                </p>
                
                <div className="grid gap-3">
                  {(Object.entries(q.options) as [string, string][]).map(([key, value]) => {
                    const isSelected = userAnswers[q.id] === key;
                    const isCorrect = q.correct === key;
                    const showFeedback = submitted;

                    let buttonClass = "flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ";
                    
                    if (showFeedback) {
                      if (isSelected && isCorrect) {
                        buttonClass += "bg-emerald-50 border-emerald-500 text-emerald-800";
                      } else if (isSelected && !isCorrect) {
                        buttonClass += "bg-rose-50 border-rose-500 text-rose-800";
                      } else if (isCorrect) {
                        buttonClass += "bg-emerald-50 border-emerald-200 text-emerald-700 opacity-70";
                      } else {
                        buttonClass += "bg-white border-slate-100 text-slate-400 opacity-50";
                      }
                    } else {
                      buttonClass += isSelected 
                        ? "bg-indigo-50 border-indigo-600 text-indigo-900 shadow-sm" 
                        : "bg-white border-slate-100 hover:border-slate-300 text-slate-600 hover:bg-slate-50";
                    }

                    return (
                      <button
                        key={key}
                        onClick={() => handleSelect(q.id, key)}
                        disabled={submitted}
                        className={buttonClass}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
                            isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {key}
                          </span>
                          <span className="font-medium">{value}</span>
                        </div>
                        {showFeedback && isSelected && (
                          isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-rose-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-16 flex flex-col items-center gap-6">
          {!submitted ? (
            <button
              onClick={() => setSubmitted(true)}
              disabled={totalAnswered < questions.length}
              className={`px-12 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 ${
                totalAnswered < questions.length
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              Submit Answers
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex flex-col items-center gap-8 w-full">
              <div className="bg-indigo-600 text-white p-8 rounded-3xl shadow-xl text-center w-full max-w-md">
                <Trophy className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
                <div className="text-5xl font-black mb-4">{calculateScore()} / 10</div>
                <p className="text-indigo-100">
                  You got {questions.filter(q => userAnswers[q.id] === q.correct).length} out of {questions.length} correct.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={resetQuiz}
                  className="px-8 py-3 bg-white border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </button>
                <button
                  onClick={() => setShowKeywordTable(!showKeywordTable)}
                  className="px-8 py-3 bg-indigo-100 text-indigo-700 font-bold rounded-xl hover:bg-indigo-200 transition-all flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  {showKeywordTable ? 'Hide Keyword Table' : 'Show Keyword Table'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Keyword Table */}
        <AnimatePresence>
          {showKeywordTable && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-12 overflow-hidden"
            >
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                <div className="flex items-center gap-3 mb-8">
                  <BookOpen className="text-indigo-600 w-6 h-6" />
                  <h3 className="text-2xl font-bold text-slate-800">Keyword Table (Synonyms)</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="py-4 px-4 text-sm font-bold text-slate-400 uppercase tracking-wider">Q#</th>
                        <th className="py-4 px-4 text-sm font-bold text-slate-400 uppercase tracking-wider">Keyword in Heading</th>
                        <th className="py-4 px-4 text-sm font-bold text-slate-400 uppercase tracking-wider">Synonym in Paragraph</th>
                      </tr>
                    </thead>
                    <tbody>
                      {keywordTable.map((item) => (
                        <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-4 font-bold text-slate-500">{item.id}</td>
                          <td className="py-4 px-4 font-semibold text-slate-700">{item.heading}</td>
                          <td className="py-4 px-4 text-slate-600 italic">{item.paragraph}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-4">
                  <div className="bg-amber-100 p-2 rounded-lg h-fit">
                    <span className="text-amber-700 font-bold">💡</span>
                  </div>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    <strong>Mẹo nhỏ:</strong> Ở câu 34, Heading A có từ "island" (đảo) xuất hiện trong bài nhưng bài nói nó không phải là đảo, nên A là bẫy. Luôn cảnh giác với những từ giống hệt trong bài nhé!
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
