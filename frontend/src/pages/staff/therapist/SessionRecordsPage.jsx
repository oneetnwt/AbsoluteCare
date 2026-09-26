import StaffTablePage from "../../../components/staff/StaffTablePage";

function SessionRecordsPage() {
  return (
    <StaffTablePage
      eyebrow="Clinical records"
      title="Session records"
      description="Complete notes for finished appointments and review history."
      columns={[
        "Patient",
        "Session date",
        "Service",
        "Record status",
        "Actions",
      ]}
      emptyMessage="No session records to complete"
    />
  );
}
export default SessionRecordsPage;
