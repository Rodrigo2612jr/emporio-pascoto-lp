// Link unico pro Grupo VIP: pergunta ao bot qual grupo tem vaga e redireciona direto.
// Site, bio e popups apontam pra ca, entao virar de grupo nao exige trocar link nenhum.
const BOT = 'https://pascoto-aviseme-bot-production.up.railway.app/grupo-disponivel';
const FALLBACK = 'https://chat.whatsapp.com/JdsxXO77Vk4HTgXaQWEBjU'; // grupo 3, se o bot nao responder

module.exports = async (req, res) => {
  let link = FALLBACK;
  try {
    const r = await fetch(BOT, { signal: AbortSignal.timeout(2500) });
    if (r.ok) link = (await r.json()).link || FALLBACK;
  } catch (e) {}
  res.setHeader('Cache-Control', 'no-store');
  res.writeHead(302, { Location: link });
  res.end();
};
