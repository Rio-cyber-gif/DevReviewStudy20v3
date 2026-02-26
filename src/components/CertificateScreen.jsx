import React from 'react';
import { motion } from 'framer-motion';
import { Award, Sparkles, ArrowLeft, TrendingUp } from 'lucide-react';

// 統計項目をきれいに並べるためのサブコンポーネント
const StatBox = ({ label, value, colorClass, icon: Icon }) => (
    <div className="text-center flex flex-col items-center min-w-[100px]">
        <div className={`text-3xl font-black font-mono mb-1 ${colorClass}`}>
            {value}
        </div>
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
            {Icon && <Icon className="w-3 h-3" />}
            {label}
        </div>
    </div>
);

const CertificateScreen = ({ 
    onBackToDashboard, 
    points = 0,         // 親から渡されたポイント
    rank = "S",          // ランク
    completedCount = 20  // 攻略数
}) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center overflow-hidden p-4"
        >
            {/* 背景演出：ネオン輝度 */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />
            </div>

            {/* 認定証本体 */}
            <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="relative max-w-2xl w-full"
            >
                {/* 外枠フレーム */}
                <div className="relative border border-cyan-500/30 rounded-[2.5rem] p-1.5 bg-slate-900/40 backdrop-blur-xl shadow-2xl">
                    <div className="border border-slate-700/50 rounded-[2.2rem] p-8 sm:p-12 bg-slate-900/80 text-center relative overflow-hidden">
                        
                        {/* 四隅の装飾 */}
                        <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-cyan-400/30 rounded-tl-xl" />
                        <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-cyan-400/30 rounded-tr-xl" />
                        <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-cyan-400/30 rounded-bl-xl" />
                        <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-cyan-400/30 rounded-br-xl" />

                        {/* 中央のアイコン演出 */}
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className="relative mx-auto mb-8 w-24 h-24 flex items-center justify-center"
                        >
                            <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full" />
                            <div className="absolute inset-0 rotate-45 border-2 border-cyan-400/40 bg-slate-900 shadow-[0_0_20px_rgba(34,211,238,0.2)]" />
                            <Sparkles className="w-12 h-12 text-cyan-400 relative z-10" />
                        </motion.div>

                        {/* テキスト情報 */}
                        <div className="space-y-2 mb-10">
                            <span className="text-cyan-400/60 text-[10px] font-bold tracking-[0.5em] uppercase">
                                Recognition of Excellence
                            </span>
                            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                                MASTER LOGICIAN
                            </h1>
                            <div className="text-slate-500 font-mono text-xs tracking-[0.3em] mt-4">— 論理検証ラボ：Phase 2認定証 —</div>
                        </div>

                        {/* 重要：ポイント出力セクション */}
                        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 py-8 border-y border-slate-800/50 mb-10">
                            <StatBox label="Rank" value={rank} colorClass="text-amber-400" />
                            
                            {/* ここで points を出力しています */}
                            <StatBox 
                                label="Total Points" 
                                value={points.toLocaleString()} 
                                colorClass="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" 
                                icon={TrendingUp}
                            />

                            <StatBox label="Cleared" value={`${completedCount}/20`} colorClass="text-cyan-400" />
                        </div>

                        {/* フッター装飾 */}
                        <div className="flex justify-center gap-3 mb-10 text-cyan-400/40">
                            {[...Array(5)].map((_, i) => <Award key={i} className="w-5 h-5" />)}
                        </div>

                        {/* ダッシュボードに戻るボタン */}
                        <button
                            onClick={onBackToDashboard}
                            className="group relative px-12 py-4 bg-transparent overflow-hidden rounded-xl transition-all"
                        >
                            <div className="absolute inset-0 bg-cyan-600 group-hover:bg-cyan-500 transition-colors" />
                            <div className="relative flex items-center gap-3 text-white font-bold">
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                ダッシュボードに戻る
                            </div>
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CertificateScreen;