import StaffTablePage from "../../../components/staff/StaffTablePage";

function PaymentsPage() {
  return (
    <StaffTablePage
      eyebrow="Finance"
      title="Payments"
      description="Record and update payment status for clinic visits."
      columns={["Appointment", "Patient", "Amount", "Status", "Actions"]}
      emptyMessage="No payment records to display"
      action="Record payment"
      search
      filter
    />
  );
}
export default PaymentsPage;
