// src/components/DataTable.tsx
import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table"; // Importación de solo tipo
import api from "../lib/api";

interface Data {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export default function DataTable() {
  // Inicializar el estado con datos de prueba
  const [leads, setLeads] = useState<Data[]>([
    {
      id: "uuid",
      name: "Juan Pérez",
      email: "juan@example.com",
      phone: "123456789",
    },
    {
      id: "UUID2",
      name: "María Gómez",
      email: "maria@example.com",
      phone: "987654321",
    },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await api.get("/leads");
        setLeads(response.data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setIsLoading(false); // Finaliza la carga
      }
    };
    fetchLeads();
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  const columns: ColumnDef<Data>[] = [
    {
      header: "Nombre",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Teléfono",
      accessorKey: "phone",
    },
  ];

  const table = useReactTable({
    data: leads,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="p-2">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-100">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
