import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import "../app.css";
import TooltipBox from "../components/TooltipBox";

const COLORS = ["#CFCFCF", "#303030"]; // YES: #CFCFCF, NO: #303030

function Parents({ data }) {
  const aiOutsideSchoolData = (() => {
    const counts = { Yes: 0, No: 0 };

    data.forEach((row) => {
      const answer =
        row[
          "Do your parents or guardians know you use AI for learning?"
        ]?.trim();
      if (answer === "Yes" || answer === "No") {
        counts[answer]++;
      }
    });
    return [
      { name: "Knows", value: counts["Yes"] },
      { name: "Doesn't know", value: counts["No"] },
    ];
  })();

  // Tooltip state
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    setTooltip({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    });
  };
  const handleMouseMove = (e) => {
    setTooltip((t) => ({ ...t, x: e.clientX, y: e.clientY }));
  };
  const handleMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0 });
  };

  return (
    <div className="chart2">
      <div
        className="tag tag-tooltip"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ position: "relative" }}
      >
        Parental Awareness
        <TooltipBox visible={tooltip.visible} x={tooltip.x} y={tooltip.y}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <img
              src="/source.svg"
              alt="Source icon"
              style={{ width: 18, height: 18, marginRight: 4, marginBottom: 2 }}
            />
            <strong style={{ fontWeight: 700 }}>Source:</strong>
          </span>
          Do your parents or guardians know you use AI for learning?
        </TooltipBox>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={aiOutsideSchoolData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${(percent * 100).toFixed(0)}% ${name}`
            }
            outerRadius={80}
            dataKey="value"
          >
            {aiOutsideSchoolData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#222",
              color: "#CFCFCF",
              border: "1px solid #404040",
              borderRadius: "1rem",
            }}
            itemStyle={{ color: "#CFCFCF" }}
            labelStyle={{ color: "#CFCFCF" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Parents;
