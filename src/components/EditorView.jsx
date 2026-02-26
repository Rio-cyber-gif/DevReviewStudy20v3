import React, { useState, useEffect } from 'react';
import { Terminal, Lightbulb, CheckCircle2, AlertTriangle, Code2, ArrowRight, Sparkles, BookOpen, Eye } from 'lucide-react';
import Editor from 'react-simple-code-editor';

// PrismJSのインポート強化：指示通りの安全な読み込み
import Prism from 'prismjs';
import 'prismjs/components/prism-ruby';
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

    // セーフガード：ミッションデータがない場合は何も表示しない
    if (!mission) return null;

    // シンタックスハイライト：Prism.languages.ruby が未定義の場合のフォールバック
    const highlightCode = (input) => {
        if (Prism.languages.ruby) {
            return Prism.highlight(input, Prism.languages.ruby, 'ruby');
        }
        return input; // フォールバック：プレーンテキスト
    };

    const handleInspect = () => {
        if (isAnalyzing || isVerified) return;
        onAnalyzeStart();
        setErrorMsg('');

        setTimeout(() => {
            onAnalyzeEnd();

            try {
                // 表記の揺れ許容（全角スペース、各種改行コード、連続空白を統一）
                const normalize = (str) =>
                    str.replace(/[\u3000]/g, ' ') // 全角スペースを半角へ
                        .replace(/\r\n|\r|\n/g, ' ') // 改行をスペースへ
                        .replace(/\s+/g, ' ')        // 連続空白を1つへ
                        .trim();

                const userCode = normalize(code);
                const original = normalize(originalCode);

                // 1. コードが未変更の場合
                if (userCode === original) {
                    setErrorMsg("⚠ コードが修正されていません。ヒントを参考にコードを修正してください。");
                    onFailure(10);
                    return;
                }

                // 2. キーワードベースの検証
                const keywords = mission.keywords || [];
                const removeKeywords = mission.removeKeywords || [];

                // 正解に必要なキーワードがすべて含まれているか
                const hasAllKeywords = keywords.length === 0 || keywords.every(kw => code.includes(kw));

                // 修正すべきキーワードが除去されているか
                const removedBadKeywords = removeKeywords.length === 0 || removeKeywords.every(kw => !code.includes(kw));

                // 3. 正解コードとの類似度チェック（空白・コメント・改行無視で完全比較）
                const strictNormalize = (str) =>
                    str.replace(/[\u3000]/g, ' ')
                        .replace(/\r\n|\r|\n/g, '')
                        .replace(/\s+/g, '')
                        .replace(/[#].*$/gm, ''); // Rubyのコメントのみ除去

                const userStrict = strictNormalize(code);
                const correctStrict = strictNormalize(mission.correctCode);
                const isExactMatch = userStrict === correctStrict;

                if (isExactMatch || (hasAllKeywords && removedBadKeywords)) {
                    onSuccess();
                } else if (!hasAllKeywords) {
                    setErrorMsg("論理エラー: 正解に必要な修正パターンが見つかりません。ヒントを再確認してください。");
                    onFailure(10);
                } else if (!removedBadKeywords) {
                    setErrorMsg("論理エラー: 修正すべき問題のあるコードがまだ残っています。");
                    onFailure(10);
                } else {
                    setErrorMsg("論理エラー: 実装が演習の要件を満たしていません。");
                    onFailure(10);
                }
            } catch (e) {
                // 画面を壊さないよう、内部でエラーを受け流す
                setErrorMsg("システムエラー: 構文を評価できませんでした。");
                onFailure(10);
            }
        }, 1200);
    };

    const handleRevealConfirm = () => {
        setShowConfirm(false);
        onReveal();
    };

    // ── 復習モード（正解後 or 答え確認後） ──
    if (isVerified) {
        return (
            <div className="glass-panel rounded-2xl flex flex-col flex-1 overflow-hidden relative">
                {/* バナー */}
                <div className={`${isRevealed ? 'bg-sky-500/10 border-b border-sky-500/30' : 'bg-emerald-500/10 border-b border-emerald-500/30'} px-6 py-4 flex items-center gap-3 shrink-0`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${isRevealed ? 'bg-sky-500/20 border-sky-500/40' : 'bg-emerald-500/20 border-emerald-500/40'}`}>
                        {isRevealed ? (
                            <Eye className="w-5 h-5 text-sky-400" />
                        ) : (
                            <Sparkles className="w-5 h-5 text-emerald-400" />
                        )}
                    </div>
                    <div>
                        <h2 className={`text-lg font-black tracking-tight ${isRevealed ? 'text-sky-400' : 'text-emerald-400'}`}>
                            {isRevealed ? '答えを確認 — 復習モード' : '正解！論理検証完了'}
                        </h2>
                        <p className={`text-xs font-mono ${isRevealed ? 'text-sky-300/70' : 'text-emerald-300/70'}`}>
                            ステップ {String(mission.id).padStart(2, '0')} — {mission.title}
                        </p>
                    </div>
                </div>

                {/* スクロール可能な復習エリア */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">

                    {/* コード比較エリア */}
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <Code2 className="w-4 h-4 text-indigo-400" />
                            <h3 className="text-sm font-black uppercase tracking-widest text-indigo-400">コード比較</h3>
                        </div>

                        <div className="flex gap-2 mb-3">
                            <button
                                onClick={() => setShowBefore(false)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${!showBefore
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:text-slate-200'
                                    }`}
                            >
                                正解コード
                            </button>
                            <button
                                onClick={() => setShowBefore(true)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${showBefore
                                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                    : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:text-slate-200'
                                    }`}
                            >
                                元のコード
                            </button>
                        </div>

                        <div className={`rounded-xl border p-4 font-mono text-xs whitespace-pre shadow-inner transition-colors duration-300 overflow-x-auto custom-scrollbar ${showBefore
                            ? 'bg-slate-950/70 border-amber-500/20 text-amber-300/90'
                            : 'bg-slate-950/70 border-emerald-500/20 text-emerald-400'
                            }`}>
                            <pre className="language-ruby m-0" style={{ background: 'transparent' }}>
                                <code className="language-ruby" dangerouslySetInnerHTML={{
                                    __html: highlightCode(showBefore ? originalCode : mission.correctCode)
                                }} />
                            </pre>
                        </div>
                    </section>

                    {/* 解説エリア */}
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <BookOpen className="w-4 h-4 text-indigo-400" />
                            <h3 className="text-sm font-black uppercase tracking-widest text-indigo-400">解説</h3>
                        </div>

                        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5">
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {mission.explanation}
                            </p>
                        </div>
                    </section>

                    {/* 次へボタン */}
                    <div className="flex justify-center pt-2 pb-4">
                        <button
                            onClick={onNext}
                            className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer pointer-events-auto relative z-50"
                        >
                            {isLast ? "認定証を受け取る 🏆" : "次の論理へ"}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── 通常モード（未正解） ──
    return (
        <>
            {/* 確認ダイアログ */}
            {showConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setShowConfirm(false)} />
                    <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-8 max-w-md w-full relative z-10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center border border-sky-500/40">
                                <Eye className="w-5 h-5 text-sky-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-200">答えを見て復習しますか？</h3>
                        </div>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            正解コードと解説が表示されます。この演習は「復習完了」として記録され、次のステップに進めるようになります。
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-5 py-2.5 rounded-lg text-sm font-bold text-slate-400 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
                            >
                                キャンセル
                            </button>
                            <button
                                onClick={handleRevealConfirm}
                                className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
                            >
                                答えを見る
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Top Module: Instructions */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col shrink-0">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-800">
                    <Terminal className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-lg font-bold text-slate-200 tracking-tight">ミッション目標</h2>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {mission.objective}
                </p>

                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4 flex gap-3 text-sm">
                    <Lightbulb className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                        <div className="text-indigo-300 font-bold mb-1 text-xs uppercase tracking-wider">論理ヒント</div>
                        <div className="text-indigo-200/90 leading-relaxed">{mission.hint}</div>
                    </div>
                </div>
            </div>

            {/* Bottom Module: Editor */}
            <div className="glass-panel rounded-2xl flex flex-col flex-1 overflow-hidden">
                <div className="bg-slate-950/80 border-b border-slate-800 px-4 py-3 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                        <Code2 className="w-4 h-4" />
                        <span>implementation.ruby</span>
                    </div>
                </div>

                <div className="flex-1 relative bg-[#0d1117] font-mono text-base overflow-y-auto custom-scrollbar">
                    <Editor
                        value={code}
                        onValueChange={code => setCode(code)}
                        highlight={input => highlightCode(input)}
                        padding={20}
                        style={{
                            fontFamily: '"Fira Code", "Fira Mono", monospace',
                            fontSize: 16,
                            minHeight: '100%',
                            lineHeight: '1.75'
                        }}
                        textareaClassName="focus:outline-none"
                    />
                </div>

                <div className="bg-slate-900 border-t border-slate-800 p-4 shrink-0 flex items-center justify-between relative z-50">
                    <div className="flex-1">
                        {errorMsg && (
                            <div className="text-amber-400 text-xs font-mono flex items-center gap-1.5">
                                <AlertTriangle className="w-4 h-4" />
                                {errorMsg}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        {/* 答えを確認ボタン（控えめ） */}
                        <button
                            onClick={() => setShowConfirm(true)}
                            disabled={isAnalyzing}
                            className="px-5 py-2.5 rounded-lg font-bold text-sm tracking-wide flex items-center gap-2 transition-all pointer-events-auto border border-slate-600 text-slate-400 hover:text-sky-400 hover:border-sky-500/50 hover:bg-sky-500/10 cursor-pointer"
                        >
                            <Eye className="w-4 h-4" />
                            答えを確認
                        </button>

                        {/* 検査を実行ボタン */}
                        <button
                            onClick={handleInspect}
                            disabled={isVerified || isAnalyzing}
                            className={`px-8 py-2.5 rounded-lg font-bold text-sm tracking-wide flex items-center gap-2 transition-all relative z-50 pointer-events-auto
                                ${isAnalyzing
                                    ? 'bg-indigo-600/50 text-indigo-200 cursor-wait'
                                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 cursor-pointer'
                                }
                            `}
                        >
                            {isAnalyzing ? (
                                <span className="animate-pulse">解析中...</span>
                            ) : (
                                "検査を実行"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditorView;
