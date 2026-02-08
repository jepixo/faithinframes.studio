
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface ContactProps {
  initialService?: string;
}

const Contact: React.FC<ContactProps> = ({ initialService = '' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section id="contact" className="min-h-screen pt-[120px] pb-20 pl-12 bg-black text-white border-t border-neutral-900 flex flex-col justify-center">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center pr-12 pb-20">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-600 mb-10">[ INQUIRY SYSTEM 04 ]</div>
            <h2 className="text-[8vw] font-black leading-[0.8] tracking-tighter uppercase mb-16 font-heading">
              LET'S<br /><span>BUILD</span>
            </h2>
            <div className="space-y-2 font-mono">
              <div className="group">
                <p className="text-[10px] text-neutral-600 tracking-widest uppercase mb-1">DATA POINT / EMAIL</p>
                <a href="mailto:hello@faithinframes.studio" className="text-lg md:text-2xl font-black uppercase tracking-tighter group-hover:text-red-600 transition-colors font-heading">faithinframes.studio@gmail.com</a>
              </div>
              <div className="group">
                <p className="text-[10px] text-neutral-600 tracking-widest uppercase mb-1">DATA POINT / PHONE</p>
                <a href="tel:+917387033998" className="text-lg md:text-2xl font-black uppercase tracking-tighter group-hover:text-red-600 transition-colors font-heading">+91 98816 76527</a>
              </div>
              <div className="group">
                <p className="text-[10px] text-neutral-600 tracking-widest uppercase mb-1">DATA POINT / INSTAGRAM</p>
                <a href="#" className="text-lg md:text-2xl font-black uppercase tracking-tighter group-hover:text-red-600 transition-colors font-heading">@faithinframes.studio</a>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 p-8 md:p-16 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-20 text-center"
                >
                  <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mx-auto mb-8">
                    <Check size={32} />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 font-heading">MESSAGE SENT SUCCESSFULLY</h3>
                  <p className="font-mono text-xs text-neutral-400">Our agents will contact your terminal within 24 hours.</p>
                  <button onClick={() => setIsSubmitted(false)} className="mt-12 font-mono text-[10px] uppercase tracking-[0.3em] underline">SEND ANOTHER</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="space-y-8">
                    <div className="relative group">
                      <input required type="text" className="w-full bg-transparent border-b-2 border-neutral-800 py-4 focus:border-white transition-colors outline-none text-lg font-black uppercase tracking-tighter placeholder:text-neutral-700 font-heading" placeholder="NAME IDENTIFIER" />
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-focus-within:w-full bg-red-600 transition-all duration-500" />
                    </div>
                    <div className="relative group">
                      <input required type="email" className="w-full bg-transparent border-b-2 border-neutral-800 py-4 focus:border-white transition-colors outline-none text-lg font-black uppercase tracking-tighter placeholder:text-neutral-700 font-heading" placeholder="ELECTRONIC MAIL" />
                    </div>
                    <div className="relative group">
                      <textarea required rows={4} className="w-full bg-transparent border-b-2 border-neutral-800 py-4 focus:border-white transition-colors outline-none text-lg font-black uppercase tracking-tighter placeholder:text-neutral-700 resize-none font-heading" placeholder="PROJECT SPECIFICATIONS"></textarea>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="w-full bg-white text-black py-6 font-black text-xs uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-4 font-heading"
                  >
                    {isSubmitting ? 'PROCESSING...' : 'SUBMIT INITIAL BRIEF'}
                    <span className="text-xl">↗</span>
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Simplified Integrated Footer Panel */}
        <div className="pt-20 border-t border-neutral-900">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div>
              <p className="font-mono text-[9px] text-neutral-400 uppercase leading-relaxed">
                GARVE RESIDENCY PIMPLE GURAV, PUNE, INDIA
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="font-mono text-[9px] text-neutral-700 uppercase tracking-[0.2em]">
                © ALL RIGHTS RESERVED / FAITHINFRAMES 2026
              </div>
              <div className="px-3 py-1 border border-neutral-800 text-[9px] font-mono text-neutral-500 uppercase">
                BUILT BY JEPIXO
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
