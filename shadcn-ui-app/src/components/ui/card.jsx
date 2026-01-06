export function Card({ children }) {
  return <div className="rounded-xl border bg-white p-4 shadow">{children}</div>
}
export function CardHeader({ children }) {
  return <div className="mb-2">{children}</div>
}
export function CardTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>
}
export function CardContent({ children }) {
  return <div className="mt-2">{children}</div>
}
