import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

export function ChatMessageRenderer({ message }) {
  const labels={pending:'Thinking…',streaming:'Writing response…',completed:message.content,tool:<>Tool result: {message.content}</>,error:<>Error: {message.content}</>};
  return <div role="status" className={`chat-message ${message.state}`} aria-live="polite">{labels[message.state]}</div>;
}

export function LeadForm({ onSubmit, loading=false }) {
  const [company,setCompany]=React.useState(''); const [size,setSize]=React.useState(''); const [intent,setIntent]=React.useState(''); const [error,setError]=React.useState('');
  function submit(e){e.preventDefault();if(!company.trim()){setError('Company name is required');return;}setError('');onSubmit({company:company.trim(),size,intent});}
  return <form onSubmit={submit} aria-label="Lead form"><label>Company name<input aria-label="Company name" value={company} onChange={e=>setCompany(e.target.value)} /></label>{error&&<p role="alert">{error}</p>}<label>Company size<select aria-label="Company size" value={size} onChange={e=>setSize(e.target.value)}><option value="">Choose size</option><option value="small">1–50</option><option value="medium">51–250</option><option value="large">251+</option></select></label><label>Buying intent<select aria-label="Buying intent" value={intent} onChange={e=>setIntent(e.target.value)}><option value="">Choose intent</option><option value="exploring">Exploring</option><option value="ready">Ready to buy</option></select></label><button type="submit" disabled={loading}>{loading?'Scoring…':'Score lead'}</button></form>;
}

export function LeadScoreCard({ result }) { return <section aria-label="Lead score result"><h2>Lead score</h2><p><strong>Score:</strong> {result.score}</p><p><strong>Tier:</strong> {result.tier}</p><p><strong>Action:</strong> {result.action}</p><h3>Reasons</h3><ul>{result.reasons.map(reason=><li key={reason}>{reason}</li>)}</ul></section>; }

export async function scoreLead(lead){await new Promise(r=>setTimeout(r,300));return {score:82,tier:'Hot',action:'Contact within 24 hours',reasons:[`${lead.company} has a clear buying profile`,lead.intent==='ready'?'Buying intent is high':'Intent needs qualification']};}
export default function App({api=scoreLead}){const [loading,setLoading]=React.useState(false);const [result,setResult]=React.useState(null);const [apiError,setApiError]=React.useState('');async function submit(lead){setLoading(true);setResult(null);setApiError('');try{setResult(await api(lead));}catch{setApiError('Unable to score this lead. Please try again.');}finally{setLoading(false);}}return <main><h1>Lead scoring assistant</h1><p>Enter a prospect to get a practical next step.</p><LeadForm onSubmit={submit} loading={loading}/>{loading&&<p role="status">Loading score…</p>}{apiError&&<p role="alert">Unable to score this lead. Please try again.</p>}{result&&<LeadScoreCard result={result}/>}<ChatMessageRenderer message={{state:'completed',content:'Ready to help score your next lead.'}}/></main>}

if(document.getElementById('root'))createRoot(document.getElementById('root')).render(<App />);
