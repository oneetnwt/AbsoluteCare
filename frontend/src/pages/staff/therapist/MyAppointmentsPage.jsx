import StaffTablePage from "../../../components/staff/StaffTablePage";

function MyAppointmentsPage() {
  return (
    <StaffTablePage
      eyebrow="My care desk"
      title="My appointments"
      description="Review your schedule and visit actions."
      columns={["Date & time", "Patient", "Service", "Status", "Actions"]}
      emptyMessage="No appointments scheduled"
      filter
    />
  );
}
export default MyAppointmentsPage;
