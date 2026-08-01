import type { ReactNode } from 'react';
import './Table.css';

export interface Column<T> {
  key: string;
  header: string;
  accessor?: keyof T;
  render?: (row: T) => ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
}

export function Table<T>({ columns, rows, rowKey }: TableProps<T>) {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={rowKey(row)}>
            {columns.map((column) => (
              <td key={column.key}>
                {column.render ? column.render(row) : column.accessor ? String(row[column.accessor]) : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
