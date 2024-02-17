import { Outlet } from 'react-router-dom';
import Header from '../header';
import { Suspense } from 'react';

function AppLayout() {
  return (
    <div className="px-20">
      <Header />

      <main className="flex flex-col gap-6 py-8">
        <Suspense fallback={<span>loading..</span>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default AppLayout;
