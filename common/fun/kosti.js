/**
 * Created by Илья on 08.03.2016.
 */
'use strict'
function BrositKost(bot, msg, suffix) {
    var times = suffix.split(" ")[0];
    var sides = suffix.split(" ")[1];
    if (times > 500 && sides > 500) {
        bot.sendMessage(msg.channel, msg.author + " Это слишком много, я не могу бросить эту кость, она слишком большая.");
    } else if (times > 900) {
        bot.sendMessage(msg.channel, msg.author + " Это слишком много, я не могу бросить эту кость, она слишком большая.");
    } else {
        if (!sides) {
            sides = 6;
        }
        if (!times) {
            times = 1;
        }
        var msgArray = [];
        var number = 0;
        var total = 0;
        var average = 0;
        for (var i = times; i > 0; i--) {
            number = Math.floor(Math.random() * sides) + 1;
            total += number;
            average = total / times;
            msgArray.push(number);
        }
        if (isNaN(times) || isNaN(sides)) {
            bot.sendMessage(msg.channel, msg.author + " кости " + suffix + "\nИспользуй: **`Jan кости`** `сколько раз бросить` `число сторон`");
            return;
        } else {
            bot.sendMessage(msg.channel, msg.author.name + " подбрасывает кость с " + sides + " сторонами " + times + " раз(а)." +
                "\nВыпали очки: " + msgArray.join(', ') +
                "\nСумма очков: " + total +
                "\nСреднее: " + average);
        }
    }
}
/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = BrositKost;