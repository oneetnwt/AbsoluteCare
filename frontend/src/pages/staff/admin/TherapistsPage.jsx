import StaffTablePage from "../../../components/staff/StaffTablePage";

function TherapistsPage() {
  return (
    <StaffTablePage
      eyebrow="Administration"
      title="Therapists"
      description="Manage specializations and working days or hours."
      columns={["Therapist", "Specialization", "Working hours", "Actions"]}
      emptyMessage="No therapists to display"
      action="Add therapist"
      search
    />
  );
}
export default TherapistsPage;
