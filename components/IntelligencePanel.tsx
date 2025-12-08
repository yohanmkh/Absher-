import React, { useEffect, useState } from 'react';
import { Alert, AiAnalysisResult } from '../types';
import { User, Car, AlertTriangle, Fingerprint, Database, Sparkles, ShieldAlert, History, Activity } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface IntelligencePanelProps {
  alert: Alert | null;
}

const mockAnalysis = "Identified driver matches profile with 3 major speed violations and 1 red-light violation in the last 6 months. High Probability of Evasion.";

export const IntelligencePanel: React.FC<IntelligencePanelProps> = ({ alert }) => {
  const [analysis, setAnalysis] = useState<AiAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!alert) {
        setAnalysis(null);
        return;
    }

    const fetchAiAnalysis = async () => {
      setLoading(true);
      setAnalysis(null);

      // Default mock result if no API key or logic fails
      let result: AiAnalysisResult = {
        riskScore: alert.riskLevel === 'CRITICAL' ? 88 : 45,
        reasoning: mockAnalysis,
        recommendation: "Immediate interception recommended.",
        threatVectors: ["High Speed Evasion", "Public Safety Risk", "Repeat Offender"],
        historicalCorrelation: "Subject's pattern of speeding (3x) correlates with current flight behavior, indicating escalation."
      };

      try {
        if (process.env.API_KEY) {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          const prompt = `
            Analyze this security incident for a dashboard named "Absher Aman".
            Incident: ${alert.type}
            Description: ${alert.description}
            Person History: ${alert.person?.history.join(', ') || 'Unknown'}
            Vehicle: ${alert.vehicle?.year} ${alert.vehicle?.make} ${alert.vehicle?.model}
            
            Return a JSON object with:
            1. "riskScore" (number 0-100)
            2. "reasoning" (short, punchy security assessment max 30 words)
            3. "recommendation" (one actionable sentence)
            4. "threatVectors" (array of 3 short strings, e.g. ["Evasion Risk", "Public Safety"])
            5. "historicalCorrelation" (one sentence explaining how past history relates to current event)
          `;

          const response = await ai.models.generateContent({
             model: 'gemini-2.5-flash',
             contents: prompt,
             config: { responseMimeType: 'application/json' }
          });
          
          if (response.text) {
             const json = JSON.parse(response.text);
             result = {
                 riskScore: json.riskScore || result.riskScore,
                 reasoning: json.reasoning || result.reasoning,
                 recommendation: json.recommendation || result.recommendation,
                 threatVectors: json.threatVectors || result.threatVectors,
                 historicalCorrelation: json.historicalCorrelation || result.historicalCorrelation
             }
          }
        } else {
            // Simulate network delay for effect
            await new Promise(resolve => setTimeout(resolve, 1500));
        }
      } catch (error) {
        console.error("AI Analysis failed, falling back to mock", error);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      setAnalysis(result);
      setLoading(false);
    };

    fetchAiAnalysis();
  }, [alert]);

  if (!alert) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500 border border-slate-800 rounded-xl bg-slate-900/50 p-8">
        <Sparkles className="w-12 h-12 mb-4 opacity-20" />
        <p className="font-mono text-sm">SELECT AN ALERT TO INITIATE AI ANALYSIS</p>
      </div>
    );
  }

  const riskData = [
    { name: 'Risk', value: analysis?.riskScore || 0 },
    { name: 'Safe', value: 100 - (analysis?.riskScore || 0) },
  ];
  
  const riskColor = (analysis?.riskScore || 0) > 75 ? '#ef4444' : (analysis?.riskScore || 0) > 50 ? '#f59e0b' : '#22d3ee';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
      {/* LEFT: Identity & Vehicle */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-cyan-400 mb-2 border-b border-slate-800 pb-2">
           <Database className="w-4 h-4" />
           <h3 className="text-xs font-bold uppercase tracking-wider">Absher Verification</h3>
        </div>

        {alert.person ? (
           <div className="flex gap-4 items-start">
              <div className="relative shrink-0">
                 <img src={alert.person.imageUrl} alt="Suspect" className="w-24 h-24 rounded-lg object-cover border-2 border-slate-700" />
                 <div className="absolute -bottom-2 -right-2 bg-green-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-lg">
                    <Fingerprint className="w-3 h-3" /> VERIFIED
                 </div>
              </div>
              <div className="flex-1 space-y-3">
                 <div>
                    <p className="text-[10px] text-slate-500 uppercase">Name (Arabic)</p>
                    <p className="text-xl font-bold font-arabic text-white leading-tight">{alert.person.nameAr}</p>
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                     <div>
                        <p className="text-[10px] text-slate-500 uppercase">National ID</p>
                        <p className="text-sm font-mono text-cyan-400">{alert.person.id}</p>
                     </div>
                     <div>
                        <p className="text-[10px] text-slate-500 uppercase">Age</p>
                        <p className="text-sm font-mono text-slate-300">{alert.person.age}</p>
                     </div>
                 </div>
              </div>
           </div>
        ) : (
           <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-800 rounded-lg">
              <p className="text-xs text-slate-600">NO BIOMETRIC MATCH</p>
           </div>
        )}

        {alert.vehicle && (
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 mt-auto">
               <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 text-slate-400">
                     <Car className="w-4 h-4" />
                     <span className="text-xs font-mono uppercase">Vehicle Data</span>
                  </div>
                  <span className="text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">{alert.vehicle.plate}</span>
               </div>
               <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                     <span className="text-slate-500 block">Model</span>
                     <span className="text-slate-200">{alert.vehicle.year} {alert.vehicle.make}</span>
                  </div>
                  <div>
                     <span className="text-slate-500 block">Color</span>
                     <span className="text-slate-200">{alert.vehicle.color}</span>
                  </div>
               </div>
            </div>
        )}
      </div>

      {/* RIGHT: AI Risk Analysis */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 relative overflow-hidden flex flex-col">
         {/* Background Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

         <div className="flex items-center justify-between mb-4 relative z-10 border-b border-slate-800 pb-2">
             <div className="flex items-center gap-2 text-purple-400">
                <Sparkles className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">AI Risk Assessment</h3>
            </div>
            {analysis && (
                <div className="flex gap-1">
                    {analysis.threatVectors.map((vector, i) => (
                        <span key={i} className="text-[9px] font-bold px-1.5 py-0.5 bg-red-950/40 text-red-400 border border-red-900/50 rounded uppercase">
                            {vector}
                        </span>
                    ))}
                </div>
            )}
         </div>

         {loading ? (
             <div className="flex flex-col items-center justify-center flex-1 gap-3">
                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs font-mono text-purple-400 animate-pulse">CORRELATING DATA...</p>
             </div>
         ) : (
             <div className="relative z-10 flex flex-col flex-1 gap-3">
                {/* Top Section: Score & Reasoning */}
                <div className="flex items-start gap-4">
                   <div className="w-24 h-24 shrink-0 relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={riskData}
                            cx="50%"
                            cy="50%"
                            innerRadius={28}
                            outerRadius={40}
                            startAngle={90}
                            endAngle={-270}
                            dataKey="value"
                            stroke="none"
                          >
                            <Cell key="risk" fill={riskColor} />
                            <Cell key="safe" fill="#1e293b" />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <span className="text-xl font-bold" style={{ color: riskColor }}>{analysis?.riskScore}</span>
                         <span className="text-[7px] text-slate-500 uppercase tracking-widest">RISK</span>
                      </div>
                   </div>
                   
                   <div className="flex-1">
                        <div className="bg-slate-950/50 rounded p-2 border border-slate-800 mb-2">
                             <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                                <Activity className="w-3 h-3" />
                                <span className="text-[10px] uppercase font-bold">Live Analysis</span>
                             </div>
                             <p className="text-xs text-slate-300 leading-snug">
                                {analysis?.reasoning}
                             </p>
                        </div>
                   </div>
                </div>

                {/* Middle Section: Historical Correlation */}
                <div className="bg-slate-800/20 rounded p-2 border border-slate-800/50">
                    <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                        <History className="w-3 h-3" />
                        <span className="text-[10px] uppercase font-bold">Pattern Matching</span>
                    </div>
                    <p className="text-xs text-slate-400 italic">
                        "{analysis?.historicalCorrelation}"
                    </p>
                </div>

                {/* Bottom Section: Recommendation */}
                <div className="mt-auto bg-slate-950 border-l-2 border-purple-500 p-2.5 shadow-lg">
                   <div className="flex items-center gap-2 mb-1">
                        <ShieldAlert className="w-3 h-3 text-purple-500" />
                        <p className="text-[10px] text-purple-400 uppercase font-bold">Recommended Action</p>
                   </div>
                   <p className="text-xs text-white font-medium">{analysis?.recommendation}</p>
                </div>
             </div>
         )}
      </div>
    </div>
  );
};
