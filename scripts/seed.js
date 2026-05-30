/* eslint-disable @typescript-eslint/no-require-imports */
const { db } = require('@vercel/postgres');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Simple parser for .env.local to load environment variables locally
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    console.log('Loading environment variables from .env.local...');
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach((line) => {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('#')) return;
      
      const equalIndex = trimmedLine.indexOf('=');
      if (equalIndex > 0) {
        const key = trimmedLine.substring(0, equalIndex).trim();
        let val = trimmedLine.substring(equalIndex + 1).trim();
        
        // Remove surrounding quotes if present
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.substring(1, val.length - 1);
        }
        process.env[key] = val;
      }
    });
  }
}

async function seed() {
  loadEnv();

  // Validate Database URL is present
  const dbUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('ERROR: Database connection URL (POSTGRES_URL or DATABASE_URL) is missing from environment variables.');
    console.error('Please configure your .env.local file first.');
    process.exit(1);
  }

  // Ensure @vercel/postgres knows which URL to connect to
  if (!process.env.POSTGRES_URL) {
    process.env.POSTGRES_URL = dbUrl;
  }

  console.log('Connecting to database...');
  const client = await db.connect();

  try {
    const schemaPath = path.resolve(process.cwd(), 'sql/schema.sql');
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`Schema file not found at ${schemaPath}`);
    }

    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('Executing database schema creation (schema.sql)...');
    // Run schema commands
    await client.query(schemaSql);
    console.log('Database tables verified/created successfully.');

    // Seed configuration settings
    const adminEmail = process.env.ADMIN_EMAIL || 'simranpati28@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'password123';
    const adminName = process.env.ADMIN_NAME || 'Simran';

    // Verify if admin user already exists
    const { rows } = await client.query('SELECT id FROM users WHERE email = $1 LIMIT 1', [adminEmail]);
    if (rows.length > 0) {
      console.log(`Admin user with email ${adminEmail} already exists. Skipping user creation.`);
    } else {
      console.log(`Creating default admin user: ${adminEmail}...`);
      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(adminPassword, salt);
      await client.query(
        'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)',
        [adminName, adminEmail, hash, 'admin']
      );
      console.log('\n==================================================');
      console.log('ADMIN USER CREATED SUCCESSFULLY!');
      console.log(`Name:     ${adminName}`);
      console.log(`Email:    ${adminEmail}`);
      console.log(`Password: ${adminPassword}`);
      console.log('==================================================');
      console.log('IMPORTANT: Please change this password after logging into the admin area (/admin).\n');
    }
  } catch (error) {
    console.error('Error during database seeding:', error);
    process.exit(1);
  } finally {
    await client.release();
  }
}

seed().catch((err) => {
  console.error('Fatal error during seed execution:', err);
  process.exit(1);
});
