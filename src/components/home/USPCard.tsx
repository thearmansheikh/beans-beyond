interface USPCardProps {
  icon: string;
  title: string;
  desc: string;
}

export default function USPCard({ icon, title, desc }: USPCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F5F5DC] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <span className="text-3xl block mb-3">{icon}</span>
      <h3 className="font-bold text-[#6F4E37] text-lg mb-1">{title}</h3>
      <p className="text-[#333]/60 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
