import useSWR from 'swr'
const fetcher=(u)=>fetch(u).then(r=>r.json())
export default function Home(){
  const {data:top,err}=useSWR('/api/top-signals',fetcher,{refreshInterval:5000})
  return (
    <div style={{fontFamily:'Inter, Arial',padding:20,background:'#071029',color:'#e6eef8',minHeight:'100vh'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <h1>Shahzad Signals — Pro (Preview)</h1>
        <p>Composite A→Z indicators + Orderbook + Whale + News (scaffold)</p>
        <section style={{marginTop:20}}>
          <h2>Top Signals (Composite)</h2>
          {!top && <div>Loading...</div>}
          {top && top.topList && (
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead><tr><th>Coin</th><th>Score</th><th>Signal</th><th>Entry</th><th>SL</th><th>TP1</th></tr></thead>
              <tbody>
                {top.topList.map((s,i)=>(
                  <tr key={i} style={{borderTop:'1px solid #234',padding:8}}>
                    <td style={{padding:8}}>{s.symbol}</td>
                    <td style={{padding:8}}>{s.score}</td>
                    <td style={{padding:8}}>{s.signal}</td>
                    <td style={{padding:8}}>{s.entry}</td>
                    <td style={{padding:8}}>{s.sl}</td>
                    <td style={{padding:8}}>{s.tp1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
        <section style={{marginTop:30}}>
          <h3>Notes</h3>
          <ul>
            <li>This is a scaffold. Connect API keys & run backend worker to compute live indicators.</li>
            <li>See README_pro_roman.md for full deployment & env setup (Roman Urdu).</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
