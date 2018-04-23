/**
 * Created by Илья on 08.03.2016.
 */
'use strict'
var multiline = require("multiline");
var Config = require('../../config.json');
if (Config.prefix == '!'){
    var prefix = Config.prefix;
} else var prefix = Config.prefix.concat(" ");

function MemeHelp(bot, msg, suffix) {
    if (suffix === "1") {
        msg.channel.sendMessage(memelist.list1);
    } else if (suffix === "2") {
        msg.channel.sendMessage(memelist.list2);
    } else if (suffix === "3") {
        msg.channel.sendMessage(memelist.list3);
    } else if (suffix === "список") {
        msg.channel.sendMessage(memelist.list1);
        msg.channel.sendMessage(memelist.list2);
        msg.channel.sendMessage(memelist.list3);
    } else {
        msg.channel.sendMessage(msg.channel, memelist.all);
    }
}

function MemeCreate(bot, msg, suffix) {
    var query = suffix;
    if (!query) {
        msg.channel.sendMessage('Используй: **`'+prefix+'мем`** `название мема` `"верхний текст"` `"нижний текст"`');
        return;
    }
    var tags = query.split('"');
    console.log(tags);
    //var name = appeal[0].match(/\S+/)[0];
    var memetype = tags[0].match(/\S+/)[0];
    console.log(memetype);
    var Imgflipper = require("imgflipper");
    var imgflipper = new Imgflipper(Config.imgflip_username, Config.imgflip_password);
    imgflipper.generateMeme(meme[memetype], tags[1] ? tags[1] : "", tags[3] ? tags[3] : "", function(err, image) {
        if (err) {
            msg.channel.sendMessage('Используй: **`'+prefix+'мем`** `название мема` `"верхний текст"` `"нижний текст"`');
        } else {
            msg.channel.sendMessage(image);
        }
    });
};

var memelist = {
all:
    `Названия мемов для !мем
 **\`!мемы 1\`**
 **\`!мемы 2\`**
 **\`!мемы 3\`**
 **\`!мемы список\`**
    `,
list1:
    `
    **\`aliens\`** - Задумчивый Чужой :alien:
    **\`allthese\`** - Посмотри на все это
    **\`allthings\`** - Все за... Конечно за...
    **\`approved\`** - Чак Норрис :thumbsup:
    **\`archaic\`** - Жозеф Дукреукс
    **\`archer\`** - Арчер
    **\`bender\`** - БлэкДжэк и Проститутки
    **\`both\`** - Почему бы и нет :question:
    **\`brace\`** - Держись,...Оно идет!
    **\`cares\`** - Никто о тебе не побеспокоится m8
    **\`cat\`** - Грустный котейка :cat:
    **\`cat2\`** - Важная котейка за столом :cat:
    **\`chainsaw\`** - Медведь с бензопилой :bear:
    **\`challenge\`** - Испытание принято 'Challenge Accept'
    **\`cheers\`** - Леонардо Дикаприо с шампанским :smiley:
    **\`childhood\`** - Дед которому плохо :dizzy_face:
    **\`chilling\`** - Что за?... :question:
    **\`christ\`** - Указывающий Христос :pray:
    **\`clarity\`** - Sudden clarity Clarence :frowning:
    **\`cold\`** - Джек Николсон в снегу :snowman:
    **\`confession\`** - Грустный мишка :bear:
    **\`conspiracy\`** - Шпион Киану Ривз :frowning:
    **\`consuela\`** - Не смешно :unamused:
    **\`cows\`** - Дьявольская корова :cow:
    **\`dcp\`** - ДЦП face
    **\`djpauly\`** - Диджей Паули
    **\`doge\`** - Собачка Доги
    **\`doges\`** - Поражающий мемас
    **\`drama\`** - Майкл Джексон и попкорн
    **\`drevil\`** - Цитата Доктора Зло
    **\`elf\`** - Веселый эльф
    **\`everywhere\`** - ..., ... они..они повсюду...
    **\`explosion\`** - Ядерный взрыв :boom:
    **\`floor\`** - Тот самый пол из Грандфинала, убивший Костю :boom:
    **\`frustrated\`** - О боже мой *facepalm*
    **\`fry\`** - Нет, только не ... или ... :confused:
    **\`fry2\`** - Заткнись и возьми мои деньги
    **\`giveup\`** - Нахер это дерьмо m8
    **\`gone\`** - Иии... Что тебе надо??? *south park*
    **\`goodday\`** - Сегодня хороший день
    **\`goodguy\`** - Хороший мальчик Грэг :smile:
    **\`hide\`** - Когда дети и жена ушли, ты можешь...
    **\`highguy\`** - Улыбчевый парень
    **\`hot\`** - Очень горячо :hotsprings:
    **\`idontalways\`** - Я не могу всего ... но я могу сделать ...
    **\`impossibru\`** - НИВАЗМОЖНА! :grimacing:
    **\`internet\`** - Интернет Гайд
    **\`internet2\`** - Добро пожаловать в интернет :sweat_drops:
    `,
list2:
    `
    **\`johnny\`** - Это Джонни
    **\`joker\`** - И что ты в этом понимаешЬ?! Joker
    **\`karate\`** - Кайл Каратэ Мастер
    **\`keepcalm\`** -- Keep calm and ...
    **\`kermit\`** - Бизнес лягушка пьющая чай
    **\`koala\`** - Коала с сюрпризом :koala:
    **\`laugh\`** - Смеющийся Леонардо Ди Каприо :laughing:
    **\`lebowski\`** - Облажавшийся Лебовски :confused:
    **\`limes\`** - Почему я не могу удержать все эти лаймы?
    **\`lionking\`** - Король Лев :tiger: :crown:
    **\`lol\`** - L0L
    **\`look\`** - Посмотри на меня :eyes:
    **\`luck\`** - Плохая улыбка Брайана
    **\`luke\`** - Люк, я твой ...
    **\`mallard\`** - Уточка
    **\`money\`** - Маска :dollar:
    **\`more\`** - Я не могу дать тебе больше ...
    **\`morpheus\`** - Что делать если я скажу вам :pill:
    **\`mrbean\`** - Пойми что у тебя в сознание :smirk:
    **\`mrt\`** - Mr. T
    **\`nappa\`** - Нет Nappa это трюк
    **\`news\`** - Питер Гриффин в новостях
    **\`news2\`** - Рон Бургунди в новостях
    **\`notbad\`** - Нет сомнений
    **\`noty\`** - Убей всех :skull:
    **\`obiwan\`** - ОбиВан Кеноби
    **\`onedoesnot\`** - Нельзя просто так взять и...
    **\`onlyone\`** - Я единственный кто остался здесь :gun:
    **\`ouch\`** - Не волнуйся, со мной все хорошо
    **\`paddlin\`** - Это палладин
    **\`past\`** - Верни мои годы :older_man:
    **\`past2\`** - Верни мои годы :older_man:
    **\`patrick\`** - Возьми ... и отдай всем
    **\`patrick2\`** - Грустный патрик
    **\`penguin\`** - Каждый социал-пингвин :penguin:
    **\`penguin2\`** - Пингвин Гангстер :penguin:
    **\`phone\`** - Лиям Нессон Taken :worried:
    **\`picard\`** - Капитан Пикард рукалицо :neutral_face: :hand:
    **\`picard2\`** - Капитан Пикард WTF :question:
    **\`please\`** - Яо МИнг :joy:
    **\`powers\`** - Астин Энергия :smirk:
    **\`powers2\`** - Серьещно :question:
    **\`problems\`** - Первая в мире проблема :cry:
    **\`problems2\`** - 90ые первая проблема всего мира :cry:
    **\`puffin\`** - Не популярный Паффин :bird:
    **\`rpg\`** - RPG веселье
    `,
list3: `
 **\`rum\`** - Пират Карибского моря :question:
 **\`say\`** - Скажи пока у тебя есть время, Я слушаю
 **\`scumbag\`** - Скумбаг Стив
 **\`seal\`** - Тюлень попрошайка :neutral_face:
 **\`seal2\`** - Довольный тюлень :smirk:
 **\`seriously\`** - Ты сейчас серьезно :question:
 **\`skeleton\`** - Скелет в шкафу :skull:
 **\`skeptical\`** - Скептический ребенок
 **\`sorry\`** - Рик и Карл :cry:
 **\`sparrow\`** - Бегущий Джек Воробей
 **\`sparta\`** - Это спарта!
 **\`spiderman\`** - Питер Паркер
 **\`spidermanbed\`** - Человек Паук на кровати
 **\`spidermancamera\`** - Камера Человека Паука :camera:
 **\`spidermandesk\`** - Человек Паук за столом
 **\`spidermanmoney\`** - Деньги и Человек Паук :dollar:
 **\`spidermanrails\`** - Человек Паук на рельсах
 **\`spidermansad\`** - Грустный Человек Паук :frowning:
 **\`spongebob\`** - Только не ...
 **\`spongebob2\`** - Воображение :rainbow:
 **\`spongebob3\`** - У меня есть немного
 **\`squidward\`** - Отлично :vs: Херово
 **\`success\`** - Ребенок подтверждает
 **\`sucks\`** - Жизнь плоха
 **\`tableflip\`** - /tableflip
 **\`teacher\`** - Невеселый учитель старшей школы
 **\`teacher2\`** - Раста учитель
 **\`ted\`** - TED :confused:
 **\`time\`** - У нас больше нет времени для этого :clock2:
 **\`told\`** - Мне сказали что будет ахиренно
 **\`toohigh\`** - В таком же высоком :chart_with_upwards_trend:
 **\`trophy\`** - Это чье то? Я возьму ... пожалуй один :trophy:
 **\`truestory\`** - Тру Стори
 **\`unicorn\`** - Unicorn Man
 **\`wat\`** - Wat :question:
 **\`wait\`** - Подожди ка здесь
 **\`whoa\`** - Нейл деГрэсс Тайсон
 **\`win\`** - Барни Стансон выиграл :thumbsup:
 **\`wonka\`** - Вилли Вонка  :eyes:
 **\`wtf\`** - Джэкки Чан WTF :question:
 **\`wth\`** - Кевин Харт WTH :question:
 **\`yeah\`** - That would be great
 **\`yoda\`** - Йона это Я
 **\`yo dawg\`** - Yo Dawg
 **\`yuno\`** - Y U No
 **\`zoidberg\`** - Ты грустишь по постели
 **\`404\`** - :warning: Not Found :warning:
 **\`?\`** - :warning: :tm: :warning:
`
 };

//If you want to add more memes, go to https://imgflip.com/memetemplates click on the wanted meme and click Blank Template on the right, then just copy the ID and name it
var meme = {
    "onedoesnot": 61579,
    "floor": 60767840,
    "dcp": 60835612,
    "idontalways": 61532,
    "aliens": 101470,
    "fry": 61520,
    "everywhere": 347390,
    "cheers": 5496396,
    "problems": 61539,
    "brace": 61546,
    "yuno": 61527,
    "kermit": 16464531,
    "luck": 61585,
    "wonka": 61582,
    "yeah": 563423,
    "cat": 405658,
    "skeptical": 101288,
    "doge": 8072285,
    "morpheus": 100947,
    "allthings": 61533,
    "picard": 1509839,
    "picard2": 245898,
    "onlyone": 259680,
    "wat": 14230520,
    "drevil": 40945639,
    "toohigh": 61580,
    "success": 101287,
    "time": 442575,
    "confession": 100955,
    "wait": 109765,
    "say": 124212,
    "highguy": 101440,
    "yodawg": 101716,
    "spongebob": 101511,
    "seal": 13757816,
    "sparta": 195389,
    "joker": 1790995,
    "conspiracy": 61583,
    "gone": 766986,
    "past": 718432,
    "hot": 21604248,
    "patrick": 61581,
    "scumbag": 61522,
    "noty": 172314,
    "cat2": 1367068,
    "skeleton": 4087833,
    "more": 13424299,
    "phone": 228024,
    "yoda": 14371066,
    "archer": 10628640,
    "spidermandesk": 1366993,
    "cares": 6531067,
    "past2": 1232104,
    "christ": 17699,
    "penguin": 61584,
    "spongebob2": 163573,
    "laugh": 17496002,
    "clarity": 100948,
    "wtf": 412211,
    "obiwan": 409403,
    "news": 356615,
    "sorry": 11557802,
    "seal2": 23909796,
    "wth": 265789,
    "fry2": 176908,
    "powers": 646581,
    "puffin": 7761261,
    "koala": 27920,
    "luke": 19194965,
    "news2": 1232147,
    "spiderman": 107773,
    "sparrow": 460541,
    "look": 30213495,
    "djpauly": 2005809,
    "mrt": 1570716,
    "goodguy": 61521,
    "allthese": 516587,
    "unicorn": 138874,
    "lionking": 206153,
    "spongebob3": 326093,
    "impossibru": 307405,
    "frustrated": 320771,
    "trophy": 3218037,
    "ted": 131092,
    "mallard": 1356640,
    "elf": 401687,
    "problems2": 101296,
    "zoidberg": 35747,
    "teacher": 100957,
    "please": 109015,
    "archaic": 61535,
    "drama": 16350739,
    "whoa": 109017,
    "told": 2372682,
    "consuela": 160583,
    "johnny": 309172,
    "spidermanbed": 152145,
    "money": 828786,
    "tableflip": 1380694,
    "approved": 241304,
    "goodday": 7722308,
    "paddlin": 5265532,
    "bender": 59250,
    "hide": 750310,
    "internet2": 701902,
    "giveup": 156115,
    "cold": 9106691,
    "explosion": 313162,
    "karate": 61561,
    "squidward": 285870,
    "chainsaw": 136212,
    "keepcalm": 22415053,
    "internet": 406070,
    "challenge": 24792,
    "mrbean": 583373,
    "truestory": 335860,
    "rum": 752040,
    "cows": 107043,
    "childhood": 177491,
    "spidermanrails": 413621,
    "rpg": 309184,
    "win": 690206,
    "both": 542036,
    "patrick2": 465748,
    "powers2": 26468627,
    "spidermansad": 412764,
    "limes": 5824468,
    "404": 241795,
    "chilling": 220847,
    "notbad": 289182,
    "lebowski": 1195347,
    "penguin2": 274504,
    "spidermancamera": 1045989,
    "lol": 105398,
    "teacher2": 61566,
    "seriously": 412219,
    "spidermanmoney": 191950,
    "nappa": 295701,
    "ouch": 129430,
    "sucks": 201950,
    "doges": 7665301,
    "?": 1139584,
};

/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
exports.MemeHelp = MemeHelp;
exports.MemeCreate = MemeCreate;