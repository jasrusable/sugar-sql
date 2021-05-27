type Select = (string | string[])[];

const formatSelect = (select: Select) => {
  const selects = select
    .map((curr) => {
      return Array.isArray(curr) ? `${curr[0]} as '${curr[1]}'` : curr;
    }, '')
    .join(', ');

  return `SELECT ${selects}`;
};

type From = (string | string[])[];

const formatFrom = (from: From) => {
  const fromClauses = from
    .map((curr) => {
      return Array.isArray(curr) ? `${curr[0]} ${curr[1]}` : curr;
    }, '')
    .join(', ');

  return `FROM ${fromClauses}`;
};

type Where = (string | string[])[];

const formatWhere = (where: Where) => {
  return `WHERE ${where[1]} ${where[0]} '${where[2]}'`;
};

export interface SqlMap {
  select: Select;
  from: From;
  where: Where;
}

export const format = (sqlMap: SqlMap) => {
  const { select, from, where } = sqlMap;

  const sql = `${formatSelect(select)} ${formatFrom(from)} ${formatWhere(
    where,
  )}`;

  return sql;
};
