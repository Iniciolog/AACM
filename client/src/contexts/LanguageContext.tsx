import { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'de' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.research': 'Research',
    'nav.method': 'Method',
    'nav.program': 'Program',
    'nav.articles': 'Articles',
    'nav.studies': 'Studies',
    'nav.conclusions': 'Scientific Conclusions',
    'nav.education': 'Platform',
    'nav.books': 'Books',
    'nav.channels': 'Channels',
    'nav.services': 'Services',
    'nav.rmt': 'RMT',
    'nav.awards': 'Awards',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.about': 'About',
    
    // Hero
    'hero.title': 'International Academy of Initiology',
    'hero.subtitle': 'Advancing scientific knowledge through groundbreaking research and global collaboration',
    'hero.cta': 'Explore Our Research',
    
    // Research
    'research.title': 'Our Research',
    'research.subtitle': 'Groundbreaking studies advancing the frontiers of initiology',
    'research.article1.title': 'Quantum Initiology Principles',
    'research.article1.desc': 'Exploring the fundamental quantum mechanisms underlying initiology processes',
    'research.article2.title': 'Global Initiology Patterns',
    'research.article2.desc': 'Comprehensive analysis of initiology phenomena across international populations',
    'research.article3.title': 'Neurological Foundations',
    'research.article3.desc': 'Understanding the neurological basis of initiology responses',
    'research.readmore': 'Read More',
    
    // Education
    'education.title': 'Educational Platform',
    'education.subtitle': 'World-class learning resources for scholars and practitioners',
    'education.feature1': 'Comprehensive Courses',
    'education.feature2': 'Expert Instructors',
    'education.feature3': 'International Certification',
    'education.cta': 'Access Platform',
    
    // Books
    'books.title': 'Publications & Books',
    'books.subtitle': 'Authoritative texts shaping the field of initiology',
    
    // About
    'about.title': 'Founder',
    'about.name': 'Vyacheslav Pavlovich Lazarenko',
    'about.fullname': 'Vyacheslav Pavlovich Lazarenko - Founder of Initiology',
    'about.role': 'Director of the Research Center for Initiology',
    'about.bio1': 'From early childhood, he dedicated his life to researching and developing the hidden capabilities of the human psyche, practicing yoga and meditation.',
    'about.bio2': 'At the age of 15, he experienced a transcendent (mystical) experience of connection with world consciousness. Thanks to this experience, in 1999 he founded the Initiology method, which has gained widespread popularity today.',
    'about.scientific': 'Scientific Activity',
    'about.scientific1': 'The effectiveness of the Initiology method was confirmed in studies conducted by independent scientific organizations using the scientific research approbation method.',
    'about.scientific2': 'Currently, modern energy-information technologies in the field of alternative medicine and energy-information security are being developed and implemented. Research is also being conducted at the Research Center for Initiology and Transpersonal Psychology.',
    'about.scientific3': 'Statistics and accounting of the effectiveness of the Initiology method in various spheres of life are maintained, as well as the formation of a documented evidence base.',
    'about.public': 'Public and Educational Activities',
    'about.public1': 'Founder of the "Initiologist of the Year" Award (since 2013).',
    'about.public2': 'Member of the Association of Holistic Psychology and Psychotherapy at UNESCO.',
    'about.public3': 'V. Lazarenko\'s activities have been noted with awards from private and public organizations.',
    'about.public4': 'Author of books on the Initiology method and over 200 publications in the press.',
    'about.professional': 'Professional Activity',
    'about.professional1': 'Currently conducts Initiology courses and professional training in related disciplines on the educational platform of the Research Center for Initiology and TPP.',
    'about.professional2': 'Conducts individual appointments: personal and online consultations and sessions.',
    
    // Books
    'books.book1.title': 'Practical Initiology',
    'books.book1.desc': 'This edition is the official Initiology textbook, recommended by the Research Center for Initiology and Transpersonal Psychology for mastering the "certification course of initiologist of the 1st-2nd levels".',
    'books.book1.electronic': 'Electronic version',
    'books.book1.printed': 'Printed version',
    
    // Research
    'research.study1.title': 'Scientific Research with RAMS',
    'research.study1.desc': 'In 2013, V. Lazarenko, together with independent research centers, organized a series of scientific studies. Scientific supervision was carried out by Alexey Lvovich Rozanov - Doctor of Technical Sciences, Corresponding Member of the Academy of Medical and Technical Sciences.',
    'research.study1.result': 'The results of scientific and technical approbation confirmed positive dynamics and duration of positive dynamics over time (stability of results).',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.q1': 'What is Initiology in simple terms?',
    'faq.a1': 'Initiology is an energy practice aimed at healing and improving quality of life. The Initiology method is based on interaction with energy channels through which cosmic energy flows. These flows positively affect all areas of human life. Through working with channels, physical healing, cleansing of subtle energy structures, and qualitative improvement of all life areas occur. In the social sphere, channel work promotes improvement of social status, luck, career growth, business success, and achievement of personal goals. In the personal sphere, specialized channels help improve family climate, strengthen personal relationships, and form favorable environment and mutually beneficial connections. In the security sphere, channels protect from enemies and ill-wishers, safeguard from negative influences from society and other people.',
    'faq.q2': 'Will I be able to master the Initiology method?',
    'faq.a2': 'Anyone can learn to work with channels and master the Initiology method. No special abilities or talents are required. Access to energy channels is transferred from master-teacher to student through initiation (attunement, connection), after which the student can immediately begin working with channels and receiving corresponding results. Students begin working with channels from the first days of training. Channels are transferred once and access to them is retained for life. The Initiology method allows everyone to become a professional healer and psychic for themselves, without strenuous training and innate abilities.',
    'faq.q3': 'How does Initiology differ from other energy practices?',
    'faq.a3': 'An initiologist does not expend their own energy working with problems or illnesses. All work is done by channels through which cosmic energy flows. Channel resources are limitless; they can provide as much energy as the patient needs. Energy practitioner\'s energy is finite and limited. Channels provide energy protection from the transfer of pathogenic information and negative programs from patient to initiologist during sessions. Energy practitioners have no cosmic protection and are limited to mental techniques. Because of this, bioenergy practitioners often take on patients\' illnesses and problems. Initiology has an arsenal of targeted channels purposefully working with specific diseases and types of problems. For each problem and disease - its own purposefully tuned energy channel. In the modern world, ordinary energy practitioners are gradually fading into the background. Many professional healers and psychics in Russia, CIS, and European countries have switched or are actively switching to Initiology practice.',
    'faq.q4': 'What energy sources are used in Initiology?',
    'faq.a4': 'Initiology uses a pure and universal energy source common to all forms of life and natural forces on our planet. All channels are connected to this source. This is the natural energy chain of our Solar System and the Galaxy as a whole, which does not use magical and other lower structures. It also does not consume the planet\'s resources. The work of this system is based on the concept of an energy-information model of the world, which has nothing to do with magic, supernatural forces, or religious beliefs.',
    'faq.q5': 'How does Initiology differ from Cosmoenergetics?',
    'faq.a5': 'Initiology was created as a system for human healing and well-being. The entire structure of this system, including channels and initiation blocks, serves a common goal: human health and well-being. Cosmoenergetics is a collective system, including initiations into various magical and astral structures, egregores, etc. An Initiology Master can perform a complete energy cleansing in 1–3 sessions. In cosmoenergetics, achieving such a result may require from 1 to 3 months. Over the past decade, many cosmoenergetics practitioners have switched and continue to switch to Initiology to keep up with the times and use new, more effective tools in their practice.',
    'faq.q6': 'How does Initiology differ from Reiki?',
    'faq.a6': 'Reiki energy primarily helps harmonize the subtle bodies of a person. It is not intended for targeted healing of severe physical body conditions. In Reiki practice, the healer acts as a conductor of subtle energy. They pass this energy through themselves and direct it to the patient. In Initiology, the student acts as an operator of cosmic energy flows. They direct the energy flow through channels directly to the patient, without interfering with the healing process itself. During the session, only these channels work. The student is only required to open and close the channels at the beginning and end of the session. Channels have a targeted effect on all organs and body systems, as well as on energy centers and field structures.',
    
    // Channels
    'channels.title': 'Energy Channels',
    'channels.subtitle': 'Professional level initiology channels for healing and transformation',
    
    // Services
    'services.title': 'Services & Sessions',
    'services.subtitle': 'Personal sessions with V.P. Lazarenko',
    'services.cleaning.title': 'ENERGY-INFORMATIONAL REHABILITATION',
    'services.cleaning.desc': 'Master energy cleansing at all levels including DNA, field structures, external attacks. Complete cleansing and rehabilitation cycle in 3 sessions.',
    'services.protection.title': 'RMT Protection',
    'services.protection.desc': 'Installation of durable RMT protection against negative influences',
    'services.targeted.title': 'Targeted Work',
    'services.targeted.desc': 'Purposeful work with client problems at all levels',
    'services.habits.title': 'Habit Correction',
    'services.habits.from1session': 'From 1 session',
    'services.habits.alcohol.title': 'Alcohol',
    'services.habits.alcohol.desc': 'Refusal from alcohol for 1+ years',
    'services.habits.smoking.title': 'Smoking',
    'services.habits.smoking.desc': 'Refusal from tobacco smoking for 1+ years',
    'services.habits.eating.title': 'Eating Behavior',
    'services.habits.eating.desc': 'Refusal from undesirable products',
    'services.cta': 'Book a Session',
    'services.booking.title': 'Personal Online Appointment with Vyacheslav Lazarenko',
    'services.booking.pricing': 'Pricing:',
    'services.booking.standard': 'Standard service fee - $2,000',
    'services.booking.targeted': 'Targeted work - $2,000 to $5,000',
    'services.booking.consultation': 'Initial consultation - $50',
    
    // RMT
    'rmt.title': 'RMT Technology',
    'rmt.subtitle': 'Energy-informational business structures for leadership and development',
    'rmt.plans.small.title': 'Small Business',
    'rmt.plans.medium.title': 'Medium Business',
    'rmt.plans.large.title': 'Large Business',
    'rmt.plans.warranty': 'Lifetime. 1 year warranty',
    'rmt.plans.cta': 'Get Consultation',
    'rmt.plans.small.feature1': 'Modernization for small business (up to $1M)',
    'rmt.plans.small.feature2': 'Energy rehabilitation and cleansing',
    'rmt.plans.small.feature3': 'Programming goals and development rules',
    'rmt.plans.small.feature4': 'Connection to cosmic energy source',
    'rmt.plans.small.feature5': 'Renewable protective field integration',
    'rmt.plans.small.feature6': 'Quarterly diagnostics and support (1 year)',
    'rmt.plans.medium.feature1': 'Modernization for medium business',
    'rmt.plans.medium.feature2': 'Energy rehabilitation after deformations',
    'rmt.plans.medium.feature3': 'Programming structure goals and laws',
    'rmt.plans.medium.feature4': 'Power field expansion and strengthening',
    'rmt.plans.medium.feature5': 'Protection from competitor attacks',
    'rmt.plans.medium.feature6': 'Quarterly diagnostics and support (1 year)',
    'rmt.plans.large.feature1': 'Modernization for large business ($50M+)',
    'rmt.plans.large.feature2': 'Global corporation energy rehabilitation',
    'rmt.plans.large.feature3': 'Development stages programming',
    'rmt.plans.large.feature4': 'Egregor power field strengthening',
    'rmt.plans.large.feature5': 'Protection from enemies and competitors',
    'rmt.plans.large.feature6': 'Quarterly diagnostics and support (1 year)',
    'rmt.nature.title': 'Nature of RMT',
    'rmt.nature.desc': 'RMT is the highest stage of evolution of the energy-informational essence of man. Connection of human consciousness with the energy-informational canvas of the Universe.',
    
    // Footer
    'footer.about': 'About Academy',
    'footer.about.desc': 'The International Academy of Initiology is a premier research institution advancing scientific knowledge globally.',
    'footer.quicklinks': 'Quick Links',
    'footer.research': 'Research',
    'footer.education': 'Education',
    'footer.publications': 'Publications',
    'footer.resources': 'Resources',
    'footer.books': 'Books',
    'footer.articles': 'Articles',
    'footer.platform': 'Platform Access',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookie Policy',
    'footer.data': 'Data Protection',
    'footer.terms': 'Terms of Service',
    'footer.contact': 'Contact',
    'footer.address': '35 Angell\'s Avenue',
    'footer.email': 'initiology@gmail.com',
    'footer.phone': '+7 (925) 829 82 23',
    'footer.newsletter': 'Subscribe to Newsletter',
    'footer.copyright': '© 2024 International Academy of Initiology. All rights reserved.',
    
    // Filials
    'filials.title': 'Academic branches',
    'filials.countries.germany': 'Germany',
    'filials.countries.france': 'France',
    'filials.countries.italy': 'Italy',
    'filials.countries.spain': 'Spain',
    'filials.countries.netherlands': 'Netherlands',
    'filials.countries.belgium': 'Belgium',
    'filials.countries.austria': 'Austria',
    'filials.countries.poland': 'Poland',
    'filials.countries.sweden': 'Sweden',
    'filials.countries.usa': 'USA',
    'filials.countries.canada': 'Canada',
    'filials.countries.china': 'China',
    'filials.countries.belarus': 'Belarus',
  },
  de: {
    // Header
    'nav.home': 'Startseite',
    'nav.research': 'Forschung',
    'nav.method': 'Methode',
    'nav.program': 'Programm',
    'nav.articles': 'Artikel',
    'nav.studies': 'Studien',
    'nav.conclusions': 'Wissenschaftliche Schlussfolgerungen',
    'nav.education': 'Platform',
    'nav.books': 'Bücher',
    'nav.channels': 'Kanäle',
    'nav.services': 'Dienstleistungen',
    'nav.rmt': 'RMT',
    'nav.awards': 'Auszeichnungen',
    'nav.faq': 'FAQ',
    'nav.contact': 'Kontakt',
    'nav.about': 'Über uns',
    
    // Hero
    'hero.title': 'Internationale Akademie für Initiologie',
    'hero.subtitle': 'Förderung wissenschaftlicher Erkenntnisse durch bahnbrechende Forschung und globale Zusammenarbeit',
    'hero.cta': 'Unsere Forschung entdecken',
    
    // Research
    'research.title': 'Unsere Forschung',
    'research.subtitle': 'Bahnbrechende Studien zur Erweiterung der Grenzen der Initiologie',
    'research.article1.title': 'Quanten-Initiologie-Prinzipien',
    'research.article1.desc': 'Erforschung der grundlegenden Quantenmechanismen der Initiologie-Prozesse',
    'research.article2.title': 'Globale Initiologie-Muster',
    'research.article2.desc': 'Umfassende Analyse der Initiologie-Phänomene in internationalen Populationen',
    'research.article3.title': 'Neurologische Grundlagen',
    'research.article3.desc': 'Verständnis der neurologischen Basis von Initiologie-Reaktionen',
    'research.readmore': 'Mehr lesen',
    
    // Education
    'education.title': 'Bildungsplattform',
    'education.subtitle': 'Weltklasse-Lernressourcen für Wissenschaftler und Praktiker',
    'education.feature1': 'Umfassende Kurse',
    'education.feature2': 'Expertenlehrer',
    'education.feature3': 'Internationale Zertifizierung',
    'education.cta': 'Plattform betreten',
    
    // Books
    'books.title': 'Publikationen & Bücher',
    'books.subtitle': 'Maßgebliche Texte, die das Feld der Initiologie prägen',
    
    // About
    'about.title': 'Gründer',
    'about.name': 'Vjatscheslaw Pawlowitsch Lasarenko',
    'about.fullname': 'Vjatscheslaw Pawlowitsch Lasarenko - Gründer der Initiologie',
    'about.role': 'Leiter des Forschungszentrums für Initiologie',
    'about.bio1': 'Von früher Kindheit an widmete er sein Leben der Erforschung und Entwicklung der verborgenen Fähigkeiten der menschlichen Psyche sowie der Praxis von Yoga und Meditation.',
    'about.bio2': 'Im Alter von 15 Jahren erlebte er eine transzendente (mystische) Erfahrung der Verbindung mit dem Weltbewusstsein. Dank dieser Erfahrung gründete er 1999 die Initiologie-Methode, die heute weit verbreitet ist.',
    'about.scientific': 'Wissenschaftliche Tätigkeit',
    'about.scientific1': 'Die Wirksamkeit der Initiologie-Methode wurde in Studien unabhängiger wissenschaftlicher Organisationen unter Verwendung der wissenschaftlichen Forschungserprobungsmethode bestätigt.',
    'about.scientific2': 'Derzeit werden moderne energieinformationstechnologische Technologien im Bereich der alternativen Medizin und energieinformationstechnologischen Sicherheit entwickelt und implementiert. Es werden auch Forschungen am Forschungszentrum für Initiologie und transpersonale Psychologie durchgeführt.',
    'about.scientific3': 'Es werden Statistiken und Aufzeichnungen über die Wirksamkeit der Initiologie-Methode in verschiedenen Lebensbereichen geführt sowie eine dokumentierte Evidenzbasis gebildet.',
    'about.public': 'Öffentliche und pädagogische Aktivitäten',
    'about.public1': 'Gründer des "Initiologe des Jahres"-Preises (seit 2013).',
    'about.public2': 'Mitglied der Vereinigung für holistische Psychologie und Psychotherapie bei der UNESCO.',
    'about.public3': 'V. Lasarenkos Aktivitäten wurden mit Auszeichnungen privater und öffentlicher Organisationen gewürdigt.',
    'about.public4': 'Autor von Büchern über die Initiologie-Methode und über 200 Veröffentlichungen in der Presse.',
    'about.professional': 'Berufliche Tätigkeit',
    'about.professional1': 'Führt derzeit Initiologie-Kurse und Berufsausbildung in verwandten Disziplinen auf der Bildungsplattform des Forschungszentrums für Initiologie und TPP durch.',
    'about.professional2': 'Führt individuelle Termine durch: persönliche und Online-Beratungen und Sitzungen.',
    
    // Books
    'books.book1.title': 'Praktische Initiologie',
    'books.book1.desc': 'Diese Ausgabe ist das offizielle Initiologie-Lehrbuch, empfohlen vom Forschungszentrum für Initiologie und transpersonale Psychologie zur Beherrschung des "Zertifizierungskurses für Initiologen der 1.-2. Stufe".',
    'books.book1.electronic': 'Elektronische Version',
    'books.book1.printed': 'Gedruckte Version',
    
    // Research
    'research.study1.title': 'Wissenschaftliche Forschung mit RAMS',
    'research.study1.desc': 'Im Jahr 2013 organisierte V. Lasarenko zusammen mit unabhängigen Forschungszentren eine Reihe wissenschaftlicher Studien. Die wissenschaftliche Leitung übernahm Alexej Lwowitsch Rosanow - Doktor der technischen Wissenschaften, korrespondierendes Mitglied der Akademie für Medizin- und Technikwissenschaften.',
    'research.study1.result': 'Die Ergebnisse der wissenschaftlich-technischen Erprobung bestätigten positive Dynamik und Dauer der positiven Dynamik im Laufe der Zeit (Stabilität der Ergebnisse).',
    
    // FAQ
    'faq.title': 'Häufig gestellte Fragen',
    'faq.q1': 'Was ist Initiologie in einfachen Worten?',
    'faq.a1': 'Initiologie ist eine Energiepraxis, die auf Heilung und Verbesserung der Lebensqualität abzielt. Die Initiologie-Methode basiert auf der Interaktion mit Energiekanälen, durch die kosmische Energie fließt. Diese Ströme wirken sich positiv auf alle Lebensbereiche aus. Durch die Arbeit mit Kanälen kommt es zur körperlichen Heilung, Reinigung subtiler Energiestrukturen und qualitativer Verbesserung aller Lebensbereiche. Im sozialen Bereich fördert die Kanalarbeit die Verbesserung der sozialen Stellung, des Glücks, des Karrierewachstums, des Geschäftserfolgs und der Erreichung persönlicher Ziele. Im persönlichen Bereich helfen spezialisierte Kanäle, das Familienklima zu verbessern, persönliche Beziehungen zu stärken und günstige Umgebungen und gegenseitig vorteilhafte Verbindungen zu bilden. Im Sicherheitsbereich schützen Kanäle vor Feinden und Übeltätern und bewahren vor negativen Einflüssen aus der Gesellschaft und von anderen Menschen.',
    'faq.q2': 'Kann ich die Initiologie-Methode beherrschen?',
    'faq.a2': 'Jeder kann lernen, mit Kanälen zu arbeiten und die Initiologie-Methode zu beherrschen. Es sind keine besonderen Fähigkeiten oder Talente erforderlich. Der Zugang zu Energiekanälen wird vom Meister-Lehrer durch Initiation (Einstimmung, Verbindung) an den Schüler übertragen, wonach der Schüler sofort mit der Arbeit mit Kanälen beginnen und entsprechende Ergebnisse erzielen kann. Schüler beginnen von den ersten Tagen der Ausbildung an mit der Kanalarbeit. Kanäle werden einmal übertragen und der Zugang zu ihnen bleibt lebenslang erhalten. Die Initiologie-Methode ermöglicht es jedem, ein professioneller Heiler und Hellseher für sich selbst zu werden, ohne anstrengendes Training und angeborene Fähigkeiten.',
    'faq.q3': 'Wie unterscheidet sich Initiologie von anderen Energiepraktiken?',
    'faq.a3': 'Ein Initiologe verbraucht keine eigene Energie bei der Arbeit mit Problemen oder Krankheiten. Alle Arbeit wird von Kanälen geleistet, durch die kosmische Energie fließt. Kanalressourcen sind grenzenlos; sie können so viel Energie bereitstellen, wie der Patient benötigt. Die Energie des Energiepraktikers ist endlich und begrenzt. Kanäle bieten energetischen Schutz vor der Übertragung krankhafter Informationen und negativer Programme vom Patienten auf den Initiologen während der Sitzungen. Energiepraktiker haben keinen kosmischen Schutz und sind auf mentale Techniken beschränkt. Deswegen übernehmen Bioenergiepraktiker oft die Krankheiten und Probleme der Patienten. Initiologie verfügt über ein Arsenal gezielter Kanäle, die gezielt mit bestimmten Krankheiten und Problemtypen arbeiten. Für jedes Problem und jede Krankheit - ein eigener gezielt abgestimmter Energiekanal. In der modernen Welt treten gewöhnliche Energiepraktiker allmählich in den Hintergrund. Viele professionelle Heiler und Hellseher in Russland, GUS und europäischen Ländern sind zur Initiologie-Praxis gewechselt oder wechseln aktiv dazu.',
    'faq.q4': 'Welche Energiequellen werden in der Initiologie verwendet?',
    'faq.a4': 'In der Initiologie wird eine reine und universelle Energiequelle verwendet, die allen Lebensformen und Naturkräften auf unserem Planeten gemeinsam ist. Alle Kanäle sind mit dieser Quelle verbunden. Dies ist die natürliche Energiekette unseres Sonnensystems und der Galaxie als Ganzes, die keine magischen und anderen niedrigeren Strukturen verwendet. Sie verbraucht auch nicht die Ressourcen des Planeten. Die Arbeit dieses Systems basiert auf dem Konzept eines energieinformationstechnologischen Weltmodells, das nichts mit Magie, übernatürlichen Kräften oder religiösen Überzeugungen zu tun hat.',
    'faq.q5': 'Wie unterscheidet sich Initiologie von Kosmoenergeti?',
    'faq.a5': 'Initiologie wurde als System für menschliche Heilung und Wohlbefinden geschaffen. Die gesamte Struktur dieses Systems, einschließlich Kanäle und Initiationsblöcke, dient einem gemeinsamen Ziel: der Gesundheit und dem Wohlbefinden des Menschen. Kosmoenergetic ist ein Sammelsystem, das unter anderem Einweihungen in verschiedene magische und astrale Strukturen, Egregore usw. umfasst. Ein Initiologie-Meister kann eine vollständige Energiereinigung in 1–3 Sitzungen durchführen. In der Kosmoenergetic kann es 1 bis 3 Monate dauern, um ein solches Ergebnis zu erzielen. Im letzten Jahrzehnt sind viele Kosmoenergetic-Praktiker zur Initiologie gewechselt und wechseln weiterhin dazu, um mit der Zeit Schritt zu halten und neue, effektivere Werkzeuge in ihrer Praxis zu verwenden.',
    'faq.q6': 'Wie unterscheidet sich Initiologie von Reiki?',
    'faq.a6': 'Reiki-Energie hilft in erster Linie, die feinstofflichen Körper eines Menschen zu harmonisieren. Sie ist nicht für die gezielte Heilung schwerer physischer Körperzustände vorgesehen. In der Reiki-Praxis fungiert der Heiler als Leiter feinstofflicher Energie. Er leitet diese Energie durch sich hindurch und richtet sie auf den Patienten. In der Initiologie fungiert der Schüler als Betreiber kosmischer Energieflüsse. Er lenkt den Energiefluss durch Kanäle direkt auf den Patienten, ohne sich in den Heilungsprozess selbst einzumischen. Während der Sitzung arbeiten nur diese Kanäle. Vom Schüler wird nur verlangt, die Kanäle zu Beginn und am Ende der Sitzung zu öffnen und zu schließen. Kanäle haben eine gezielte Wirkung auf alle Organe und Körpersysteme sowie auf Energiezentren und Feldstrukturen.',
    
    // Channels
    'channels.title': 'Energiekanäle',
    'channels.subtitle': 'Professionelle Initiologie-Kanäle für Heilung und Transformation',
    
    // Services
    'services.title': 'Dienstleistungen & Sitzungen',
    'services.subtitle': 'Persönliche Sitzungen mit V.P. Lasarenko',
    'services.cleaning.title': 'ENERGIE-INFORMATIONELLE REHABILITATION',
    'services.cleaning.desc': 'Meisterhafte energetische Reinigung auf allen Ebenen einschließlich DNA, Feldstrukturen, externe Angriffe. Vollständiger Reinigungs- und Rehabilitationszyklus in 3 Sitzungen.',
    'services.protection.title': 'RMT-Schutz',
    'services.protection.desc': 'Installation dauerhaften RMT-Schutzes gegen negative Einflüsse',
    'services.targeted.title': 'Gezielte Arbeit',
    'services.targeted.desc': 'Zielgerichtete Arbeit mit Kundenproblemen auf allen Ebenen',
    'services.habits.title': 'Gewohnheitskorrektur',
    'services.habits.from1session': 'Ab 1 Sitzung',
    'services.habits.alcohol.title': 'Alkohol',
    'services.habits.alcohol.desc': 'Verzicht auf Alkohol für 1+ Jahre',
    'services.habits.smoking.title': 'Rauchen',
    'services.habits.smoking.desc': 'Verzicht aufs Rauchen für 1+ Jahre',
    'services.habits.eating.title': 'Essverhalten',
    'services.habits.eating.desc': 'Verzicht auf unerwünschte Produkte',
    'services.cta': 'Sitzung buchen',
    'services.booking.title': 'Persönlicher Online-Termin mit Vjatscheslaw Lasarenko',
    'services.booking.pricing': 'Preise:',
    'services.booking.standard': 'Standard-Servicegebühr - $2.000',
    'services.booking.targeted': 'Gezielte Arbeit - $2.000 bis $5.000',
    'services.booking.consultation': 'Erstberatung - $50',
    
    // RMT
    'rmt.title': 'RMT-Technologie',
    'rmt.subtitle': 'Energieinformationsstrukturen für Führung und Entwicklung',
    'rmt.plans.small.title': 'Kleinunternehmen',
    'rmt.plans.medium.title': 'Mittelständisches Unternehmen',
    'rmt.plans.large.title': 'Großunternehmen',
    'rmt.plans.warranty': 'Lebenslang. 1 Jahr Garantie',
    'rmt.plans.cta': 'Beratung erhalten',
    'rmt.plans.small.feature1': 'Modernisierung für Kleinunternehmen (bis $1M)',
    'rmt.plans.small.feature2': 'Energie-Rehabilitation und Reinigung',
    'rmt.plans.small.feature3': 'Programmierung von Zielen und Entwicklungsregeln',
    'rmt.plans.small.feature4': 'Verbindung zur kosmischen Energiequelle',
    'rmt.plans.small.feature5': 'Integration erneuerbaren Schutzfeldes',
    'rmt.plans.small.feature6': 'Vierteljährliche Diagnose und Support (1 Jahr)',
    'rmt.plans.medium.feature1': 'Modernisierung für Mittelunternehmen',
    'rmt.plans.medium.feature2': 'Energie-Rehabilitation nach Deformationen',
    'rmt.plans.medium.feature3': 'Programmierung von Strukturzielen und -gesetzen',
    'rmt.plans.medium.feature4': 'Kraftfeldexpansion und -stärkung',
    'rmt.plans.medium.feature5': 'Schutz vor Konkurrentenangriffen',
    'rmt.plans.medium.feature6': 'Vierteljährliche Diagnose und Support (1 Jahr)',
    'rmt.plans.large.feature1': 'Modernisierung für Großunternehmen ($50M+)',
    'rmt.plans.large.feature2': 'Globale Unternehmensenergie-Rehabilitation',
    'rmt.plans.large.feature3': 'Programmierung von Entwicklungsstadien',
    'rmt.plans.large.feature4': 'Egregor-Kraftfeld-Stärkung',
    'rmt.plans.large.feature5': 'Schutz vor Feinden und Konkurrenten',
    'rmt.plans.large.feature6': 'Vierteljährliche Diagnose und Support (1 Jahr)',
    'rmt.nature.title': 'Natur von RMT',
    'rmt.nature.desc': 'RMT ist die höchste Stufe der Evolution der energieinformationstechnologischen Essenz des Menschen. Verbindung des menschlichen Bewusstseins mit dem energieinformationstechnologischen Gewebe des Universums.',
    
    // Footer
    'footer.about': 'Über die Akademie',
    'footer.about.desc': 'Die Internationale Akademie für Initiologie ist eine führende Forschungseinrichtung zur globalen Förderung wissenschaftlicher Erkenntnisse.',
    'footer.quicklinks': 'Schnelllinks',
    'footer.research': 'Forschung',
    'footer.education': 'Bildung',
    'footer.publications': 'Publikationen',
    'footer.resources': 'Ressourcen',
    'footer.books': 'Bücher',
    'footer.articles': 'Artikel',
    'footer.platform': 'Plattformzugang',
    'footer.legal': 'Rechtliches',
    'footer.privacy': 'Datenschutz',
    'footer.cookies': 'Cookie-Richtlinie',
    'footer.data': 'Datenschutz',
    'footer.terms': 'Nutzungsbedingungen',
    'footer.contact': 'Kontakt',
    'footer.address': '35 Angell\'s Avenue',
    'footer.email': 'initiology@gmail.com',
    'footer.phone': '+7 (925) 829 82 23',
    'footer.newsletter': 'Newsletter abonnieren',
    'footer.copyright': '© 2024 Internationale Akademie für Initiologie. Alle Rechte vorbehalten.',
    
    // Filials
    'filials.title': 'Akademische Filialen',
    'filials.countries.germany': 'Deutschland',
    'filials.countries.france': 'Frankreich',
    'filials.countries.italy': 'Italien',
    'filials.countries.spain': 'Spanien',
    'filials.countries.netherlands': 'Niederlande',
    'filials.countries.belgium': 'Belgien',
    'filials.countries.austria': 'Österreich',
    'filials.countries.poland': 'Polen',
    'filials.countries.sweden': 'Schweden',
    'filials.countries.usa': 'USA',
    'filials.countries.canada': 'Kanada',
    'filials.countries.china': 'China',
    'filials.countries.belarus': 'Belarus',
  },
  ru: {
    // Header
    'nav.home': 'Главная',
    'nav.research': 'Исследования',
    'nav.method': 'Метод',
    'nav.program': 'Программа',
    'nav.articles': 'Статьи',
    'nav.studies': 'Научные работы',
    'nav.conclusions': 'Научные заключения',
    'nav.education': 'Платформа',
    'nav.books': 'Книги',
    'nav.channels': 'Каналы',
    'nav.services': 'Услуги',
    'nav.rmt': 'РМТ',
    'nav.awards': 'Награды',
    'nav.faq': 'Вопросы и ответы',
    'nav.contact': 'Контакты',
    'nav.about': 'О нас',
    
    // Hero
    'hero.title': 'Международная Академия Инициологии',
    'hero.subtitle': 'Продвижение знаний о раскрытии природных способностей человека, через передовые исследования и глобальное сотрудничество',
    'hero.cta': 'Изучить исследования',
    
    // Research
    'research.title': 'Наши исследования',
    'research.subtitle': 'Передовые исследования, расширяющие границы инициологии',
    'research.article1.title': 'Квантовые принципы инициологии',
    'research.article1.desc': 'Изучение фундаментальных квантовых механизмов, лежащих в основе процессов инициологии',
    'research.article2.title': 'Глобальные паттерны инициологии',
    'research.article2.desc': 'Всесторонний анализ феноменов инициологии в международных популяциях',
    'research.article3.title': 'Неврологические основы',
    'research.article3.desc': 'Понимание неврологической основы реакций инициологии',
    'research.readmore': 'Читать далее',
    
    // Education
    'education.title': 'Образовательная платформа',
    'education.subtitle': 'Мировые образовательные ресурсы для учёных и практиков',
    'education.feature1': 'Комплексные курсы',
    'education.feature2': 'Экспертные преподаватели',
    'education.feature3': 'Международная сертификация',
    'education.cta': 'Перейти на платформу',
    
    // Books
    'books.title': 'Публикации и книги',
    'books.subtitle': 'Авторитетные труды, формирующие область инициологии',
    
    // About
    'about.title': 'Основатель',
    'about.name': 'Вячеслав Павлович Лазаренко',
    'about.fullname': 'Вячеслав Павлович Лазаренко - Основатель Инициологии',
    'about.role': 'Руководитель Научно-исследовательского центра Инициологии',
    'about.bio1': 'С раннего детства посвятил свою жизнь исследованию и развитию скрытых возможностей человеческой психики, практике йоги и медитации.',
    'about.bio2': 'В 15-летнем возрасте пережил трансцендентный (мистический) опыт соединения с мировым сознанием. Благодаря этому опыту в 1999 году основал метод Инициологии, получивший широкое распространение в наши дни.',
    'about.scientific': 'Научная деятельность',
    'about.scientific1': 'Эффективность метода Инициологии была подтверждена в ходе исследований, проведенных независимыми научными организациями, с использованием метода научно-исследовательской апробации.',
    'about.scientific2': 'В настоящее время ведется разработка и внедрение современных энергоинформационных технологий в области нетрадиционной медицины и энергоинформационной безопасности. Также проводятся собственные исследования на базе научно-исследовательского центра Инициологии и трансперсональной психологии.',
    'about.scientific3': 'Ведется статистика и учет эффективности метода Инициологии в различных сферах жизнедеятельности, а также формирование документально подтвержденной доказательной базы.',
    'about.public': 'Общественная и просветительская деятельность',
    'about.public1': 'Учредитель Премии "Инициолог года" (с 2013 г.).',
    'about.public2': 'Член Ассоциации холистической психологии и психотерапии при ЮНЕСКО.',
    'about.public3': 'Деятельность В. Лазаренко отмечена наградами частных и общественных организаций.',
    'about.public4': 'Автор книг о методе Инициологии и свыше 200 публикаций в прессе.',
    'about.professional': 'Профессиональная деятельность',
    'about.professional1': 'В настоящее проводит курсы по Инициологии и профессиональную подготовку по смежным дисциплинам, на базе образовательной платформы НИЦ Инициологии и ТПП.',
    'about.professional2': 'Проводит индивидуальный прием: личные и онлайн консультации и сеансы.',
    
    // Books
    'books.book1.title': 'Практическая Инициология',
    'books.book1.desc': 'Настоящее издание является официальным учебником инициологии, рекомендованным НИЦ Инициологии и трансперсональной психологии для освоения «сертификационного курса инициолога 1—2 ступеней».',
    'books.book1.electronic': 'Электронная версия',
    'books.book1.printed': 'Печатная версия',
    
    // Research
    'research.study1.title': 'Научные исследования совместно с РАНМ',
    'research.study1.desc': 'В 2013 году В. Лазаренко совместно с независимыми научно-исследовательскими центрами организовал ряд научных исследований. Научное руководство осуществлял Розанов Алексей Львович - доктор технических наук, член-корреспондент Академии медико-технических наук.',
    'research.study1.result': 'Результаты научно-технической апробации подтвердили положительную динамику и продолжительность положительной динамики во времени (стабильность результатов).',
    
    // FAQ
    'faq.title': 'Часто задаваемые вопросы',
    'faq.q1': 'Что такое Инициология простыми словами?',
    'faq.a1': 'Инициология — это энергетическая практика, направленная на оздоровление и повышение качества жизни. Метод Инициологии базируется на взаимодействии с энергетическими каналами, по которым поступают потоки космической энергии. Эти потоки благоприятно влияют на все сферы жизнедеятельности человека. Благодаря работе с каналами происходит физическое исцеление, очищение тонких энергетических структур, качественное улучшение всех сфер жизни. В социальной сфере практика работы с каналами способствует улучшению общественного положения, удачи, карьерного роста, бизнес-успехов и реализации личных целей. В личной сфере специализированные каналы помогают улучшить климат в семье, укрепить личные взаимоотношения, формировать благоприятное окружение и взаимовыгодные связи. В сфере безопасности, каналы оберегают от врагов и недоброжелателей, защищают от негативных воздействий со стороны социума и других людей.',
    'faq.q2': 'Смогу ли я освоить метод Инициологии?',
    'faq.a2': 'Каждый желающий может обучиться работе с каналами и освоить метод Инициологии. Для этого не требуется обладать особыми способностями или задатками. Доступ к энергетическим каналам передается от мастера-учителя к ученику через инициацию (сонастройку, подключение), после чего ученик сразу может приступить к работе с каналами и получать соответствующие результаты. Ученик приступает к работе с каналами с первых дней обучения. Каналы передаются один раз и доступ к ним сохраняется на всю жизнь. Метод Инициологии позволяет каждому человеку стать профессиональным целителем и экстрасенсом для себя, без упорных тренировок и врожденных способностей.',
    'faq.q3': 'Чем Инициология отличается от других энергопрактик?',
    'faq.a3': 'Инициолог не затрачивает своей энергии на работу с проблемой или заболеванием. Всю работу выполняют каналы, по которым поступает энергия космоса. Ресурс каналов безграничен, они могут дать столько энергии, сколько нужно пациенту. Энергетика энергопрактика конечна и ограничена. Каналы обеспечивают энергетическую защиту от переноса болезнетворной информации и негативных программ с пациента на Инициолога, во время сеанса. Энергопрактик не имеет космической защиты и ограничивается мысленными техниками. Из-за чего, биоэнергеты часто берут болезни и проблемы пациентов на себя. Инициология обладает арсеналом целевых каналов, целенаправленно работающих с определенными заболеваниями и типами проблем. На каждую проблему и заболевание - свой целенаправленно настроенный энергетический канал. В современном мире обычные энергопрактики постепенно отходят на второй план. Многие профессиональные целители и экстрасенсы в России, СНГ и странах Европы перешли, либо активно переходят на практику Инициологии.',
    'faq.q4': 'Какие источники энергии используются в Инициологии?',
    'faq.a4': 'В Инициологии используется чистый и универсальный источник энергии, общий для всех форм жизни и природных сил на нашей планете. Все каналы подключены к этому источнику. Это естественная энергетическая цепь нашей Солнечной системы и Галактики в целом, которая не использует магические и прочие нижестоящие структуры. Она также не потребляет ресурсы планеты. Работа этой системы основана на концепции энергоинформационной модели мира, которая не имеет отношения к магии, сверхъестественным силам или религиозным верованиям.',
    'faq.q5': 'Чем Инициология отличается от Космоэнергетики?',
    'faq.a5': 'Инициология создавалась как система для исцеления и благополучия человека. Вся структура этой системы, включая каналы и блоки посвящения, служит общей цели: здоровью и благополучию человека. Космоэнергетика — это собирательная система, включающая в том числе посвящения в разные магические и астральные структуры, эгрегоры и тп. Мастер Инициологии может провести полную энергетическую чистку за 1–3 сеанса. В космоэнергетике для достижения такого результата может потребоваться от 1 до 3 месяцев. За последнее десятилетие многие космоэнергеты перешли и продолжают переходить в Инициологию, чтобы идти в ногу со временем и использовать новые, более эффективные инструменты в своей практике.',
    'faq.q6': 'Чем Инициология отличается от Рэйки?',
    'faq.a6': 'Энергия Рэйки в первую очередь помогает гармонизировать тонкие тела человека. Она не предназначена для целенаправленного исцеления тяжёлых состояний физического тела. В практике Рэйки целитель выступает в роли проводника тонкой энергии. Он пропускает эту энергию через себя и направляет её на пациента. В Инициологии ученик действует как оператор энергетических потоков космоса. Он направляет поток энергии через каналы прямо на пациента, не вмешиваясь в сам процесс исцеления. Во время сеанса работают только эти каналы. От ученика требуется только открыть и закрыть каналы в начале и конце сеанса. Каналы оказывают целенаправленное воздействие на все органы и системы организма, а также на энергетические центры и полевые структуры.',
    
    // Channels
    'channels.title': 'Энергетические каналы',
    'channels.subtitle': 'Профессиональные каналы инициологии для исцеления и трансформации',
    
    // Services
    'services.title': 'Услуги и сеансы',
    'services.subtitle': 'Личный прием В. П. Лазаренко',
    'services.cleaning.title': 'ЭНЕРГОИНФОРМАЦИОННАЯ РЕАБИЛИТАЦИЯ',
    'services.cleaning.desc': 'Мастерская энергетическая чистка на всех уровнях включая ДНК, полевые структуры, внешние атаки. Полный цикл очищения и реабилитации за 3 сеанса.',
    'services.protection.title': 'РМТ-Защита',
    'services.protection.desc': 'Установка долговечной и устойчивой РМТ-защиты от негативных воздействий',
    'services.targeted.title': 'Целевая работа',
    'services.targeted.desc': 'Целенаправленная работа с проблемами клиента на всех уровнях',
    'services.habits.title': 'Коррекция вредных привычек',
    'services.habits.from1session': 'От 1 сеанса',
    'services.habits.alcohol.title': 'Алкоголь',
    'services.habits.alcohol.desc': 'Отказ от алкоголя на 1 и более лет',
    'services.habits.smoking.title': 'Курение',
    'services.habits.smoking.desc': 'Отказ от табакокурения на 1 и более лет',
    'services.habits.eating.title': 'Пищевое поведение',
    'services.habits.eating.desc': 'Отказ от нежелательных продуктов на установленный срок',
    'services.cta': 'Записаться на сеанс',
    'services.booking.title': 'Запись на личный онлайн прием к Вячеславу Лазаренко',
    'services.booking.pricing': 'Стоимость услуг:',
    'services.booking.standard': 'Стандартизированная стоимость услуги - $2,000',
    'services.booking.targeted': 'Targeted work от $2,000 до $5,000',
    'services.booking.consultation': 'Первичная консультация - $50',
    
    // RMT
    'rmt.title': 'РМТ Технология',
    'rmt.subtitle': 'Модернизация и создание управляющих энергоинформационных бизнес-структур для лидерства и развития',
    'rmt.plans.small.title': 'Малый бизнес',
    'rmt.plans.medium.title': 'Средний бизнес',
    'rmt.plans.large.title': 'Крупный бизнес',
    'rmt.plans.warranty': 'Бессрочно. Гарантия 1 год (поддержка)',
    'rmt.plans.cta': 'Получить консультацию',
    'rmt.plans.small.feature1': 'Программа модернизации для малого бизнеса (до $1M)',
    'rmt.plans.small.feature2': 'Энергоинформационная реабилитация: чистка и восстановление',
    'rmt.plans.small.feature3': 'Программирование целей и законов развития',
    'rmt.plans.small.feature4': 'Подключение к постоянному источнику космической энергии',
    'rmt.plans.small.feature5': 'Подключение возобновляемого защитного поля',
    'rmt.plans.small.feature6': 'Ежеквартальная диагностика и поддержка (1 год)',
    'rmt.plans.medium.feature1': 'Программа модернизации для среднего бизнеса',
    'rmt.plans.medium.feature2': 'Энергоинформационная реабилитация после деформаций',
    'rmt.plans.medium.feature3': 'Программирование целей и законов бизнес-структуры',
    'rmt.plans.medium.feature4': 'Расширение и усиление силового поля эгрегора',
    'rmt.plans.medium.feature5': 'Защита от атак врагов и конкурентов',
    'rmt.plans.medium.feature6': 'Ежеквартальная диагностика и поддержка (1 год)',
    'rmt.plans.large.feature1': 'Модернизация для крупного бизнеса ($50M+). Глобальные корпорации',
    'rmt.plans.large.feature2': 'Энергоинформационная реабилитация бизнес-структуры',
    'rmt.plans.large.feature3': 'Программирование этапов развития бизнес-структуры',
    'rmt.plans.large.feature4': 'Усиление силового поля эгрегора бизнеса',
    'rmt.plans.large.feature5': 'Интеграция защитного поля от врагов и конкурентов',
    'rmt.plans.large.feature6': 'Ежеквартальная диагностика и поддержка (1 год)',
    'rmt.nature.title': 'Природа РМТ',
    'rmt.nature.desc': 'РМТ — это высшая ступень эволюции энергоинформационной сущности человека. Верхний предел реализации человека в энергоинформационном плане в рамках земного существования. Настройка обратных энергоинформационных связей, соединяющих сознание человека с энергоинформационным полотном Вселенной.',
    
    // Footer
    'footer.about': 'Об Академии',
    'footer.about.desc': 'Международная Академия Инициологии - ведущий исследовательский институт, продвигающий научные знания по всему миру.',
    'footer.quicklinks': 'Быстрые ссылки',
    'footer.research': 'Исследования',
    'footer.education': 'Образование',
    'footer.publications': 'Публикации',
    'footer.resources': 'Ресурсы',
    'footer.books': 'Книги',
    'footer.articles': 'Статьи',
    'footer.platform': 'Доступ к платформе',
    'footer.legal': 'Правовая информация',
    'footer.privacy': 'Политика конфиденциальности',
    'footer.cookies': 'Политика cookie',
    'footer.data': 'Защита данных',
    'footer.terms': 'Условия использования',
    'footer.contact': 'Контакты',
    'footer.address': '35 Angell\'s Avenue',
    'footer.email': 'initiology@gmail.com',
    'footer.phone': '+7 (925) 829 82 23',
    'footer.newsletter': 'Подписаться на рассылку',
    'footer.copyright': '© 2024 Международная Академия Инициологии. Все права защищены.',
    
    // Filials
    'filials.title': 'Академические филиалы',
    'filials.countries.germany': 'Германия',
    'filials.countries.france': 'Франция',
    'filials.countries.italy': 'Италия',
    'filials.countries.spain': 'Испания',
    'filials.countries.netherlands': 'Нидерланды',
    'filials.countries.belgium': 'Бельгия',
    'filials.countries.austria': 'Австрия',
    'filials.countries.poland': 'Польша',
    'filials.countries.sweden': 'Швеция',
    'filials.countries.usa': 'США',
    'filials.countries.canada': 'Канада',
    'filials.countries.china': 'Китай',
    'filials.countries.belarus': 'Беларусь',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
