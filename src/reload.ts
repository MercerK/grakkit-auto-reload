import core from '@grakkit/stdlib-paper'

const Express = core.load('./plugins/grakkit/java-express-0.0.10.jar', 'express.Express')

export const app = new Express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
})

