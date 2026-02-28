import React, { useState, useEffect } from 'react';
import { Terminal, Lightbulb, CheckCircle2, AlertTriangle, Code2, ArrowRight, Sparkles, BookOpen, Eye } from 'lucide-react';
import Editor from 'react-simple-code-editor';

// PrismJS：React/JSX用のハイライト設定に更新
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-tomorrow.css';

const EditorView = ({ mission, isVerified, isRevealed, isAnalyzing, onAnalyzeStart, onAnalyzeEnd, onSuccess, onFailure, onReveal, onNext, isLast }) => {
    const [code, setCode] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [originalCode, setOriginalCode] = useState('');
    const [showBefore, setShowBefore] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (mission) {
            setCode(mission.code);
            setOriginalCode(mission.code);
            setErrorMsg('');
            setShowBefore(false);
            setShowConfirm(false);
        }
    }, [mission]);

    if (!mission) return null;

    // React (JSX) 用のハイライト関数
    const highlightCode = (input) => {
        // Prism.languages.jsx があれば使用、なければ javascript、それもなければプレーンテキスト
        const lang = Prism.languages.jsx || Prism.languages.javascript;
        if (lang) {
            return Prism.highlight(input, lang, 'jsx');
        }
        return input;
    };

    const handleInspect = () => {
        if (isAnalyzing || isVerified) return;
        onAnalyzeStart();
        setErrorMsg('');

        setTimeout(() => {
            onAnalyzeEnd();

            try {
                const normalize = (str) =>
                    str.replace(/[\u3000]/g, ' ')
                        .replace(/\r\n|\r|\n/g, ' ')
                        .replace(/\s+/g, ' ')
                        .trim();

                const userCode = normalize(code);
                const original = normalize(originalCode);

                if (userCode === original) {
                    setErrorMsg("⚠ コードが修正されていません。ヒントを参考にコードを修正してください。");
                    onFailure(10);
                    return;
                }

                const keywords = mission.keywords || [];
                const removeKeywords = mission.removeKeywords || [];
                const hasAllKeywords = keywords.length === 0 || keywords.every(kw => code.includes(kw));
                const removedBadKeywords = removeKeywords.length === 0 || removeKeywords.every(kw => !code.includes(kw));

                // React/JS用にコメント除去ロジックを修正 (// と /* */ を除去)
                const strictNormalize = (str) =>
                    str.replace(/[\u3000]/g, ' ')
                        .replace(/\r\n|\r|\n/g, '')
                        .replace(/\s+/g, '')
                        .replace(/\/\/.*$/gm, '')           // 行コメント除去
                        .replace(/\/\*[\s\S]*?\*\//g, '');  // ブロックコメント除去

                const userStrict = strictNormalize(code);
                const correctStrict = strictNormalize(mission.correctCode);
                const isExactMatch = userStrict === correctStrict;

                if (isExactMatch || (hasAllKeywords && removedBadKeywords)) {
                    onSuccess();
                } else if (!hasAllKeywords) {
                    setErrorMsg("論理エラー: 正解に必要な修正パターン（キーワード）が見つかりません。");
                    onFailure(10);
                } else if (!removedBadKeywords) {
                    setErrorMsg("論理エラー: 修正すべき古いコードが残っています。");
                    onFailure(10);
                } else {
                    setErrorMsg("論理エラー: 実装が演習の要件を満たしていません。");
                    onFailure(10);
                }
            } catch (e) {
                setErrorMsg("システムエラー: 構文解析に失敗しました。");
                onFailure(10);
            }
        }, 1200);
    };

    const handleRevealConfirm = () => {
        setShowConfirm(false);
        onReveal();
    };

    if (isVerified) {
        return (
            <div className="glass-panel rounded-2xl flex flex-col flex-1 overflow-hidden relative">
                <div className={`${isRevealed ? 'bg-sky-500/10 border-b border-sky-500/30' : 'bg-emerald-500/10 border-b border-emerald-500/30'} px-6 py-4 flex items-center gap-3 shrink-0`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${isRevealed ? 'bg-sky-500/20 border-sky-500/40' : 'bg-emerald-500/20 border-emerald-500/40'}`}>
                        {isRevealed ? <Eye className="w-5 h-5 text-sky-400" /> : <Sparkles className="w-5 h-5 text-emerald-400" />}
                    </div>
                    <div>
                        <h2 className={`text-lg font-black tracking-tight ${isRevealed ? 'text-sky-400' : 'text-emerald-400'}`}>
                            {isRevealed ? '解答確認完了' : 'ミッションクリア！'}
                        </h2>
                        <p className={`text-xs font-mono ${isRevealed ? 'text-sky-300/70' : 'text-emerald-300/70'}`}>
                            Step {String(mission.id).padStart(2, '0')} — {mission.title}
                        </p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <Code2 className="w-4 h-4 text-indigo-400" />
                            <h3 className="text-sm font-black uppercase tracking-widest text-indigo-400">コード比較</h3>
                        </div>
                        <div className="flex gap-2 mb-3">
                            <button onClick={() => setShowBefore(false)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${!showBefore ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800/50 text-slate-400'}`}>正解のコード</button>
                            <button onClick={() => setShowBefore(true)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${showBefore ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800/50 text-slate-400'}`}>元のコード</button>
                        </div>
                        <div className="rounded-xl border p-4 font-mono text-sm bg-slate-950/70 border-slate-800 overflow-x-auto custom-scrollbar">
                            <pre className="m-0"><code dangerouslySetInnerHTML={{ __html: highlightCode(showBefore ? originalCode : mission.correctCode) }} /></pre>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <BookOpen className="w-4 h-4 text-indigo-400" />
                            <h3 className="text-sm font-black uppercase tracking-widest text-indigo-400">論理解説</h3>
                        </div>
                        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5">
                            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{mission.explanation}</p>
                        </div>
                    </section>

                    <div className="flex justify-center pt-2 pb-4">
                        <button onClick={onNext} className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2">
                            {isLast ? "全ミッション完了 🏆" : "次のミッションへ"}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {showConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <Eye className="w-6 h-6 text-sky-400" />
                            <h3 className="text-lg font-bold text-white">解答を表示しますか？</h3>
                        </div>
                        <p className="text-slate-400 text-sm mb-6">正解のコードと解説を確認できます。このステップは完了扱いとなります。</p>
                        <div className="flex gap-3 justify-end">
                            <button onClick={() => setShowConfirm(false)} className="px-5 py-2 text-slate-400 hover:text-white transition-colors">キャンセル</button>
                            <button onClick={handleRevealConfirm} className="px-5 py-2 bg-sky-600 text-white rounded-lg font-bold">答えを見る</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="glass-panel rounded-2xl p-6 flex flex-col shrink-0">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-800">
                    <Terminal className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-lg font-bold text-slate-200">ミッション目標</h2>
                </div>
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">{mission.objective}</p>
                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4 flex gap-3">
                    <Lightbulb className="w-5 h-5 text-indigo-400 shrink-0" />
                    <p className="text-indigo-200/90 text-sm">{mission.hint}</p>
                </div>
            </div>

            <div className="glass-panel rounded-2xl flex flex-col flex-1 overflow-hidden">
                <div className="bg-slate-950/80 border-b border-slate-800 px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                        <Code2 className="w-4 h-4" />
                        <span>App.jsx</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">React Implementation</span>
                </div>

                <div className="flex-1 relative bg-[#0d1117] overflow-y-auto custom-scrollbar">
                    <Editor
                        value={code}
                        onValueChange={c => setCode(c)}
                        highlight={highlightCode}
                        padding={20}
                        style={{ fontFamily: '"Fira Code", monospace', fontSize: 16, lineHeight: '1.75' }}
                        textareaClassName="focus:outline-none"
                    />
                </div>

                <div className="bg-slate-900 border-t border-slate-800 p-4 flex items-center justify-between">
                    <div className="flex-1 text-amber-400 text-xs font-mono">
                        {errorMsg && <div className="flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" />{errorMsg}</div>}
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setShowConfirm(true)} className="px-4 py-2 text-slate-400 text-sm font-bold hover:text-sky-400 transition-colors">答えを確認</button>
                        <button onClick={handleInspect} disabled={isAnalyzing} className="px-8 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-sm shadow-lg disabled:opacity-50">
                            {isAnalyzing ? "解析中..." : "検査を実行"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditorView;