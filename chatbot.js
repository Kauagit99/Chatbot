// leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // Mudança Buttons
const client = new Client();
// serviço de leitura do qr code
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});
// apos isso ele diz que foi tudo certo
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});
// E inicializa tudo 
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

// Funil

client.on('message', async msg => {

    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) && msg.from.endsWith('@c.us')) {

        const chat = await msg.getChat();

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from, 'Olá! ' + name.split(" ")[0] + ' Sou o assistente virtual da SDA. Como posso ajudá-lo hoje? Por favor, digite uma das opções abaixo:\n\n1️ - Como regularizar minha terra.\n2️ - Documentos necessários\n3️ - Quem pode pedir a regularização\n4️ - Onde fazer o pedido\n5️ - Outras perguntas'); //Primeira mensagem de texto
        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(5000); //Delay de 5 segundos


    }

    async function enviarMenuPrincipal(msg, client) {
        await delay(2000);
        await client.sendMessage(msg.from,
            '🤖 *Sou o assistente virtual da SDA.* Como posso ajudá-lo?\n\n' +
            '1️ - Quero regularizar minha terra\n' +
            '2️ - Quais documentos são necessários?\n' +
            '3️ - Quem pode solicitar a regularização?\n' +
            '4️ - Onde posso ir presencialmente?\n' +
            '5️ - Outras dúvidas\n\n' +
            'Digite o número da opção desejada ou "menu" para voltar a este menu.'
        );
    }
    
    // Opção 1
    if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
    
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '📄 Para regularizar sua terra, você deve procurar a SDA com seus documentos pessoais e do imóvel.');
    
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Vamos te mostrar o que levar na opção 2. Se quiser saber onde fazer isso, digite "4".\n\n🔁 Digite *menu* para voltar ao início.');
    }
    
    // Opção 2
    if (msg.body !== null && msg.body === '2' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
    
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '📁 Documentos necessários:\n\n- RG e CPF\n- Comprovante de residência\n- Documentos que provem a posse da terra (recibo, declaração, escritura ou documento de herança, por exemplo)\n\n🔁 Digite *menu* para voltar ao início.');
    }
    
    // Opção 3
    if (msg.body !== null && msg.body === '3' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
    
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '👥 Podem solicitar a regularização:\n\n- Agricultores familiares\n- Assentados da reforma agrária\n- Posseiros\n- Comunidades tradicionais como quilombolas e indígenas (com procedimentos específicos)\n\n🔁 Digite *menu* para voltar ao início.');
    }
    
    // Opção 4
    if (msg.body !== null && msg.body === '4' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
    
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '📍 Você pode dar entrada no processo de regularização na unidade da SDA em Salvador.');
    
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '📌 *Endereço:*\nSuperintendência de Desenvolvimento Agrário (SDA)\nAv. Milton Santos, 986 - Ondina, Salvador - BA\n⏰ *Horário de atendimento:* Segunda a sexta, das 8h às 18h');
    
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '🗺️ Veja no mapa: https://maps.app.goo.gl/axYfa4WUpiKZk2GS7\n\n🔁 Digite *menu* para voltar ao início.');
    }
    
    // Opção 5
    if (msg.body !== null && msg.body === '5' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
    
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '❓ Se você tiver outras dúvidas, entre em contato pelos nossos canais oficiais.\n\n🌐 Site: https://www.sda.sdr.ba.gov.br/\n📞 Telefone fixo: (71) 3116-7200.\n\n🔁 Digite *menu* para voltar ao início.');
    }
    
    // Retorno ao menu digitando "menu"
    if (msg.body !== null && msg.body.toLowerCase() === 'menu' && msg.from.endsWith('@c.us')) {
        await enviarMenuPrincipal(msg, client);
    }









    });