import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { SiWhatsapp, SiTelegram } from 'react-icons/si';

export default function MessengerWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = '79258298223';
  const telegramUsername = 'vplazarenko';

  return (
    <div className="fixed bottom-6 right-6 z-50" data-testid="messenger-widget">
      {isOpen && (
        <div className="mb-4 flex flex-col gap-3 items-end animate-in slide-in-from-bottom-4 duration-300">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            data-testid="link-whatsapp"
          >
            <SiWhatsapp className="w-6 h-6" />
            <span className="font-medium">WhatsApp</span>
          </a>
          <a
            href={`https://t.me/${telegramUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#0088cc] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            data-testid="link-telegram"
          >
            <SiTelegram className="w-6 h-6" />
            <span className="font-medium">Telegram</span>
          </a>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen 
            ? 'bg-muted-foreground text-background rotate-0' 
            : 'bg-primary text-primary-foreground'
        }`}
        data-testid="button-messenger-toggle"
        aria-label={isOpen ? 'Закрыть мессенджеры' : 'Открыть мессенджеры'}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
