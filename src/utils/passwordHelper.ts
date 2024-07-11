var bcrypt = require("bcryptjs");

export async function hashPassword(password: string) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  console.log(hash, "SDaf");

  return hash;
}

export async function isPasswordMatch(pass: string, hashPass: string) {
  console.log(pass, hashPass, "dsaf");

  return await bcrypt.compareSync(pass, hashPass);
}
