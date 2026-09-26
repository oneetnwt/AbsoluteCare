import StaffTablePage from "../../../components/staff/StaffTablePage";

function UserManagementPage() {
  return (
    <StaffTablePage
      eyebrow="Administration"
      title="User management"
      description="Manage patients, therapists, and secretaries."
      columns={["Name", "Role", "Email", "Status", "Actions"]}
      emptyMessage="No users to display"
      action="Add user"
      search
    />
  );
}
export default UserManagementPage;
