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
      style={{
        width: "20%",
        height: "100%",
        alignContent: "end",
      }}
    >
      <p style={{ textAlign: "center" }}>{label}</p>
      <div
        style={{
          width: "100%",
          height: `${fixedSize * 100}%`,
          background: color,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      ></div>
    </div>
  );
};
