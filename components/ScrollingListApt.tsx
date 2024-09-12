import React from "react";

interface ScrollingListProps {
  data: Record<string, any>[];
}

interface InfoStyle {
  color: string;
  fontSize: string;
  fontWeight?: string;
}

const infoStyles: Record<string, InfoStyle> = {
  name: { color: "black", fontSize: "1.3rem", fontWeight: "bold" },
  date: { color: "black", fontSize: "1.3rem", fontWeight: "bold" },
  location_name: { color: "black", fontSize: "1rem" },
  max_participants: { color: "black", fontSize: "1rem" },
  type: { color: "black", fontSize: "1rem" },
  surname: { color: "black", fontSize: "1rem" },
  email: { color: "black", fontSize: "1rem" },
  comment: { color: "black", fontSize: "1rem" },
  source: { color: "black", fontSize: "1rem" },
  rzting: { color: "black", fontSize: "1rem" },
};

const prefixes: Record<string, string> = {
  date: "Date:",
  name: "Name:",
  rating: "Rating:",
  report: "Report:",
  source: "Source:",
};

const ScrollingListApt: React.FC<ScrollingListProps> = ({ data }) => {
  return (
    <div className="w-full h-full overflow-y-auto bg-white border rounded-lg p-2">
      <ul>
        {data.map((item, index) => {
          const orderedKeys = ["name", "date", "rating", "report", "source"];

          const itemValues = orderedKeys
            .filter((key) => key in item)
            .map((key) => {
              const prefix = prefixes[key] || "";
              const style = infoStyles[key] || {
                color: "black",
                fontSize: "1rem",
              };
              return (
                <div
                  key={key}
                  style={{
                    color: style.color,
                    fontSize: style.fontSize,
                    fontWeight: style.fontWeight,
                  }}
                >
                  {prefix} {item[key]}
                </div>
              );
            });

          return (
            <li
              key={index}
              className="mb-2 border-b border-gray-300 pb-2 last:border-0"
            >
              {itemValues}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ScrollingListApt;
