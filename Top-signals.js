// frontend/pages/api/top-signals.js
export default async function handler(req,res){
  try{
    const r = await fetch(process.env.BACKEND_URL + '/api/top-signals');
    const j = await r.json();
    res.status(200).json(j);
  }catch(e){
    res.status(500).json({ error: 'backend unreachable', details: String(e) });
  }
}
