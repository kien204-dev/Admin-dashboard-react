import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Đặt data ra ngoài component
const destinations = [
    { city: "Tokyo", count: "86", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsgL36oT6Tm2fqJq21_KxoLa1nG5If3TR9Z9RlOKvOBqxRtul2E2aKOX27KJ70tn5GwSjegpv2Y1yC5RWHKfc5Z1IZ_A7uXYOfJDNf_5HmCWorYTAK1SzQ-Z9fNvx7WUkogQ-mJviJXBRkleyALAGwP7H8M3fzM0AeWI_xi7cbvZgKZ7taJSaeSO_tu7riSa9Uk0m8bXK26J3lh7ILswSTxOAR0EW6f1I4TIICRgvBu7ATibv0a3JJUwXbW-xEZMOZEeR0L3VwQjY" },
    { city: "Amalfi Coast", count: "54", img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=600&fit=crop" },
    { city: "Santorini", count: "38", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop" },
    { city: "Paris", count: "124", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_lf0xCLfQo1_bWb4BF4m-h5lKNxlKMqxJB6EHuXoY017Az0FQ_bYT5tmjLSarQ3b_rPlj531VlKXpRbfbdmOdKiDT_0mb34sIaC5XlDh07a6EL-J4-zTBp1uUnnQ0NPBGVO0_j1EhgIkV2cA5-MYCTqGjMLTkgE6gEDYSo-gb81csM4a1bfrlD_XoLe0gxY0ZEUB53OFSMgYkLf4rD4eIxconJ0JJQ6gPz0gcBrZqq0vmLY0ePvTTQ9oz0_QYESvi4DCB6rh9KCY" },
    { city: "Maldives", count: "42", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0lxva9nZICQHeckeawx44sgAuNmK2RBA9D0Cjc_S7vTz9nJB6919qigsPi2Gdx1X4fpjbMPG0FglKC1jza_DX3bP7Yvo490NpsPb5mlBr4dMukv3eNabaGWUmfqo05vIgO_OM6g8_GEh5osQ3hLL0AYP_F7EZf3svHIvTKLwKzpFcqfBsuM3XdRalEBtciRjMAvL0-S9sTe4fXDhQ2R81YPGFr9Db7kuyBMB6_N8Tcyh0_jbmo837e6odf3XPVoOpUP9BUBqKgs8" },
    { city: "Bali", count: "67", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop" },
    { city: "New York", count: "210", img: "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800&h=600&fit=crop" },
    { city: "Dubai", count: "95", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop" },
    { city: "Kyoto", count: "73", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop" },
];
const theme = {
    colors: {
        primary: "#002366",
        secondary: "#C5A059",
        tertiary: "#E5E4E2",
        neutral: "#1A1C1E",
    },

    typography: {
        headline: {
            fontFamily: "Noto Serif",
            fontSize: "32px",
            fontWeight: "bold",
        },
        body: {
            fontFamily: "Manrope",
            fontSize: "16px",
        },
        label: {
            fontFamily: "Manrope",
            fontSize: "14px",
        },
    },

    button: {
        primary: {
            background: "#002366",
            color: "#fff",
        },
        secondary: {
            background: "#C5A059",
            color: "#000",
        },
        outlined: {
            border: "1px solid #002366",
            color: "#002366",
            background: "transparent",
        },
    },

    input: {
        border: "1px solid #ccc",
        padding: "8px",
        borderRadius: "6px",
    },

    icon: {
        size: "20px",
        color: "#002366",
    }
};
function Booking() {

    const navigate = useNavigate();

    const [openSidebar, setOpenSidebar] = useState(false);

    const [page, setPage] = useState(0);

    const itemsPerPage = 3;
    const totalPages = Math.ceil(destinations.length / itemsPerPage);

    const visibleItems = destinations.slice(
        page * itemsPerPage,
        page * itemsPerPage + itemsPerPage
    );

    const next = () =>
        setPage((p) => (p === totalPages - 1 ? 0 : p + 1));

    const prev = () =>
        setPage((p) => (p === 0 ? totalPages - 1 : p - 1));
    return (

        <div className="bg-surface font-body text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: openSidebar ? 0 : "-260px",
                    width: "250px",
                    height: "100vh",
                    background: "#0b0e14",
                    color: "#fff",
                    padding: "20px",
                    transition: "left 0.3s ease",
                    zIndex: 1000,
                }}
            >
                <h3 style={{ marginBottom: 20 }}>Menu</h3>

                <p
                    onClick={() => {
                        navigate("/dashboard");
                        setOpenSidebar(false);
                    }}
                    style={{ cursor: "pointer" }}
                >
                    Dashboard
                </p>

                <p
                    onClick={() => {
                        navigate("/bookings");
                        setOpenSidebar(false);
                    }}
                    style={{ cursor: "pointer" }}
                >
                    Bookings
                </p>

                <p
                    onClick={() => {
                        navigate("/users");
                        setOpenSidebar(false);
                    }}
                    style={{ cursor: "pointer" }}
                >
                    Users
                </p>

                <p
                    onClick={() => {
                        navigate("/settings");
                        setOpenSidebar(false);
                    }}
                    style={{ cursor: "pointer" }}
                >
                    Settings
                </p>

                <button
                    onClick={() => setOpenSidebar(false)}
                    style={{
                        marginTop: 20,
                        padding: "8px 12px",
                        background: "red",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                    }}
                >
                    Close
                </button>
            </div>

            {openSidebar && (
                <div
                    onClick={() => setOpenSidebar(false)}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.4)",
                        zIndex: 999,
                    }}
                />
            )}

            {/* Glass Nav CSS */}
            <style>{`
        .glass-nav {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

            {/* Header */}
            <header className="fixed top-0 w-full z-50 glass-nav shadow-sm">
                <nav className="flex justify-between items-center px-8 py-4 max-w-full mx-auto">
                    <div className="flex items-center gap-4">
                        <span
                            className="material-symbols-outlined text-blue-900 cursor-pointer hover:scale-95 transition-transform duration-200"
                            onClick={() => setOpenSidebar(true)}
                        >
                            menu
                        </span>
                        <span className="text-2xl font-headline font-bold text-blue-900 tracking-tight">LuxeStay</span>
                    </div>
                    <div className="hidden md:flex items-center gap-12 font-label text-sm uppercase tracking-widest text-slate-500">
                        <a className="text-blue-900 font-semibold hover:text-amber-600 transition-colors duration-300" href="#">Destinations</a>
                        <a className="hover:text-amber-600 transition-colors duration-300" href="#">Experiences</a>
                        <a className="hover:text-amber-600 transition-colors duration-300" href="#">Offers</a>
                        <a className="hover:text-amber-600 transition-colors duration-300" href="#">Concierge</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest">
                            <img alt="User Profile" className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXubHAgg5Tl5h9nDG_HNvW0MhT-D_-eFNbYF66ae4cx8nQeavGWXJOfHgN5Lch3_3qOdCVkWt-Z0MvehdoUFBC_GtaKTgSDDU2Wks6XxhPnSgrpzjhJFNsjEVVj_F7FfF7DirtF7bJtUSr0Daq7Jnt-86dvwx6JIUUZY9ffppu2hhUbpLdWgS31cfNvKdC-YnLEun4PNkGKSzsHRpS0QA6knMKPaZZAgAaOR0Lz1nut8Q2waXSrueC-DZtRQJ5VhQnsMmhUug1VQ4" />
                        </div>
                    </div>
                </nav>
            </header>

            <main>
                {/* Hero */}
                <section className="relative h-[795px] flex flex-col justify-end items-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img alt="Luxury Hotel Lobby" className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAe1eIrCHeHTRnMBMHnCSsRPwJt2r7uVIHNSbs8Y4L_JSF-yCK1ezkKDT2tQ0KBlDM7zKc5PvQMc1BB4rQIbRwR2gT6ArIp9bdggjM8xyhs5yVepCrRWoCLQzAaqGjFSiIh63y8UHCTixjtjtTE5QZ_1dzRvTQTY0qwqSsrr8OQXCEJlv5S9HOD8H5Gdx_niCODZXMsZBOs3QGZ_ZIIKxNaIlPT9TNPRAzc7EceXWHBKhvbbe0VRgb9Xl_J0PoLqWhMD8UalNr9UXc" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,17,58,0.4) 0%, rgba(0,17,58,0.1) 50%, rgba(249,249,252,1) 100%)" }}></div>
                    </div>
                    <div className="relative z-10 w-full max-w-6xl px-8 pb-12 text-center">
                        <h1 className="font-headline text-5xl md:text-7xl text-primary mb-6 tracking-tight">The Art of Refined Living</h1>
                        <p className="font-label text-secondary uppercase tracking-[0.3em] mb-12 font-semibold">Exclusively Curated Global Sanctuaries</p>
                        <div className="bg-surface-container-lowest shadow-sm p-2 md:p-3 flex flex-col md:flex-row items-center gap-4 rounded-lg w-full">
                            <div className="flex-1 w-full px-4 py-2 flex flex-col items-start border-b md:border-b-0 md:border-r border-outline-variant/30">
                                <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Destination</span>
                                <input className="w-full bg-transparent border-none p-0 focus:ring-0 text-primary font-medium placeholder:text-outline-variant" placeholder="Where to next?" type="text" />
                            </div>
                            <div className="flex-1 w-full px-4 py-2 flex flex-col items-start border-b md:border-b-0 md:border-r border-outline-variant/30">
                                <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Check-in/out</span>
                                <input className="w-full bg-transparent border-none p-0 focus:ring-0 text-primary font-medium placeholder:text-outline-variant" placeholder="Select dates" type="text" />
                            </div>
                            <div className="flex-1 w-full px-4 py-2 flex flex-col items-start">
                                <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Guests</span>
                                <input className="w-full bg-transparent border-none p-0 focus:ring-0 text-primary font-medium placeholder:text-outline-variant" placeholder="2 Adults, 1 Room" type="text" />
                            </div>
                            <button className="w-full md:w-auto px-10 py-4 bg-primary text-on-primary font-label text-sm uppercase tracking-widest hover:bg-primary-container transition-colors rounded-sm">
                                Search
                            </button>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-surface">
                    <div className="px-8 max-w-full mx-auto">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <span className="text-secondary font-label text-sm uppercase tracking-widest font-bold block mb-2">Curated Journeys</span>
                                <h2 className="font-headline text-4xl text-primary">Signature Destinations</h2>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={prev}
                                    className="w-10 h-10 rounded-full border border-outline-variant hover:bg-surface-container-low transition-colors flex items-center justify-center text-xl"
                                >‹</button>
                                <button
                                    onClick={next}
                                    className="w-10 h-10 rounded-full border border-outline-variant hover:bg-surface-container-low transition-colors flex items-center justify-center text-xl"
                                >›</button>
                            </div>
                        </div>

                        {/* Carousel */}
                        <div className="overflow-hidden">
                            <div className="grid grid-cols-3 gap-8">
                                {visibleItems.map(({ city, count, img }) => (
                                    <div key={city} className="group cursor-pointer">
                                        <div className="rounded-lg aspect-[3/4] w-full overflow-hidden relative">
                                            <img
                                                src={img}
                                                alt={city}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />

                                            <div className="absolute bottom-6 left-6">
                                                <h3 className="text-white text-3xl font-headline">{city}</h3>
                                                <p className="text-white/80 text-xs uppercase tracking-widest">
                                                    {count} Properties
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i)}
                                className={`h-2 rounded-full transition-all ${page === i ? "bg-primary w-6" : "bg-outline-variant w-2"
                                    }`}
                            />
                        ))}
                    </div>
                </section>
                {/* Exquisite Vietnam */}
                <section className="py-24 bg-surface-container-low overflow-hidden">
                    <div className="px-8 max-w-full mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
                            <div>
                                <span className="text-secondary font-label text-sm uppercase tracking-widest font-bold block mb-2">Heritage &amp; Elegance</span>
                                <h2 className="font-headline text-4xl text-primary">Exquisite Vietnam</h2>
                            </div>
                            <p className="text-on-surface-variant max-w-lg text-sm leading-relaxed font-body">
                                From the misty hills of the north to the sun-drenched shores of the south, experience Vietnam's most prestigious sanctuaries where timeless tradition meets modern opulence.
                            </p>
                        </div>
                        <div className="flex gap-8 overflow-x-auto pb-8 snap-x no-scrollbar">
                            {[
                                {
                                    name: "InterContinental Danang Sun Peninsula Resort",
                                    location: "Danang",
                                    desc: "A masterpiece of design by Bill Bensley, where myth meets luxury on the private bay of Son Tra Peninsula.",
                                    icons: ["restaurant", "spa", "beach_access"],
                                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-IC-Danang-Resort",
                                },
                                {
                                    name: "Amanoi Ninh Thuan",
                                    location: "Ninh Thuan",
                                    desc: "A serene retreat overlooking Vinh Hy Bay, offering absolute seclusion and wellness amidst rugged coastal beauty.",
                                    icons: ["self_improvement", "pool", "eco"],
                                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-Amanoi-Vietnam",
                                },
                                {
                                    name: "Capella Hanoi",
                                    location: "Hanoi",
                                    desc: "A glamorous homage to the Opera House, this art-nouveau palace celebrates the spirit of the roaring twenties.",
                                    icons: ["wine_bar", "museum", "valet_parking"],
                                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-Capella-Hanoi",
                                },
                            ].map(({ name, location, desc, icons, img }) => (
                                <div key={name} className="min-w-[450px] snap-start bg-surface-container-lowest group shadow-lg">
                                    <div className="h-[300px] overflow-hidden relative">
                                        <img alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" src={img} />
                                        <div className="absolute top-4 right-4 bg-secondary text-on-secondary px-3 py-1 text-[10px] uppercase tracking-widest font-bold">{location}</div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="font-headline text-2xl text-primary mb-3">{name}</h3>
                                        <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">{desc}</p>
                                        <div className="flex justify-between items-center border-t border-outline-variant/10 pt-6">
                                            <div className="flex gap-4">
                                                {icons.map(icon => (
                                                    <span key={icon} className="material-symbols-outlined text-secondary">{icon}</span>
                                                ))}
                                            </div>
                                            <a className="text-primary font-label text-xs uppercase tracking-widest font-bold hover:underline decoration-secondary underline-offset-8" href="#">Explore Sanctuary</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Suite Collection */}
                <section className="py-24 bg-surface-container-low">
                    <div className="px-8 max-w-full mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-secondary font-label text-sm uppercase tracking-widest font-bold block mb-2">Our Selection</span>
                            <h2 className="font-headline text-4xl text-primary">The Suite Collection</h2>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {[
                                { name: "The Royal Heritage", location: "Lake Como, Italy", price: "€1,250", amenities: [["spa", "Spa"], ["pool", "Infinity Pool"], ["restaurant", "Michelin Star"]], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYN5w-_7gAhweJe8N6tWrBo3cRg2J4JIFXUCMvzMXuZh_eLgTSg9VncSjFY22Dd-kg9Mj_1emiC4wdb4FbcflklVTz6wRQsgMVVREqVRfxtCXAm0nt_rJSM845zVtXyhKxUXKjE2AWwHaDFNjQF8GmzPvYyR7FYjpP7iAnmZUeB-NN0lEHJjyBSZrV5OuX98KZ-xe3P_14VFSg1YPAZQodNDyEJ8Aie9uSGswJWI8BbYzi0CiCa2MYc6e7o-kDJYKaUWg_gVzKQ1U" },
                                { name: "Aman Zenith", location: "Kyoto, Japan", price: "¥240,000", amenities: [["mode", "Zen Garden"], ["hot_tub", "Onsen"], ["concierge", "Private Butler"]], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAl5hm6dd_3xwJdHDGs4CX0GNWvMqTb0q-eTttwfL1aN1Uy1BPiWnPUlg3_CEU-OUCW3PdYfrySmSLX63VYd1gmyhqkqHeEXGyS7B6Xgr2mMj_i43yFwhfitA7babphjGnBrRT_kweSSDrqPYlaFzLN-pZqI6fDSv_sfQduGKHfgwJ5DZvY5If7ZZ8mQs62x8XePDEJCl4Cg6M0-M01AY9Y9BebuUt8K2QGEczRI6NIchfyv7ks82pd4lVXLssuPGGSEA3oz1pViPE" },
                                { name: "Azure Bay Resort", location: "Bora Bora", price: "$3,400", amenities: [["waves", "Private Beach"], ["sailing", "Yacht Access"], ["scuba_diving", "Diving"]], img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRgQpVx28Yubn_M3-wWZVRpuixG91q_izclCliw81aah5sMT8o1RZyq_ZZv5rnWbwtQhaHof756HtF-zVCEDc4OOP9pdTwTHDwVQHT0j9Yfz7XO2bYkNJik1anS_NKiCQmKlU7WPSLMQvHyrROENFT6lgpbixmtxWIeDVx_uaHxQOwypYUjPkJVMiMQwfh-ywAw9BLAogsrVSrcxQFKsDYttnkcks1S-lvwfAih2HovGzukkOTLRdpgcBg7IhTIXpfOC3bdn2hZ4s" },
                            ].map(({ name, location, price, amenities, img }) => (
                                <div key={name} className="bg-surface-container-lowest overflow-hidden">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img alt={name} className="w-full h-full object-cover" src={img} />
                                    </div>
                                    <div className="p-8">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-headline text-2xl text-primary mb-1">{name}</h3>
                                                <p className="text-on-surface-variant text-sm flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-xs">location_on</span>
                                                    {location}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-headline text-2xl text-secondary">{price}</p>
                                                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant">Per Night</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-6 mb-8 text-on-surface-variant text-sm border-y border-outline-variant/10 py-4">
                                            {amenities.map(([icon, label]) => (
                                                <span key={label} className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-lg">{icon}</span> {label}
                                                </span>
                                            ))}
                                        </div>
                                        <button className="w-full py-4 border border-primary text-primary font-label text-sm uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-300">
                                            View Sanctuary
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why LuxeStay */}
                <section className="py-24 bg-surface">
                    <div className="px-8 max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                            {[
                                { icon: "verified", title: "Handpicked Selection", desc: "Every property in our collection is personally inspected to meet our rigorous 200-point standard of excellence." },
                                { icon: "support_agent", title: "24/7 Concierge", desc: "Your personal travel artisan is available around the clock to handle everything from reservations to private charters." },
                                { icon: "payments", title: "Best Price Guarantee", desc: "Luxury shouldn't be overpaid. We guarantee the most competitive rates for the world's most prestigious suites." },
                            ].map(({ icon, title, desc }) => (
                                <div key={title} className="text-center">
                                    <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-8">
                                        <span className="material-symbols-outlined text-3xl text-secondary">{icon}</span>
                                    </div>
                                    <h4 className="font-headline text-xl text-primary mb-4">{title}</h4>
                                    <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quote */}
                <section className="py-24 bg-primary text-on-primary overflow-hidden">
                    <div className="px-8 max-w-4xl mx-auto text-center">
                        <span className="material-symbols-outlined text-5xl text-secondary mb-12">format_quote</span>
                        <div className="mb-12">
                            <p className="font-headline text-3xl md:text-4xl italic leading-snug">
                                "The level of detail and personal attention provided by LuxeStay transformed our honeymoon into a masterpiece of memories. Simply unparalleled service."
                            </p>
                        </div>
                        <p className="font-label text-sm uppercase tracking-widest font-bold text-secondary mb-1">Eleanor Vanderbilt</p>
                        <p className="text-white/60 text-xs uppercase tracking-widest">New York, NY</p>
                        <div className="flex justify-center gap-4 mt-12">
                            <div className="w-2 h-2 rounded-full bg-secondary"></div>
                            <div className="w-2 h-2 rounded-full bg-white/20"></div>
                            <div className="w-2 h-2 rounded-full bg-white/20"></div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="relative py-32 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img alt="Poolside Luxury" className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5LXgNktzMjgk6YMo0A545hrJ2H-FzYcOmqRul-Gzz_EMbi37IwO8wC0iuAvwI6_bwROKlsZCObpIF5DOK2g9i42TxFmQ1psUpcMFotaUHR6T-V1qaOelvGnl9jdJB7t4QFjHvAed8J_CIwPa82lV_K4sS4f6klKhO290e3JxQDMaXQJP7R_bKLmn1VKs4AfRkj_04QSLFBAAEvow10SJfR7MPCVHMHWKxAGFEXwcDxJTXecwgXL9y-WoHg9rX4GHY-B3ayjTX3K0" />
                        <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm"></div>
                    </div>
                    <div className="relative z-10 px-8 text-center max-w-3xl mx-auto">
                        <h2 className="font-headline text-4xl md:text-5xl text-white mb-8">Elevate Your Travel Identity</h2>
                        <p className="text-white/80 font-body text-lg mb-12 leading-relaxed">
                            Join the LuxeStay Circle and unlock private member rates, room upgrades, and complimentary chauffeur services at over 2,000 locations worldwide.
                        </p>
                        <button className="px-12 py-5 bg-secondary text-on-secondary font-label text-sm uppercase tracking-widest font-bold hover:bg-secondary-container transition-all duration-300">
                            Join The Membership
                        </button>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-slate-50 w-full mt-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-12 py-16">
                    <div className="md:col-span-1">
                        <span className="text-xl font-headline text-blue-900 mb-6 block">LuxeStay</span>
                        <p className="text-slate-600 font-sans text-xs uppercase tracking-widest leading-relaxed">Redefining the standards of global hospitality and travel curation since 2012.</p>
                    </div>
                    {[
                        { title: "Discover", links: ["Destinations", "Experiences", "Collections"] },
                        { title: "About", links: ["Our Story", "Concierge Services", "Press"] },
                        { title: "Legal", links: ["Terms of Service", "Privacy Policy"] },
                    ].map(({ title, links }) => (
                        <div key={title}>
                            <h5 className="text-blue-900 font-sans text-sm uppercase tracking-widest mb-6 font-bold">{title}</h5>
                            <ul className="space-y-4">
                                {links.map(link => (
                                    <li key={link}>
                                        <a className="text-slate-600 font-sans text-sm uppercase tracking-widest hover:underline decoration-amber-500 underline-offset-4" href="#">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="px-12 py-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-600 font-sans text-xs uppercase tracking-widest">© 2024 LuxeStay International. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="material-symbols-outlined text-slate-500">public</span>
                        <span className="material-symbols-outlined text-slate-500">share</span>
                    </div>
                </div>
            </footer>

        </div >
    );
}

export default Booking;