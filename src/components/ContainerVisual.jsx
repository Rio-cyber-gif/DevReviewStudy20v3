import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileCode2, SearchCode } from 'lucide-react';

const LogicVisual = ({ isSecure }) => {
    return (
        <div className="relative w-full h-64 flex items-center justify-center perspective-1000">
            {/* メインの論理コア：四角い箱から、より「知性」を感じるダイヤ型/円形へ */}
            <motion.div
                className={`relative w-48 h-48 rounded-[2rem] border-2 flex items-center justify-center backdrop-blur-md transition-all duration-1000
                    ${isSecure
                        ? 'border-emerald-400 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.2)]'
                        : 'border-slate-300 bg-slate-50 shadow-inner'
                    }`}
                animate={{
                    y: [0, -10, 0],
                    rotate: isSecure ? [0, 90, 180, 270, 360] : 0,
                    borderRadius: isSecure ? ["2rem", "50%", "2rem"] : "2rem"
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {/* 背景のグラデーション演出 */}
                <div className={`absolute inset-0 bg-gradient-to-br opacity-20 rounded-[2rem] ${isSecure ? 'from-emerald-400 to-cyan-400' : 'from-slate-400 to-transparent'}`} />

                {/* 内部アイコン：状況に応じて「解析中」から「完成」へ変化 */}
                <motion.div
                    className={`w-24 h-24 rounded-2xl flex items-center justify-center
                        ${isSecure ? 'text-emerald-500' : 'text-slate-400'}
                    `}
                    animate={isSecure
                        ? { scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }
                        : { y: [0, 5, 0] }
                    }
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    {isSecure ? (
                        <Sparkles className="w-16 h-16 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    ) : (
                        <SearchCode className="w-16 h-16 opacity-60" />
                    )}
                </motion.div>

                {/* 周囲を回る小さな論理の破片（パーティクル） */}
                {isSecure && [0, 120, 240].map((angle, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                        animate={{
                            rotate: 360,
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{ originX: "100px", originY: "0px" }}
                    />
                ))}

            </motion.div>

            {/* 足元の光（プラットフォーム） */}
            <motion.div
                className={`absolute bottom-4 w-40 h-4 rounded-[100%] blur-2xl transition-colors duration-1000
                    ${isSecure ? 'bg-emerald-400/30' : 'bg-slate-300/40'}
                `}
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
            />
        </div>
    );
};

export default LogicVisual;