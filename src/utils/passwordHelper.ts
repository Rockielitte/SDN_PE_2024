var bcrypt = require("bcryptjs");

export async function hashPassword(password: string) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  return hash;
}

export async function isPasswordMatch(pass: string, hashPass: string) {
  return await bcrypt.compareSync(pass, hashPass);
}
