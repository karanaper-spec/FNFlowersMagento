import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background px-5">
      <div className="text-center max-w-lg">
        <h1 className="font-serif text-8xl md:text-9xl mb-6 text-primary tracking-tight">404</h1>
        <h2 className="font-serif text-4xl md:text-5xl mb-6">Page missing.</h2>
        <p className="font-sans text-muted-foreground text-sm md:text-base leading-relaxed mb-10">
          We searched the garden, but couldn't find the page you're looking for.
        </p>
        <Link href="/" className="btn-outline">
          Return Home
        </Link>
      </div>
    </div>
  );
}