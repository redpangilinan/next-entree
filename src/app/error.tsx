"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, Home, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8 text-center">
      <div className="flex flex-col items-center gap-5">
        <div className="rounded-full border border-destructive/20 bg-destructive/10 p-5">
          <AlertTriangle
            className="h-10 w-10 text-destructive"
            aria-hidden="true"
          />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Something went wrong
          </h1>
          <p className="mx-auto max-w-sm text-sm text-muted-foreground">
            An unexpected error occurred. You can try to recover below, or head
            back home.
          </p>
        </div>

        {error.digest && (
          <>
            <Separator className="max-w-xs" />
            <p className="font-mono text-xs text-muted-foreground/60">
              Digest: <span className="select-all">{error.digest}</span>
            </p>
          </>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={reset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Go home
          </Link>
        </Button>
      </div>
    </main>
  )
}
