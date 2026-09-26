import StaffTablePage from "../../../components/staff/StaffTablePage";

function PaymentsPage() {
  return (
    <StaffTablePage
      eyebrow="Finance"
      title="Payments"
      description="Track appointment payment status across the clinic."
      columns={["Appointment", "Patient", "Amount", "Status", "Actions"]}
      emptyMessage="No payment records to display"
      search
    />
  );
}
export default PaymentsPage;
