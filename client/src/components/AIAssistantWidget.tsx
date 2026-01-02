import { useState } from 'react';
import { X, Bot } from 'lucide-react';

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 w-14 h-14 rounded-full text-white cursor-pointer shadow-lg z-[10001] hover:scale-110 transition-transform duration-200 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          data-testid="button-ai-assistant-open"
          aria-label="Открыть AI ассистент"
        >
          <Bot className="w-7 h-7" />
        </button>
      )}

      {isOpen && (
        <div
          className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-white rounded-xl shadow-2xl z-[10000] overflow-hidden"
          data-testid="ai-assistant-widget"
        >
          <div
            className="text-white px-4 py-3 flex items-center justify-between"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          >
            <span className="font-semibold">Ассистент Инициолога 3:0</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:opacity-80 transition-opacity"
              data-testid="button-ai-assistant-close"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <iframe
            src="https://aiairlab.com/chat/0ac94352-cec4-470c-9dc9-2acf9ce2e572"
            className="w-full border-none"
            style={{ height: 'calc(100% - 48px)' }}
            title="AI Ассистент Инициолога"
          />
        </div>
      )}
    </>
  );
}
