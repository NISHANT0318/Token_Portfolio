import { Sparklines, SparklinesLine } from "react-sparklines";

export default function Sparkline({ data }) {
  if (!data || data.length === 0) return <span>No data</span>;


  const isUp = data[data.length - 1] > data[0];
  const color = isUp ? "green" : "red";

  return (
    <Sparklines data={data} limit={data.length} width={100} height={30}>
      <SparklinesLine color={color} style={{ fill: "none" }} />
    </Sparklines>
  );
}
