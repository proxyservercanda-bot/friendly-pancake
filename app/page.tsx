import React from 'react';
import Image from 'next/image';
import { Phone, MessageCircle, Truck, Tag, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';
import OrderSection from '@/components/OrderSection';
import { ALLOWED_VILLAGES } from '@/lib/types';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FCFBF7] text-gray-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-900/10 shadow-sm print:hidden">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/farm-logo.jpg"
              alt="फरकाडे पोल्ट्री फार्म अधिकृत लोगो"
              width={52}
              height={52}
              className="rounded-full border border-amber-700 shadow-sm"
              priority
            />
            <div>
              <h1 className="text-lg sm:text-xl font-black text-amber-950 leading-tight">
                फरकाडे पोल्ट्री फार्म
              </h1>
              <p className="text-xs text-amber-800 font-medium">फक्त आणि फक्त गावराण अंडी</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-700">
            <a href="#about" className="hover:text-amber-800 transition">गावराण अंडी</a>
            <a href="#price" className="hover:text-amber-800 transition">किंमत & सवलत</a>
            <a href="#service-area" className="hover:text-amber-800 transition">सेवा क्षेत्र</a>
            <a href="#order-section" className="bg-amber-800 hover:bg-amber-900 text-white px-4 py-2 rounded-xl transition">
              ऑर्डर करा
            </a>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <a
              href="tel:9822131534"
              className="bg-amber-800 text-white p-2 rounded-lg"
              aria-label="कॉल करा"
            >
              <Phone size={18} />
            </a>
            <a
              href="https://wa.me/919822131534"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 text-white p-2 rounded-lg"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 px-4 max-w-6xl mx-auto text-center print:hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs sm:text-sm font-bold mb-4">
          <Truck size={16} />
          <span>मोफत घरपोच सेवा | १ ते २,००० अंडी उपलब्ध</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-amber-950 tracking-tight leading-tight">
          ताजी गावराण अंडी <br className="hidden sm:inline" />
          <span className="text-amber-800">थेट फार्ममधून तुमच्या दारात</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
          घरगुती वापरासाठी असो किंवा मोठ्या ऑर्डरसाठी — फरकाडे पोल्ट्री फार्मकडून शुद्ध व ताजी गावराण अंडी उपलब्ध.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#order-section"
            className="bg-amber-800 hover:bg-amber-900 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition text-base"
          >
            अंडी ऑर्डर करा
          </a>
          <a
            href="https://wa.me/919822131534"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition flex items-center gap-2"
          >
            <MessageCircle size={20} />
            WhatsApp करा
          </a>
          <a
            href="tel:9822131534"
            className="bg-gray-900 hover:bg-black text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition flex items-center gap-2"
          >
            <Phone size={20} />
            कॉल करा
          </a>
        </div>
      </section>

      {/* Pricing & Bulk Order Highlight */}
      <section id="price" className="py-10 px-4 max-w-6xl mx-auto print:hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-amber-800 font-bold text-xs uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-md">
                किंमत
              </span>
              <h3 className="text-2xl font-bold text-amber-950 mt-2">गावराण अंडी</h3>
              <p className="text-4xl font-extrabold text-amber-900 mt-4">
                ₹17 <span className="text-base font-medium text-gray-600">/ प्रति अंडे</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  १ अंड्यापासून २,००० अंड्यांपर्यंत ऑर्डर उपलब्ध
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  शंभर टक्के मोफत घरपोच सेवा
                </li>
              </ul>
            </div>
            <a
              href="#order-section"
              className="mt-6 block text-center bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold py-3 rounded-xl transition"
            >
              आताच ऑर्डर करा
            </a>
          </div>

          <div className="bg-gradient-to-br from-amber-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between">
            <div>
              <span className="bg-amber-500/20 text-amber-300 font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-md border border-amber-400/30">
                Bulk Order खास सवलत
              </span>
              <h3 className="text-2xl font-bold mt-2">1,000+ अंड्यांवर 15% Discount</h3>
              <p className="text-amber-100/90 text-sm mt-3 leading-relaxed">
                हॉटेल, केटरिंग किंवा मोठ्या कार्यक्रमांसाठी १,००० किंवा त्यापेक्षा जास्त गावराण अंडी घेतल्यास थेट १५% सवलत मिळेल.
              </p>
              <div className="mt-4 p-3 bg-white/10 rounded-xl text-xs space-y-1 font-mono">
                <p>उदा. १,००० अंडी × ₹१७ = ₹१७,०००</p>
                <p className="text-emerald-300">१५% सवलत = - ₹२,५५०</p>
                <p className="text-amber-300 font-bold text-sm">अंतिम देय = ₹१४,४५०</p>
              </div>
            </div>
            <a
              href="#order-section"
              className="mt-6 block text-center bg-amber-400 hover:bg-amber-300 text-amber-950 font-black py-3 rounded-xl transition shadow"
            >
              Bulk Order करा
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-12 px-4 max-w-6xl mx-auto print:hidden">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-amber-950 mb-8">
          आमची वैशिष्ट्ये
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            'फक्त गावराण अंडी',
            '१ ते २,००० अंड्यांपर्यंत ऑर्डर',
            '१,०००+ अंड्यांवर १५% Discount',
            'मोफत घरपोच सेवा',
            'थेट फार्ममधून विक्री',
            'घरगुती आणि Bulk Orders',
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-100 shadow-sm flex items-start gap-3">
              <CheckCircle2 className="text-amber-700 shrink-0 mt-0.5" size={18} />
              <span className="font-semibold text-gray-800 text-sm sm:text-base">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Service Area */}
      <section id="service-area" className="py-12 px-4 bg-amber-100/40 print:hidden">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-amber-800 font-bold text-xs uppercase tracking-wider bg-amber-200/60 px-3 py-1 rounded-md">
            डिलिव्हरी क्षेत्र
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 mt-2">
            केवळ खालील १० गावांमध्ये सेवा उपलब्ध
          </h2>
          <p className="text-sm text-gray-600 mt-1">ता. सिल्लोड, जि. छत्रपती संभाजीनगर</p>

          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
            {ALLOWED_VILLAGES.map((v, i) => (
              <span
                key={v}
                className="bg-white border border-amber-200 text-amber-950 font-bold px-4 py-2 rounded-xl text-sm shadow-sm flex items-center gap-1.5"
              >
                <MapPin size={14} className="text-amber-700" />
                {i + 1}. {v}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Order Form Component */}
      <OrderSection />

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-100 py-10 px-4 print:hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/farm-logo.jpg"
                alt="फरकाडे पोल्ट्री फार्म लोगो"
                width={48}
                height={48}
                className="rounded-full border border-amber-500"
              />
              <span className="text-lg font-bold text-white">फरकाडे पोल्ट्री फार्म</span>
            </div>
            <p className="text-amber-200/80">
              फक्त आणि फक्त शुद्ध गावराण अंडी विक्री. थेट फार्ममधून मोफत घरपोच सेवा.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-2">पत्ता</h4>
            <p className="text-amber-200/80">
              मालक: स्वप्नील सीताराम फरकाडे<br />
              बनकिंन्होळा, ता. सिल्लोड,<br />
              जि. छत्रपती संभाजीनगर, ४३११३५
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-2">संपर्क</h4>
            <p className="text-amber-200/80 mb-2">मोबाईल / WhatsApp: 9822131534</p>
            <div className="flex gap-2">
              <a href="tel:9822131534" className="bg-amber-800 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
                कॉल करा
              </a>
              <a href="https://wa.me/919822131534" className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
                WhatsApp करा
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-amber-900 mt-8 pt-6 text-center text-xs text-amber-300/60">
          © {new Date().getFullYear()} फरकाडे पोल्ट्री फार्म. सर्व हक्क राखीव.
        </div>
      </footer>

      {/* Sticky Mobile Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 py-2 px-4 flex justify-between items-center md:hidden shadow-2xl print:hidden">
        <a
          href="tel:9822131534"
          className="flex-1 flex flex-col items-center justify-center text-gray-800 font-bold text-xs py-1"
        >
          <Phone size={18} className="text-blue-600 mb-0.5" />
          <span>कॉल</span>
        </a>
        <a
          href="https://wa.me/919822131534"
          className="flex-1 flex flex-col items-center justify-center text-gray-800 font-bold text-xs py-1 border-x border-gray-200"
        >
          <MessageCircle size={18} className="text-emerald-600 mb-0.5" />
          <span>WhatsApp</span>
        </a>
        <a
          href="#order-section"
          className="flex-1 flex flex-col items-center justify-center text-amber-900 font-bold text-xs py-1"
        >
          <span className="text-base leading-none mb-0.5">🥚</span>
          <span>ऑर्डर</span>
        </a>
      </div>
    </div>
  );
}
