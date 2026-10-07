import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Send } from 'lucide-react';
import { AI_SUGGESTED_QUESTIONS, queryAshiAI } from '../data/portfolioData';

function FormattedMessage({ text }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5 text-xs sm:text-sm text-[#23170F] leading-relaxed">
      {lines.map((line, idx) => {
        if (!line.trim()) return <div key={idx} className="h-1" />;
        const parts = line.split(/(\*\*.*?\*\*|`.*?`)/g);
        return (
          <div key={idx}>
            {parts.map((part, pIdx) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <strong key={pIdx} className="font-semibold text-[#23170F]">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              if (part.startsWith('`') && part.endsWith('`')) {
                return (
                  <code
                    key={pIdx}
                    className="px-1.5 py-0.5 rounded bg-[#F7F1E7] border border-[#E4D9C8] font-mono text-[11px] text-[#6B4F3A]"
                  >
                    {part.slice(1, -1)}
                  </code>
                );
              }
              return <span key={pIdx}>{part}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hi! Ask me anything about Ashi's experience, Power BI dashboards, or Machine Learning projects.",
    },
  ]);
  const chatRef = useRef(null);

  const handleAsk = (questionText) => {
    const clean = questionText.trim();
    if (!clean) return;

    const { answer } = queryAshiAI(clean);
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: 'user', text: clean },
      { id: `a-${Date.now() + 1}`, role: 'assistant', text: answer },
    ]);
    setInput('');
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="floating-btn"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#23170F] hover:bg-[#6B4F3A] text-[#F7F1E7] font-mono text-xs font-medium tracking-wider shadow-[0_12px_30px_rgba(35,23,15,0.2)] transition-colors cursor-pointer"
          >
            <span>ASK ASHI AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        ) : (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-[calc(100vw-3rem)] sm:w-96 bg-[#FCF9F4] rounded-2xl border border-[#E4D9C8] shadow-[0_24px_60px_rgba(35,23,15,0.16)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#E4D9C8] flex items-center justify-between bg-[#F7F1E7]/70">
              <div>
                <div className="font-mono text-xs font-semibold text-[#23170F]">
                  ASK ASHI AI
                </div>
                <div className="text-[11px] text-[#6B4F3A]">
                  Grounded in Ashi&apos;s verified resume &amp; projects
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close AI Assistant"
                className="p-1.5 rounded-full hover:bg-[#E4D9C8]/60 text-[#6B4F3A] hover:text-[#23170F] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={chatRef}
              className="h-72 overflow-y-auto p-4 space-y-3 bg-[#FCF9F4]"
            >
              {messages.map((m) =>
                m.role === 'user' ? (
                  <div key={m.id} className="flex justify-end">
                    <div className="max-w-[82%] px-3.5 py-2 rounded-2xl rounded-br-xs bg-[#23170F] text-[#F7F1E7] text-xs sm:text-sm">
                      {m.text}
                    </div>
                  </div>
                ) : (
                  <div key={m.id} className="flex justify-start">
                    <div className="max-w-[90%] p-3.5 rounded-2xl rounded-bl-xs bg-[#F7F1E7] border border-[#E4D9C8]">
                      <FormattedMessage text={m.text} />
                    </div>
                  </div>
                )
              )}

              {/* Suggested Questions */}
              <div className="pt-2 space-y-1.5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#6B4F3A]">
                  Suggested questions
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {AI_SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleAsk(q)}
                      className="text-left px-3 py-1.5 rounded-full bg-[#FCF9F4] hover:bg-[#F7F1E7] border border-[#E4D9C8] hover:border-[#6B4F3A] text-xs text-[#23170F] transition-colors cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAsk(input);
              }}
              className="p-3 border-t border-[#E4D9C8] bg-[#F7F1E7]/50 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 bg-[#FCF9F4] px-3.5 py-2 rounded-full border border-[#E4D9C8] text-xs sm:text-sm text-[#23170F] placeholder-[#6B4F3A] focus:outline-none focus:border-[#6B4F3A]"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send question"
                className="p-2 rounded-full bg-[#23170F] hover:bg-[#6B4F3A] disabled:opacity-40 text-[#F7F1E7] transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
