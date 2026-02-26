import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle2, CircleDashed, RotateCcw } from 'lucide-react';

const Sidebar = ({ missions, currentMissionId, completedMissions, onSelectMission, onOpenTutorial, onOpenTerms, onOpenPrivacy, onReset }) => {
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    
    // ✅ 重要：一度でも到達した「最高記録」を保持するステート
    const [achievedMaxId, setAchievedMaxId] = useState(1);

    // currentMissionId や completedMissions が更新されるたびに、最高到達地点を更新
    useEffect(() => {
        const currentMax = completedMissions.length > 0 ? Math.max(...completedMissions) : 0;
        const currentSafe = typeof currentMissionId === 'number' ? currentMissionId : 0;
        
        // 今までの最高記録(achievedMaxId)を下回らないように更新
        setAchievedMaxId(prev => Math.max(prev, currentMax, currentSafe));
    }, [currentMissionId, completedMissions]);

    // --- 遊び心機能（そのまま維持） ---
    const [messageIndex, setMessageIndex] = useState(0);
    const [showMessage, setShowMessage] = useState(false);
    const systemMessages = [
        "システムは正常に稼働しています。",
        "検証プロトコルの準備が整いました。",
        "新しいロジックを読み込み中です...",
        "論理的な整合性を確認しています。",
        "コア・システム、待機中。",
        "現在の進捗を同期しています...",
        "未解決の条件分岐を探索しています。",
        "一時的なメモリを最適化しました。",
        "セッションの安定性を維持しています。",
        "検証ラボへようこそ。解析を始めましょう。"
    ];

    const handleLogoClick = () => {
        setMessageIndex((prev) => (prev + 1) % systemMessages.length);
        setShowMessage(true);
    };

    useEffect(() => {
        if (showMessage) {
            const timer = setTimeout(() => setShowMessage(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showMessage]);

    const handleResetConfirm = () => {
        setAchievedMaxId(1); // リセット時は到達記録も初期化
        setShowResetConfirm(false);
        onReset();
    };

    return (
        <>
            {/* リセット確認ダイアログ */}
            {showResetConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setShowResetConfirm(false)} />
                    <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-8 max-w-md w-full relative z-10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center border border-red-500/40">
                                <RotateCcw className="w-5 h-5 text-red-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-200">学習記録をリセット</h3>
                        </div>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">学習記録をすべて消去して、最初からやり直しますか？</p>
                        <div className="flex gap-3 justify-end">
                            <button onClick={() => setShowResetConfirm(false)} className="px-5 py-2.5 rounded-lg text-sm font-bold text-slate-400 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer">キャンセル</button>
                            <button onClick={handleResetConfirm} className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-500/20 transition-all cursor-pointer">リセット実行</button>
                        </div>
                    </div>
                </div>
            )}

            <aside className="w-80 h-full bg-slate-950/95 backdrop-blur-md border-r border-slate-800 flex flex-col font-mono text-sm overflow-hidden z-20 shadow-2xl shrink-0">
                <div className="p-5 border-b border-slate-800 bg-slate-900/50">
                    <div className="flex items-center justify-between">
                        <div onClick={handleLogoClick} className="text-xl font-bold text-indigo-400 flex items-center gap-2 select-none cursor-pointer group transition-all">
                            <BookOpen className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                            論理検証ラボ：Phase 2
                        </div>
                    </div>
                    <div className={`mt-1 h-4 transition-all duration-500 ${showMessage ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="text-[11px] text-indigo-300 font-bold tracking-wider">{">"} {systemMessages[messageIndex]}</div>
                    </div>
                    <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-bold">Logic Verification Lab</div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                    {missions.map((mission) => {
                        const isCompleted = completedMissions.includes(mission.id);
                        const isActive = currentMissionId === mission.id;
                        
                        // ✅ ロック条件：最高到達地点より先の問題のみロック
                        const isLocked = mission.id > achievedMaxId;

                        return (
                            <button
                                key={mission.id}
                                onClick={() => !isLocked && onSelectMission(mission.id)}
                                disabled={isLocked}
                                className={`w-full text-left p-4 rounded-xl transition-all duration-300 group relative overflow-hidden tracking-tight border-l-4
                                    ${isCompleted 
                                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-50' 
                                        : isActive
                                            ? 'bg-slate-800 border-indigo-500 text-white shadow-lg' 
                                            : isLocked
                                                ? 'bg-transparent border-transparent text-slate-800' 
                                                : 'bg-transparent border-transparent text-slate-100 hover:bg-slate-800/50'} 
                                    ${isLocked ? 'opacity-20' : 'opacity-100 cursor-pointer'}
                                `}
                            >
                                <div className="flex justify-between items-start relative z-10 mb-2">
                                    <span className={`font-black text-[10px] uppercase tracking-widest 
                                        ${isCompleted ? 'text-emerald-500' : isActive ? 'text-indigo-400' : isLocked ? 'text-slate-900' : 'text-slate-400'}`}>
                                        ステップ {String(mission.id).padStart(2, '0')}
                                    </span>
                                    {isCompleted ? (
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                    ) : (
                                        <CircleDashed className={`w-5 h-5 ${isActive ? 'text-indigo-400' : isLocked ? 'text-slate-900' : 'text-slate-500'}`} />
                                    )}
                                </div>

                                <h3 className={`font-bold mt-1 relative z-10 leading-snug 
                                    ${isCompleted ? 'text-emerald-300' : isActive ? 'text-white' : isLocked ? 'text-slate-800' : 'text-slate-100'}`}>
                                    {mission.title.replace(/^(演習|ステップ|習)\s*\d*\s*[:：]*/, '')}
                                </h3>
                            </button>
                        );
                    })}
                </div>

                {/* ✅ フッターセクションを復元 */}
                <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex flex-col gap-3 relative z-30">
                    <button onClick={(e) => { e.stopPropagation(); setShowResetConfirm(true); }} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/50 hover:bg-red-500/10 transition-all cursor-pointer pointer-events-auto">
                        <RotateCcw className="w-3.5 h-3.5" />進捗をリセット
                    </button>
                    <div className="text-[10px] text-center text-slate-500 tracking-widest font-black uppercase">Logic Verification - Online</div>
                    <div className="flex justify-center gap-4 text-xs font-sans tracking-normal font-normal text-slate-500">
                        <button onClick={(e) => { e.stopPropagation(); onOpenTerms(); }} className="hover:text-white transition-colors cursor-pointer pointer-events-auto text-slate-500">利用規約</button>
                        <button onClick={(e) => { e.stopPropagation(); onOpenPrivacy(); }} className="hover:text-white transition-colors cursor-pointer pointer-events-auto text-slate-500">プライバシーポリシー</button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;