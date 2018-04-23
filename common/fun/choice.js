/**
 * Created by Илья on 08.03.2016.
 */
'use strict'
function Choice(bot, msg, suffix) {
    var split = suffix.split(" или ");
    var rand = Math.floor(Math.random() * Choices.length);
    if (split.length > 1) {
        msg.channel.sendMessage(Choices[rand] + " **" + multipleDecide(split) + "**");
    } else {
        msg.channel.sendMessage("Используй: **`!выбор`** `что-то` **`или`** `что-то...`");
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

var Choices = [
    "Я полагаюсь на",
    "Я бы выбрала",
    "На мой взгляд, это",
    "Возможно",
    "Мое финальное решение это",
    "Думаю лучше",
    "Абсолютно точно",
    "Определенно",
    "Ответ прост:",
    "Сложное решение... Наверное всё-таки",
    "Кайл подсказал выбрать",
    "Мон Мотма настаивает на",
    "Если ты жаплюсер, то выбирай",
    "Настоящий бейсер выберет",
    "Любой жашник выберет"
];

/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = Choice;