"use client";
interface WokenessChartBarProps {
  color: string;
  size: number;
  label?: string;
}

export const WokenessChartBar = ({
  color,
  size,
  label,
}: WokenessChartBarProps): JSX.Element => {
  const fixedSize = parseFloat(size.toFixed(2));

  return (
    <div
      className="flex flex-col justify-end"
      style={{
        height: "100vh",
      }}
    >
      <p style={{ textAlign: "center" }}>{label}</p>
      <div
        style={{
          width: "100%",
          height: `${10 + fixedSize * 90}%`,
          background: color,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      ></div>
    </div>
  );
};
