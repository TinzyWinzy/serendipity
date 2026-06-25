import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sun, Wifi, ShowerHead, Monitor, ChefHat, Shield, Bath,
  Phone, Mail, MapPin, Clock, Moon, Users,
  Download, WifiOff, X, Building2, PhoneCall,
  ChevronRight, ChevronLeft, ChevronDown, Sparkles, Star, Check,
} from 'lucide-react';
import { SUITES, AMENITY_LABELS, LOCATION_HUBS } from './data';
import type { Suite, FilterMode, StayType, ValidationErrors, AmenityKey, SuiteImage } from './types';

const WHATSAPP_NUMBER = '263716965827';
const CALL_NUMBER = '+263783312551';
const CALL_DISPLAY = '078 331 2551';
const WHATSAPP_DISPLAY = '071 696 5827';
const SUPPORT_EMAIL = 'serendipitysuiteszim@gmail.com';
const ADDRESS = 'Seventh Street, Harare, Zimbabwe, 0000';

const AMENITY_ICONS: Record<AmenityKey, React.ReactNode> = {
  solar: <Sun className="h-3.5 w-3.5" />,
  wifi: <Wifi className="h-3.5 w-3.5" />,
  hot_water: <ShowerHead className="h-3.5 w-3.5" />,
  tv: <Monitor className="h-3.5 w-3.5" />,
  kitchen: <ChefHat className="h-3.5 w-3.5" />,
  parking: <Shield className="h-3.5 w-3.5" />,
  hot_tub: <Bath className="h-3.5 w-3.5" />,
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/* ───── Animations ───── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0, 1] as const } },
};

/* ───── Shimmer loader ───── */
function Shimmer({ className }: { className: string }) {
  return (
    <div className={`animate-pulse bg-gradient-to-r from-brand-teal/5 via-brand-teal/10 to-brand-teal/5 bg-[length:200%_100%] ${className}`}
      style={{ animation: 'shimmer 1.5s ease-in-out infinite' }}
    />
  );
}

/* ───── SuiteCarousel ───── */
function SuiteCarousel({ images, onImageClick }: { images: SuiteImage[]; onImageClick?: (index: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

  const scrollTo = useCallback((i: number) => {
    ref.current?.children[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    setIdx(i);
  }, []);

  const handleScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== idx) setIdx(i);
  }, [idx]);

  return (
    <div className="relative overflow-hidden">
      <div
        ref={ref}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {images.map((img, i) => (
          <div key={i} className="relative w-full shrink-0 snap-start cursor-pointer" onClick={() => onImageClick?.(i)}>
            {!loaded[i] && (
              <Shimmer className="h-64 w-full sm:h-72" />
            )}
            <img
              src={img.src}
              alt={`Suite photo ${i + 1}`}
              className={`h-64 w-full object-cover transition-opacity duration-500 sm:h-72 ${loaded[i] ? 'opacity-100' : 'absolute inset-0 opacity-0'}`}
              style={{ aspectRatio: img.orientation === 'landscape' ? '16/10' : '4/5' }}
              loading={i === 0 ? 'eager' : 'lazy'}
              onLoad={() => setLoaded((p) => ({ ...p, [i]: true }))}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className="flex items-center justify-center p-1"
                aria-label={`Photo ${i + 1}`}
              >
                <span className={`block rounded-full transition-all duration-300 ${
                  i === idx ? 'h-2 w-6 bg-brand-gold' : 'h-2 w-2 bg-white/60 hover:bg-white/80'
                }`} />
              </button>
            ))}
          </div>

          {idx > 0 && (
            <button
              onClick={() => scrollTo(idx - 1)}
              className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-brand-teal/70 text-brand-gold backdrop-blur-sm transition-all hover:bg-brand-teal"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {idx < images.length - 1 && (
            <button
              onClick={() => scrollTo(idx + 1)}
              className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-brand-teal/70 text-brand-gold backdrop-blur-sm transition-all hover:bg-brand-teal"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          <span className="absolute right-3 top-3 z-10 bg-brand-teal/80 px-2.5 py-1 font-mono text-[11px] text-brand-cream backdrop-blur-sm">
            {idx + 1}/{images.length}
          </span>
        </>
      )}
    </div>
  );
}

/* ───── Header ───── */
function Header({
  isInstallable,
  onInstall,
}: {
  isInstallable: boolean;
  onInstall: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-teal/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8 lg:px-12">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center border border-brand-gold/40 bg-brand-teal text-base font-bold text-brand-gold">
            S
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-lg font-bold tracking-tight text-brand-cream">
              Serendipity
            </span>
            <span className="ml-1.5 font-mono text-[10px] uppercase tracking-widest text-brand-gold/70">
              Suites
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          <a
            href={`tel:${CALL_NUMBER}`}
            className="flex h-11 items-center gap-2 px-3 font-mono text-xs uppercase tracking-wider text-brand-cream/70 transition-colors hover:text-brand-gold"
          >
            <PhoneCall className="h-4 w-4" />
            {CALL_DISPLAY}
          </a>
          {isInstallable && (
            <button
              onClick={onInstall}
              className="flex h-11 items-center gap-2 border border-brand-gold/30 px-5 font-mono text-[10px] font-bold uppercase tracking-widest text-brand-gold transition-all duration-300 hover:bg-brand-gold/10"
            >
              <Download className="h-4 w-4" />
              Install App
            </button>
          )}
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-11 items-center gap-1.5 px-3 font-mono text-xs uppercase tracking-wider text-brand-cream/70 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-brand-teal"
          >
            <div className="space-y-2 px-4 pb-5 pt-3">
              <a
                href={`tel:${CALL_NUMBER}`}
                className="flex h-12 items-center gap-3 border border-white/10 px-4 font-mono text-xs uppercase tracking-wider text-brand-cream/80 transition-colors hover:bg-white/5"
              >
                <PhoneCall className="h-4 w-4 text-brand-gold" />
                Call {CALL_DISPLAY}
              </a>
              {isInstallable && (
                <button
                  onClick={() => { onInstall(); setMenuOpen(false); }}
                  className="flex h-12 w-full items-center gap-3 border border-brand-gold/20 px-4 font-mono text-xs font-bold uppercase tracking-widest text-brand-gold transition-colors hover:bg-brand-gold/5"
                >
                  <Download className="h-4 w-4" />
                  Install App
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ───── Hero with single premium image & Ken Burns ───── */
const HERO_IMAGE = '/images/platinum/28.jpg';

function HeroSection() {
  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      <div className="absolute inset-0 animate-hero-zoom">
        <img
          src={HERO_IMAGE}
          alt="Platinum Suite — Serendipity Suites Zim"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-brand-teal/80 via-brand-teal/10 to-transparent" />
      <div className="absolute inset-0 bg-black/10" />

      <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
            className="max-w-2xl"
          >
            <span className="mb-4 inline-flex h-8 items-center gap-2 border border-white/15 bg-white/10 px-3 font-mono text-[10px] uppercase tracking-widest text-brand-cream backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-brand-gold" />
              Premium Short-Term Rentals
            </span>

            <div className="mb-3 flex items-center gap-3 font-mono text-[11px] text-brand-cream/70">
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-brand-gold text-brand-gold" />
                5.0
              </span>
              <span className="h-3 w-px bg-brand-cream/20" />
              <span>30+ happy guests</span>
            </div>

            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-brand-cream sm:text-5xl lg:text-6xl">
              Stay in Harare's
              <br />
              <span className="text-brand-gold">Finest Addresses</span>
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-brand-cream/60">
              Curated luxury suites powered by reliable solar energy, high-speed connectivity, and thoughtful design — for the modern traveller who doesn't compromise.
            </p>

            <div className="mt-6 flex items-center gap-2 font-mono text-[11px] text-brand-cream/50">
              <span className="flex h-6 w-6 items-center justify-center border border-brand-gold/20 bg-brand-gold/10">
                <Sun className="h-3 w-3 text-brand-gold" />
              </span>
              Solar-powered · 24/7 High-Speed Wi-Fi · Secure Parking
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#suites"
                className="flex h-12 items-center gap-2 bg-brand-gold px-8 font-mono text-xs font-bold uppercase tracking-widest text-brand-teal transition-all duration-300 hover:bg-brand-gold-light"
              >
                Browse Suites
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href={`tel:${CALL_NUMBER}`}
                className="flex h-12 items-center gap-2 border-2 border-brand-cream/30 px-8 font-mono text-xs font-bold uppercase tracking-widest text-brand-cream transition-all duration-300 hover:border-brand-cream/60"
              >
                <Phone className="h-4 w-4" />
                Call to Book
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <span className="font-mono text-[9px] uppercase tracking-widest text-brand-cream/30">
            Scroll
          </span>
          <ChevronDown className="h-4 w-4 text-brand-cream/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ───── FilterBar ───── */
function FilterBar({
  active,
  onChange,
  counts,
}: {
  active: FilterMode;
  onChange: (f: FilterMode) => void;
  counts: Record<string, number>;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12" id="suites">
      <div className="flex items-center justify-between border-b border-brand-gold/20 pb-4">
        <h2 className="font-display text-2xl font-bold tracking-tight text-brand-teal">
          Our Suites
        </h2>
        <div className="flex gap-0.5 bg-brand-cream p-0.5">
          {LOCATION_HUBS.map((hub) => (
            <button
              key={hub.key}
              onClick={() => onChange(hub.key)}
              className={`flex h-10 items-center gap-1.5 px-4 font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-200 ${
                active === hub.key
                  ? 'bg-brand-teal text-brand-gold'
                  : 'text-brand-teal/60 hover:text-brand-teal'
              }`}
            >
              {hub.key === 'all' ? 'All' : hub.key === 'avenues' ? 'Avenues' : 'CBD'}
              <span className={`ml-1 flex h-4 min-w-[16px] items-center justify-center px-1 font-mono text-[9px] ${
                active === hub.key ? 'bg-brand-gold/20 text-brand-gold' : 'bg-brand-teal/10 text-brand-teal/50'
              }`}>
                {counts[hub.key]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───── AmenityIcon ───── */
function AmenityIcon({ amenity }: { amenity: AmenityKey }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 border border-brand-teal/10 bg-brand-cream px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-brand-teal/70"
      title={AMENITY_LABELS[amenity]}
    >
      {AMENITY_ICONS[amenity]}
      {AMENITY_LABELS[amenity]}
    </span>
  );
}

/* ───── SuiteCard ───── */
function SuiteCard({
  suite,
  onBook,
}: {
  suite: Suite;
  onBook: (s: Suite) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const topAmenities = suite.amenities.slice(0, 4);
  const extraCount = suite.amenities.length - 4;

  return (
    <>
      <motion.article
      variants={itemVariants}
      className="group border border-brand-gold/10 bg-white transition-all duration-300 hover:border-brand-gold/30 hover:shadow-lg"
    >
      <SuiteCarousel images={suite.images} onImageClick={(i) => setGalleryIndex(i)} />

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-xl font-bold tracking-tight text-brand-teal">
                {suite.title}
              </h3>
              {suite.tags.includes('Signature') && (
                <Star className="h-4 w-4 fill-brand-gold text-brand-gold" />
              )}
            </div>
            <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-brand-teal/50">
              <MapPin className="h-3 w-3" />
              {suite.location}
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-xl font-bold text-brand-teal">
              ${suite.pricing.overnight}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-brand-teal/40">
              / night
            </p>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-brand-teal/60">
          {suite.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {topAmenities.map((key) => (
            <AmenityIcon key={key} amenity={key} />
          ))}
          {extraCount > 0 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex h-7 cursor-pointer items-center gap-1 border border-dashed border-brand-teal/20 px-2.5 font-mono text-[10px] text-brand-teal/50 transition-colors hover:border-brand-teal/40 hover:text-brand-teal"
            >
              {expanded ? '− Less' : `+${extraCount} more`}
            </button>
          )}
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-2 flex flex-wrap gap-1.5">
                {suite.amenities.slice(4).map((key) => (
                  <AmenityIcon key={key} amenity={key} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-5 flex items-center justify-between border-t border-brand-gold/10 pt-4">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-brand-teal/50">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              Up to {suite.capacity}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              From ${suite.pricing.hourly}/3hrs
            </span>
          </div>
          <button
            onClick={() => onBook(suite)}
            className="flex h-11 items-center border border-brand-teal px-6 font-mono text-[10px] font-bold uppercase tracking-widest text-brand-teal transition-all duration-300 hover:bg-brand-teal hover:text-brand-gold"
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.article>
      <AnimatePresence>
        {galleryIndex !== null && (
          <GalleryModal
            images={suite.images}
            initialIndex={galleryIndex}
            onClose={() => setGalleryIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ───── GalleryModal ───── */
function GalleryModal({
  images,
  initialIndex,
  onClose,
}: {
  images: SuiteImage[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(initialIndex);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setIdx((p) => (p - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setIdx((p) => (p + 1) % images.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [images.length, onClose]);

  const prev = useCallback(() => setIdx((p) => (p - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIdx((p) => (p + 1) % images.length), [images.length]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-brand-teal/95 backdrop-blur-md"
        onClick={onClose}
      />

      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Close gallery"
      >
        <X className="h-6 w-6" />
      </button>

      <span className="absolute left-4 top-4 z-10 bg-white/10 px-3 py-1.5 font-mono text-sm text-white">
        {idx + 1} / {images.length}
      </span>

      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      <AnimatePresence mode="popLayout">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0, 1] }}
          className="relative z-10 flex max-h-[85vh] max-w-[90vw] items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[idx].src}
            alt={`Photo ${idx + 1}`}
            className="max-h-[85vh] max-w-[90vw] rounded-sm object-contain"
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setIdx(i); }}
              className="flex items-center justify-center p-1"
              aria-label={`Photo ${i + 1}`}
            >
              <span className={`block rounded-full transition-all duration-300 ${
                i === idx ? 'h-2.5 w-6 bg-brand-gold' : 'h-2.5 w-2.5 bg-white/40 hover:bg-white/60'
              }`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ───── AnimatedCounter ───── */
function AnimatedCounter({ value, prefix = '$' }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const start = display;
    const diff = value - start;
    const duration = 400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * eased));
      if (progress < 1) timeoutRef.current = setTimeout(() => tick(performance.now()), 16);
    };

    timeoutRef.current = setTimeout(() => tick(performance.now()), 16);
    return () => clearTimeout(timeoutRef.current);
  }, [value]);

  return <span>{prefix}{display}.00</span>;
}

/* ───── BookingModal (multi-step with progress) ───── */
type BookingStep = 'stay' | 'details' | 'confirm';

function BookingModal({ suite, onClose }: { suite: Suite; onClose: () => void }) {
  const [step, setStep] = useState<BookingStep>('stay');
  const [stayType, setStayType] = useState<StayType>('overnight');
  const [checkInDate, setCheckInDate] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [guestName, setGuestName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const estimatedCost = useMemo(() => {
    if (stayType === 'hourly') return suite.pricing.hourly;
    return suite.pricing.overnight;
  }, [stayType, suite.pricing]);

  const stayLabel = useMemo(
    () => (stayType === 'hourly'
      ? `Day Rest / Refresh (${suite.pricing.hourlyHours} hrs)`
      : 'Full Overnight Stay'),
    [stayType, suite.pricing.hourlyHours],
  );

  const stepIndices: Record<BookingStep, number> = { stay: 0, details: 1, confirm: 2 };
  const steps: { key: BookingStep; label: string }[] = [
    { key: 'stay', label: 'Stay Type' },
    { key: 'details', label: 'Your Details' },
    { key: 'confirm', label: 'Confirm' },
  ];

  const handleNext = useCallback(() => {
    if (step === 'stay') {
      if (!checkInDate) { setErrors({ checkInDate: 'Select a check-in date' }); setSubmitted(true); return; }
      setErrors({}); setSubmitted(false); setStep('details');
    } else if (step === 'details') {
      const errs: ValidationErrors = {};
      if (!guestName.trim()) errs.guestName = 'Enter your full name';
      if (!contactNumber.trim()) errs.contactNumber = 'Enter your contact number';
      setErrors(errs); setSubmitted(true);
      if (Object.keys(errs).length > 0) return;
      setErrors({}); setSubmitted(false); setStep('confirm');
    }
  }, [step, checkInDate, guestName, contactNumber]);

  const handleBook = useCallback(() => {
    const message = [
      'Hello Serendipity Suites Zim! I would like to book a stay:',
      '',
      `• Guest Name: ${guestName.trim()}`,
      `• Chosen Suite: ${suite.title} - ${suite.location}`,
      `• Booking Type: ${stayLabel}`,
      `• Check-In Date: ${checkInDate}`,
      `• Est. Total Cost: $${estimatedCost}`,
      '',
      'Please confirm availability and share secure payment options!',
    ].join('\n');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  }, [guestName, contactNumber, checkInDate, suite, stayLabel, estimatedCost]);

  const today = new Date().toISOString().split('T')[0];
  const progress = ((stepIndices[step]) / (steps.length - 1)) * 100;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-brand-teal/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0, 1] }}
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto border border-brand-gold/20 bg-white"
      >
        <div className="sticky top-0 z-10 border-b border-brand-gold/10 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-bold tracking-tight text-brand-teal">
                {suite.title}
              </h3>
              <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-brand-teal/50">
                <MapPin className="h-3 w-3" />
                {suite.location}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center border border-brand-teal/20 text-brand-teal/50 transition-colors hover:border-brand-teal hover:text-brand-teal"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <span className={`flex h-6 w-6 items-center justify-center font-mono text-[10px] font-bold transition-colors ${
                  stepIndices[step] >= i ? 'bg-brand-teal text-brand-gold' : 'bg-brand-cream text-brand-teal/40'
                }`}>
                  {stepIndices[step] > i ? <Check className="h-3 w-3" /> : i + 1}
                </span>
                <span className={`hidden font-mono text-[10px] font-bold uppercase tracking-wider sm:inline ${
                  stepIndices[step] >= i ? 'text-brand-teal' : 'text-brand-teal/30'
                }`}>
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <span className={`mx-1 h-px w-6 ${
                    stepIndices[step] > i ? 'bg-brand-teal' : 'bg-brand-teal/10'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 h-1 bg-brand-cream">
            <div className="h-full bg-brand-gold transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="space-y-6 px-6 py-6">
          {step === 'stay' && (
            <>
              <div className="flex gap-2">
                {suite.images.slice(0, 3).map((img, i) => (
                  <img
                    key={i}
                    src={img.src}
                    alt={`${suite.title} ${i + 1}`}
                    className="h-20 flex-1 border border-brand-gold/10 object-cover"
                    loading="lazy"
                  />
                ))}
              </div>

              <div>
                <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-brand-teal/60">
                  Stay Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setStayType('hourly')}
                    className={`flex h-14 items-center gap-3 border-2 px-4 transition-all duration-200 ${
                      stayType === 'hourly'
                        ? 'border-brand-gold bg-brand-gold/5'
                        : 'border-brand-teal/10 bg-white hover:border-brand-teal/30'
                    }`}
                  >
                    <Clock className={`h-5 w-5 ${stayType === 'hourly' ? 'text-brand-gold' : 'text-brand-teal/30'}`} />
                    <div className="text-left">
                      <p className="font-display text-sm font-semibold text-brand-teal">Day Rest</p>
                      <p className="font-mono text-[11px] text-brand-teal/50">${suite.pricing.hourly} / {suite.pricing.hourlyHours} hrs</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setStayType('overnight')}
                    className={`flex h-14 items-center gap-3 border-2 px-4 transition-all duration-200 ${
                      stayType === 'overnight'
                        ? 'border-brand-gold bg-brand-gold/5'
                        : 'border-brand-teal/10 bg-white hover:border-brand-teal/30'
                    }`}
                  >
                    <Moon className={`h-5 w-5 ${stayType === 'overnight' ? 'text-brand-gold' : 'text-brand-teal/30'}`} />
                    <div className="text-left">
                      <p className="font-display text-sm font-semibold text-brand-teal">Overnight</p>
                      <p className="font-mono text-[11px] text-brand-teal/50">${suite.pricing.overnight} / night</p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-brand-teal/60">
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={checkInDate}
                    onChange={(e) => { setCheckInDate(e.target.value); setSubmitted(false); }}
                    className={`h-12 w-full border-2 px-3 font-mono text-xs text-brand-teal transition-colors focus:outline-none ${
                      submitted && !checkInDate
                        ? 'border-red-300 bg-red-50'
                        : 'border-brand-teal/10 bg-brand-cream hover:border-brand-teal/30'
                    }`}
                  />
                  {submitted && !checkInDate && (
                    <p className="mt-1 font-mono text-[10px] text-red-500">{errors.checkInDate}</p>
                  )}
                </div>
                <div>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-brand-teal/60">
                    Guests
                  </label>
                  <div className="flex h-12 items-center gap-3 border-2 border-brand-teal/10 bg-brand-cream px-3">
                    <Users className="h-4 w-4 text-brand-teal/40" />
                    <span className="font-mono text-sm font-semibold text-brand-teal">{guestCount}</span>
                    <div className="ml-auto flex gap-1">
                      <button
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                        disabled={guestCount <= 1}
                        className="flex h-8 w-8 items-center justify-center border border-brand-teal/20 text-sm text-brand-teal/60 transition-colors hover:bg-brand-teal/5 disabled:opacity-30"
                      >−</button>
                      <button
                        onClick={() => setGuestCount(Math.min(2, guestCount + 1))}
                        disabled={guestCount >= 2}
                        className="flex h-8 w-8 items-center justify-center border border-brand-teal/20 text-sm text-brand-teal/60 transition-colors hover:bg-brand-teal/5 disabled:opacity-30"
                      >+</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-brand-teal p-5">
                <div className="flex items-center justify-between font-mono text-xs text-brand-cream/70">
                  <span>{stayLabel}</span>
                  <AnimatedCounter value={estimatedCost} />
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-brand-gold/20 pt-3">
                  <span className="font-display text-sm font-bold text-brand-gold">Estimate</span>
                  <span className="font-display text-xl font-bold text-brand-gold">
                    <AnimatedCounter value={estimatedCost} />
                  </span>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="flex h-12 w-full items-center justify-center gap-2 bg-brand-teal font-mono text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-brand-teal-light"
              >
                Continue
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}

          {step === 'details' && (
            <>
              <div className="space-y-1 rounded-sm border border-brand-gold/10 bg-brand-cream p-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-brand-teal/50">Your Selection</p>
                <p className="font-display text-base font-bold text-brand-teal">{suite.title} · {stayLabel}</p>
                {checkInDate && (
                  <p className="font-mono text-[11px] text-brand-teal/60">
                    {MONTHS[new Date(checkInDate).getMonth()]} {new Date(checkInDate).getDate()}, {new Date(checkInDate).getFullYear()} · {guestCount} guest{guestCount > 1 ? 's' : ''}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-brand-teal/60">
                  Your Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tafadzwa Moyo"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className={`h-12 w-full border-2 px-3 font-mono text-xs text-brand-teal transition-colors placeholder:text-brand-teal/20 focus:outline-none ${
                    submitted && !guestName.trim()
                      ? 'border-red-300 bg-red-50'
                      : 'border-brand-teal/10 bg-brand-cream hover:border-brand-teal/30'
                  }`}
                />
                {submitted && !guestName.trim() && (
                  <p className="mt-1 font-mono text-[10px] text-red-500">{errors.guestName}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-brand-teal/60">
                  Contact Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 071 234 5678"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className={`h-12 w-full border-2 px-3 font-mono text-xs text-brand-teal transition-colors placeholder:text-brand-teal/20 focus:outline-none ${
                    submitted && !contactNumber.trim()
                      ? 'border-red-300 bg-red-50'
                      : 'border-brand-teal/10 bg-brand-cream hover:border-brand-teal/30'
                  }`}
                />
                {submitted && !contactNumber.trim() && (
                  <p className="mt-1 font-mono text-[10px] text-red-500">{errors.contactNumber}</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('stay')}
                  className="flex h-12 flex-1 items-center justify-center gap-2 border-2 border-brand-teal/20 font-mono text-xs font-bold uppercase tracking-widest text-brand-teal transition-all duration-300 hover:border-brand-teal"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="flex h-12 flex-[2] items-center justify-center gap-2 bg-brand-teal font-mono text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-brand-teal-light"
                >
                  Review Booking
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </>
          )}

          {step === 'confirm' && (
            <>
              <div className="border border-brand-gold/20 bg-brand-cream p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center border border-brand-gold/30 bg-brand-gold/10">
                    <Star className="h-5 w-5 text-brand-gold" />
                  </div>
                  <div>
                    <p className="font-display text-lg font-bold text-brand-teal">{suite.title}</p>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-brand-teal/50">{suite.location}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5 border-t border-brand-gold/10 pt-4">
                  {[
                    { label: 'Stay Type', value: stayLabel },
                    { label: 'Check-In', value: checkInDate ? `${MONTHS[new Date(checkInDate).getMonth()]} ${new Date(checkInDate).getDate()}, ${new Date(checkInDate).getFullYear()}` : '-' },
                    { label: 'Guests', value: `${guestCount} guest${guestCount > 1 ? 's' : ''}` },
                    { label: 'Guest Name', value: guestName || '-' },
                    { label: 'Contact', value: contactNumber || '-' },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between font-mono text-xs">
                      <span className="text-brand-teal/50">{row.label}</span>
                      <span className="font-medium text-brand-teal">{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-brand-gold/20 pt-4">
                  <span className="font-display text-base font-bold text-brand-teal">Total</span>
                  <span className="font-display text-2xl font-bold text-brand-gold">
                    <AnimatedCounter value={estimatedCost} />
                  </span>
                </div>
              </div>

              <div className="space-y-2 rounded-sm border border-amber-200 bg-amber-50 p-4">
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-800">What happens next</p>
                <p className="font-mono text-[11px] leading-relaxed text-amber-700">
                  Tapping the button below will open WhatsApp with a pre-filled booking message. Send it and our team will confirm availability and share secure payment options.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('details')}
                  className="flex h-12 flex-1 items-center justify-center gap-2 border-2 border-brand-teal/20 font-mono text-xs font-bold uppercase tracking-widest text-brand-teal transition-all duration-300 hover:border-brand-teal"
                >
                  Edit
                </button>
                <button
                  onClick={handleBook}
                  className="flex h-12 flex-[2] items-center justify-center gap-3 bg-brand-gold font-mono text-xs font-bold uppercase tracking-widest text-brand-teal transition-all duration-300 hover:bg-brand-gold-light"
                >
                  <Phone className="h-4 w-4" />
                  Confirm via WhatsApp
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ───── InstallBanner ───── */
function InstallBanner({ onInstall, onDismiss }: { onInstall: () => void; onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-6 sm:w-80"
    >
      <div className="border border-brand-gold/20 bg-brand-teal p-5 shadow-xl shadow-brand-teal/30">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-brand-gold/30 bg-brand-teal-light">
            <Download className="h-5 w-5 text-brand-gold" />
          </div>
          <div className="flex-1">
            <p className="font-display text-base font-bold text-brand-cream">Install Serendipity</p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-brand-cream/50">
              Add to your home screen for a better experience.
            </p>
          </div>
          <button onClick={onDismiss} className="flex h-8 w-8 items-center justify-center text-brand-cream/40 transition-colors hover:text-brand-cream" aria-label="Dismiss">
            <X className="h-4 w-4" />
          </button>
        </div>
        <button onClick={onInstall} className="btn-primary mt-3 h-12 w-full bg-brand-gold text-sm text-brand-teal hover:bg-brand-gold-light">
          <Download className="h-4 w-4" />
          Install App
        </button>
      </div>
    </motion.div>
  );
}

/* ───── OfflineIndicator ───── */
function OfflineIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed left-1/2 top-4 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-2.5 border border-amber-500/20 bg-amber-950/90 px-5 py-2.5 font-mono text-xs font-medium text-amber-200 shadow-xl backdrop-blur-md">
        <WifiOff className="h-4 w-4" />
        You are offline — browsing cached content
      </div>
    </motion.div>
  );
}

/* ───── Floating WhatsApp ───── */
function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center bg-brand-gold shadow-lg shadow-brand-gold/30 transition-all duration-300 hover:scale-110 hover:shadow-xl"
      aria-label="WhatsApp booking"
    >
      <PhoneCall className="h-6 w-6 text-brand-teal" />
    </a>
  );
}

/* ───── Footer ───── */
function Footer() {
  return (
    <footer className="mt-24 border-t border-brand-gold/10 bg-brand-teal">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border border-brand-gold/40 text-base font-bold text-brand-gold">S</div>
              <div>
                <span className="font-display text-lg font-bold tracking-tight text-brand-cream">Serendipity</span>
                <span className="ml-1.5 font-mono text-[10px] uppercase tracking-widest text-brand-gold/60">Suites</span>
              </div>
            </div>
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-brand-cream/50">
              Premium short-term rental suites in Harare, Zimbabwe. Powered by solar energy with high-speed connectivity.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-brand-gold">Contact</h4>
            <ul className="space-y-3">
              <li><a href={`tel:${CALL_NUMBER}`} className="flex h-10 items-center gap-2 font-mono text-[11px] text-brand-cream/60 transition-colors hover:text-brand-gold"><Phone className="h-3.5 w-3.5" />{CALL_DISPLAY}</a></li>
              <li><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex h-10 items-center gap-2 font-mono text-[11px] text-brand-cream/60 transition-colors hover:text-brand-gold"><PhoneCall className="h-3.5 w-3.5" />{WHATSAPP_DISPLAY}</a></li>
              <li><a href={`mailto:${SUPPORT_EMAIL}`} className="flex h-10 items-center gap-2 font-mono text-[11px] text-brand-cream/60 transition-colors hover:text-brand-gold"><Mail className="h-3.5 w-3.5" />Email Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-brand-gold">Location</h4>
            <ul className="space-y-3">
              <li className="flex h-10 items-start gap-2 font-mono text-[11px] text-brand-cream/60"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />{ADDRESS}</li>
              <li className="flex h-10 items-start gap-2 font-mono text-[11px] text-brand-cream/60"><Building2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />The Avenues District &amp; Harare CBD</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-brand-gold">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#suites" className="flex h-10 items-center font-mono text-[11px] text-brand-cream/60 transition-colors hover:text-brand-gold">Browse Suites</a></li>
              <li><a href={`tel:${CALL_NUMBER}`} className="flex h-10 items-center font-mono text-[11px] text-brand-cream/60 transition-colors hover:text-brand-gold">Call to Book</a></li>
              <li><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex h-10 items-center font-mono text-[11px] text-brand-cream/60 transition-colors hover:text-brand-gold">WhatsApp Booking</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-brand-gold/10 pt-6 text-center font-mono text-[10px] text-brand-cream/30">
          &copy; {new Date().getFullYear()} Serendipity Suites Zim. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ───── App ───── */
export default function App() {
  const [activeFilter, setActiveFilter] = useState<FilterMode>('all');
  const [selectedSuite, setSelectedSuite] = useState<Suite | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handler = (e: Event) => { e.preventDefault(); setInstallPrompt(e); setShowInstallBanner(true); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => { window.removeEventListener('online', goOnline); window.removeEventListener('offline', goOffline); };
  }, []);

  const handleInstall = useCallback(() => {
    if (!installPrompt) return;
    (installPrompt as any).prompt();
    (installPrompt as any).userChoice.then((result: { outcome: string }) => {
      if (result.outcome === 'accepted') { setShowInstallBanner(false); setInstallPrompt(null); }
    });
  }, [installPrompt]);

  const filterCounts = useMemo(() => ({
    all: SUITES.length,
    avenues: SUITES.filter((s) => s.location === 'The Avenues').length,
    cbd: SUITES.filter((s) => s.location === 'Harare CBD').length,
  }), []);

  const filteredSuites = useMemo(() => {
    switch (activeFilter) {
      case 'avenues': return SUITES.filter((s) => s.location === 'The Avenues');
      case 'cbd': return SUITES.filter((s) => s.location === 'Harare CBD');
      default: return SUITES;
    }
  }, [activeFilter]);

  const isInstallable = !!installPrompt;

  return (
    <div className="min-h-screen bg-brand-cream">
      <Header isInstallable={isInstallable} onInstall={handleInstall} />
      <HeroSection />

      <motion.section
        className="py-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <FilterBar active={activeFilter} onChange={setActiveFilter} counts={filterCounts} />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-8 grid max-w-7xl gap-8 px-4 sm:px-8 lg:px-12 lg:grid-cols-2"
        >
          {filteredSuites.map((suite) => (
            <SuiteCard key={suite.id} suite={suite} onBook={(s) => setSelectedSuite(s)} />
          ))}
        </motion.div>
        {filteredSuites.length === 0 && (
          <p className="mt-16 text-center font-mono text-xs text-brand-teal/40">No suites found for this location.</p>
        )}
      </motion.section>

      {selectedSuite && <BookingModal suite={selectedSuite} onClose={() => setSelectedSuite(null)} />}

      <AnimatePresence>
        {showInstallBanner && isInstallable && (
          <InstallBanner onInstall={handleInstall} onDismiss={() => setShowInstallBanner(false)} />
        )}
      </AnimatePresence>

      {!isOnline && <OfflineIndicator />}

      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
