import React from 'react';
import heroFood from '@/assets/hero-food.jpg';

export default function AdminSettings() {
  // Read-only shop profile values (default)
  const shop = {
    name: 'Sampradaya Swagruha Foods',
    owner: '',
    location: 'Hyderabad, Telangana',
    established: '2000-01-01',
    timings: '09:00 - 20:00',
    image: heroFood,
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-serif font-bold text-foreground">Profile</h2>

      <div className="bg-card rounded-2xl shadow-card p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <div className="text-xs text-muted-foreground">Shop Name</div>
              <div className="text-lg font-semibold">{shop.name}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted-foreground">Shop Owner Name</div>
                <div className="text-sm">{shop.owner || '—'}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Location</div>
                <div className="text-sm">{shop.location}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-muted-foreground">Established Date</div>
                <div className="text-sm">{new Date(shop.established).toLocaleDateString()}</div>
              </div>
              <div className="col-span-2">
                <div className="text-xs text-muted-foreground">Timings</div>
                <div className="text-sm">{shop.timings}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-48 h-48 bg-muted rounded-2xl overflow-hidden mb-4 flex items-center justify-center">
              <img src={shop.image} alt="Shop" className="w-full h-full object-cover" />
            </div>
            <div className="text-sm text-muted-foreground">Shop Photo</div>
          </div>
        </div>
      </div>
    </div>
  );
}
