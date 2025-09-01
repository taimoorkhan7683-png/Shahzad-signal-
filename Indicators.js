// backend/lib/indicators.js
// Lightweight JS implementations (stubs + simple functions) for many indicators.
// For production use native TA libraries or Python workers for speed & accuracy.

function sma(arr, period){
  if(!arr || arr.length < period) return null;
  const res = [];
  for(let i=period-1;i<arr.length;i++){
    const slice = arr.slice(i-period+1, i+1);
    res.push(slice.reduce((a,b)=>a+b,0)/period);
  }
  return res;
}

function ema(arr, period){
  if(!arr || arr.length < period) return null;
  const k = 2/(period+1);
  let emaPrev = arr.slice(0,period).reduce((a,b)=>a+b,0)/period;
  const out = [];
  for(let i=period;i<arr.length;i++){
    emaPrev = arr[i]*k + emaPrev*(1-k);
    out.push(emaPrev);
  }
  return out;
}

function rsi(closes, period=14){
  if(!closes || closes.length < period+1) return [];
  const gains=[]; const losses=[];
  for(let i=1;i<closes.length;i++){
    const d = closes[i]-closes[i-1]; if(d>0) gains.push(d); else losses.push(-d);
  }
  let avgG = gains.slice(0,period).reduce((a,b)=>a+b,0)/period;
  let avgL = losses.slice(0,period).reduce((a,b)=>a+b,0)/period;
  const out = new Array(period).fill(null);
  for(let i=period;i<gains.length;i++){
    avgG = (avgG*(period-1) + gains[i])/period;
    avgL = (avgL*(period-1) + losses[i])/period;
    const rs = avgL===0 ? 100 : avgG/avgL;
    out.push(100 - 100/(1+rs));
  }
  return out;
}

module.exports = { sma, ema, rsi };
