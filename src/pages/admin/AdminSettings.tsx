export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-serif font-bold text-foreground">Settings</h2>
      <div className="bg-card rounded-2xl shadow-card p-6">
        <h3 className="font-serif font-semibold text-card-foreground mb-4">Store Settings</h3>
        <p className="text-muted-foreground text-sm">Connect a backend to manage store settings, shipping rules, and payment configuration.</p>
      </div>
    </div>
  );
}
