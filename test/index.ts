const ctx = require.context('.', true, /\.spec\.ts$/)
ctx.keys().forEach((key: string) => ctx(key))
