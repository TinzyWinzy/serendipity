import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import {
  Sun, Wifi, ShowerHead, Monitor, ChefHat, Shield, Bath,
  Phone, Mail, MapPin, Clock, Moon, Users,
  Download, WifiOff, X, Building2, PhoneCall,
  ChevronRight, ChevronLeft, Sparkles, Star,
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

function SuiteCarousel({ images }: { images: SuiteImage[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

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
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <div
        ref={ref}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {images.map((img, i) => (
          <div key={i} className="w-full shrink-0 snap-start">
            <img
              src={img.src}
              alt={`Suite photo ${i + 1}`}
              className="h-full w-full object-cover"
              style={{ aspectRatio: img.orientation === 'landscape' ? '16/10' : '4/5' }}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === idx ? 'w-5 bg-brand-gold' : 'w-1.5 bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>

          {showArrows && idx > 0 && (
            <button
              onClick={() => scrollTo(idx - 1)}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-sm bg-brand-teal/70 p-1.5 text-brand-gold backdrop-blur-sm transition-all hover:bg-brand-teal"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          {showArrows && idx < images.length - 1 && (
            <button
              onClick={() => scrollTo(idx + 1)}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-sm bg-brand-teal/70 p-1.5 text-brand-gold backdrop-blur-sm transition-all hover:bg-brand-teal"
              aria-label="Next photo"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}

          <span className="absolute right-3 top-3 z-10 rounded-sm bg-brand-teal/80 px-2 py-0.5 font-mono text-[10px] text-brand-cream backdrop-blur-sm">
            {idx + 1}/{images.length}
          </span>
        </>
      )}
    </div>
  );
}

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
          <div className="flex h-9 w-9 items-center justify-center border border-brand-gold/40 bg-brand-teal text-sm font-bold text-brand-gold">
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
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-cream/70 transition-colors hover:text-brand-gold"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            {CALL_DISPLAY}
          </a>
          {isInstallable && (
            <button
              onClick={onInstall}
              className="flex items-center gap-2 border border-brand-gold/30 px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest text-brand-gold transition-all duration-300 hover:bg-brand-gold/10"
            >
              <Download className="h-3.5 w-3.5" />
              Install App
            </button>
          )}
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-brand-cream/70 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-brand-teal px-4 pb-5 pt-3 md:hidden">
          <a
            href={`tel:${CALL_NUMBER}`}
            className="flex items-center gap-3 border border-white/10 px-4 py-3 text-xs font-mono uppercase tracking-wider text-brand-cream/80 transition-colors hover:bg-white/5"
          >
            <PhoneCall className="h-4 w-4 text-brand-gold" />
            Call {CALL_DISPLAY}
          </a>
          {isInstallable && (
            <button
              onClick={() => { onInstall(); setMenuOpen(false); }}
              className="mt-2 flex w-full items-center gap-3 border border-brand-gold/20 px-4 py-3 text-xs font-mono font-bold uppercase tracking-widest text-brand-gold transition-colors hover:bg-brand-gold/5"
            >
              <Download className="h-4 w-4" />
              Install App
            </button>
          )}
        </div>
      )}
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-teal via-brand-teal-light to-brand-teal-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(214,200,159,0.08),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 border border-brand-gold/20 bg-brand-gold/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-brand-gold">
            <Sparkles className="h-3 w-3" />
            Premium Short-Term Rentals
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-brand-cream sm:text-5xl lg:text-6xl">
            Your Home in
            <br />
            <span className="text-brand-gold">Harare</span>
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-brand-cream/60">
            Curated luxury suites in Harare's finest locations — powered by
            reliable solar energy and built for the modern traveller.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={`tel:${CALL_NUMBER}`}
              className="btn-primary bg-brand-gold hover:bg-brand-gold-light"
            >
              <Phone className="h-4 w-4" />
              Call to Book
            </a>
            <a
              href="#suites"
              className="btn-outline border-brand-gold/30 text-brand-cream hover:border-brand-gold hover:text-brand-gold"
            >
              Browse Suites
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-10 sm:px-8 lg:px-12">
        <div className="inline-flex items-center gap-3 border border-emerald-500/15 bg-emerald-950/30 px-5 py-3">
          <span className="flex h-8 w-8 items-center justify-center bg-emerald-500/15">
            <Sun className="h-4 w-4 text-emerald-400" />
          </span>
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-wider text-emerald-300">
              ⚡ 24/7 Solar Power &amp; High-Speed Wi-Fi Fully Operational
            </p>
            <p className="mt-0.5 font-mono text-[10px] text-emerald-400/60">
              Reliable utility backup across all suites
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterBar({
  active,
  onChange,
}: {
  active: FilterMode;
  onChange: (f: FilterMode) => void;
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
              className={`px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-200 ${
                active === hub.key
                  ? 'bg-brand-teal text-brand-gold'
                  : 'text-brand-teal/60 hover:text-brand-teal'
              }`}
            >
              {hub.key === 'all' ? 'All' : hub.key === 'avenues' ? 'Avenues' : 'CBD'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

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

function SuiteCard({
  suite,
  onBook,
}: {
  suite: Suite;
  onBook: (s: Suite) => void;
}) {
  return (
    <article className="group animate-fade-in border border-brand-gold/10 bg-white transition-all duration-300 hover:border-brand-gold/30 hover:shadow-lg">
      <SuiteCarousel images={suite.images} />

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
            <p className="font-display text-xl font-bold text-brand-gold-dark">
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
          {suite.amenities.map((key) => (
            <AmenityIcon key={key} amenity={key} />
          ))}
        </div>

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
            className="border border-brand-teal px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-brand-teal transition-all duration-300 hover:bg-brand-teal hover:text-brand-gold"
          >
            Book Now
          </button>
        </div>
      </div>
    </article>
  );
}

function BookingModal({
  suite,
  onClose,
}: {
  suite: Suite;
  onClose: () => void;
}) {
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

  const handleBook = useCallback(() => {
    const errs: ValidationErrors = {};
    if (!guestName.trim()) errs.guestName = 'Enter your full name';
    if (!contactNumber.trim()) errs.contactNumber = 'Enter your contact number';
    if (!checkInDate) errs.checkInDate = 'Select a check-in date';
    setErrors(errs);
    setSubmitted(true);
    if (Object.keys(errs).length > 0) return;

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

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
    );
  }, [guestName, contactNumber, checkInDate, suite, stayLabel, estimatedCost]);

  const today = new Date().toISOString().split('T')[0];

  const dateDisplay = checkInDate
    ? `${MONTHS[new Date(checkInDate).getMonth()]} ${new Date(checkInDate).getDate()}, ${new Date(checkInDate).getFullYear()}`
    : '';

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-brand-teal/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative max-h-[90vh] w-full max-w-lg animate-slide-up overflow-y-auto border border-brand-gold/20 bg-white">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-brand-gold/10 bg-white px-6 py-4">
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
            className="border border-brand-teal/20 p-2 text-brand-teal/50 transition-colors hover:border-brand-teal hover:text-brand-teal"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">
          <div className="flex gap-2">
            {suite.images.slice(0, 3).map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={`${suite.title} ${i + 1}`}
                className="h-24 flex-1 border border-brand-gold/10 object-cover"
                loading="lazy"
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {suite.amenities.map((key) => (
              <AmenityIcon key={key} amenity={key} />
            ))}
          </div>

          <div>
            <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-brand-teal/60">
              Stay Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setStayType('hourly')}
                className={`border-2 px-4 py-3 text-left transition-all duration-200 ${
                  stayType === 'hourly'
                    ? 'border-brand-gold bg-brand-gold/5'
                    : 'border-brand-teal/10 bg-white hover:border-brand-teal/30'
                }`}
              >
                <p className="flex items-center gap-2 font-display text-sm font-semibold text-brand-teal">
                  <Clock className="h-4 w-4 text-brand-gold" />
                  Day Rest
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-brand-teal/50">
                  ${suite.pricing.hourly} / {suite.pricing.hourlyHours} hrs
                </p>
              </button>
              <button
                onClick={() => setStayType('overnight')}
                className={`border-2 px-4 py-3 text-left transition-all duration-200 ${
                  stayType === 'overnight'
                    ? 'border-brand-gold bg-brand-gold/5'
                    : 'border-brand-teal/10 bg-white hover:border-brand-teal/30'
                }`}
              >
                <p className="flex items-center gap-2 font-display text-sm font-semibold text-brand-teal">
                  <Moon className="h-4 w-4 text-brand-gold" />
                  Overnight
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-brand-teal/50">
                  ${suite.pricing.overnight} / night
                </p>
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
                onChange={(e) => setCheckInDate(e.target.value)}
                className={`w-full border-2 px-3 py-2.5 font-mono text-xs text-brand-teal transition-colors focus:outline-none ${
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
              <div className="flex items-center gap-3 border-2 border-brand-teal/10 bg-brand-cream px-3 py-2.5">
                <Users className="h-4 w-4 text-brand-teal/40" />
                <span className="font-mono text-sm font-semibold text-brand-teal">
                  {guestCount}
                </span>
                <div className="ml-auto flex gap-1">
                  <button
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    disabled={guestCount <= 1}
                    className="flex h-6 w-6 items-center justify-center border border-brand-teal/20 text-xs text-brand-teal/60 transition-colors hover:bg-brand-teal/5 disabled:opacity-30"
                  >
                    −
                  </button>
                  <button
                    onClick={() => setGuestCount(Math.min(2, guestCount + 1))}
                    disabled={guestCount >= 2}
                    className="flex h-6 w-6 items-center justify-center border border-brand-teal/20 text-xs text-brand-teal/60 transition-colors hover:bg-brand-teal/5 disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-teal p-5">
            <div className="flex items-center justify-between font-mono text-xs text-brand-cream/70">
              <span>{stayLabel}</span>
              <span className="font-bold text-brand-cream">${estimatedCost}.00</span>
            </div>
            {dateDisplay && (
              <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-brand-cream/50">
                <span>Check-In</span>
                <span>{dateDisplay}</span>
              </div>
            )}
            <div className="mt-3 flex items-center justify-between border-t border-brand-gold/20 pt-3">
              <span className="font-display text-sm font-bold text-brand-gold">
                Total Estimate
              </span>
              <span className="font-display text-xl font-bold text-brand-gold">
                ${estimatedCost}.00
              </span>
            </div>
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
              className={`w-full border-2 px-3 py-2.5 font-mono text-xs text-brand-teal transition-colors placeholder:text-brand-teal/20 focus:outline-none ${
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
              className={`w-full border-2 px-3 py-2.5 font-mono text-xs text-brand-teal transition-colors placeholder:text-brand-teal/20 focus:outline-none ${
                submitted && !contactNumber.trim()
                  ? 'border-red-300 bg-red-50'
                  : 'border-brand-teal/10 bg-brand-cream hover:border-brand-teal/30'
              }`}
            />
            {submitted && !contactNumber.trim() && (
              <p className="mt-1 font-mono text-[10px] text-red-500">{errors.contactNumber}</p>
            )}
          </div>

          <button
            onClick={handleBook}
            className="btn-primary w-full gap-3 bg-brand-gold hover:bg-brand-gold-light"
          >
            <Phone className="h-5 w-5" />
            Confirm &amp; Book Instantly via WhatsApp
          </button>

          <p className="text-center font-mono text-[10px] text-brand-teal/40">
            You will be redirected to WhatsApp to confirm your booking.
          </p>
        </div>
      </div>
    </div>
  );
}

function InstallBanner({
  onInstall,
  onDismiss,
}: {
  onInstall: () => void;
  onDismiss: () => void;
}) {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-up sm:left-auto sm:right-6 sm:w-80">
      <div className="border border-brand-gold/20 bg-brand-teal p-5 shadow-xl shadow-brand-teal/30">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-brand-gold/30 bg-brand-teal-light">
            <Download className="h-5 w-5 text-brand-gold" />
          </div>
          <div className="flex-1">
            <p className="font-display text-base font-bold text-brand-cream">
              Install Serendipity
            </p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-brand-cream/50">
              Add to your home screen for a better experience.
            </p>
          </div>
          <button
            onClick={onDismiss}
            className="p-1.5 text-brand-cream/40 transition-colors hover:text-brand-cream"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <button
          onClick={onInstall}
          className="btn-primary mt-3 w-full bg-brand-gold text-sm text-brand-teal hover:bg-brand-gold-light"
        >
          <Download className="h-4 w-4" />
          Install App
        </button>
      </div>
    </div>
  );
}

function OfflineIndicator() {
  return (
    <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2 animate-slide-up">
      <div className="flex items-center gap-2 border border-amber-500/20 bg-amber-950/90 px-4 py-2 font-mono text-xs font-medium text-amber-200 shadow-xl backdrop-blur-md">
        <WifiOff className="h-4 w-4" />
        You are offline — browsing cached content
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-brand-gold/10 bg-brand-teal">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center border border-brand-gold/40 text-sm font-bold text-brand-gold">
                S
              </div>
              <div>
                <span className="font-display text-lg font-bold tracking-tight text-brand-cream">
                  Serendipity
                </span>
                <span className="ml-1.5 font-mono text-[10px] uppercase tracking-widest text-brand-gold/60">
                  Suites
                </span>
              </div>
            </div>
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-brand-cream/50">
              Premium short-term rental suites in Harare, Zimbabwe. Powered by
              solar energy with high-speed connectivity.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-brand-gold">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${CALL_NUMBER}`}
                  className="flex items-center gap-2 font-mono text-[11px] text-brand-cream/60 transition-colors hover:text-brand-gold"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {CALL_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-[11px] text-brand-cream/60 transition-colors hover:text-brand-gold"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="flex items-center gap-2 font-mono text-[11px] text-brand-cream/60 transition-colors hover:text-brand-gold"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-brand-gold">
              Location
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 font-mono text-[11px] text-brand-cream/60">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {ADDRESS}
              </li>
              <li className="flex items-start gap-2 font-mono text-[11px] text-brand-cream/60">
                <Building2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                The Avenues District &amp; Harare CBD
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-brand-gold">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#suites"
                  className="font-mono text-[11px] text-brand-cream/60 transition-colors hover:text-brand-gold"
                >
                  Browse Suites
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CALL_NUMBER}`}
                  className="font-mono text-[11px] text-brand-cream/60 transition-colors hover:text-brand-gold"
                >
                  Call to Book
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] text-brand-cream/60 transition-colors hover:text-brand-gold"
                >
                  WhatsApp Booking
                </a>
              </li>
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

export default function App() {
  const [activeFilter, setActiveFilter] = useState<FilterMode>('all');
  const [selectedSuite, setSelectedSuite] = useState<Suite | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowInstallBanner(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  const handleInstall = useCallback(() => {
    if (!installPrompt) return;
    (installPrompt as any).prompt();
    (installPrompt as any).userChoice.then((result: { outcome: string }) => {
      if (result.outcome === 'accepted') {
        setShowInstallBanner(false);
        setInstallPrompt(null);
      }
    });
  }, [installPrompt]);

  const filteredSuites = useMemo(() => {
    switch (activeFilter) {
      case 'avenues':
        return SUITES.filter((s) => s.location === 'The Avenues');
      case 'cbd':
        return SUITES.filter((s) => s.location === 'Harare CBD');
      default:
        return SUITES;
    }
  }, [activeFilter]);

  const isInstallable = !!installPrompt;

  return (
    <div className="min-h-screen bg-brand-cream">
      <Header isInstallable={isInstallable} onInstall={handleInstall} />

      <HeroSection />

      <section className="py-14">
        <FilterBar active={activeFilter} onChange={setActiveFilter} />
        <div className="mx-auto mt-8 grid max-w-7xl gap-8 px-4 sm:px-8 lg:px-12 lg:grid-cols-2">
          {filteredSuites.map((suite) => (
            <SuiteCard
              key={suite.id}
              suite={suite}
              onBook={(s) => setSelectedSuite(s)}
            />
          ))}
        </div>
        {filteredSuites.length === 0 && (
          <p className="mt-16 text-center font-mono text-xs text-brand-teal/40">
            No suites found for this location.
          </p>
        )}
      </section>

      {selectedSuite && (
        <BookingModal
          suite={selectedSuite}
          onClose={() => setSelectedSuite(null)}
        />
      )}

      {showInstallBanner && isInstallable && (
        <InstallBanner
          onInstall={handleInstall}
          onDismiss={() => setShowInstallBanner(false)}
        />
      )}

      {!isOnline && <OfflineIndicator />}

      <Footer />
    </div>
  );
}
