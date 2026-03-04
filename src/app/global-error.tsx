"use client"

import { useEffect } from "react"
import { AlertOctagon, RotateCcw } from "lucide-react"

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * global-error.tsx catches errors thrown inside the root layout.
 * Because it replaces the root layout entirely, it MUST render
 * its own <html> and <body> tags — Tailwind and shadcn/ui are
 * unavailable here, so styles are inlined.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          backgroundColor: "#ffffff",
          color: "#09090b",
        }}
      >
        <main
          style={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.25rem",
            }}
          >
            <div
              style={{
                borderRadius: "9999px",
                border: "1px solid #fecaca",
                backgroundColor: "#fef2f2",
                padding: "1.25rem",
              }}
            >
              <AlertOctagon
                aria-hidden="true"
                style={{ width: "2.5rem", height: "2.5rem", color: "#dc2626" }}
              />
            </div>

            <div>
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#71717a",
                  marginBottom: "0.5rem",
                }}
              >
                Critical Error
              </p>
              <h1
                style={{
                  fontSize: "1.875rem",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  margin: "0 0 0.5rem",
                }}
              >
                Application failed to load
              </h1>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#71717a",
                  maxWidth: "28rem",
                  margin: "0 auto",
                }}
              >
                A critical error occurred in the application root. Please try
                again — if the problem persists, contact support.
              </p>

              {error.digest && (
                <p
                  style={{
                    marginTop: "0.75rem",
                    fontFamily: "ui-monospace, monospace",
                    fontSize: "0.7rem",
                    color: "#a1a1aa",
                  }}
                >
                  Digest:{" "}
                  <span style={{ userSelect: "all" }}>{error.digest}</span>
                </p>
              )}
            </div>
          </div>

          <button
            onClick={reset}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1.25rem",
              borderRadius: "0.375rem",
              backgroundColor: "#18181b",
              color: "#fafafa",
              border: "none",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: 500,
              transition: "background-color 0.15s",
            }}
            onMouseOver={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#27272a")
            }
            onMouseOut={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "#18181b")
            }
          >
            <RotateCcw style={{ width: "1rem", height: "1rem" }} />
            Try again
          </button>
        </main>
      </body>
    </html>
  )
}
