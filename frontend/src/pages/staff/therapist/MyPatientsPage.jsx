import StaffTablePage from "../../../components/staff/StaffTablePage";

function MyPatientsPage() {
  return (
    <StaffTablePage
      eyebrow="My care desk"
      title="My patients"
      description="View your assigned caseload and next appointments."
      columns={["Patient", "Next appointment", "Care plan", "Action"]}
      emptyMessage="No patients assigned"
      search
    />
  );
}
export default MyPatientsPage;
