const { Client } = require('pg');

const client = new Client({
	user: 'postgres',
	host: 'localhost',
	database: 'postgres',
	password: '#Girgis#2004',
	port: 5432,
});

async function main() {
	await client.connect();
	console.log('✅ Connected to PostgreSQL');

	// Terminate all connections to 'mydb'
	await client.query(`
    SELECT pg_terminate_backend(pid)
    FROM pg_stat_activity
    WHERE datname = 'mydb'
  `);
	console.log('✅ Terminated other connections');

	// Now drop the database
	await client.query('DROP DATABASE mydb');
	// await client.query('CREATE DATABASE mydb');
	console.log('✅ Database dropped');

	await client.end();
}

main().catch(err => console.error('❌ Error:', err));

