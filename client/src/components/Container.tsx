export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto min-h-screen bg-neutral-50">
      {children}
    </div>
  )
}
