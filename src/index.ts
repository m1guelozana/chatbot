import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

// let imports
let client: Client;

// const imports
const idClient = 'BOT-MGL';

client = new Client({
  authStrategy: new LocalAuth({ clientId: idClient }),
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox", 
      "--disable-steuid-sandbox",
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ],
    timeout: 0,
  },
  webVersion: "2.2409.2",
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2409.2.html",
  },
});

client.on('ready', () => {
  console.log('WhatsApp Client initialized');
});

client.on('qr', (qr: string) =>{
  console.log('QR RECIVED')
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
  console.log('© BOT-MGL Autenticado');
});

client.on('auth_failure', function() {
  console.error('© BOT-MGL Falha na autenticação');
});

client.on('change_state', state => {
console.log('© BOT-MGL Status de conexão: ', state );
});

client.on('message_create', async msg => {
  // Lógica para tratar grupos
  if (msg.body !== null && !msg.from.includes('@c.us')) return null;

  // Lógica para tratar ciphertext
  if (msg.type.toLowerCase() == "e2e_notification") return null;
  else if (msg.type.toLowerCase() == "ciphertext") return null;
  else if (msg.body === "") return null;
});

await client.initialize();


client.on('message', async msg =>{
  if (msg.body !== null && msg.from.includes('@c.us')){
    client.sendMessage(msg.from, 'Olá! Tudo bem? Obrigado por entrar em contato. Este é um atendimento automatizado. Precisa de alguma ajuda ou gostaria de conversar com um humano?')
  }
  
});

