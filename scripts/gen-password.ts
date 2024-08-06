import bcrypt from "bcrypt";

const saltRounds = 10; // You can adjust the number of salt rounds for desired security
const plainPassword = "admin1234";

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Hashed password:", hash);
  console.log("Compare result:", bcrypt.compareSync(plainPassword, hash));
});
