var fs = require('fs');
 
var flatbuffers = require('flatbuffers');
var MyGame = require('../monster');
 
var data = new Uint8Array(fs.readFileSync('monster.bin'));
var buf = new flatbuffers.ByteBuffer(data);
 
var monster = MyGame.Monster.getRootAsMonster(buf);

var hp = monster.hp();
var pos = monster.pos();
var weapons = monster.weapons();

console.log(weapons);