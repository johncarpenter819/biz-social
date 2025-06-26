import React from "react";

export default function AdminCompanyEditor({ companyInfo, setCompanyInfo }) {
  const handleNameChange = (e) => {
    setCompanyInfo({ ...companyInfo, name: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCompanyInfo(prev => ({ ...prev, logo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="admin-editor" style={{ padding: "1rem", marginTop: "1rem", backgroundColor: "#f9f9f9" }}>
      <h2>Edit Company Info</h2>
      <input
        type="text"
        value={companyInfo.name}
        onChange={handleNameChange}
        placeholder="Company Name"
        style={{ padding: "0.5rem", marginBottom: "0.5rem", width: "100%" }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleLogoChange}
        style={{ marginBottom: "0.5rem" }}
      />
    </div>
  );
}
