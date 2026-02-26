import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, Terminal, Target, Code2 } from 'lucide-react';

const TutorialModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ scale: 0.95, y: 10, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.95, y: 10, opacity: 0 }}
                    className="bg-slate-900 border border-slate-700/50 rounded-2xl max-w-2xl w-full flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden z-10 max-h-[90vh]"
                >
                    <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/80 sticky top-0 z-20">
                        <div className="flex items-center gap-3">
                            <BookOpen className="w-6 h-6 text-indigo-400" />
                            <h2 className="text-xl font-bold text-slate-200 tracking-tight">使い方ガイド</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-slate-200"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6 overflow-y-auto custom-scrollbar space-y-8">
                        {/* Section 1 */}
                        <section>
                            <h3 className="text-sm font-black uppercase tracking-widest text-indigo-400 mb-3 flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                1. 目的
                            </h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                論理検証ラボ：Phase 2は、コードレビュー能力を高めるための学習アプリです。提供されるサンプルコードに含まれるアンチパターン、セキュリティリスク、論理的な欠陥を特定し、ソフトウェアエンジニアリングの原則に基づいて最適化してください。
                            </p>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h3 className="text-sm font-black uppercase tracking-widest text-indigo-400 mb-3 flex items-center gap-2">
                                <Code2 className="w-4 h-4" />
                                2. 進め方
                            </h3>
                            <ul className="space-y-4 text-sm text-slate-300">
                                <li className="flex gap-3">
                                    <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center font-mono text-xs shrink-0 border border-slate-700">01</div>
                                    <p className="leading-relaxed">上部の<strong>「ミッション目標」</strong>と<strong>「論理ヒント」</strong>を読み、現在の演習で何を修正すべきかを理解します。</p>
                                </li>
                                <li className="flex gap-3">
                                    <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center font-mono text-xs shrink-0 border border-slate-700">02</div>
                                    <p className="leading-relaxed"><strong>implementation.src</strong> エディタ内の問題のあるコードを修正します。ヒントに沿って論理的な修正を行ってください。</p>
                                </li>
                                <li className="flex gap-3">
                                    <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center font-mono text-xs shrink-0 border border-slate-700">03</div>
                                    <p className="leading-relaxed"><strong>「検査を実行」</strong>ボタンをクリックします。正解すると解説と正解コードが表示され、次の演習に進めます。</p>
                                </li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section>
                            <h3 className="text-sm font-black uppercase tracking-widest text-indigo-400 mb-3 flex items-center gap-2">
                                <Terminal className="w-4 h-4" />
                                3. 評価指標
                            </h3>
                            <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 text-sm text-slate-300 space-y-3">
                                <div className="flex justify-between items-center border-b border-slate-800/50 pb-2">
                                    <span className="text-slate-400">完璧な論理スコア</span>
                                    <span className="font-mono font-bold text-emerald-400">精度 100%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">検査失敗ペナルティ</span>
                                    <span className="font-mono font-bold text-amber-500">精度 -10%</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-2 italic">※ 高精度のまま演習を完了すると最適な評価が得られます。</p>
                            </div>
                        </section>
                    </div>

                    <div className="p-6 border-t border-slate-800 bg-slate-900/80 flex justify-end shrink-0">
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow-lg shadow-indigo-500/20 transition-all font-sans text-sm tracking-wide"
                        >
                            閉じる
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default TutorialModal;
