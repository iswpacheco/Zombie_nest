var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");

//var SALT_FACTOR = 10;

var equipmentSchema = mongoose.Schema({
    description: { type: String, required: true, unique: true },
    defense: { type: Number, required: true },
    category: { type: String, required: true },
    weight: { type: Number, required: true }
    //bio: String
});

//var donothing = () => {

//}

/*EquipmentSchema.pre("save", (done) => {
    var equipment = this;
    if (!equipment.isModified("description")) {
        return done();
    }
    bcrypt.generateSalt(SALT_FACTOR, (err, salt) => {
        if (err) {
            return done(err);
        }
        bcrypt.hash(zombie.password, salt, donothing, (err, hashedpassword) => {
            if (err) {
                return done(err);
            }
            zombie.password = hashedpassword;
            done();
        });
    });
});

zombieSchema.methods.checkPassword = (guess, done) => {
    bcrypt.compare(guess, this.password, (err, isMatch) => {
        done(err, isMatch);
    });
}*/
equipmentSchema.methods.name = () => {
    return this.displayName || this.username;
}

var Equipment = mongoose.model("Equipment", equipmentSchema);
module.exports = Equipment;