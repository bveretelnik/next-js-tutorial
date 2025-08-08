import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
    try {
        const tables = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public';
    `;
        return Response.json({ tables });
    } catch (err) {
        return Response.json({ error: String(err) }, { status: 500 });
    }
}
