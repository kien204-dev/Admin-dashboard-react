import { useState } from "react";

const activePage = "Settings";

const NAV_ITEMS = [
  { icon: "dashboard", label: "Dashboard", path: "/dashboard" },
  { icon: "calendar_month", label: "Bookings", path: "/bookings" },
  { icon: "group", label: "Users", path: "/users" },
  { icon: "shopping_bag", label: "Orders", path: "/orders" },
  { icon: "settings", label: "Settings", path: "/settings" },
];

const SETTINGS_NAV = [
  { icon: "person", label: "Profile" },
  { icon: "notifications_active", label: "Notifications" },
  { icon: "settings_suggest", label: "System" },
  { icon: "security", label: "Security" },
];

const NOTIFICATIONS = [
  { icon: "mail", label: "Email Digest", desc: "Weekly curation summaries", color: "#699cff", bg: "rgba(105,156,255,0.12)", on: true },
  { icon: "notifications", label: "Real-time Alerts", desc: "Instant booking notifications", color: "#ff94c9", bg: "rgba(255,148,201,0.12)", on: true },
  { icon: "lock_reset", label: "Security Logs", desc: "Alerts for suspicious logins", color: "#ff6e84", bg: "rgba(255,110,132,0.12)", on: true },
  { icon: "campaign", label: "Curator News", desc: "Updates to the platform tools", color: "#aaa4ff", bg: "rgba(170,164,255,0.12)", on: false },
];

const C = {
  bg: "#0b0e14",
  surface: "#10131a",
  surfaceLow: "#161a21",
  surfaceMid: "#1c2028",
  surfaceHigh: "#22262f",
  primary: "#aaa4ff",
  primaryDim: "#9c94ff",
  text: "#ecedf6",
  muted: "#a9abb3",
  border: "rgba(115,117,125,0.15)",
  borderSubtle: "rgba(69,72,79,0.25)",
  glass: "rgba(34,38,47,0.55)",
};

function Toggle({ on, onChange }) {
  return (
    <div onClick={onChange} style={{
      width: 46, height: 26, borderRadius: 13, cursor: "pointer",
      background: on ? C.primary : C.surfaceHigh,
      position: "relative", transition: "background .2s", flexShrink: 0,
    }}>
      <div style={{
        position: "absolute", top: 3,
        left: on ? 23 : 3,
        width: 20, height: 20, borderRadius: "50%",
        background: "#fff", transition: "left .2s",
      }} />
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.muted }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", background: C.surfaceHigh,
  border: `1px solid ${C.borderSubtle}`,
  borderRadius: 10, color: C.text,
  padding: "11px 14px", fontSize: 14,
  outline: "none", fontFamily: "Inter, sans-serif",
  transition: "border-color .2s",
};

export default function LuxeStaySettings() {
  const [profile, setProfile] = useState({
    name: "Julian Vane",
    email: "julian.vane@luxestay.curator",
    bio: "Lead Curator at LuxeStay. Specializing in high-end atmospheric properties and architectural storytelling across Europe and the Pacific.",
  });
  const [notifs, setNotifs] = useState(NOTIFICATIONS.map(n => n.on));

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@300,0&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .mso {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
          font-size: 22px; line-height: 1; display: inline-block; user-select: none;
        }
        input:focus, textarea:focus { border-color: ${C.primary} !important; }
        .nav-link:hover { background: ${C.surfaceLow} !important; color: ${C.text} !important; }
        .snav-link:hover { background: rgba(170,164,255,0.06) !important; }
        .notif-card:hover { background: rgba(34,38,47,0.85) !important; }
        @media (max-width: 1024px) { .sidebar-desktop { display: none !important; } }
        @media (min-width: 1025px) { .mobile-bottomnav { display: none !important; } }
        @media (max-width: 700px) {
          .profile-inner { flex-direction: column !important; }
          .profile-fields-grid { grid-template-columns: 1fr !important; }
          .settings-content-grid { grid-template-columns: 1fr !important; }
          .notif-grid { grid-template-columns: 1fr !important; }
          .bento-grid { grid-template-columns: 1fr !important; }
          .content-pad { padding: 24px 16px 100px !important; }
          .hero-title { font-size: 3rem !important; }
        }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "Inter, sans-serif" , gap: "24px" }}>

       <div style={{ width: 220 }}>
  {/* sidebar */}
</div>

        {/* Main */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>


          {/* Scrollable Content */}
          <div className="content-pad" style={{ flex: 1, padding: "24px 32px", overflowY: "auto" }}>
            <div style={{ maxWidth: 1060 }}>

              {/* Hero */}
              <div style={{ marginBottom: 24 }}>
                <h2
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "26px",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                    color: C.text,
                  }}
                >
                  Settings
                </h2>
                <p style={{ marginTop: 6, color: C.muted, fontSize: 13, maxWidth: 420, fontWeight: 300, lineHeight: 1.6 }}>
                  Refine the digital environment of LuxeStay. Manage your identity, security protocols, and notification layers.
                </p>
              </div>

              {/* Two-column: settings nav + canvas */}
              <div className="settings-content-grid" style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                gap: 24, alignItems: "start",
              }}>

                {/* Settings Side Nav */}
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <p style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
                    textTransform: "uppercase", color: C.primary,
                    padding: "0 12px", marginBottom: 16,
                  }}>Configuration Hub</p>
                  {SETTINGS_NAV.map(item => (
                    <a key={item.label} href="#" className="snav-link" style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "13px 14px", borderRadius: 12, textDecoration: "none",
                      color: item.active ? C.primary : C.muted,
                      background: item.active ? "rgba(170,164,255,0.1)" : "transparent",
                      fontWeight: item.active ? 600 : 500, fontSize: 14,
                      transition: "all .2s",
                    }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span className="mso" style={{ fontSize: 20 }}>{item.icon}</span>
                        {item.label}
                      </span>
                      <span className="mso" style={{ fontSize: 16, opacity: 0.45 }}>chevron_right</span>
                    </a>
                  ))}
                </div>

                {/* Canvas */}
                <div style={{ display: "flex", flexDirection: "column", gap: 36, minWidth: 0 }}>

                  {/* Profile Card */}
                  <div style={{
                    background: C.glass, backdropFilter: "blur(20px)",
                    border: `1px solid ${C.border}`, borderRadius: 16, padding: 24,
                  }}>
                    <div className="profile-inner" style={{ display: "flex", gap: 32 }}>
                      {/* Avatar */}
                      <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                        <div style={{
                          width: 80, height: 80, borderRadius: 24,
                          background: `linear-gradient(135deg, ${C.primary}, #699cff)`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer",
                        }}>
                          <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 900, fontSize: 36, color: C.bg }}>JV</span>
                        </div>
                        <button style={{
                          background: "none", border: "none", cursor: "pointer",
                          color: C.primary, fontSize: 10, fontWeight: 700,
                          letterSpacing: "0.18em", textTransform: "uppercase",
                        }}>Change Photo</button>
                      </div>

                      {/* Fields */}
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20, minWidth: 0 }}>
                        <div className="profile-fields-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
                          <Field label="Full Name">
                            <input type="text" value={profile.name}
                              onChange={e => setProfile({ ...profile, name: e.target.value })}
                              style={inputStyle} />
                          </Field>
                          <Field label="Email Address">
                            <input type="email" value={profile.email}
                              onChange={e => setProfile({ ...profile, email: e.target.value })}
                              style={inputStyle} />
                          </Field>
                        </div>
                        <Field label="Bio & Editorial Statement">
                          <textarea rows={3} value={profile.bio}
                            onChange={e => setProfile({ ...profile, bio: e.target.value })}
                            style={{ ...inputStyle, resize: "none", lineHeight: 1.6 }} />
                        </Field>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, paddingTop: 4 }}>
                          <button style={{
                            padding: "9px 22px", borderRadius: 10, cursor: "pointer",
                            background: "transparent", border: `1px solid ${C.borderSubtle}`,
                            color: C.text, fontSize: 13, fontWeight: 500,
                          }}>Cancel</button>
                          <button style={{
                            padding: "9px 22px", borderRadius: 10, cursor: "pointer",
                            background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDim})`,
                            border: "none", color: C.bg, fontSize: 13, fontWeight: 700,
                          }}>Save Profile</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notifications */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{
                      display: "flex", alignItems: "baseline", justifyContent: "space-between",
                      borderBottom: `1px solid ${C.borderSubtle}`, paddingBottom: 14,
                    }}>
                      <h3 style={{ fontFamily: "Manrope, sans-serif", fontSize: 20, fontWeight: 700 }}>Notification Preferences</h3>
                      <span style={{ fontSize: 12, color: C.muted }}>Control your editorial heartbeat</span>
                    </div>
                    <div className="notif-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      {NOTIFICATIONS.map((n, i) => (
                        <div key={n.label} className="notif-card" style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "16px 20px", gap: 12,
                          background: C.glass, border: `1px solid ${C.border}`,
                          borderRadius: 20, transition: "background .2s",
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
                            <div style={{
                              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                              background: n.bg,
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                              <span className="mso" style={{ color: n.color, fontSize: 20 }}>{n.icon}</span>
                            </div>
                            <div style={{ minWidth: 0 }}>
                              <p style={{ fontSize: 13, fontWeight: 600 }}>{n.label}</p>
                              <p style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{n.desc}</p>
                            </div>
                          </div>
                          <Toggle on={notifs[i]} onChange={() => setNotifs(prev => prev.map((v, idx) => idx === i ? !v : v))} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bento */}
                  <div className="bento-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
                    <div style={{
                      background: C.surface, padding: 28, borderRadius: 24,
                      border: `1px solid rgba(170,164,255,0.07)`,
                    }}>
                      <h4 style={{ fontFamily: "Manrope, sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 6 }}>Connected Accounts</h4>
                      <p style={{ fontSize: 13, color: C.muted, marginBottom: 22 }}>Manage your integrations and social links.</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                        {[{ label: "Google Workspace", icon: "star" }, { label: "Twitter Editorial", icon: "alternate_email" }].map(acc => (
                          <div key={acc.label} style={{
                            display: "flex", alignItems: "center", gap: 8,
                            padding: "8px 14px", borderRadius: 8,
                            background: C.surfaceLow, border: `1px solid ${C.borderSubtle}`,
                            fontSize: 12, fontWeight: 600, color: C.text,
                          }}>
                            <span className="mso" style={{ fontSize: 15, color: C.muted }}>{acc.icon}</span>
                            {acc.label}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{
                      background: C.surfaceMid, padding: 28, borderRadius: 24,
                      border: "1px solid rgba(255,110,132,0.2)",
                      display: "flex", flexDirection: "column", justifyContent: "space-between",
                    }}>
                      <div>
                        <h4 style={{ fontFamily: "Manrope, sans-serif", fontSize: 17, fontWeight: 700, color: "#ff6e84", marginBottom: 8 }}>Danger Zone</h4>
                        <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>Irreversible actions on your curator profile.</p>
                      </div>
                      <button style={{
                        marginTop: 24, width: "100%", padding: "11px 0",
                        borderRadius: 10, background: "rgba(255,110,132,0.1)",
                        border: "1px solid rgba(255,110,132,0.15)",
                        color: "#ff6e84", fontSize: 11, fontWeight: 700,
                        letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer",
                      }}>Deactivate Profile</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="mobile-bottomnav" style={{
          position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 50,
          display: "flex", justifyContent: "space-around", alignItems: "center",
          padding: "10px 0 16px",
          background: `${C.surfaceLow}f2`, backdropFilter: "blur(12px)",
          borderTop: `1px solid ${C.border}`,
        }}>
          {NAV_ITEMS.map(item => {
            const isActive = item.label === activePage;

            return (
              <a
                key={item.label}
                href={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px 16px",
                  borderRadius: 12,

                  background: isActive
                    ? "rgba(170,164,255,0.18)"
                    : "transparent",

                  color: isActive ? C.primary : `${C.text}55`,
                  textDecoration: "none",
                }}
              >
                <span className="mso">{item.icon}</span>
              </a>
            );
          })}
        </nav>

      </div>
    </>
  );
}
