'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Mail, Instagram, ArrowRight, Moon, Sun, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';
import { subscribeEmail } from '@/app/actions';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30); 
    const targetTime = targetDate.getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0, filter: 'blur(10px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const bgVariants: Variants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1, 
        transition: { duration: 2.5, ease: "easeOut" }
    },
    loop: {
        scale: [1, 1.05, 1],
        transition: { 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "mirror", 
            ease: "linear" 
        }
    }
  }

  const floatingVariant: Variants = {
    loop: {
        y: [0, -10, 0],
        transition: {
            duration: 5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
        }
    }
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Dynamic Styles
  const bgClass = isDarkMode ? 'bg-black' : 'bg-gray-100';
  const textSubClass = isDarkMode ? 'text-gray-200' : 'text-stone-600'; 
  const textMutedClass = isDarkMode ? 'text-gray-300' : 'text-stone-500';
  const backgroundImage = isDarkMode ? '/cinematic-bg.png' : '/marble-bg.png';
  
  const overlayGradient = isDarkMode 
    ? 'bg-gradient-to-b from-black/50 via-transparent to-black/80' 
    : 'bg-gradient-to-b from-white/40 via-transparent to-white/90';

  return (
    <main className={clsx(
        "min-h-screen flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden transition-colors duration-700 ease-in-out",
        bgClass
    )}>
        
        {/* Background Image with Overlay */}
        <AnimatePresence mode="wait">
            <motion.div 
                key={isDarkMode ? 'dark' : 'light'}
                variants={bgVariants}
                initial={["hidden", "loop"]}
                animate={["visible", "loop"]}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                className="absolute inset-0 z-0"
            >
                <div 
                    className={clsx(
                        "absolute inset-0 bg-cover bg-center transition-all duration-700",
                        isDarkMode ? "opacity-70 mix-blend-screen" : "opacity-100 mix-blend-multiply" 
                    )}
                    style={{ backgroundImage: `url('${backgroundImage}')` }}
                />
                
                {/* Vignette & Gradient Overlay */}
                <div className={clsx("absolute inset-0 transition-opacity duration-700", overlayGradient)} />
            </motion.div>
        </AnimatePresence>
        
        {/* Theme Toggle Button */}
        <button 
            onClick={toggleTheme}
            className={clsx(
                "absolute top-6 right-6 z-40 p-3 rounded-full border transition-all duration-300 hover:scale-110 active:scale-95",
                isDarkMode 
                    ? "bg-white/10 border-white/20 text-white hover:bg-white/20" 
                    : "bg-black/5 border-black/10 text-stone-800 hover:bg-black/10"
            )}
            aria-label="Toggle Theme"
        >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-screen-lg w-full text-center z-10 flex flex-col items-center"
      >
        <motion.div variants={itemVariants} className="mb-6 md:mb-8">
            <span className={clsx(
                "text-xs md:text-sm font-sans tracking-[0.4em] uppercase font-semibold drop-shadow-lg transition-colors duration-500",
                textSubClass
            )}>
                A Visual Odyssey
            </span>
        </motion.div>
        
        {/* LOGO Integration */}
        <motion.div 
            variants={itemVariants} 
            className="mb-8 md:mb-12 relative w-48 h-24 sm:w-64 sm:h-32 md:w-96 md:h-48"
        >
            <Image 
                src="/logo.png" 
                alt="FOYOSBYTITO" 
                fill 
                className={clsx(
                    "object-contain drop-shadow-2xl transition-all duration-500",
                    // Removed filters to keep original logo colors
                )} 
            />
        </motion.div>

        <motion.div variants={floatingVariant} animate="loop" className="px-4">
            <motion.p 
                variants={itemVariants} 
                className={clsx(
                    "text-base sm:text-lg md:text-xl font-sans max-w-2xl mx-auto leading-relaxed mb-12 md:mb-16 font-medium drop-shadow-lg transition-colors duration-500",
                    isDarkMode ? "text-white" : "text-stone-800"
                )}
            >
            "Capturing the unspoken physics of light and shadow. A cinematic journey into the soul of the moment."
            </motion.p>
        </motion.div>

        {/* Minimalist Line Countdown */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-16 mb-12 md:mb-20 items-baseline w-full">
            <CountdownItem value={timeLeft.days} label="DAYS" isDarkMode={isDarkMode} />
            <div className={clsx("w-[1px] h-6 md:h-8 transition-colors duration-500", isDarkMode ? "bg-white/50" : "bg-stone-400")}></div>
            <CountdownItem value={timeLeft.hours} label="HRS" isDarkMode={isDarkMode} />
            <div className={clsx("w-[1px] h-6 md:h-8 transition-colors duration-500", isDarkMode ? "bg-white/50" : "bg-stone-400")}></div>
            <CountdownItem value={timeLeft.minutes} label="MIN" isDarkMode={isDarkMode} />
            <div className={clsx("w-[1px] h-6 md:h-8 transition-colors duration-500", isDarkMode ? "bg-white/50" : "bg-stone-400")}></div>
            <CountdownItem value={timeLeft.seconds} label="SEC" isDarkMode={isDarkMode} />
        </motion.div>

        {/* Action / Socials */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex gap-4">
                <SocialLink icon={<Instagram size={20} />} href="#" isDarkMode={isDarkMode} />
                <SocialLink icon={<Mail size={20} />} href="#" isDarkMode={isDarkMode} />
            </div>
            
            <button 
                onClick={toggleModal}
                className={clsx(
                    "group relative px-8 py-3 overflow-hidden rounded-full backdrop-blur-md border transition-all duration-300 shadow-xl",
                    isDarkMode 
                        ? "bg-white/10 border-white/30 hover:bg-white/20 text-white shadow-white/5" 
                        : "bg-stone-900 border-stone-800 text-white hover:bg-stone-800 shadow-stone-800/20"
                )}>
                <div className="absolute inset-0 w-3 bg-white/30 skew-x-12 -translate-x-12 group-hover:translate-x-44 transition-transform duration-700 ease-in-out"></div>
                <span className="relative text-xs font-sans tracking-widest uppercase flex items-center gap-3 font-semibold">
                    Notify Me <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
            </button>
        </motion.div>

      </motion.div>

      <footer className="absolute bottom-6 w-full text-center z-10">
        <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 0.3 }} 
            transition={{ delay: 2, duration: 1 }}
            className={clsx(
                "text-[10px] tracking-[0.3em] font-sans uppercase transition-colors duration-500",
                textMutedClass
            )}
        >
            Coming Soon &mdash; 2026
        </motion.p>
      </footer>

      {/* Notify Me Modal */}
      <AnimatePresence>
        {isModalOpen && (
            <NotifyModal onClose={toggleModal} isDarkMode={isDarkMode} />
        )}
      </AnimatePresence>

    </main>
  );
}

function NotifyModal({ onClose, isDarkMode }: { onClose: () => void; isDarkMode: boolean }) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');
        
        const formData = new FormData(e.currentTarget);
        const result = await subscribeEmail(formData);

        if (result.success) {
            setStatus('success');
            setTimeout(onClose, 3000);
        } else {
            setStatus('error');
            setErrorMessage(result.error || 'Something went wrong.');
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className={clsx(
                    "w-full max-w-sm rounded-[2rem] p-8 md:p-10 relative overflow-hidden backdrop-blur-xl border shadow-2xl transition-all duration-500",
                    isDarkMode 
                        ? "bg-black/40 border-white/10 shadow-black/50" 
                        : "bg-white/60 border-white/40 shadow-stone-300/50"
                )}
            >
                {/* Modal Glow Effect */}
                <div className={clsx("absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] pointer-events-none opacity-40", isDarkMode ? "bg-white/10" : "bg-stone-300")} />

                <button 
                    onClick={onClose}
                    className={clsx(
                        "absolute top-6 right-6 p-2 rounded-full transition-colors z-50 cursor-pointer",
                         isDarkMode ? "text-gray-400 hover:text-white hover:bg-white/10" : "text-stone-500 hover:text-stone-900 hover:bg-black/5"
                    )}
                >
                    <X size={20} />
                </button>

                <div className="relative z-10">
                    <h3 className={clsx(
                        "text-2xl font-display font-medium mb-3",
                        isDarkMode ? "text-white" : "text-stone-900"
                    )}>
                        Get Notified
                    </h3>
                    <p className={clsx(
                        "text-sm font-sans mb-8 leading-relaxed opacity-90",
                        isDarkMode ? "text-gray-300" : "text-stone-600"
                    )}>
                        Be the first to know when individual works are released.
                    </p>

                    {status === 'success' ? (
                        <motion.div 
                            initial={{ opacity: 0, y: 5 }} 
                            animate={{ opacity: 1, y: 0 }}
                            className={clsx(
                                "flex flex-col items-center justify-center py-6 rounded-2xl",
                                isDarkMode ? "bg-white/5" : "bg-stone-100"
                            )}
                        >
                            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
                                <CheckCircle className="text-green-500" size={24} />
                            </div>
                            <span className={clsx("text-sm font-semibold tracking-wide", isDarkMode ? "text-white" : "text-stone-800")}>
                                You're on the list.
                            </span>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                             {status === 'error' && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }} 
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="text-red-500 text-xs flex items-center gap-2 bg-red-500/10 p-3 rounded-lg"
                                >
                                    <AlertCircle size={14} />
                                    {errorMessage}
                                </motion.div>
                            )}
                            <div className="relative group">
                                <Mail className={clsx(
                                    "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 pointer-events-none",
                                    isDarkMode ? "text-gray-500 group-focus-within:text-white" : "text-stone-400 group-focus-within:text-stone-800"
                                )} />
                                <input 
                                    name="email"
                                    type="email" 
                                    required 
                                    placeholder="your@email.com" 
                                    className={clsx(
                                        "w-full pl-11 pr-4 py-3.5 rounded-xl border outline-none font-sans text-sm transition-all duration-300",
                                        isDarkMode 
                                            ? "bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:bg-white/10 focus:border-white/30" 
                                            : "bg-white border-stone-200 text-stone-800 placeholder:text-stone-400 focus:border-stone-400"
                                    )}
                                />
                            </div>
                            
                            <button 
                                type="submit" 
                                disabled={status === 'loading'}
                                className={clsx(
                                    "w-full py-3.5 rounded-xl font-sans text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer relative z-20",
                                    isDarkMode 
                                        ? "bg-white text-black hover:bg-gray-200" 
                                        : "bg-stone-900 text-white hover:bg-stone-800"
                                )}
                            >
                                {status === 'loading' ? (
                                    <Loader2 className="animate-spin" size={16} />
                                ) : (
                                    <>Join Waitlist <ArrowRight size={14} /></>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

function CountdownItem({ value, label, isDarkMode }: { value: number; label: string; isDarkMode: boolean }) {
    return (
        <div className="flex flex-col items-center">
            <span className={clsx(
                "text-3xl sm:text-3xl md:text-5xl font-light font-sans tabular-nums tracking-tighter transition-colors duration-500 user-select-none",
                isDarkMode ? "text-white" : "text-stone-900"
            )}>
                {value.toString().padStart(2, '0')}
            </span>
            <span className={clsx(
                "text-[10px] md:text-[10px] uppercase tracking-widest mt-2 font-semibold transition-colors duration-500",
                 isDarkMode ? "text-gray-400" : "text-stone-500"
            )}>{label}</span>
        </div>
    );
}

function SocialLink({ icon, href, isDarkMode }: { icon: React.ReactNode; href: string, isDarkMode: boolean }) {
    return (
        <a 
            href={href} 
            className={clsx(
                "w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300",
                isDarkMode
                    ? "border-white/20 text-gray-300 hover:text-white hover:border-white/50 hover:bg-white/10"
                    : "border-stone-300 text-stone-500 hover:text-stone-900 hover:border-stone-800 hover:bg-stone-100"
            )}
        >
            {icon}
        </a>
    )
}
