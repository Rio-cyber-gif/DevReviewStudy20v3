import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Activity, BookOpen, RotateCcw, AlertTriangle } from 'lucide-react';

const LogicVisual = ({ isVerified, isRevealed, isResetting, isAnalyzing, isError, level, currentMission }) => {
    // Priority: resetting > error > revealed > verified > analyzing > idle
    const coreColor = isResetting ? "text-slate-600"
        : isError ? "text-red-400"
            : isRevealed ? "text-sky-400"
                : isVerified ? "text-emerald-400" : isAnalyzing ? "text-amber-400" : "text-indigo-400";

    const bgRing = isResetting ? "border-slate-700/10"
        : isError ? "border-red-500/30"
            : isRevealed ? "border-sky-500/20"
                : isVerified ? "border-emerald-500/20" : isAnalyzing ? "border-amber-500/20" : "border-indigo-500/20";

    const shapeBorder = isResetting ? 'border-slate-700/30 shadow-none'
        : isError ? 'border-red-500/60 shadow-red-500/40'
            : isRevealed ? 'border-sky-500/50 shadow-sky-500/30'
                : isVerified ? 'border-emerald-500/50 shadow-emerald-500/20' : isAnalyzing ? 'border-amber-500/60 shadow-amber-500/40' : 'border-indigo-500/50 shadow-indigo-500/20';

    const shapeGradient = isResetting ? 'from-slate-800/10 to-transparent'
        : isError ? 'from-red-500/30 to-transparent'
            : isRevealed ? 'from-sky-500/20 via-white/5 to-transparent'
                : isVerified ? 'from-emerald-500/20 to-transparent' : isAnalyzing ? 'from-amber-500/20 to-transparent' : 'from-indigo-500/10 to-transparent';

    const statusText = isResetting ? 'システム初期化中...'
        : isError ? '論理エラー検出'
            : isRevealed ? '知恵を授与中...'
                : isVerified ? '論理最適化達成' : isAnalyzing ? '検査エンジン起動中...' : '解析待機中';

    return (
        <div className="glass-panel flex-1 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-grid-white opacity-20 pointer-events-none" />

            {/* Orbiting rings */}
            <motion.div
                animate={{ rotate: isAnalyzing ? 360 * 3 : 360 }}
                transition={{ duration: isResetting ? 60 : isRevealed ? 30 : isAnalyzing ? 1.2 : 20, repeat: Infinity, ease: "linear" }}
                className={`absolute w-64 h-64 rounded-full border border-dashed ${bgRing} transition-all duration-700 ${isResetting ? 'opacity-10' : 'opacity-50'}`}
            />
            <motion.div
                animate={{ rotate: isAnalyzing ? -360 * 3 : -360 }}
                transition={{ duration: isResetting ? 50 : isRevealed ? 25 : isAnalyzing ? 1 : 15, repeat: Infinity, ease: "linear" }}
                className={`absolute w-48 h-48 rounded-full border ${bgRing} transition-all duration-700 ${isResetting ? 'opacity-5' : 'opacity-30'}`}
            />

            {/* Central Core Shape (Rhombus/Diamond) */}
            <motion.div
                initial={false}
                animate={{
                    scale: isResetting ? [1, 0.6, 0.8, 1]
                        : isError ? [1, 1.15, 0.9, 1.1, 1]
                            : isRevealed ? [1, 1.05, 1]
                                : isVerified ? [1, 1.1, 1]
                                    : isAnalyzing ? [1, 1.2, 0.9, 1.1]
                                        : 1,
                    rotate: isError ? [0, -8, 8, -6, 6, -3, 3, 0]
                        : isVerified || isRevealed || isResetting ? 0
                            : isAnalyzing ? 360 * 2
                                : [0, 5, -5, 0],
                    opacity: isResetting ? [0.2, 0.5, 0.3, 1]
                        : isError ? [1, 0.5, 1, 0.5, 1]
                            : isRevealed ? [0.7, 1, 0.7]
                                : 1,
                }}
                transition={{
                    duration: isError ? 0.6 : isResetting ? 2.3 : isRevealed ? 3 : isVerified ? 2 : isAnalyzing ? 1.2 : 4,
                    repeat: isResetting || isError ? 0 : Infinity,
                    ease: "easeInOut"
                }}
                className={`w-32 h-32 relative flex items-center justify-center z-10 transition-all duration-700`}
            >
                <div className={`absolute inset-0 rotate-45 border-2 bg-slate-950/40 backdrop-blur-md shadow-2xl transition-colors duration-700 ${shapeBorder}`}>
                    <div className={`absolute inset-0 bg-gradient-to-br transition-colors duration-700 ${shapeGradient}`} />
                </div>

                <div className="z-10 relative">
                    {isResetting ? (
                        <RotateCcw className={`w-12 h-12 ${coreColor} animate-[spin_1s_linear_infinite]`} />
                    ) : isError ? (
                        <AlertTriangle className={`w-12 h-12 ${coreColor} drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]`} />
                    ) : isRevealed ? (
                        <BookOpen className={`w-12 h-12 ${coreColor} drop-shadow-[0_0_12px_rgba(56,189,248,0.6)] animate-pulse`} />
                    ) : isVerified ? (
                        <Sparkles className={`w-12 h-12 ${coreColor} drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]`} />
                    ) : isAnalyzing ? (
                        <Activity className={`w-12 h-12 ${coreColor} animate-[spin_0.5s_linear_infinite] drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]`} />
                    ) : (
                        <Activity className={`w-12 h-12 ${coreColor} animate-pulse`} />
                    )}
                </div>
            </motion.div>

            {/* Status Text Area */}
            <div className="absolute bottom-8 left-8 right-8 bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center justify-between z-20">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">コアステータス</span>
                    <span className={`text-xs font-mono font-bold tracking-tight ${coreColor}`}>
                        {statusText}
                    </span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">精度</span>
                    <span className="text-xs font-mono text-slate-300">{level}%</span>
                </div>
            </div>

            <div className="absolute top-6 left-6 text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                SYS.NODE.{currentMission?.id.toString().padStart(3, '0')}
            </div>
        </div>
    );
};

export default LogicVisual;
