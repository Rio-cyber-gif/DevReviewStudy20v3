import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, X } from 'lucide-react';

const PrivacyModal = ({ isOpen, onClose }) => {
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
                            <ShieldAlert className="w-6 h-6 text-indigo-400" />
                            <h2 className="text-xl font-bold text-slate-200 tracking-tight">プライバシーポリシー</h2>
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
                            本アプリケーションは、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。
                        </p>

                        <h3 className="font-bold text-indigo-400 border-b border-slate-800 pb-2">第1条（個人情報の収集）</h3>
                        <p>当アプリケーションは、学習進度（クリア状況やスコア）をユーザーのブラウザ（ローカルストレージ）にのみ保存し、外部サーバーへのデータ送信は行っておりません。</p>

                        <h3 className="font-bold text-indigo-400 border-b border-slate-800 pb-2">第2条（利用目的）</h3>
                        <p>保存されたデータは、本アプリケーション内での進行状況の復元やスコア表示の目的のみに使用されます。</p>

                        <h3 className="font-bold text-indigo-400 border-b border-slate-800 pb-2">第3条（お問い合わせ）</h3>
                        <p>本ポリシーに関するご質問は、アプリケーションの開発者までお問い合わせください。</p>
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

export default PrivacyModal;
