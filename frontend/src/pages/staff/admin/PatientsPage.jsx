import StaffTablePage from "../../../components/staff/StaffTablePage";

function PatientsPage() {
  return (
    <StaffTablePage
      eyebrow="Administration"
      title="Patients"
      description="View and manage patient records."
      columns={["Patient", "Contact", "Active plan", "Status", "Actions"]}
      emptyMessage="No patient records to display"
      action="Add patient"
      search
    />
  );
}
export default PatientsPage;
