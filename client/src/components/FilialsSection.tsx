
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle } from 'lucide-react';
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import './FilialsSection.css';

export default function FilialsSection() {
  const { t } = useLanguage();

  const countries = [
    { key: 'germany', capital: 'Berlin', flag: '🇩🇪' },
    { key: 'france', capital: 'Paris', flag: '🇫🇷' },
    { key: 'italy', capital: 'Rome', flag: '🇮🇹' },
    { key: 'spain', capital: 'Madrid', flag: '🇪🇸' },
    { key: 'netherlands', capital: 'Amsterdam', flag: '🇳🇱' },
    { key: 'belgium', capital: 'Brussels', flag: '🇧🇪' },
    { key: 'austria', capital: 'Vienna', flag: '🇦🇹' },
    { key: 'poland', capital: 'Warsaw', flag: '🇵🇱' },
    { key: 'sweden', capital: 'Stockholm', flag: '🇸🇪' },
    { key: 'usa', capital: 'Washington D.C.', flag: '🇺🇸' },
    { key: 'canada', capital: 'Ottawa', flag: '🇨🇦' },
    { key: 'china', capital: 'Beijing', flag: '🇨🇳' },
    { key: 'belarus', capital: 'Minsk', flag: '🇧🇾' },
  ];

  return (
    <section id="filials" className="filials-section">
      <div className="stars-container">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-fluid-xl font-bold mb-4 text-white">
            {t('filials.title')}
          </h2>
        </div>

        <div className="filials-list">
          {countries.map((country) => (
            <div key={country.key} className="filial-item">
              <div className="filial-content">
                <span className="flag">{country.flag}</span>
                <div className="country-info">
                  <span className="country-name">{t(`filials.countries.${country.key}`)}</span>
                  <span className="capital-name">{country.capital}</span>
                </div>
              </div>
              <div className="contact-icons">
                <a
                  href={`https://t.me/initiology_${country.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-icon telegram"
                  aria-label={`Telegram ${t(`filials.countries.${country.key}`)}`}
                >
                  <FaTelegramPlane size={20} />
                </a>
                <a
                  href="https://api.whatsapp.com/send/?phone=19297174941"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-icon whatsapp"
                  aria-label={`WhatsApp ${t(`filials.countries.${country.key}`)}`}
                >
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
