'use strict'
var Discord = require("discord.js");
var Config = require('../../config.json');
var multiline = require("multiline");
var fs = require("fs");

// const maxSymbInRoleName = 20;
const timeToDelete = 10000; // Время до удаления спама в канале
var help = multiline(function() {/*
__**Менеджер ролей:**__
**Команды:**
`!roles`**- показать это сообщение**
`!roles` `?` **- посмотреть список ролей (своих, всех и доступных)**
`!roles` `+` `<id1>`,`[id2]`...**- добавить себе роль**
`!roles` `-` `[id1]`,`[id2]`...**- снять с себя роли (без аргументов - снять все роли)**
`!roles` `=` `[id1]`,`[id2]`...**- установить список ролей (без аргументов - снять все роли)**
**Примеры:**
Добавить себе роли Quake и PUBG
```!roles + Quake, pubg```
Снять с себя роли Quake и PUBG
```!roles - Quake, PUBG```
Установить себе роли Quake, Anime и PUBG (снимет все остальные)
```!roles = Quake, anime, PUBG```
Снять с себя все роли:
```!roles =```
или
```!roles -all```
*Примечание:*
*Ввод не чувствителен к регистру и лишним пробелам. Роли отделяются запятой.*
*/
});

function RefreshRoles(bot, managedRoles){
    managedRoles.forEach(x => {
        x.name = bot.guilds.first().roles.find("id", x.id).name.toLowerCase();
    })
    var str = JSON.stringify(managedRoles);
    fs.writeFile("roles.json", str, function(){
        console.log("Roles has been updated!");
    })
}

function ManageRoles(bot, msg, suffix, managedRoles) {
//////  Регулярки для отлова +, - и =
    var rgPlus = new RegExp(/^\+ ([a-zA-Z0-9а-яА-Я ]{1,20},?){0,9}[a-zA-Z0-9а-яА-Я ]{1}$/i)
        .test(suffix);
    var rgMinus = new RegExp(/^\- ([a-zA-Z0-9а-яА-Я ]{1,20},?){0,9}[a-zA-Z0-9а-яА-Я ]{1}$/i)
        .test(suffix);
    var rgRavno = new RegExp(/^\= ([a-zA-Z0-9а-яА-Я ]{1,20},?){0,9}[a-zA-Z0-9а-яА-Я ]{1}$/i)
        .test(suffix);
/////////////////////  Справка по функции !roles
    if(suffix == "") {
        msg.author.send(help).then(()=>{
            if(msg.channel != msg.author.dmChannel) {
                msg.delete();
            }
        });
    } else 
/////////////////////  Получаем актуальную информацию о ролях
    if (suffix == "?") {
        // Получаем список всех ролей
        var TextToSend = "**Список ролей:**\n\`\`\`";
        managedRoles.forEach(element => {
            TextToSend += element.name + ", "
        });
        TextToSend = TextToSend.slice(0, TextToSend.length - 2) + "\`\`\`\n";
        // Получаем список ролей юзера
        var managedRolesNames = managedRoles.map(role => role.name);
        var userRolesNames = msg.member.roles.array().map(role => role.name.toLowerCase());
        var managedUserRolesNames = userRolesNames.filter(x => managedRolesNames.includes(x));
        TextToSend += "**Ваши роли:**\n\`\`\`"+ managedUserRolesNames.join(", ") + "\`\`\`\n";
        console.log(managedUserRolesNames);
        console.log(managedUserRolesNames.join(", "));
        // Получаем список доступных ему для добавления ролей
        var allowedRoles = managedRolesNames.filter(x => !managedUserRolesNames.includes(x));
        TextToSend += "**Доступные для добавления роли:**\n\`\`\`" + allowedRoles.join(", ") + "\`\`\`\n";
        // Отсылаем сообщение со всеми списками
        msg.channel.send(TextToSend).then(()=>{
            msg.delete(timeToDelete);
            bot.user.lastMessage.delete(timeToDelete);
        });
    } else
/////////////////////  Добавление ролей
    if(rgPlus) {
        var args = suffix
            .slice(2)                           // Вырезаем плюс и пробел
            .split(",")                         // Кидаем в массив
            .map(x => x.toLowerCase().trim());  // Обрезаем пробелы
        // Если все что введено - мусор, выводим ошибку
        if(args.length == 0) {
            msg.channel.send(":no_entry: **Ошибка ввода:** Вы просто ввели какую-то чушь? :thinking: ").then(msg.delete());
            return;
        }
        // Убрать все лишние слова и роли, которых нет в списке управляемых ролей
        args = args.filter(x => managedRoles.map(role => role.name.toLowerCase())
            .includes(x.toLowerCase().trim()));
        // Таких ролей нет или это просто чушь, то
        if(args.length == 0) {
            msg.channel.send(":no_entry: **Ошибка ввода:** Таких ролей нет или ими нельзя управлять!").then(()=>{
                    msg.delete(timeToDelete);
                    bot.user.lastMessage.delete(timeToDelete+1000);
            });
            return;
        }
        // Фильтрация ролей, которые уже есть у юзера (оставляем те, которых нет)
        args = args.filter(x => !msg.member.roles.array()
            .map(role => role.name.toLowerCase())
            .includes(x.toLowerCase().trim()));
        // Если нет таких ролей:
        if(args.length == 0){
            msg.channel.send(":no_entry: **Ошибка ввода:** Роли, которые вы ввели, либо не существуют, либо недоступны, либо уже есть у вас!").then(()=>{
                    msg.delete(timeToDelete);
                    bot.user.lastMessage.delete(timeToDelete+1000);
            });
            return;
        }
        // Собираем ID ролей
        var ids = managedRoles
            .filter(x => args.includes(x.name))
            .map(x => x.id);
        // Присваиваем их пользователю
        msg.member.addRoles(ids)
            .then(msg.channel.send(`:white_check_mark: **Успешно:** роли \`${args.join("\`, \`")}\` были успешно добавлены!`).then(()=>{
                    msg.delete(timeToDelete);
                    bot.user.lastMessage.delete(timeToDelete + 1000);
            }))
            .catch(console.error);
/////////////////////  Удаление ролей
    } else if(rgMinus||suffix == "- all"||suffix == "-all") {
        if (suffix == "- all"||suffix == "-all"){
            let managedRolesIDs = managedRoles.map(role => role.id);
            let userRolesIDs = msg.member.roles.array().map(role => role.id);
            let managedUserRolesIDs = userRolesIDs.filter(x => managedRolesIDs.includes(x));
            if(managedUserRolesIDs.length==0){
                msg.channel.send(":no_entry: **Ошибка:** У вас нет никаких поддерживаемых ролей!")
                return;
            }
            msg.member.removeRoles(managedUserRolesIDs)
                .then(msg.channel.send(":white_check_mark: **Успешно:** **Все роли** были успешно удалены!").then(()=>{
                        msg.delete(timeToDelete);
                        bot.user.lastMessage.delete(timeToDelete + 1000);
                }))
                .catch(console.error);
            return;
        }
        var args = suffix
            .slice(2)                               // Вырезаем минус и пробел
            .split(",")                             // Кидаем в массив
            .map(x => x.toLowerCase().trim());      // Обрезаем пробелы
        // Если все что введено - мусор, выводим ошибку
        if(args.length == 0) {
            msg.channel.send(":no_entry: **Ошибка ввода:** Вы просто ввели какую-то чушь? :thinking: ").then(()=>{
                msg.delete(timeToDelete);
                bot.user.lastMessage.delete(timeToDelete + 1000);
            });
            return;
        }
        // Убрать все лишние слова и роли, которых нет в списке управляемых ролей
        args = args.filter(x => managedRoles.map(role => role.name.toLowerCase())
            .includes(x.toLowerCase().trim()));
        // Таких ролей нет или это просто чушь, то
        if(args.length == 0) {
            msg.channel.send(":no_entry: **Ошибка ввода:** Таких ролей нет или ими нельзя управлять!").then(()=>{
                msg.delete(timeToDelete);
                bot.user.lastMessage.delete(timeToDelete + 1000);
            });
            return;
        }
        // Фильтрация ролей, которые уже есть у юзера (оставляем те, которые есть)
        args = args.filter(x => msg.member.roles.array()
            .map(role => role.name.toLowerCase())
            .includes(x.toLowerCase().trim()));
        // Если нет таких ролей:
        if(args.length == 0){
            msg.channel.send(":no_entry: **Ошибка ввода:** Роли, которые вы ввели, либо не существуют, либо недоступны, либо их у вас нет!").then(()=>{
                msg.delete(timeToDelete);
                bot.user.lastMessage.delete(timeToDelete + 1000);
            });
            return;
        }
        // Собираем ID ролей
        var ids = managedRoles
            .filter(x => args.includes(x.name))
            .map(x => x.id);
        // Присваиваем их пользователю
        msg.member.removeRoles(ids)
            .then(msg.channel.send(`:white_check_mark: **Успешно:** роли \`${args.join("\`, \`")}\` были успешно удалены!`).then(()=>{
                msg.delete(timeToDelete);
                bot.user.lastMessage.delete(timeToDelete + 1000);
            }))
            .catch(console.error);
/////////////////////  Устанавливание ролей
        } else if(rgRavno||suffix == "=") {
            ////// Удаление всех ролей
            if (suffix == "="){
                let managedRolesIDs = managedRoles.map(role => role.id);
                let userRolesIDs = msg.member.roles.array().map(role => role.id);
                let managedUserRolesIDs = userRolesIDs.filter(x => managedRolesIDs.includes(x));
                if(managedUserRolesIDs.length==0){
                    msg.channel.send(":warning:  **Внимание:** У вас и так нет ролей!").then(()=>{
                        msg.delete(timeToDelete);
                        bot.user.lastMessage.delete(timeToDelete + 1000);
                    });
                    return;
                }
                msg.member.removeRoles(managedUserRolesIDs)
                    .then(msg.channel.send(":white_check_mark: **Успешно:** **Все роли** были успешно удалены!").then(()=>{
                        msg.delete(timeToDelete);
                        bot.user.lastMessage.delete(timeToDelete + 1000);
                    }))
                    .catch(console.error);
                return;
            }
            ////// Выборочное установление
            var args = suffix
                .slice(2)                               // Вырезаем равно и пробел
                .split(",")                             // Кидаем в массив
                .map(x => x.toLowerCase().trim());      // Обрезаем пробелы и берем в нижнем регистре
            // Если все что введено - мусор, выводим ошибку
            if(args.length == 0) {
                msg.channel.send(":no_entry: **Ошибка ввода:** Вы просто ввели какую-то чушь? :thinking: ").then(()=>{
                    msg.delete();
                    bot.user.lastMessage.delete(timeToDelete + 1000);
                });
                return;
            }
            // Убрать все лишние слова и роли, которых нет в списке управляемых ролей
            args = args.filter(x => managedRoles.map(role => role.name.toLowerCase())
                .includes(x.toLowerCase().trim()));
            // Таких ролей нет или это просто чушь, то
            if(args.length == 0) {
                msg.channel.send(":no_entry: **Ошибка ввода:** Таких ролей нет или ими нельзя управлять!").then(()=>{
                    msg.delete(timeToDelete);
                    bot.user.lastMessage.delete(timeToDelete + 1000);
                });
                return;
            }
            ///// Фильтрация ролей
            // Те роли, которые запрошены, но нет у юзера - добавляем
            var rolesToAdd = args.filter(x => !msg.member.roles.array()
                .map(role => role.name.toLowerCase())
                .includes(x.toLowerCase().trim()));
            // Составляем массив всех управляемых ролей у юзера
            var managedUserRolesNames =
                msg.member.roles.array()                            // Роль есть у юзера
                    .map(role => role.name)                         // Берем имя
                    .filter(x => managedRolesNames.includes(x));    // Роль управляемая
            // Те УПРАВЛЯЕМЫЕ роли, которые есть у юзера, но не запрошены - удаляем
            var rolesToRemove = managedUserRolesNames.filter(x => !args.includes(x.toLowerCase().trim()))
            // Если нет таких ролей:
            if(args.length == 0){
                msg.channel.send(":no_entry: **Ошибка ввода:** Роли, которые вы ввели, либо не существуют, либо недоступны, либо их у вас нет!").then(()=>{
                    msg.delete(timeToDelete);
                    bot.user.lastMessage.delete(timeToDelete + 1000);
                });
                return;
            }
            // Собираем ID ролей для добавления
            var idsAdd = managedRoles
                .filter(x => rolesToAdd.includes(x.name))
                .map(x => x.id);
            // Собираем ID ролей для удаления
            var idsRemove = managedRoles
                .filter(x => rolesToRemove.includes(x.name))
                .map(x => x.id);
            // Добавляем роли
            msg.member.addRoles(idsAdd)
                .then(
                    // Удаляем роли
                    msg.member.removeRoles(idsRemove)
                        .then(msg.channel.send(`:white_check_mark: **Успешно:** роли **${args.join(", ")}** были успешно установлены!`).then(()=>{
                            msg.delete(timeToDelete);
                            bot.user.lastMessage.delete(timeToDelete + 1000);
                        }))
                        .catch(console.error))
                .catch(console.error);
        }
}


/*===============================================================================*/
/*===============================================================================*/
/*===============================================================================*/
module.exports = {
    ManageRoles: ManageRoles,
    RefreshRoles: RefreshRoles,
 }