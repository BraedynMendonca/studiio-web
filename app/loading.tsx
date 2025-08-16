export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        <p className="mt-4 text-white">Loading Studiio...</p>
      </div>
    </div>
  )
}
