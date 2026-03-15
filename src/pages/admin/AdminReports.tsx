export default function AdminReports() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-serif font-bold text-foreground">Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl shadow-card p-6">
          <h3 className="font-serif font-semibold text-card-foreground mb-4">Revenue Overview</h3>
          <div className="h-48 bg-muted/50 rounded-xl flex items-center justify-center text-muted-foreground text-sm">
            📊 Chart placeholder — Connect backend for live data
          </div>
        </div>
        <div className="bg-card rounded-2xl shadow-card p-6">
          <h3 className="font-serif font-semibold text-card-foreground mb-4">Order Trends</h3>
          <div className="h-48 bg-muted/50 rounded-xl flex items-center justify-center text-muted-foreground text-sm">
            📈 Chart placeholder — Connect backend for live data
          </div>
        </div>
      </div>
    </div>
  );
}
