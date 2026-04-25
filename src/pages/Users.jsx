import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../layout/components/Sidebar";
import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

const colors = [
  "linear-gradient(135deg,#6c63ff,#4f46e5)",
  "linear-gradient(135deg,#2dd4bf,#0d9488)",
  "linear-gradient(135deg,#fbbf24,#f97316)",
  "linear-gradient(135deg,#c084fc,#ec4899)",
];

export default function Users() {
  // ✅ Thêm vào đây — trước return()
  const getPageNumbers = (current, total) => {
    if (total <= 7) {
      // Ít trang → hiện hết, không cần "..."
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages = [1]; // Luôn hiện trang đầu

    if (current > 3) {
      pages.push("..."); // Dấu "..." bên trái
    }

    // Hiện trang current-1, current, current+1
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i);
    }

    if (current < total - 2) {
      pages.push("..."); // Dấu "..." bên phải
    }

    pages.push(total); // Luôn hiện trang cuối
    return pages;
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Add modal
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  // Edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  // Search + Pagination
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  // ✅ Fetch
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const data = snapshot.docs.map((doc) => {
          const u = doc.data();
          const isOnline = Math.random() > 0.5;
          return {
            id: doc.id,
            name: u.name ?? "Unknown",
            initials: (u.name ?? "?").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
            avatarBg: colors[Math.floor(Math.random() * colors.length)],
            role: { label: "User", bg: "rgba(59,130,246,0.15)", color: "#60a5fa", border: "rgba(59,130,246,0.3)" },
            contactLines: [u.email ?? "—", u.phone ?? "—"],
            status: isOnline
              ? { dot: "#4ade80", label: "Online", color: "#4ade80" }
              : { dot: "#f87171", label: "Offline", color: "#f87171" },
            joined: u.createdAt?.toDate
              ? u.createdAt.toDate().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
              : "—",
          };
        });
        setUsers(data);
      } catch (err) {
        console.error("❌ ERROR:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // ✅ Add
  const handleAddUser = async () => {
    if (!form.name || !form.email) { alert("Nhập thiếu!"); return; }
    try {
      setSubmitting(true);
      const docRef = await addDoc(collection(db, "users"), { ...form, createdAt: new Date() });
      const newUser = {
        id: docRef.id,
        name: form.name,
        initials: form.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
        avatarBg: colors[Math.floor(Math.random() * colors.length)],
        role: { label: "User", bg: "rgba(59,130,246,0.15)", color: "#60a5fa", border: "rgba(59,130,246,0.3)" },
        contactLines: [form.email, form.phone],
        status: { dot: "#4ade80", label: "Online", color: "#4ade80" },
        joined: "Just now",
      };
      setUsers((prev) => [newUser, ...prev]);
      setShowModal(false);
      setForm({ name: "", email: "", phone: "" });
    } catch (err) {
      console.error(err); alert("Lỗi!");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Edit
  const handleEditUser = async () => {
    if (!editUser.name || !editUser.email) { alert("Nhập thiếu!"); return; }
    try {
      setSubmitting(true);
      await updateDoc(doc(db, "users", editUser.id), {
        name: editUser.name, email: editUser.email, phone: editUser.phone,
      });
      setUsers((prev) => prev.map((u) =>
        u.id === editUser.id
          ? {
            ...u,
            name: editUser.name,
            initials: editUser.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
            contactLines: [editUser.email, editUser.phone ?? "—"],
          }
          : u
      ));
      setShowEditModal(false);
      setEditUser(null);
    } catch (err) {
      console.error(err); alert("Lỗi khi cập nhật!");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Delete
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Bạn có chắc muốn xóa user này không?")) return;
    try {
      await deleteDoc(doc(db, "users", userId));
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      console.error(err); alert("Lỗi khi xóa!");
    }
  };

  // ✅ Search + Pagination
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.contactLines?.[0]?.toLowerCase().includes(search.toLowerCase()) ||
    u.contactLines?.[1]?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const kpiCards = useMemo(() => [
    { label: "TOTAL MEMBERS", value: users.length.toLocaleString(), sub: "+12% vs last month", subIcon: "trending_up", subColor: "#4ade80", iconName: "groups", iconBg: "rgba(108,99,255,0.2)", iconColor: "#6c63ff" },
    { label: "ACTIVE CONCIERGE", value: "24", sub: "All shifts covered", subIcon: "check_circle", subColor: "#4ade80", iconName: "support_agent", iconBg: "rgba(20,184,166,0.2)", iconColor: "#2dd4bf" },
    { label: "NEW REGISTRATIONS", value: "142", sub: "+5% from yesterday", subIcon: "trending_up", subColor: "#4ade80", iconName: "person_add_alt", iconBg: "rgba(249,115,22,0.2)", iconColor: "#fb923c" },
    { label: "PENDING APPROVAL", value: "07", sub: "Awaiting KYC", subIcon: "info", subColor: "#94a3b8", iconName: "hourglass_empty", iconBg: "rgba(245,158,11,0.2)", iconColor: "#fbbf24" },
  ], [users.length]);

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#0f1117", color: "#fff" }}>
      Loading...
    </div>
  );

  const inputStyle = {
    width: "100%", marginBottom: 10, padding: "8px 12px",
    background: "#0f1117", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8, color: "#fff", fontSize: 14, outline: "none",
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
      <style>{`
  :root { --primary: #6c63ff; }
  * { box-sizing: border-box; }
  body { margin: 0; overflow-x: hidden; }
`}</style>

      <div style={{ display: "flex", minHeight: "100vh", width: "100vw", background: "#0f1117", color: "#f1f5f9", fontFamily: "'Inter', sans-serif", overflow: "hidden" }}>
        <Sidebar />

        {/* ✅ Add Modal */}
        {showModal && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
            <div style={{ background: "#1e293b", padding: 24, borderRadius: 12, width: 320 }}>
              <h3 style={{ marginBottom: 12, color: "#fff" }}>Add User</h3>
              <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
              <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
              <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={{ ...inputStyle, marginBottom: 16 }} />
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={handleAddUser} disabled={submitting} style={{ flex: 1, padding: 10, background: "#6c63ff", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>
                  {submitting ? "Saving..." : "Save"}
                </button>
                <button onClick={() => setShowModal(false)} disabled={submitting} style={{ flex: 1, padding: 10, background: "rgba(255,255,255,0.06)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, cursor: "pointer" }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ✅ Edit Modal — ĐÃ ĐƯA VÀO TRONG return() */}
        {showEditModal && editUser && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
            <div style={{ background: "#1e293b", padding: 24, borderRadius: 12, width: 320 }}>
              <h3 style={{ marginBottom: 12, color: "#fff" }}>Edit User</h3>
              <input placeholder="Name" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} style={inputStyle} />
              <input placeholder="Email" value={editUser.email ?? ""} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} style={inputStyle} />
              <input placeholder="Phone" value={editUser.phone ?? ""} onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })} style={{ ...inputStyle, marginBottom: 16 }} />
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={handleEditUser} disabled={submitting} style={{ flex: 1, padding: 10, background: "#6c63ff", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>
                  {submitting ? "Saving..." : "Save"}
                </button>
                <button onClick={() => { setShowEditModal(false); setEditUser(null); }} disabled={submitting} style={{ flex: 1, padding: 10, background: "rgba(255,255,255,0.06)", color: "#cbd5e1", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, cursor: "pointer" }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <main style={{ marginLeft: "220px", flex: 1, minHeight: "100vh", overflowY: "auto", padding: "32px 36px" }}>
          {/* Header */}
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px" }}>
            <div>
              <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#fff", margin: 0 }}>User Management</h2>
              <p style={{ color: "#64748b", fontSize: "14px", margin: "6px 0 0" }}>{formattedDate}</p>
            </div>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <button style={{ width: 42, height: 42, borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#94a3b8" }}>
                <span className="material-icons-round" style={{ fontSize: 20 }}>notifications</span>
              </button>
              <button onClick={() => { setForm({ name: "", email: "", phone: "" }); setShowModal(true); }}
                style={{ background: "#6c63ff", color: "#fff", border: "none", borderRadius: 12, padding: "11px 22px", display: "flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 20px rgba(108,99,255,0.4)" }}>
                <span className="material-icons-round" style={{ fontSize: 18 }}>person_add</span>
                Add New Resident
              </button>
            </div>
          </header>

          {/* KPI Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
            {kpiCards.map((card) => (
              <div key={card.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "20px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: "#64748b", margin: "0 0 8px", textTransform: "uppercase" }}>{card.label}</p>
                  <h3 style={{ fontSize: 28, fontWeight: 700, color: "#fff", margin: "0 0 10px", lineHeight: 1 }}>{card.value}</h3>
                  <p style={{ fontSize: 11, display: "flex", alignItems: "center", gap: 4, margin: 0, color: card.subColor }}>
                    <span className="material-icons-round" style={{ fontSize: 14 }}>{card.subIcon}</span>
                    {card.sub}
                  </p>
                </div>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: card.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span className="material-icons-round" style={{ fontSize: 24, color: card.iconColor }}>{card.iconName}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Table Card */}
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden" }}>
            {/* Toolbar */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ position: "relative", maxWidth: 380, width: "100%" }}>
                <span className="material-icons-round" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#64748b", fontSize: 18 }}>search</span>
                <input
                  style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 14px 10px 44px", color: "#f1f5f9", fontSize: 13, outline: "none" }}
                  placeholder="Search residents, admins or staff..."
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {[{ icon: "filter_list", label: "Filter" }, { icon: "file_download", label: "Export" }].map((btn) => (
                  <button key={btn.label} style={{ padding: "9px 18px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "#cbd5e1", cursor: "pointer" }}>
                    <span className="material-icons-round" style={{ fontSize: 16 }}>{btn.icon}</span>
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                    {["Eminent Resident", "Role", "Contact Info", "Status", "Joined Date", "Actions"].map((col, i) => (
                      <th key={col} style={{ padding: "13px 20px", textAlign: i === 5 ? "right" : "left", fontSize: 10, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr key={user.id}
                      style={{ borderTop: "1px solid rgba(255,255,255,0.05)", transition: "background 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      {/* Resident */}
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 40, height: 40, borderRadius: "50%", background: user.avatarBg, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                            {user.initials}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 14, color: "#f1f5f9" }}>{user.name}</div>
                            <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>ID: {user.id}</div>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td style={{ padding: "16px 20px" }}>
                        <span style={{ padding: "4px 12px", borderRadius: 6, fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", background: user.role?.bg ?? "rgba(59,130,246,0.15)", color: user.role?.color ?? "#60a5fa", border: `1px solid ${user.role?.border ?? "rgba(59,130,246,0.3)"}` }}>
                          {user.role?.label ?? "User"}
                        </span>
                      </td>

                      {/* Contact */}
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ fontSize: 13, color: "#cbd5e1" }}>{user.contactLines?.[0] ?? "—"}</div>
                        <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{user.contactLines?.[1] ?? "—"}</div>
                      </td>

                      {/* Status */}
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: user.status?.dot ?? "#4ade80", flexShrink: 0 }} />
                          <span style={{ fontSize: 13, fontWeight: 500, color: user.status?.color ?? "#4ade80" }}>{user.status?.label ?? "Online"}</span>
                        </div>
                      </td>

                      {/* Joined */}
                      <td style={{ padding: "16px 20px", fontSize: 13, color: "#64748b" }}>{user.joined}</td>

                      {/* ✅ Actions — edit + delete trong cùng 1 <td> */}
                      <td style={{ padding: "16px 20px", textAlign: "right" }}>
                        <button
                          onClick={() => { setEditUser({ id: user.id, name: user.name, email: user.contactLines?.[0] ?? "", phone: user.contactLines?.[1] ?? "" }); setShowEditModal(true); }}
                          style={{ background: "transparent", border: "none", color: "#6c63ff", cursor: "pointer", padding: 4, borderRadius: 6, display: "inline-flex", marginRight: 4 }}
                        >
                          <span className="material-icons-round" style={{ fontSize: 20 }}>edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          style={{ background: "transparent", border: "none", color: "#f87171", cursor: "pointer", padding: 4, borderRadius: 6, display: "inline-flex" }}
                        >
                          <span className="material-icons-round" style={{ fontSize: 20 }}>delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✅ Pagination động */}
            <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
                Showing <strong style={{ color: "#f1f5f9" }}>{Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredUsers.length)}</strong> to{" "}
                <strong style={{ color: "#f1f5f9" }}>{Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)}</strong> of{" "}
                <strong style={{ color: "#f1f5f9" }}>{filteredUsers.length}</strong> users
              </p>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}
                  style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center", cursor: currentPage === 1 ? "not-allowed" : "pointer", opacity: currentPage === 1 ? 0.4 : 1 }}>
                  <span className="material-icons-round" style={{ fontSize: 18 }}>chevron_left</span>
                </button>

                {/* ✅ CODE MỚI — thay thế toàn bộ đoạn trên */}
                {getPageNumbers(currentPage, totalPages).map((n, i) =>
                  n === "..." ? (
                    <span
                      key={`ellipsis-${i}`}
                      style={{
                        width: 34, height: 34,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 13, color: "#64748b", userSelect: "none",
                      }}
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={n}
                      onClick={() => setCurrentPage(n)}
                      style={{
                        width: 34, height: 34, borderRadius: 8, border: "none",
                        background: n === currentPage ? "#6c63ff" : "transparent",
                        color: n === currentPage ? "#fff" : "#64748b",
                        fontWeight: 600, fontSize: 13, cursor: "pointer",
                      }}
                    >
                      {n}
                    </button>
                  )
                )}

                <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}
                  style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", cursor: currentPage === totalPages ? "not-allowed" : "pointer", opacity: currentPage === totalPages ? 0.4 : 1 }}>
                  <span className="material-icons-round" style={{ fontSize: 18 }}>chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}