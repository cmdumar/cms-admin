"use client"
import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  isLoading?: boolean;
  onView?: (item: T) => void;
}

export default function Table<T extends { id: number }>({ 
  columns, 
  data, 
  onEdit, 
  onDelete,
  onView,
  isLoading = false,
}: TableProps<T>) {

  if (isLoading) {
    return (
      <div className="mt-6 flex justify-center py-12">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="mt-6 text-center py-12 bg-gray-50 rounded-lg">
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No data available</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new item.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 bg-white rounded-lg border border-gray-200">
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {columns.map((column, index) => (
                  <td key={index} className="px-6 py-4 whitespace-nowrap">
                    {column.render ? column.render(item) : String(item[column.accessor])}
                  </td>
                ))}
                {onView && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button
                    onClick={() => onView(item)}
                    className="text-gray-600 hover:text-gray-900 mr-4"
                  >
                    View
                  </button>
                  </td>
                )}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(item)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(item)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
