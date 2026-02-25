"use client";

import { useState } from "react";
import {
  FiToggleLeft, FiToggleRight, FiSave, FiCheck,
  FiAlertCircle, FiInstagram, FiFacebook, FiLink,
} from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";
import { RESTAURANT } from "@/utils/constants";

/* ── Toggle switch ── */
function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-sm font-semibold text-[#333]">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => onChange(!on)}
        className={`relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6F4E37] ${
          on ? "bg-[#D2691E]" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
            on ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </label>
  );
}

/* ── Field wrapper ── */
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#333] mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-xs text-[#333]/40 mt-1">{hint}</p>}
    </div>
  );
}

/* ── Input ── */
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37] transition-all"
    />
  );
}

export default function SettingsPanel() {
  // Operations
  const [accepting,      setAccepting]      = useState(true);
  const [deliveryOn,     setDeliveryOn]     = useState(true);
  const [collectionOn,   setCollectionOn]   = useState(true);
  const [dineInOn,       setDineInOn]       = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Business info
  const [biz, setBiz] = useState({
    name:    RESTAURANT.name,
    phone:   RESTAURANT.phone,
    email:   RESTAURANT.email,
    address: RESTAURANT.address,
    website: "https://www.bbcafe.co.uk",
  });

  // Delivery
  const [delivery, setDelivery] = useState({
    deliveroo:  "https://deliveroo.co.uk/menu/london/",
    ubereats:   "https://www.ubereats.com/gb/store/",
    justeat:    "https://www.just-eat.co.uk/restaurants-",
    minOrder:   "15.00",
    freeOver:   "25.00",
  });

  // Social
  const [social, setSocial] = useState({
    instagram: RESTAURANT.social.instagram,
    facebook:  RESTAURANT.social.facebook,
    tiktok:    RESTAURANT.social.tiktok,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Demo save — would POST to API in production
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const setB = (k: string, v: string) => setBiz((p) => ({ ...p, [k]: v }));
  const setD = (k: string, v: string) => setDelivery((p) => ({ ...p, [k]: v }));
  const setS = (k: string, v: string) => setSocial((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-8 max-w-3xl">

      {/* ── Operations ── */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
        <h2 className="font-black text-[#6F4E37] text-base border-b border-gray-50 pb-3">
          Operations
        </h2>

        <Toggle on={accepting}      onChange={setAccepting}      label="Accepting online orders" />
        <Toggle on={deliveryOn}     onChange={setDeliveryOn}     label="Delivery available"      />
        <Toggle on={collectionOn}   onChange={setCollectionOn}   label="Collection available"    />
        <Toggle on={dineInOn}       onChange={setDineInOn}       label="Dine-in reservations open" />

        <div className="border-t border-gray-50 pt-5">
          <Toggle on={maintenanceMode} onChange={setMaintenanceMode} label="Maintenance mode (hides site from customers)" />
          {maintenanceMode && (
            <div className="mt-3 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              <FiAlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>Maintenance mode is ON — the customer-facing site shows an &ldquo;Under Maintenance&rdquo; page.</span>
            </div>
          )}
        </div>
      </section>

      {/* ── Business Information ── */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
        <h2 className="font-black text-[#6F4E37] text-base border-b border-gray-50 pb-3">
          Business Information
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Restaurant Name">
            <Input value={biz.name} onChange={(e) => setB("name", e.target.value)} />
          </Field>
          <Field label="Phone Number">
            <Input type="tel" value={biz.phone} onChange={(e) => setB("phone", e.target.value)} />
          </Field>
          <Field label="Email Address">
            <Input type="email" value={biz.email} onChange={(e) => setB("email", e.target.value)} />
          </Field>
          <Field label="Website URL">
            <Input type="url" value={biz.website} onChange={(e) => setB("website", e.target.value)} />
          </Field>
        </div>
        <Field label="Address">
          <Input value={biz.address} onChange={(e) => setB("address", e.target.value)} />
        </Field>
      </section>

      {/* ── Delivery Settings ── */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
        <h2 className="font-black text-[#6F4E37] text-base border-b border-gray-50 pb-3">
          Delivery & Third-Party Platforms
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Minimum Order Value (£)" hint="Applies to direct orders">
            <Input type="number" min="0" step="0.50" value={delivery.minOrder} onChange={(e) => setD("minOrder", e.target.value)} />
          </Field>
          <Field label="Free Delivery Over (£)" hint="Set 0 to disable free threshold">
            <Input type="number" min="0" step="0.50" value={delivery.freeOver} onChange={(e) => setD("freeOver", e.target.value)} />
          </Field>
        </div>

        <div className="space-y-3">
          {[
            { key: "deliveroo",  Icon: FiLink,  label: "Deliveroo URL"  },
            { key: "ubereats",   Icon: FiLink,  label: "Uber Eats URL"  },
            { key: "justeat",    Icon: FiLink,  label: "Just Eat URL"   },
          ].map(({ key, Icon, label }) => (
            <Field key={key} label={label}>
              <div className="relative">
                <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]/35 pointer-events-none" />
                <Input
                  type="url"
                  className="pl-10"
                  value={delivery[key as keyof typeof delivery]}
                  onChange={(e) => setD(key, e.target.value)}
                />
              </div>
            </Field>
          ))}
        </div>
      </section>

      {/* ── Social Media ── */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h2 className="font-black text-[#6F4E37] text-base border-b border-gray-50 pb-3">
          Social Media Links
        </h2>

        {[
          { key: "instagram", Icon: FiInstagram, label: "Instagram URL", placeholder: "https://instagram.com/bbcafe" },
          { key: "facebook",  Icon: FiFacebook,  label: "Facebook URL",  placeholder: "https://facebook.com/bbcafe"  },
          { key: "tiktok",    Icon: FaTiktok,    label: "TikTok URL",    placeholder: "https://tiktok.com/@bbcafe"   },
        ].map(({ key, Icon, label, placeholder }) => (
          <Field key={key} label={label}>
            <div className="relative">
              <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]/35 pointer-events-none" />
              <Input
                type="url"
                className="pl-10"
                placeholder={placeholder}
                value={social[key as keyof typeof social]}
                onChange={(e) => setS(key, e.target.value)}
              />
            </div>
          </Field>
        ))}
      </section>

      {/* ── Save button ── */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-8 py-3 font-bold text-sm rounded-xl transition-all shadow-md active:scale-[0.97] ${
            saved
              ? "bg-green-500 text-white shadow-green-500/25"
              : "bg-[#D2691E] text-white hover:bg-[#B5571A] shadow-[#D2691E]/25"
          }`}
        >
          {saved ? <><FiCheck className="w-4 h-4" />Saved!</> : <><FiSave className="w-4 h-4" />Save Changes</>}
        </button>
        <p className="text-xs text-[#333]/40">
          {saved ? "All changes saved successfully." : "Changes apply immediately on save."}
        </p>
      </div>

    </div>
  );
}
