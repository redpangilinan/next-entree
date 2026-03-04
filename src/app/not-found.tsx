import Link from "next/link"
import { FileSearch, Home } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8 text-center">
      <div className="flex flex-col items-center gap-5">
        <div className="rounded-full border bg-muted/50 p-5">
          <FileSearch
            className="h-10 w-10 text-muted-foreground"
            aria-hidden="true"
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            404
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
          <p className="mx-auto max-w-sm text-sm text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>
      </div>

      <Button asChild>
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </Button>
    </main>
  )
}
