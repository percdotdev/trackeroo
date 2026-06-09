import { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="mx-auto w-80 p-8 text-center">
      <div className="flex justify-center gap-4">
        <a href="https://wxt.dev" target="_blank" rel="noreferrer">
          <img
            src={wxtLogo}
            className="h-24 p-6 transition-[filter] hover:drop-shadow-[0_0_2em_#54bc4ae0]"
            alt="WXT logo"
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            className="h-24 p-6 motion-safe:animate-[spin_20s_linear_infinite] transition-[filter] hover:drop-shadow-[0_0_2em_#61dafbaa]"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="text-3xl font-bold leading-tight">Trackeroo</h1>
      <div className="py-8">
        <button
          type="button"
          className="rounded-lg border border-transparent bg-neutral-900 px-5 py-2.5 font-medium text-white transition-colors hover:border-indigo-500 dark:bg-neutral-100 dark:text-neutral-900"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="mt-4 text-neutral-500">
          Tailwind is wired up. Edit <code>entrypoints/popup/App.tsx</code>.
        </p>
      </div>
    </div>
  );
}

export default App;
