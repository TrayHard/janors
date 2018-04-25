/**
 * Created by Илья on 08.03.2016.
 */
'use strict'
function Choice(bot, msg, suffix) {
    var split = suffix.split(" или ");
    var rand = Math.floor(Math.random() * Choices.length);
    if (split.length > 1) {
        msg.channel.send(Choices[rand].replace("<select>",multipleDecide(split)));
    } else {
        msg.channel.send("Используй: **`!выбери`** `что-то` **`или`** `что-то...`");
    }

    function multipleDecide(options) {
        var selected = options[Math.floor(Math.random() * options.length)];
        if (selected === "") {
            return multipleDecide(options);
        } else {
            return selected;
        }
    }
}
// Чтобы использовать эмоции, прописываешь в чате \:emote: и потом используешь это
var Choices = [
    "**<select>** - выбор настоящего аутиста :dcp:",
    "**<select>** вполне неплохой вариант",
    "**<select>**, если конечно ты не хочешь оказаться в больнице <:joker:435457495847141387>",
    "**<select>**, очевидно же",
    "Я полагаюсь на **<select>**",
    "Я бы выбрала **<select>**",
    "На мой взгляд, это **<select>**",
    "Возможно **<select>**",
    "Мое финальное решение - **<select>**",
    "Думаю лучше **<select>**",
    "**<select>**. Но это не точно <:lul:230146619457142786>",
    "Определенно **<select>**",
    "Ответ прост: **<select>**",
    "Сложное решение... Наверное всё-таки **<select>**",
    "Кайл подсказал выбрать **<select>**",
    "Мон Мотма настаивает на **<select>**",
    "Если ты жаплюсер, то выбирай **<select>**",
    "Настоящий бейсер выберет **<select>**",
    "Любой жашник выберет **<select>**",
    "**<select>**, если ты конечно не гетеросексуал <:homo:438316317985079299>",
    "Разумеется **<select>** <:homo:438316317985079299> ",
];

/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = Choice;