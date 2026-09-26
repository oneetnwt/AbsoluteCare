function StaffPageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="staff-section-heading">
      <div>
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        {description && <span>{description}</span>}
      </div>
      {action}
    </div>
  );
}

export default StaffPageHeader;
