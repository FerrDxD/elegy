const fs = require('fs');

async function check() {
  let env = '';
  try { env = fs.readFileSync('.env', 'utf8'); } catch(e) {}
  try { if(!env) env = fs.readFileSync('.env.local', 'utf8'); } catch(e) {}

  const match = env.match(/GEMINI_API_KEY=["']?(.*?)["']?(?:\r?\n|$)/);
  if (!match) {
    console.log("No API Key found.");
    return;
  }

  const key = match[1];
  try {
    const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + key);
    const data = await r.json();
    if (data.models) {
       console.log(data.models.map(m => m.name).join('\n'));
    } else {
       console.log(data);
    }
  } catch (e) {
    console.error(e);
  }
}

check();
