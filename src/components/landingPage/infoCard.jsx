import { LucideBadgeCheck, LucideUndo2, LucideUpload } from "lucide-react";

const infoData = [
  {
    icon: <LucideBadgeCheck className="w-6 h-6 text-white" />,
    title: "Our Process",
    description:
      "This item is verified by ReKicks or Xpress ships directly from a ReKicks Verified Seller.",
    link: "#",
  },
  {
    icon: <LucideUndo2 className="w-6 h-6 text-white" />,
    title: "Buyer Promise",
    description:
      "We stand behind every product sold on ReKicks. If we make a mistake, we’ll make it right.",
    link: "#",
  },
  {
    icon: <LucideUpload className="w-6 h-6 text-white" />,
    title: "Start Selling ASAP",
    description:
      "You can start selling on ReKicks in just a few clicks, no application process necessary.",
    link: "#",
  },
];

export default function InfoCardSection() {
    return (
      <div className="px-7 mt-1 md:px-10 lg:px-30 xl:px-30 2xl:px-30 grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-8 text-white">
        {infoData.map((item, idx) => (
          <div
            key={idx}
            className="bg-neutral-700 rounded-xl p-6 flex items-start gap-4 shadow-md"
          >
            <div className="min-w-10 min-h-10 w-10 h-10 bg-neutral-600 rounded-full flex items-center justify-center">
              {item.icon}
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-neutral-300">{item.description}</p>
              <a href={item.link} className="text-sm text-blue-400 hover:underline">
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  }
  