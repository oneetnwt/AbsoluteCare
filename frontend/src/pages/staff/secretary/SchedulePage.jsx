import StaffTablePage from "../../../components/staff/StaffTablePage";

function SchedulePage() {
  return (
    <StaffTablePage
      eyebrow="Scheduling"
      title="Appointment schedule"
      description="View the clinic-wide schedule and appointment details."
      columns={[
        "Date & time",
        "Patient",
        "Therapist",
        "Service",
        "Status",
        "Actions",
      ]}
      emptyMessage="No appointments scheduled"
      search
      filter
    />
  );
}
export default SchedulePage;
