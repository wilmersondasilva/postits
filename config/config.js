module.exports = {
  development: {
    url: 'postgres://postgres:postgres@localhost:5432/postit',
    dialect: 'postgres'
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  },
  staging: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  },
  test: {
    url: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postit_test',
    dialect: 'postgres'
  }
}