import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Smile, ArrowRight, Menu, Calendar, Star, CheckCircle2, 
  Zap, HeartHandshake, Plus, Sparkles, Activity, Baby, 
  SmilePlus, Moon, ArrowLeft, ChevronDown, Clock, MapPin, 
  Phone, Mail, Facebook, Instagram, Twitter, Send, X,
  Bot, Loader2, CalendarClock
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  isHead?: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
}

// --- Data ---
const SERVICES: Service[] = [
  {
    id: '01',
    title: 'Industrial Packaging',
    description: 'Heavy-duty, high-grade materials designed for the safe transport of large-scale industrial goods.',
    image: '/images/Packaging.jpg',
    icon: <Plus className="w-6 h-6" />
  },
  {
    id: '02',
    title: 'Smart Tracking (Traxx Smart)',
    description: 'Integrated IoT solutions and our custom dashboard to monitor your cargo\'s location and condition in real-time.',
    image: '/images/Screenshot 2025-12-31 171536.jpg',
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    id: '03',
    title: 'Eco-Friendly Solutions',
    description: 'Sustainable, biodegradable, and recyclable packaging options to reduce your carbon footprint.',
    image: '/images/Eco-Friendly.jpg',
    icon: <Activity className="w-6 h-6" />
  },
  {
    id: '04',
    title: 'Custom Branding & Design',
    description: 'Premium structural design and printing services to make your brand stand out on the shelf.',
    image: '/images/Custom-Branding.jpg',
    icon: <Baby className="w-6 h-6" />
  },
  {
    id: '05',
    title: 'E-commerce Logistics',
    description: 'Lightweight, durable, and cost-effective packaging optimized for fast-paced online retail fulfillment.',
    image: '/images/E-commerce.jpg',
    icon: <SmilePlus className="w-6 h-6" />
  },
  {
    id: '06',
    title: 'Protective Engineering',
    description: 'Advanced foam, vacuum sealing, and shock-absorption technology for fragile and high-value items.',
    image: '/images/E-commerce1.jpg',
    icon: <Moon className="w-6 h-6" />
  }
];

const TEAM: TeamMember[] = [
  { name: 'Sanda', role: 'Chief Executive Officer', image: '/images/sanda.jpeg' },
  { name: 'Rachel', role: 'Head of Operations', image: '/images/james.jpg' },
  { name: 'Willie', role: 'Lead Product Designer', image: '/images/sir.jpg', isHead: true },
  { name: 'Daniel', role: 'Supply Chain Strategist', image: '/images/maria.jpg' },
  { name: 'Kay', role: 'Sustainability Engineer', image: '/images/kayla.jpg' }
];

const FAQS: FAQItem[] = [
  { question: 'Do you offer custom dimensions?', answer: 'Yes, we specialize in bespoke packaging tailored to your specific product dimensions.' },
  { question: 'What is the Traxx Smart Dashboard?', answer: 'It is our proprietary software that allows you to track your shipments\' temperature, location, and handling in real-time.' },
  { question: 'Do you support small businesses?', answer: 'Absolutely. We offer scalable solutions ranging from small startup batches to massive industrial runs.' },
  { question: 'Are your materials recyclable?', answer: 'We offer a dedicated line of 100% recyclable and compostable packaging materials.' },
  { question: 'Can I get a quote online?', answer: 'Yes! You can use our online form below to request a consultation at a time that works best for you.' }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full p-4 md:p-6 transition-all duration-300">
      <nav className={`mx-auto max-w-7xl rounded-full border shadow-lg px-6 py-3 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'bg-white/95 border-emerald-100 shadow-emerald-500/5 py-2' : 'bg-white/80 border-white/20 shadow-slate-200/50 backdrop-blur-xl'}`}>
        <a href="#" className="flex items-center gap-2 group">
          <img src="/images/Xpac1.png" alt="XPAC Technology Logo" className="w-10 h-10 rounded-lg" />
          <span className="text-xl font-semibold tracking-tight text-slate-900">XPAC Technology</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {['Home', 'About Us', 'Team', 'Services', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={item === 'Home' ? '#' : `#${item.toLowerCase().replace(' ', '')}`} 
              className="text-sm font-medium transition-colors text-slate-600 hover:text-emerald-600"
            >
              {item}
            </a>
          ))}
        </div>

        <a href="#book" className="hidden md:inline-flex items-center gap-2 bg-emerald-500 text-sm font-medium px-5 py-2.5 rounded-full transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:bg-emerald-600 text-white">
          Get a Quote
          <ArrowRight className="w-4 h-4" />
        </a>

        <button className="md:hidden text-slate-900">
          <Menu className="w-6 h-6" />
        </button>
      </nav>
    </header>
  );
};

const Hero = () => (
  <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl lg:text-7xl font-semibold tracking-tighter leading-[1.1] text-slate-900">
            XPAC Technology <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-teal-500 from-emerald-600">We Are Packaging Company</span> intelligence.
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-lg leading-relaxed">
            We Are Packaging Powered by Intelligence
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#book" className="inline-flex justify-center items-center gap-2 bg-emerald-500 text-base font-medium px-8 py-3.5 rounded-full transition-all shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-1 hover:bg-emerald-600 text-white">
              Get a Quote
              <Calendar className="w-4 h-4" />
            </a>
            <a href="#services" className="inline-flex justify-center items-center gap-2 border text-base font-medium px-8 py-3.5 rounded-full transition-all bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-200 hover:text-emerald-600">
              Learn More
              <ArrowRight className="w-4 h-4 rotate-45" />
            </a>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} alt="" className="w-10 h-10 rounded-full border-2 object-cover border-white shadow-sm" />
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm font-medium mt-1 text-slate-600">Trusted by <span class="font-semibold text-slate-900">200+ Global Brands</span></p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl group shadow-emerald-900/10">
            <img src="/images/Traxx.jpeg" alt="Dental Treatment" className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent from-emerald-950/60"></div>
            <div className="absolute top-8 left-8 flex flex-col gap-3">
              <span className="inline-flex items-center gap-1.5 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg bg-white/90 text-emerald-800 animate-float">
                <CheckCircle2 className="w-3.5 h-3.5" /> High Durability
              </span>
              <span className="inline-flex items-center gap-1.5 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg bg-white/90 text-emerald-800 animate-float" style={{ animationDelay: '0.5s' }}>
                <Zap className="w-3.5 h-3.5" /> Smart Logistics
              </span>
            </div>
            <div className="absolute bottom-8 left-8 right-8 backdrop-blur-xl p-6 rounded-2xl shadow-xl flex items-center justify-between bg-white/95">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-1 text-emerald-600">Our Promise</p>
                <p className="font-medium text-slate-900">Your Product's Safety, Our Priority.</p>
              </div>
              <div className="p-3 rounded-full bg-emerald-100 text-emerald-600">
                <HeartHandshake className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="absolute -z-10 top-1/2 right-0 translate-x-1/3 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl bg-emerald-400/20"></div>
        </div>
      </div>
    </div>
  </section>
);

const Stats = () => (
  <section className="py-16 lg:py-24 rounded-t-[3rem] lg:rounded-t-[4rem] bg-emerald-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-emerald-500 rounded-3xl p-8 shadow-xl shadow-emerald-500/10 transform md:-translate-y-8 text-white">
          <h3 className="text-4xl font-semibold tracking-tight mb-2">#1</h3>
          <p className="text-xl font-medium mb-4">#1 Choice for Smart Packaging</p>
          <p className="text-sm leading-relaxed text-emerald-100">We are dedicated to optimizing your supply chain and protecting your goods with the most advanced packaging tech in the region.</p>
        </div>
        {[
          { val: '25K+', label: 'Smart Shipments', sub: 'Delivering precision-tracked goods across the globe every day.' },
          { val: '15K+', label: 'Custom Solutions', sub: 'Tailor-made packaging designs for unique industrial needs.' },
          { val: '20Y+', label: 'Years Experience', sub: 'Decades of expertise in manufacturing and logistics innovation.' }
        ].map((stat, i) => (
          <div key={i} className="p-6 md:p-8">
            <h3 className="text-4xl md:text-5xl font-semibold tracking-tight mb-2 text-white">{stat.val}</h3>
            <p className="font-medium mb-2 text-emerald-400">{stat.label}</p>
            <p className="text-sm text-emerald-100/60">{stat.sub}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Services = () => (
  <section id="services" class="py-24 lg:py-32 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-slate-900">
          Our Comprehensive <span className="text-emerald-600">Services</span>
        </h2>
        <p className="text-lg text-slate-500 font-medium">
          We offer a full range of modern packaging solutions tailored to meet the demands of global trade.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((s) => (
          <div key={s.id} className="group p-2 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border relative overflow-hidden bg-white hover:shadow-emerald-900/5 border-slate-100">
            <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-100">
              <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-sm text-slate-900">{s.id}</div>
            </div>
            <div className="p-6 relative">
              <div className="absolute -top-10 right-6 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors bg-white text-emerald-600">
                {s.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3 tracking-tight text-slate-900 mt-2">{s.title}</h3>
              <p className="leading-relaxed text-base text-slate-500">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Team = () => (
  <section className="bg-white pt-24 pb-24 relative" id="team">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider bg-slate-100 text-slate-600">The Team</span>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-slate-900">
            Our Professional <span className="text-emerald-500">Team</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-xl">
            Our experts are dedicated to delivering high-quality engineering and design in the world of smart logistics.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 transition-all border-slate-200 text-slate-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 transition-all border-slate-200 text-slate-400 hover:text-white">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {TEAM.map((doc, i) => (
          <div key={i} className={`group relative rounded-3xl overflow-hidden transition-all cursor-pointer ${doc.isHead ? 'lg:col-span-1 lg:-mt-12 bg-emerald-500 shadow-xl shadow-emerald-500/20' : 'bg-emerald-50/50 hover:bg-emerald-100/50'}`}>
            <div className="aspect-[4/5] w-full relative">
              <img src={doc.image} alt={doc.name} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${doc.isHead ? 'mix-blend-overlay opacity-90' : ''}`} />
              {doc.isHead && <div className="absolute inset-0 bg-gradient-to-t to-transparent from-emerald-900/80"></div>}
              <div className="absolute top-4 right-4 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white">
                <ArrowRight className="w-4 h-4 text-emerald-600 rotate-[-45deg]" />
              </div>
            </div>
            <div className={`p-4 text-center ${doc.isHead ? 'absolute bottom-0 left-0 right-0 text-white p-6' : ''}`}>
              {doc.isHead && <span className="inline-block px-2 py-0.5 rounded-md backdrop-blur-md text-[10px] font-bold uppercase tracking-widest mb-2 bg-white/20">CEO</span>}
              <h4 className={`text-lg font-semibold ${doc.isHead ? 'text-white text-xl' : 'text-slate-900'}`}>{doc.name}</h4>
              <p className={`text-sm font-medium ${doc.isHead ? 'text-emerald-100' : 'text-emerald-600'}`}>{doc.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Appointment = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="book" className="py-24 rounded-t-[3rem] lg:rounded-t-[4rem] overflow-hidden relative bg-emerald-950 text-white">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative hidden lg:block">
            <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-emerald-500/20 rounded-full blur-3xl"></div>
            <img src="/images/Traxx smart.jpg" alt="Medical Staff" className="rounded-[2.5rem] shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 object-cover h-[500px] w-full border-4 border-emerald-900/50" />
            <div className="absolute -bottom-8 -left-8 p-6 rounded-2xl shadow-xl max-w-xs bg-white text-slate-900 animate-float">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="font-bold text-lg">Fast Booking</span>
              </div>
              <p className="text-sm text-slate-500 font-medium">Get a shipping quote confirmed in less than 2 minutes.</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
              Let's Start Your Logistics Journey With Us.
            </h2>
            <p className="font-medium mb-10 text-lg text-emerald-200/80">
              Requesting a consultation is simple. Fill out the form below and our specialists will contact you shortly.
            </p>

            {success ? (
              <div className="bg-emerald-500/20 border border-emerald-500 rounded-2xl p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold">Consultation Requested!</h3>
                <p className="text-emerald-100">Our team will contact you shortly to confirm your preferred time.</p>
                <button onClick={() => setSuccess(false)} className="text-sm underline hover:text-white transition-colors">Request another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" required placeholder="Full Name" className="w-full border rounded-xl px-5 py-4 placeholder-emerald-400/60 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all bg-emerald-900/50 border-emerald-800 text-white" />
                  <input type="tel" required placeholder="Phone Number" className="w-full border rounded-xl px-5 py-4 placeholder-emerald-400/60 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all bg-emerald-900/50 border-emerald-800 text-white" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <select required className="w-full border rounded-xl px-5 py-4 placeholder-emerald-400/60 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none cursor-pointer bg-emerald-900/50 border-emerald-800 text-white">
                      <option value="">Select Service</option>
                      {SERVICES.map(s => <option key={s.id} value={s.title} className="text-slate-900">{s.title}</option>)}
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-emerald-400" />
                  </div>
                  <div className="relative">
                    <select required className="w-full border rounded-xl px-5 py-4 placeholder-emerald-400/60 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none cursor-pointer bg-emerald-900/50 border-emerald-800 text-white">
                      <option value="">Any Specialist</option>
                      {TEAM.map(t => <option key={t.name} value={t.name} className="text-slate-900">{t.name}</option>)}
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-emerald-400" />
                  </div>
                </div>
                <div className="relative">
                  <input type="datetime-local" required className="w-full border rounded-xl px-5 py-4 placeholder-emerald-400/60 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all [color-scheme:dark] bg-emerald-900/50 border-emerald-800 text-white" />
                  <CalendarClock className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-emerald-400" />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-emerald-500 font-semibold text-lg py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 flex items-center justify-center gap-2 mt-4 hover:bg-emerald-400 text-white disabled:opacity-50">
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Request Consultation <ArrowRight className="w-5 h-5" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => (
  <section className="py-24 bg-slate-50">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-slate-900">
          Frequently Asked <span className="text-emerald-500">Questions</span>
        </h2>
        <p className="text-lg text-slate-500 font-medium">
          If you have any questions, you can check our frequently asked questions.
        </p>
      </div>
      <div className="space-y-4">
        {FAQS.map((faq, i) => (
          <details key={i} className="group rounded-2xl shadow-sm [&_summary::-webkit-details-marker]:hidden open:ring-1 open:ring-emerald-500/20 bg-white transition-all">
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-slate-900">
              <h2 className="text-lg font-semibold">{faq.question}</h2>
              <div className="rounded-full p-1.5 text-emerald-500 transition duration-300 group-open:-rotate-180 bg-emerald-50">
                <ChevronDown className="w-5 h-5" />
              </div>
            </summary>
            <p className="px-6 pb-6 text-slate-500 leading-relaxed font-medium">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="pt-20 pb-10 border-t bg-slate-50 border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <a href="#" className="flex items-center gap-2">
            <img src="/images/Xpac1.png" alt="XPAC Technology Logo" className="w-10 h-10 rounded-lg" />
            <span className="text-xl font-semibold tracking-tight text-slate-900">XPAC Technology</span>
          </a>
          <p className="text-slate-500 font-medium leading-relaxed">
            Your destination for secure, smart, and confident logistics. We are committed to providing exceptional packaging in a modern industrial environment.
          </p>
          <div className="flex gap-4">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 transition-all bg-white border-slate-200 text-emerald-600 hover:text-white">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-slate-900">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-slate-500 font-medium">
              <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>186 Logistics Way, Los Angeles, CA 90024</span>
            </li>
            <li className="flex items-center gap-3 text-slate-500 font-medium">
              <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>(310) 555-0187</span>
            </li>
            <li className="flex items-center gap-3 text-slate-500 font-medium">
              <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>sanda@xpactech.com</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-slate-900">Open Hours</h4>
          <ul className="space-y-3 text-slate-500 font-medium">
            {[
              { days: 'Mon - Tue', time: '9:00 AM - 5:00 PM' },
              { days: 'Wed - Thu', time: '9:00 AM - 5:00 PM' },
              { days: 'Friday', time: '9:00 AM - 3:00 PM' }
            ].map((h, i) => (
              <li key={i} className="flex justify-between">
                <span>{h.days}</span>
                <span className="text-slate-900">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-slate-900">Services</h4>
          <ul className="space-y-3 text-slate-500 font-medium">
            <li><a href="#" className="hover:text-emerald-500 transition-colors">Industrial Packaging</a></li>
            <li><a href="#" className="hover:text-emerald-500 transition-colors">Traxx Smart Tracking</a></li>
            <li><a href="#" className="hover:text-emerald-500 transition-colors">Custom Brand Design</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-slate-200">
        <p className="text-slate-500 font-medium text-sm">© 2026 XPAC Technology. All Rights Reserved.</p>
        <div className="flex gap-8 text-sm font-medium text-slate-500">
          <a href="#" className="hover:text-emerald-600">Privacy Policy</a>
          <a href="#" className="hover:text-emerald-600">Terms & Conditions</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- AI Assistant Component ---

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Hi! I am Sanda How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are a helpful and professional AI assistant for "XPAC Technology". 
          Company Details:
          - Services: Industrial Packaging, Smart Tracking (Traxx Smart), Eco-Friendly Solutions, Custom Branding & Design, E-commerce Logistics, Protective Engineering.
          - CEO: Sanda.
          - Team: James Carter (Head of Operations), Sofia Rodriguez (Lead Product Designer), Maria Lopez (Supply Chain Strategist), Olivia Carter (Sustainability Engineer).
          - Hours: Mon-Thu 9-5, Fri 9-3.
          - Location: 186 Logistics Way, LA.
          Answer briefly and professionally. Encourage users to request a consultation.`,
        },
      });

      setMessages(prev => [...prev, { role: 'ai', text: response.text || 'Sorry, I missed that. Can you repeat?' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'I am having trouble connecting right now. Please call us at (310) 555-0187.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-emerald-500 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">Logistics Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
          </div>
          
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 no-scrollbar bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm font-medium ${m.role === 'user' ? 'bg-emerald-500 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none shadow-sm'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t bg-white flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button 
              onClick={handleSend}
              disabled={isTyping}
              className="bg-emerald-500 text-white p-2 rounded-full hover:bg-emerald-600 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-emerald-600 hover:scale-110 transition-all duration-300"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>
    </div>
  );
};

// --- Main App ---

const App = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Team />
      <FAQ />
      <Appointment />
      <Footer />
      <AIAssistant />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);