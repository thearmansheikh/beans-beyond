const REWARDS = [
  { points: 100, label: "Free Filter Coffee",    emoji: "☕" },
  { points: 150, label: "Free Pastry",           emoji: "🥐" },
  { points: 250, label: "Free Speciality Latte", emoji: "🍵" },
  { points: 400, label: "Free Breakfast Plate",  emoji: "🍳" },
  { points: 600, label: "Free Lunch for Two",    emoji: "🥗" },
  { points: 800, label: "Catering Voucher £10",  emoji: "🎟️" },
];

export default function LoyaltyRewards() {
  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <div className="text-center mb-12">
          <p className="text-[#D2691E] font-semibold uppercase tracking-widest text-xs mb-3">Rewards catalogue</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A0E07]">What you can claim</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {REWARDS.map(({ points, label, emoji }) => (
            <div
              key={label}
              className="bg-[#F8F4EF] border border-[#EEE6DC] rounded-2xl p-5 text-center hover:border-[#D2691E]/40 hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-[#EEE6DC] flex items-center justify-center mx-auto mb-3 text-2xl group-hover:scale-110 transition-transform shadow-sm">
                {emoji}
              </div>
              <p className="text-xs font-black text-[#1A0E07] mb-1 leading-tight">{label}</p>
              <p className="text-[#D2691E] text-xs font-bold">{points} pts</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
