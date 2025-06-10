'use client';

import dynamic from 'next/dynamic';

// Dynamically import MapView component with no SSR
const DynamicMapView = dynamic(
  () => import('./MapView'),
  { ssr: false }
);

export default function ClientMapWrapper() {
  return <DynamicMapView />;
}