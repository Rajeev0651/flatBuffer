var fs = require('fs');
var flatbuffers = require('flatbuffers');
var MyGame = require('../monster');
// Create a `flatbuffer.Builder`, which will be used to create our
// monsters' FlatBuffers.
console.log(MyGame);
var builder = new flatbuffers.Builder(1024);
var weaponOne = builder.createString('Sword');
var weaponTwo = builder.createString('Axe');
// Create the first `Weapon` ('Sword').
MyGame.Weapon.startWeapon(builder);
MyGame.Weapon.addName(builder, weaponOne);
MyGame.Weapon.addDamage(builder, 3);
var sword = MyGame.Weapon.endWeapon(builder);
// Create the second `Weapon` ('Axe').
MyGame.Weapon.startWeapon(builder);
MyGame.Weapon.addName(builder, weaponTwo);
MyGame.Weapon.addDamage(builder, 5);
var axe = MyGame.Weapon.endWeapon(builder);
// Serialize a name for our monster, called 'Orc'.
var name = builder.createString('Orc');
// Create a `vector` representing the inventory of the Orc. Each number
// could correspond to an item that can be claimed after he is slain.
var treasure = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var inv = MyGame.Monster.createInventoryVector(builder, treasure);
// Create an array from the two `Weapon`s and pass it to the
// `createWeaponsVector()` method to create a FlatBuffer vector.
var weaps = [sword, axe];
var weapons = MyGame.Monster.createWeaponsVector(builder, weaps);
MyGame.Monster.startPathVector(builder, 2);
MyGame.Vec3.createVec3(builder, 1.0, 2.0, 3.0);
MyGame.Vec3.createVec3(builder, 4.0, 5.0, 6.0);
var path = builder.endVector();
// Create our monster by using `startMonster()` and `endMonster()`.
MyGame.Monster.startMonster(builder);
MyGame.Monster.addPos(builder, MyGame.Vec3.createVec3(builder, 1.0, 2.0, 3.0));
MyGame.Monster.addHp(builder, 300);
MyGame.Monster.addColor(builder, MyGame.Color.Red);
MyGame.Monster.addName(builder, name);
MyGame.Monster.addInventory(builder, inv);
MyGame.Monster.addWeapons(builder, weapons);
MyGame.Monster.addEquippedType(builder, MyGame.Equipment.Weapon);
MyGame.Monster.addEquipped(builder, axe);
MyGame.Monster.addPath(builder, path);
var orc = MyGame.Monster.endMonster(builder);
// Call `finish()` to instruct the builder that this monster is complete.
builder.finish(orc); // You could also call `MyGame..Monster.finishMonsterBuffer(builder, orc);`.
// This must be called after `finish()`.
var buf = builder.asUint8Array(); // Of type `Uint8Array`.

fs.writeFileSync('monster.bin', buf, 'binary');
