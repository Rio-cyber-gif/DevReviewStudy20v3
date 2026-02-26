import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen, Target } from 'lucide-react';

const SuccessModal = ({ isOpen, mission, onNext, isLast, onClose }) => {
    if (!isOpen || !mission) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 20, opacity: 0 }}
                    className="bg-slate-900 border border-slate-700/50 rounded-2xl max-w-2xl w-full p-8 shadow-[0_0_50px_rgba(99,102,241,0.15)] relative overflow-hidden z-10"
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                    <div className="flex flex-col items-center mb-8 relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-4 border border-indigo-500/50 shadow-inner glow-effect">
                            <Sparkles className="w-8 h-8 text-indigo-400" />
                        </div>
                        <h2 className="text-3xl font-black text-white text-center tracking-tight">
                            VERIFICATION COMPLETE
                        </h2>
                        <div className="text-indigo-400 font-mono text-sm mt-2 flex items-center gap-1.5 font-bold">
                            <Target className="w-4 h-4" />
                            + {mission.rewardYen} PTS GRANTED
                        </div>
                    </div>

                    <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-800/80 mb-6 relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <BookOpen className="w-5 h-5 text-emerald-400" />
                            <h3 className="font-bold text-slate-200 uppercase tracking-wider text-sm">Optimal Logic</h3>
                        </div>

                        <div className="mb-5">
                            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400 whitespace-pre-wrap shadow-inner">
                                {mission.modelAnswer}
                            </div>
                        </div>

                        <div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-1.5">Documentation</div>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {mission.explanation}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center relative z-50 mt-4 pb-2">
                        <button
                            onClick={onNext}
                            className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                        >
                            {isLast ? "Return to Dashboard" : "Initiate Next Drill"}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default SuccessModal;
