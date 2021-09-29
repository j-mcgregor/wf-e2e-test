if (typeof window === 'undefined') {
  const { server } = require('./server');
  // handle the annoying sentry and telemetry warnings
  server.listen({
    onUnhandledRequest: ({ method, url }: { method: string; url: URL}) => {
      if (!url.pathname.startsWith('/api')) {
        throw new Error(`Unhandled ${method} request to ${url}`);
      }
    }
  });
} else {
  const { worker } = require('./browser');
  worker.start();
}

// default to stop linter
export {}