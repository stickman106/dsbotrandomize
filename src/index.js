require('dotenv').config();
const {Client, IntentsBitField, User, Message, Guild, EmbedBuilder} = require('discord.js');
const { InteractionAlreadyReplied } = require('discord.js/src/errors/ErrorCodes');
const { request } = require('undici')

const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.GuildVoiceStates,
    ]
})

client.on('ready', (c) => {
    console.log('bot is ready');
})


client.on('interactionCreate', async (interction) => {
    if (!interction.isChatInputCommand()) return;

    if (interction.commandName === 'кубик'){
        interction.reply(`Твоё число ${(Math.floor(Math.random() * 6) + 1)}`)
    }

    if (interction.commandName === 'ранд-число'){
        const min = interction.options.get('min').value;
        const max = interction.options.get('max').value;
        interction.reply(`Твоё чиисло ${(Math.floor(Math.random() * (max - min)) + min)}`)
    }
    if (interction.commandName === 'cs-карта'){
        var maps = ["Mirage", "Overpass", "Vertigo", "Ancient", "Inferno", "Nuke", "Anubis", "Dust2", "Office"];
        var map = maps[Math.floor(Math.random() * maps.length)];
        interction.reply(`Рандомная карта: ${map}`)
    }
    if (interction.commandName === 'ранд-человек'){
        let member = await interction.guild.members.fetch()
        var arr = []
        member.forEach((member => {
            if (member.user.bot === false){
                arr.push(member.user.id)
            };
            
        }))
        var random = [Math.floor(Math.random() * arr.length)]
        const embedp = new EmbedBuilder()
        .setTitle('Рандомный человек')
        .setDescription(`<@${arr[random]}>`)
        .setColor("Random")
        interction.reply({embeds: [embedp]})
        
    }
    if (interction.commandName === 'ранд-человек-гк'){
        let member = (await interction.guild.members.fetch())
        var arr = []
        try{
            var vc = interction.member.voice.channel.id
        } catch(error){
            interction.reply(" Вы не в голосовом канале")
        }
        member.forEach((member => {
            if (member.user.bot === false){
                try{
                    var vcm = member.voice.channel.id
                } catch(error){
                    var vcm = null
                }
                if (vcm == vc){
                    arr.push('<@'+member.user.id+'>')
                }
            };
            
        }))
        if (vc!=null){
            var random = [Math.floor(Math.random() * arr.length)]
            const embedpv = new EmbedBuilder()
            .setTitle('Рандомный человек из голосового')
            .setDescription(`${arr[random]}`)
            .setColor("Random")
            interction.reply({embeds: [embedpv]})
            
        }
    }  
    if (interction.commandName === 'ранд-цвет'){
        var letters = '0123456789ABCDEF'
        var color = ''
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        var url1 = `https://htmlcolors.com/color-image/${color}.png`
        const embed = new EmbedBuilder()
        .setTitle('Рандомный цвет')
        .setDescription(`#${color}`)
        .setImage(`https://htmlcolors.com/color-image/${color}.png`)
        .setColor(color)
        interction.reply({embeds: [embed]})
    }
    if (interction.commandName === 'шар'){
        var answers = ["Определенно да", "Мой ответ нет", "Не могу сказать сейчас", "Как я вижу, да", "Сконцентрируйся и спроси ещё раз", "Очень сомнительно", "Без сомнения", "Я думаю нет", "Лечше тебе сейчас это не говорить", "Скорее всего", "Нет"];
        var answer = answers[Math.floor(Math.random() * answers.length)];
        interction.reply(`${answer}`)
    }
    if (interction.commandName === 'ранд-слово'){
        const sentence = String(interction.options.get('sentence').value);
        var words = sentence.replace(/,|<|>|;|:|!|\.|\?/g, " ").split(" ");
        var filteredwords = words.filter(function(e) { return e !== '' })
        var answord = filteredwords[Math.floor(Math.random() * words.length)];
        interction.reply(`Твоё слово: ${answord}`);
    }
    if (interction.commandName === 'перем-слова'){
        const sentence = String(interction.options.get('sentence').value);
        var words = sentence.replace(/,|<|>|;|:|!|\.|\?/g, " ").split(" ");
        var filteredwords = words.filter(function(e) { return e !== '' })
        let shuffled = filteredwords.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value).join(" ")
        interction.reply(`${shuffled}`);
    }
    if (interction.commandName === 'перем-сим-сл'){
        const sentence = String(interction.options.get('sentence').value)
        var sent = sentence.replace(/\./g, " . ").replace(/,/g, " , ").replace(/;/g, " ; ").replace(/:/g, " : ").replace(/</g, " < ").replace(/>/g, " > ").replace(/!/g, " ! ").replace(/\?/g, " ? ").replace(/\(/g, " ( ").replace(/\)/g, " ) ")
        const sentencearr = String(sent).split(" ");
        var sharr =[]
        for (var i = 0; i<sentencearr.length; i++) {
            var lewords = sentencearr[i].split("");
            let shuffled = lewords.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value).join("")
            sharr.push(shuffled)
        }
        let result = sharr.join(" ")
        interction.reply(`${result}`);
    }
    if (interction.commandName === 'созд-команд'){
        const amount = interction.options.get('amount').value;
        if (amount ===1){
            interction.reply("Кол-во создаваемых коман должно быть больше 1")
        }else{
            let member = (await interction.guild.members.fetch())
        var arr = []
        try{
            var vc = interction.member.voice.channel.id
        } catch(error){
            interction.reply(" Вы не в голосовом канале")
        }
        member.forEach((member => {
            if (member.user.bot === false){
                try{
                    var vcm = member.voice.channel.id
                } catch(error){
                    var vcm = null
                }
                if (vcm == vc){
                    arr.push('<@'+member.user.id+'>')
                }
            };
            
        }))
        if (vc!=null){
            var amvt = Math.floor(arr.length/amount)
            if( amvt===0){
                interction.reply(`Недостаточно человек в голосовом канале для ${amount} команд`)
            } else{
                let shuffled = arr.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value)
                teams=[]
                for (var i = 0; i<shuffled.length; i+=amvt) {
                    ch=shuffled.slice(i, i+amvt)
                    teams.push(shuffled.slice(i, i+amvt)) 
                }
                var tl=teams.length
                if (tl>amount){
                    for (var i = 0; i<teams[tl-1].length; i++){
                        teams[i]=teams[i].concat(teams[tl-1][i])
                    }
                }
                var strt = ""
                    for (var i = 0; i<amount; i++) {
                        var strt = strt+`
                        Команда ${i+1}: ${String(teams[i])};   `
                    }
                
                const embedt = new EmbedBuilder()
                .setTitle('Команды:')
                .setDescription(strt)
                .setColor("Green")
                interction.reply({embeds: [embedt]})
            }  
        }
        }  
    }
    if (interction.commandName === 'др'){
        const gifresult = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.APIGIPHYID}&tag=happybirthday&rating=g`)
        const answer = await gifresult.json();
        var imgg=await answer.data.id
        const dr = new EmbedBuilder()
        .setTitle('С днем рождения!')
        .setImage(`https://media1.giphy.com/media/${imgg}/giphy.gif`)
        .setColor('Random')
        interction.reply({embeds: [dr]})
    }
    if (interction.commandName === 'мем'){
        const gifresult = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.APIGIPHYID}&tag=meme`)
        const answer = await gifresult.json();
        var imgg= await answer.data.id
        const dr = new EmbedBuilder()
        .setTitle('Твой мем:')
        .setImage(`https://media1.giphy.com/media/${imgg}/giphy.gif`)
        .setColor('Random')
        interction.reply({embeds: [dr]})
    }
    

})

client.login(process.env.TOKEN)