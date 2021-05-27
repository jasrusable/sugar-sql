import { format } from "..";

test('test format with simple query', () => {
  const sqlMap = {
    select: ['first_name', 'last_name'],
    from: ['users'],
    where: ['=', 'email', 'test@gmail.com'],
  };

  const sql = format(sqlMap);

  expect(sql).toBe(
    `SELECT first_name, last_name FROM users WHERE email = 'test@gmail.com'`,
  );
});

test('test format with aliased select query', () => {
  const sqlMap = {
    select: [['first_name', 'name'], 'last_name', ['email', 'email_address']],
    from: ['users'],
    where: ['=', 'email', 'test@gmail.com'],
  };

  const sql = format(sqlMap);

  expect(sql).toBe(
    `SELECT first_name as 'name', last_name, email as 'email_address' FROM users WHERE email = 'test@gmail.com'`,
  );
});

test('test format with aliased from query', () => {
  const sqlMap = {
    select: ['first_name', 'last_name'],
    from: [['users', 'u'], 'payments', ['orders', 'o']],
    where: ['=', 'email', 'test@gmail.com'],
  };

  const sql = format(sqlMap);

  expect(sql).toBe(
    `SELECT first_name, last_name FROM users u, payments, orders o WHERE email = 'test@gmail.com'`,
  );
});
