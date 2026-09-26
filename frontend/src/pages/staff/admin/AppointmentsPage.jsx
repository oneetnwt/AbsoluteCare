import StaffTablePage from "../../../components/staff/StaffTablePage";

function AppointmentsPage() {
  return (
    <StaffTablePage
      eyebrow="Scheduling"
      title="Appointments"
      description="Review requests and manage the clinic schedule."
      columns={[
        "Date & time",
        "Patient",
        "Therapist",
        "Service",
        "Status",
        "Actions",
      ]}
      emptyMessage="No appointments scheduled"
      filter
      search
    />
  );
}
export default AppointmentsPage;
