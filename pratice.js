// // A simple Show query
// connection.query("SELECT * FROM `student`", (err, results, fields) => {
//   try {
//     console.log(results); // results contains rows returned by server
//     console.log(fields);
//   } catch {
//     console.log(err); // fields contains extra meta data about results, if available
//   }
// });

// connection.end();

// let query = "INSERT INTO user (id, username, email, password) VALUES ?";
// let arr = [
//   [104, "Deven@12324", "devendra@gmail.com24", "deven12324"],
//   [103, "Deven@1233", "devendra@gmail.com3", "deven1233"],
// ];

// connection.query(query, [arr], (err, result) => {
//   try {
//     if (err) throw err;
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// });

// connection.end();

// let getRandomUser = () => {
//   return [
//     faker.string.uuid(),
//     faker.internet.userName(),
//     faker.internet.email(),
//     faker.internet.password(),
//   ];
// };

// let data = [];
// for (let i = 1; i <= 100; i++) {
//   data.push(getRandomUser());
// }

// let query = "INSERT INTO user (id, username, email, password) VALUES ?";
