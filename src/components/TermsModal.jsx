import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X } from 'lucide-react';

const TermsModal = ({ isOpen, onClose }) => {
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
                            <FileText className="w-6 h-6 text-indigo-400" />
                            <h2 className="text-xl font-bold text-slate-200 tracking-tight">利用規約</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-slate-200"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6 overflow-y-auto custom-scrollbar space-y-6 text-slate-300 text-sm leading-relaxed">
                        <p>
                            本サービス（論理検証ラボ：Phase 3）は学習用アプリケーションです。以下の規約に同意の上でご利用ください。
                        </p>

                        <h3 className="font-bold text-indigo-400 border-b border-slate-800 pb-2">第1条（適用）</h3>
                        <p>本規約は、ユーザーと当アプリケーションとの間の利用に関わる一切の関係に適用されます。</p>

                        <h3 className="font-bold text-indigo-400 border-b border-slate-800 pb-2">第2条（禁止事項）</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>法令または公序良俗に違反する行為</li>
                            <li>犯罪行為に関連する行為</li>
                            <li>当アプリケーションのサーバーやネットワークの機能を破壊したり、妨害したりする行為</li>
                        </ul>

                        <h3 className="font-bold text-indigo-400 border-b border-slate-800 pb-2">第3条（免責事項）</h3>
                        <p>当方は、本サービスに事実上または法律上の瑕疵がないことを明示的にも黙示的にも保証しておりません。利用によって生じた損害について一切の責任を負いません。</p>
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

export default TermsModal;
