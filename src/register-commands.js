require('dotenv').config()
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
    {
        name: 'кубик',
        description:'Рандомное число между 1-6',
    },
    {
        name: 'ранд-число',
        description: 'Задай диапозон рандомного числа',
        options: [
            {
                name: "min",
                description: "минимальное число",
                type: ApplicationCommandOptionType.Number,
                required: true
            },
            {
                name: "max",
                description: "максимальное число",
                type: ApplicationCommandOptionType.Number,
                required: true
            }
        ]
    },
    {
        name: 'cs-карта',
        description:'рандомная карта из кс 2',
    },
    {
        name: 'ранд-человек',
        description:'Выдает рандомного человека с сервера',
    },
    {
        name: 'ранд-человек-гк',
        description:'Выдает рандомного человека с голосового',
    },
    {
        name: 'ранд-цвет',
        description:'Генерирует рандомный цвет',
    },
    {
        name: 'шар',
        description:'Волшебный шар предсказаний(ответы в виде да, нет)',
    },
    {
        name: 'ранд-слово',
        description: 'Выбирает рандомное слово из предложения',
        options: [
            {
                name: "sentence",
                description: "предложение",
                type: ApplicationCommandOptionType.String,
                required: true
            },
            
        ]
    },
    {
        name: 'перем-слова',
        description: 'Ставит сова в случайном порядке',
        options: [
            {
                name: "sentence",
                description: "предложение",
                type: ApplicationCommandOptionType.String,
                required: true
            },
            
        ]
    },
    {
        name: 'перем-сим-сл',
        description: 'Ставит символы в случайном порядке',
        options: [
            {
                name: "sentence",
                description: "предложение",
                type: ApplicationCommandOptionType.String,
                required: true
            },
            
        ]
    },
    {
        name: 'созд-команд',
        description: 'Распределяет участников голосового канала на команды',
        options: [
            {
                name: "amount",
                description: "кол-во команд",
                type: ApplicationCommandOptionType.Number,
                required: true
            },
            
        ]
    },
    {
        name: 'др',
        description:'Рандомная гифка с днем рождения',
    },
    {
        name: 'мем',
        description:'Рандомный мем',
    },
    

];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('registring / commands');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands}
        ),
        

        console.log('/ commands were registered')

    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();
