import bcrypt from "bcrypt";

const saltRounds = 10; // You can adjust the number of salt rounds for desired security
const plainPassword = process.argv[2];

if (!plainPassword) {
  console.error("Please provide a password as a command line argument.");
  process.exit(1);
}

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Hashed password:", hash);
  console.log("Original password:", plainPassword);
});
