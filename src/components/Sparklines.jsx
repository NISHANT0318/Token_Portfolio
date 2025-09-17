import { Sparklines, SparklinesLine } from "react-sparklines";

export default function Sparkline({ data }) {
  if (!data || data.length === 0) return <span>No data</span>;

  const avg = data.reduce((a, b) => a + b, 0) / data.length;
  const isUp = data[data.length - 1] > avg;
  const color = isUp ? "green" : "red";

  return (
    <div className="flex items-center justify-center w-[206px] h-[48px]">
      <Sparklines data={data} limit={data.length} width={180} height={30}>
        <SparklinesLine color={color} style={{ fill: "none" }} />
      </Sparklines>
    </div>
  );
}
