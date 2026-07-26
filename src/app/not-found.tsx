import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-site py-24 text-center">
      <h1 className="text-3xl">Page not found</h1>
      <p className="mx-auto mt-4 max-w-md">
        That page does not exist, but everything you probably want is one click away.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
        <Link href="/pricing" className="btn-secondary">
          See pricing
        </Link>
      </div>
    </section>
  );
}
