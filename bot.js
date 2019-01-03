const Discord = require('discord.js');
const client = new Discord.Client();
const ms = require("ms");
const prefix = "/";

client.on('ready', () => {
    console.log(`Your App is Now Activated ${client.user.tag}!`);
});


//هذا كود طرد عضو من السيرفر

client.on("message", (message) => {
    if (message.content.startsWith("/kick")) {
        var member= message.mentions.members.first();
        member.kick().then((member) => {
            message.channel.send("**تم**" + member.displayName + "** has been successfully kicked :point_right: **");
        }).catch(() => {
            message.channel.send("Access Denied");
        });
    }
});

//هذا كود حظر شخص من السيرفر

client.on("message", (message) => {
    if (message.content.startsWith("/ban")) {
        var member= message.mentions.members.first();
        member.ban().then((member) => {
            message.channel.send(" **تم** " + member.displayName + " **has been successfully Banned :point_right: **");
        }).catch(() => {
            message.channel.send("Access Denied");
        });
    }
});


client.on("message", message => {
    if(!message.channel.guild) return;  
     if (message.author.bot) return;
    
     let command = message.content.split(" ")[0];
    
     if (message.content.split(" ")[0].toLowerCase() === prefix + "unmute") {
           if (!message.member.hasPermission('MANAGE_ROLES')) return;
     let user = message.mentions.users.first();
     let modlog = client.channels.find('name', 'log');
     let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
     if (!muteRole) return message.reply(" I Can’t Find 'Muted' Role ").catch(console.error).then(message => message.delete(4000))
     if (message.mentions.users.size < 1) return message.reply(' Error : ``Mention a User``').catch(console.error).then(message => message.delete(4000))
     if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return;
    
     if (message.guild.member(user).removeRole(muteRole.id)) {
         return message.reply("User Has Been UnMuted.").catch(console.error).then(message => message.delete(4000))
     } else {
       message.guild.member(user).removeRole(muteRole).then(() => {
         return message.reply("User Has Been UnMuted.").catch(console.error).then(message => message.delete(4000))
       });
     }
    
   };
    
   });
    
    
   client.on('message',function(message) {
    if(!message.channel.guild) return;    let messageArray = message.content.split(' ');
       let muteRole =  message.guild.roles.find('name', 'Muted');
       let muteMember = message.mentions.members.first();
       let muteReason = messageArray[2];
       let muteDuration = messageArray[3];
    if (message.content.split(" ")[0].toLowerCase() === prefix + "mute") {
              
     if (message.author.bot) return;
          if(!muteRole) return message.guild.createRole({name: 'Muted'}).then(message.guild.channels.forEach(chan => chan.overwritePermissions(muteRole, {SEND_MESSAGES:false,ADD_REACTIONS:false})));
          if(!message.guild.member(message.author).hasPermission("MANAGE_ROLES")) return message.channel.send(' Error : You Need `` MANAGE_ROLES ``Permission ');
          if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send(' Error : I Don’t Have `` MANAGE_ROLES ``Permission ');
          if(!muteMember) return message.channel.send(' Error : ``Mention a User``').then(message => message.delete(4000))
          if(!muteReason) return message.channel.send(' Error : ``Supply a Reason``').then(message => message.delete(4000))
          if(!muteDuration) return message.channel.send(' Error : `` Supply Mute Time `` \n Ex: #mute @user reason 1m ').then(message => message.delete(4000))
          if(!muteDuration.match(/[1-7][s,m,h,d,w]/g)) return message.channel.send(' Error : `` Invalid Mute Duration``').then(message => message.delete(4000))
          message.channel.send(`${muteMember} Has Been Muted.`).then(message => message.delete(5000))
          muteMember.addRole(muteRole);
          muteMember.setMute(true)
          .then(() => { setTimeout(() => {
              muteMember.removeRole(muteRole)
              muteMember.setMute(false)
          }, mmss(muteDuration));
          });
      }
});


client.on('message', msg => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;
    let command = msg.content.split(" ")[0];
    command = command.slice(prefix.length);
    let args = msg.content.split(" ").slice(1);
   
      if(command === "clear") {
          const emoji = client.emojis.find("name", "wastebasket")
      let textxt = args.slice(0).join("");
      if(msg.member.hasPermission("MANAGE_MESSAGES")) {
      if (textxt == "") {
          msg.delete().then
      msg.channel.send("**```ضع عدد الرسائل التي تريد مسحها 👌```**").then(m => m.delete(3000));
  } else {
      msg.delete().then
      msg.delete().then
      msg.channel.bulkDelete(textxt);
          msg.channel.send("```php\nعدد الرسائل التي تم مسحها: " + textxt + "\n```").then(m => m.delete(3000));
          }    
      }
  }
  });

//هذا كود الترحيب خاص

client.on("guildMemberAdd", member => {
    member.createDM().then(function (channel) {
    return channel.send(`🌹  ولكم نورت السيرفر🌹 
  👑اسم العضو  ${member}👑  
  انت العضو رقم ${member.guild.memberCount} `) 
  }).catch(console.error)
})

//فتح وقفل الشات

client.on('message', message => {
 
    if (message.content === "mutechannel") {
                        if(!message.channel.guild) return message.reply(' This command only for servers');
 
if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' ليس لديك صلاحيات');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: false
 
           }).then(() => {
               message.reply("تم تقفيل الشات :white_check_mark: ")
           });
             }
if (message.content === "unmutechannel") {
    if(!message.channel.guild) return message.reply(' This command only for servers');
 
if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('ليس لديك صلاحيات');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: true
 
           }).then(() => {
               message.reply("تم فتح الشات:white_check_mark:")
           });
             }
 
 
 
});


//هنا الرد التلقائي اذا قال شخص شيء من هذا يرد عليه البوت

client.on('message', msg => {
  if (msg.content === 'السلام عليكم') {
    msg.reply('**و عليكم السلام و رحة الله و بركاته**');
  }
});

client.on('message', msg => {
    if (msg.content === 'برب') {
      msg.reply('**لا تطول علينا يا الغالي**');
    }
});

client.on('message', msg => {
    if (msg.content === 'هلا') {
      msg.reply('**يا اهلا و يا مرحبا**');
    }
});


//هذا كود الحلات حط الادمن برفكس مع الاي دي حقتك

const devs = ["/"];
const adminprefix = ["/"];
client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!devs.includes(message.author.id)) return;
      
  if (message.content.startsWith('(prefix))ply')) {
    client.user.setGame(argresult);
      message.channel.send(`**✅   ${argresult}**`)
  } else 
     if (message.content === ("leave")) {
    message.guild.leave();        
  } else  
  if (message.content.startsWith('(prefix)wt')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.send(`**✅   ${argresult}**`)
  } else 
  if (message.content.startsWith('mils')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.send(`**✅   ${argresult}**`)
  } else 
  if (message.content.startsWith('(prefix)st')) {
    client.user.setGame(argresult, "https://www.twitch.tv/idk");
      message.channel.send(`**✅**`)
  }
  if (message.content.startsWith('(prefix)setname')) {
  client.user.setUsername(argresult).then
      message.channel.send(`Changing The Name To ..**${argresult}** `)
} else
if (message.content.startsWith('(prefix)setavatar')) {
  client.user.setAvatar(argresult);
    message.channel.send(`Changing The Avatar To :**${argresult}** `);
}
});


client.login(NTIyODM5ODIxNzU2OTIzOTA0.Dw_-RA.gfXIzLjEGqRBm1y-Dt_byYPkPm0);