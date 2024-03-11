import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "tiger",
    database: "blog",
  })
  .promise();

export async function createUser(id, name, passoword) {
  const insert = "insert into users values(?,?,?)";
  await pool.query(insert, [id, name, passoword]);
}

export async function loginUser(id) {
  const result = await pool.query("select * from users where id=?;", [id]);
  return result[0];
}

export async function createBlog(title, blog) {
  const insert = "insert into post values(1,?,?)";
  await pool.query(insert, [title, blog]);
}

export async function getBlogs() {
  const [rows] = await pool.query("select * from post;");
  return rows;
}

export async function getBlog(t) {
  const [rows] = await pool.query(
    "select * from post where id=1 and title=?;",
    [t]
  );
  return rows[0];
}
