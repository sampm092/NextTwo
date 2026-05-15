// Loading is a special Next.js file built on top of React Suspense. It allows you to create fallback UI to show as a replacement while page content loads.

import DashboardSkeleton from "@/app/ui/skeletons";

export default function loading() {
  return (
    <section>
      Loading..
      <DashboardSkeleton />
    </section>
  );
}
