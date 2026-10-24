import React, { useState } from 'react';
import { Sparkles, Send, Zap, Layout, Share2, Image as ImageIcon, ArrowLeft, Copy, Check, PlayCircle, Loader2, Wand2, Library, Search, Filter, Star } from 'lucide-react';

export default function Dashboard() {
  const [view, setView] = useState<'dashboard' | 'studio' | 'lab'>('dashboard');
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedHook, setSelectedHook] = useState<any>(null);
  const [scriptLoading, setScriptLoading] = useState(false);
  const [finalScript, setFinalScript] = useState<any>(null);
  const [visualsLoading, setVisualsLoading] = useState(false);
  const [storyboard, setStoryboard] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ idea }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHook = async (hook: any) => {
    setSelectedHook(hook);
    setScriptLoading(true);
    setView('studio');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const script = {
        hook: hook.text,
        body: [
          { scene: "0-3s", text: hook.text, visualCue: "Close up of a frustrated face, then a sudden transition to a bright, successful result." },
          { scene: "3-10s", text: `Most people think ${idea} is about hard work, but it's actually about the system.`, visualCue: "Split screen: 'Wrong Way' vs 'Right Way' with red and green overlays." },
          { scene: "10-20s", text: `Here is the 3-step framework: One, audit your current flow. Two, automate the friction. Three, scale the win.`, visualCue: "B-roll of the process with bold, kinetic text overlays popping on screen." },
          { scene: "20-30s", text: `The result? More growth, less stress, and total automation.`, visualCue: "Screen recording of a dashboard showing rapid growth/numbers increasing." },
        ],
        cta: "Click the link in my bio to get the full playbook for free.",
        repurposed: {
          xThread: [
            "The biggest lie about this niche...",
            "Most people approach it the wrong way. Here is why.",
            "1/ The Framework: Audit",
            "2/ The Pivot: Automate",
            "3/ The Win: Scale",
            "Check my bio for the full system. 🧵",
          ],
          linkedin: "I've spent the last few months obsessing over this. \n\nHere is the truth: it's not about hard work, it's about the system..."
        }
      };
      setFinalScript(script);
      await generateVisuals(script);
    } catch (error) {
      console.error(error);
    } finally {
      setScriptLoading(false);
    }
  };

  const generateVisuals = async (script: any) => {
    setVisualsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      const visuals = script.body.map((scene: any, i: number) => ({
        url: `https://picsum.photos/seed/${Math.random()}/600/400`,
        prompt: `Cinematic, 8k, professional lighting, ${scene.visualCue}`,
      }));
      setStoryboard(visuals);
    } catch (error) {
      console.error(error);
    } finally {
      setVisualsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Hook Lab Component
  const HookLab = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">The Hook Lab</h2>
          <p className="text-slate-400">Study and swap high-conversion patterns from the top 1% of creators.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search frameworks..."
              className="bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <button className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: "The Pattern Interrupt", framework: "Attention", template: "Stop doing [Action] the old way. Here is the secret...", rate: "94%", category: "Growth" },
          { title: "The Gap Method", framework: "Curiosity", template: "99% of people are missing this one detail about [Topic].", rate: "88%", category: "Education" },
          { title: "The Personal Journey", framework: "Trust", template: "I tried every method for [Goal], but this one thing changed everything.", rate: "91%", category: "Authority" },
          { title: "The Fast Fix", framework: "Utility", template: "Why your [Topic] isn't working (and how to fix it in 30s).", rate: "82%", category: "Conversion" },
          { title: "The Insider Secret", framework: "Authority", template: "The truth about [Topic] that nobody wants to tell you.", rate: "96%", category: "Controversy" },
          { title: "The Contrast Loop", framework: "Desire", template: "Everyone wants [Result], but nobody talks about [Requirement].", rate: "89%", category: "Aspiration" },
        ].map((item, i) => (
          <div key={i} className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all cursor-pointer space-y-4">
            <div className="flex justify-between items-start">
              <div className="bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border border-indigo-500/20">
                {item.category}
              </div>
              <div className="flex items-center gap-1 text-green-400 text-xs font-bold">
                <Star className="w-3 h-3 fill-current" />
                {item.rate}
              </div>
            </div>
            <h3 className="font-bold text-lg group-hover:text-indigo-400 transition-colors">{item.title}</h3>
            <p className="text-slate-400 text-sm italic leading-relaxed">"{item.template}"</p>
            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-500">{item.framework}</span>
              <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Use Template &rarr;</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'dashboard' | 'studio' | 'lab'>('dashboard');
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedHook, setSelectedHook] = useState<any>(null);
  const [scriptLoading, setScriptLoading] = useState(false);
  const [finalScript, setFinalScript] = useState<any>(null);
  const [visualsLoading, setVisualsLoading] = useState(false);
  const [storyboard, setStoryboard] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ idea }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHook = async (hook: any) => {
    setSelectedHook(hook);
    setScriptLoading(true);
    setView('studio');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const script = {
        hook: hook.text,
        body: [
          { scene: "0-3s", text: hook.text, visualCue: "Close up of a frustrated face, then a sudden transition to a bright, successful result." },
          { scene: "3-10s", text: `Most people think ${idea} is about hard work, but it's actually about the system.`, visualCue: "Split screen: 'Wrong Way' vs 'Right Way' with red and green overlays." },
          { scene: "10-20s", text: `Here is the 3-step framework: One, audit your current flow. Two, automate the friction. Three, scale the win.`, visualCue: "B-roll of the process with bold, kinetic text overlays popping on screen." },
          { scene: "20-30s", text: `The result? More growth, less stress, and total automation.`, visualCue: "Screen recording of a dashboard showing rapid growth/numbers increasing." },
        ],
        cta: "Click the link in my bio to get the full playbook for free.",
        repurposed: {
          xThread: [
            "The biggest lie about this niche...",
            "Most people approach it the wrong way. Here is why.",
            "1/ The Framework: Audit",
            "2/ The Pivot: Automate",
            "3/ The Win: Scale",
            "Check my bio for the full system. 🧵",
          ],
          linkedin: "I've spent the last few months obsessing over this. \n\nHere is the truth: it's not about hard work, it's about the system..."
        }
      };
      setFinalScript(script);
      await generateVisuals(script);
    } catch (error) {
      console.error(error);
    } finally {
      setScriptLoading(false);
    }
  };

  const generateVisuals = async (script: any) => {
    setVisualsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      const visuals = script.body.map((scene: any, i: number) => ({
        url: `https://picsum.photos/seed/${Math.random()}/600/400`,
        prompt: `Cinematic, 8k, professional lighting, ${scene.visualCue}`,
      }));
      setStoryboard(visuals);
    } catch (error) {
      console.error(error);
    } finally {
      setVisualsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Zap className="w-6 h-6 text-white fill-current" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">ViralFlow<span className="text-indigo-500">AI</span></h1>
          </div>
          <nav className="flex gap-6 text-sm font-medium text-slate-400">
            <button onClick={() => setView('dashboard')} className={`hover:text-white transition-colors ${view === 'dashboard' ? 'text-white' : ''}`}>Dashboard</button>
            <button onClick={() => setView('lab')} className={`hover:text-white transition-colors ${view === 'lab' ? 'text-white' : ''}`}>Hook Lab</button>
            <button onClick={() => setView('settings')} className={`hover:text-white transition-colors ${view === 'settings' ? 'text-white' : ''}`}>Settings</button>
          </nav>
        </header>

        <main>
          {view === 'dashboard' && (
            <div className="space-y-8">
              <section className="text-center space-y-4 mb-12">
                <h2 className="text-5xl font-extrabold tracking-tighter">
                  Turn a raw idea into <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                    viral content in seconds.
                  </span>
                </h2>
                <p className="text-slate-400 text-lg max-w-xl mx-auto">
                  The "Chain of Specialists" architecture that engineers high-retention hooks,
                  scripts, and multi-platform distributions.
                </p>
              </section>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-2 flex items-center gap-2 shadow-2xl">
                  <input
                    type="text"
                    placeholder="Enter your raw idea (e.g. How to start a SaaS in 2026)..."
                    className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-lg placeholder:text-slate-600"
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  />
                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate
                      </>
                    )}
                  </button>
                </div>
              </div>

              {result && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="md:col-span-1 space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                      <div className="flex items-center gap-2 text-indigo-400 mb-2">
                        <Layout className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">Viral Angle</span>
                      </div>
                      <h3 className="text-xl font-bold">{result.angle.angle}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {result.angle.rationale}
                      </p>
                      <div className="inline-block bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-xs font-medium border border-indigo-500/20">
                        Emotion: {result.angle.targetEmotion}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-cyan-400">
                        <Zap className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">Engineered Hooks</span>
                      </div>
                      <span className="text-xs text-slate-500">Select one to expand into a script</span>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {result.hooks.map((hook: any, i: number) => (
                        <div
                          key={hook.id}
                          onClick={() => handleSelectHook(hook)}
                          className="group bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 transition-all cursor-pointer hover:bg-slate-800/50 flex justify-between items-start gap-4"
                        >
                          <div className="space-y-1">
                            <div className="text-xs font-medium text-slate-500">{hook.framework}</div>
                            <p className="text-slate-200 font-medium group-hover:text-white transition-colors">{hook.text}</p>
                          </div>
                          <button className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-white transition-colors">
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </main>
          )}

          {view === 'studio' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <PlayCircle className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">Viral Script Studio</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">The Retention Masterpiece</h2>
                  <p className="text-slate-400">Engineered for high completion rates and algorithm favor.</p>
                </div>

                {scriptLoading ? (
                  <div className="flex flex-col items-center justify-center py-20 space-y-4 bg-slate-900/50 rounded-3xl border border-slate-800 border-dashed">
                    <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                    <p className="text-slate-500 font-medium animate-pulse">Scriptwriter Specialist is drafting...</p>
                  </div>
                ) : finalScript && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                      <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400 uppercase">Production Script</span>
                        <button
                          onClick={() => copyToClipboard(JSON.stringify(finalScript, null, 2))}
                          className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
                        >
                          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="p-6 space-y-8">
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-indigo-400 uppercase">The Hook</span>
                          <p className="text-xl font-bold leading-tight">{finalScript.hook}</p>
                        </div>

                        <div className="space-y-4">
                          <span className="text-xs font-bold text-slate-500 uppercase">The Body</span>
                          {finalScript.body.map((scene: any, i: number) => (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800 group hover:border-indigo-500/30 transition-colors">
                              <div className="text-indigo-500 font-mono text-xs font-bold self-start">{scene.scene}</div>
                              <div className="md:col-span-2 space-y-3">
                                <p className="text-slate-200 font-medium">{scene.text}</p>
                                <div className="flex items-start gap-2 p-2 bg-slate-900 rounded-lg border border-slate-800 text-slate-400 text-xs italic">
                                  <ImageIcon className="w-3 h-3 mt-0.5 shrink-0" />
                                  <span>{scene.visualCue}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <span className="text-xs font-bold text-cyan-400 uppercase">Call to Action</span>
                          <p className="text-lg font-semibold">{finalScript.cta}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Share2 className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Multi-Platform Distribution</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Omnichannel Reach</h2>
                <p className="text-slate-400">One core idea, formatted for every major algorithm.</p>
              </div>

              {finalScript && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          <span className="text-black text-[10px] font-bold">X</span>
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase">X Thread</span>
                      </div>
                      <button onClick={() => copyToClipboard(finalScript.repurposed.xThread.join('\n\n'))} className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-6 space-y-4 text-sm text-slate-300 leading-relaxed">
                      {finalScript.repurposed.xThread.map((tweet, i) => (
                        <div key={i} className="p-3 bg-slate-950 rounded-lg border border-slate-800 relative">
                          <span className="absolute -left-2 -top-2 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{i+1}</span>
                          {tweet}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
                          <span className="text-white text-[10px] font-bold">in</span>
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase">LinkedIn Thought Leadership</span>
                      </div>
                      <button onClick={() => copyToClipboard(finalScript.repurposed.linkedin)} className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-6 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {finalScript.repurposed.linkedin}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <ImageIcon className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">AI Storyboard</span>
                  </div>
                  {visualsLoading && <Loader2 className="w-4 h-4 animate-spin text-slate-500" />}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {storyboard.length > 0 ? (
                    storyboard.map((img, i) => (
                      <div key={i} className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 transition-all hover:border-indigo-500/50">
                        <img src={img.url} alt={`Scene ${i+1}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 to-transparent">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-white/70 uppercase">Scene {i+1}</span>
                            <Wand2 className="w-3 h-3 text-indigo-400" />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="grid grid-cols-2 gap-4 h-full">
                       <div className="aspect-[3/4] rounded-2xl border border-slate-800 border-dashed bg-slate-900/50 flex items-center justify-center text-slate-600">
                        <ImageIcon className="w-8 h-8 opacity-20" />
                      </div>
                      <div className="aspect-[3/4] rounded-2xl border border-slate-800 border-dashed bg-slate-900/50 flex items-center justify-center text-slate-600">
                        <ImageIcon className="w-8 h-8 opacity-20" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {view === 'lab' && <HookLab />}
        </main>
      </div>
    </div>
  );
}
