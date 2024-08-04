import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database | null = null;

async function initializeDb(): Promise<Database> {
  if (!db) {
    const sqlFilePath = path.join(process.cwd(), "data", "data.sql");
    // console.log("SQL file path:", sqlFilePath);

    try {
      const sqlContent = fs.readFileSync(sqlFilePath, "utf-8");
      console.log("SQL content loaded successfully");

      db = await open({
        filename: ":memory:",
        driver: sqlite3.Database,
      });

      // Dividir el contenido SQL en declaraciones individuales
      const statements = sqlContent
        .split(";")
        .filter((stmt) => stmt.trim() !== "");

      // Ejecutar cada declaración por separado
      for (const statement of statements) {
        try {
          await db.exec(statement);
        } catch (statementError) {
          console.error("Error executing statement:", statement);
          console.error("Error details:", statementError);
        }
      }

      console.log("Database initialized successfully");
    } catch (error) {
      console.error("Error initializing database:", error);
      throw error;
    }
  }
  return db;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const offset = (page - 1) * limit;

    const db = await initializeDb();

    let query = "SELECT * FROM datos_personales";
    let countQuery = "SELECT COUNT(*) as total FROM datos_personales";
    let params: any[] = [];

    if (search) {
      const searchTerms = search.toLowerCase().split(" ");
      const searchConditions = searchTerms
        .map(() => {
          return `(LOWER(cod_emp) LIKE ? OR 
                     LOWER(cedula) LIKE ? OR 
                     LOWER(grado_militar) LIKE ? OR 
                     LOWER(apellido1) LIKE ? OR 
                     LOWER(apellido2) LIKE ? OR 
                     LOWER(nombre1) LIKE ? OR 
                     LOWER(nombre2) LIKE ? OR 
                     LOWER(ubicacion) LIKE ? OR 
                     LOWER(ubicacion_detallada) LIKE ? OR 
                     LOWER(cargo) LIKE ? OR 
                     LOWER(tipo_emp) LIKE ? OR 
                     LOWER(categoria) LIKE ? OR 
                     LOWER(sueldo) LIKE ? OR 
                     LOWER(fecha_nacim) LIKE ? OR 
                     LOWER(sexo) LIKE ? OR 
                     LOWER(estado_civil) LIKE ? OR 
                     LOWER(nivel_instruccion) LIKE ? OR 
                     LOWER(direccion) LIKE ? OR 
                     LOWER(ciudad) LIKE ? OR 
                     LOWER(estado) LIKE ? OR 
                     LOWER(telefono_cel) LIKE ? OR 
                     LOWER(telefono_ofi) LIKE ? OR 
                     LOWER(correo) LIKE ? OR 
                     LOWER(ciudad_origen) LIKE ? OR 
                     LOWER(estados_origen) LIKE ? OR 
                     LOWER(vivienda) LIKE ? OR 
                     LOWER(discapacidad) LIKE ? OR 
                     LOWER(riesgo) LIKE ?)`;
        })
        .join(" AND ");

      query += ` WHERE ${searchConditions}`;
      countQuery += ` WHERE ${searchConditions}`;

      searchTerms.forEach((term) => {
        const likeParam = `%${term}%`;
        params = params.concat(Array(28).fill(likeParam));
      });
    }

    query += ` LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const rows = await db.all(query, params);
    const [{ total }] = await db.all(countQuery, params.slice(0, -2));

    return NextResponse.json({ data: rows, total, page, limit });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
