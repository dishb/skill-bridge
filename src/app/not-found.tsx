import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl font-bold">404: Page Not Found.</h1>
        <h2 className="text-2xl text-muted-foreground">
          The page you are looking for does not exist.
        </h2>
        <p className="text-2xl">
          Go back to{" "}
          <Link href="/home" className="underline underline-offset-4 hover:no-underline">
            home.
          </Link>
        </p>
      </div>
    </div>
  );
}
