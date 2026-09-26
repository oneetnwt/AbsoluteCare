import { ClipboardList } from "lucide-react";
import { DashboardEmptyState } from "../dashboard/DashboardPrimitives";

function StaffEmptyTable({ columns, message }) {
  return (
    <div className="staff-table-shell">
      <table className="staff-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={columns.length}>
              <DashboardEmptyState
                icon={<ClipboardList size={19} />}
                title={message}
                message="Connected records will appear here when they are available."
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StaffEmptyTable;
