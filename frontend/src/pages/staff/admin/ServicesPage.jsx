import StaffTablePage from "../../../components/staff/StaffTablePage";

function ServicesPage() {
  return (
    <StaffTablePage
      eyebrow="Administration"
      title="Therapy services"
      description="Set the duration, fee, and availability of services."
      columns={["Service", "Duration", "Fee", "Status", "Actions"]}
      emptyMessage="No therapy services configured"
      action="Add service"
    />
  );
}
export default ServicesPage;
