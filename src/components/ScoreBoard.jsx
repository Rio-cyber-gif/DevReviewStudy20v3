import React from 'react';
import { Trophy, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScoreBoard = ({ score, accuracy, isVerified }) => {
    return (
        <div className="flex items-center gap-8 shrink-0">

            {/* Total Points */}
            <div className="flex flex-col items-end">
                <span className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase opacity-80 mb-1">
                    レビュースコア
                </span>
                <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-indigo-500" />
                    <span className="text-3xl font-black font-mono text-indigo-100 tracking-tight">
                        {score.toLocaleString()} <span className="text-sm font-bold text-indigo-400/80">pts</span>
                    </span>
                </div>
            </div>

            <div className="w-px h-10 bg-slate-700/50" />

            {/* Accuracy */}
            <div className="flex flex-col items-end min-w-[140px]">
                <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors duration-500 mb-1 ${isVerified ? 'text-emerald-400' : 'text-amber-500'}`}>
                    精度
                </span>

                <div className="h-8 flex items-center justify-end relative">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={isVerified ? "verified" : accuracy}
                            initial={{ y: -20, opacity: 0, scale: 0.8 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className={`flex items-center gap-2 ${isVerified ? 'text-emerald-400' : 'text-amber-400'}`}
                        >
                            <Target className="w-5 h-5" />
                            <span className="font-black font-mono text-3xl tracking-tight">
                                {isVerified ? 100 : accuracy}%
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ScoreBoard;
