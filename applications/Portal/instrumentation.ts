export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server-side console filtering
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge runtime console filtering
  }
}

export function onRequestError() {
  // Custom error handling
}
