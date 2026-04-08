export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-white px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black text-orange-500">마을광장</h1>
        <p className="mt-1 text-sm text-gray-500">우리 동네 커뮤니티</p>
      </div>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}
