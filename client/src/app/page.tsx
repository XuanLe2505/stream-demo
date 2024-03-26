import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={`/${(uuidv4())}`} className="px-4 py-2 bg-blue-500 text-white rounded-md">New meeting</Link>
    </main>
  );
}
