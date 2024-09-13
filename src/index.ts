import { Kysely } from 'kysely'
import { z } from 'zod'
import { 插件 } from '@lsby/net-core'

const Kysely插件Zod = <DB>(): z.ZodObject<{ kysely: z.ZodType<Kysely<DB>> }> =>
  z.object({
    kysely: z.custom<Kysely<DB>>((instance) => instance instanceof Kysely),
  })

export class Kysely插件<DB> extends 插件<z.ZodObject<{ kysely: z.ZodType<Kysely<DB>> }>> {
  constructor(kysely: Kysely<DB>) {
    super(Kysely插件Zod(), async (_request, _response) => {
      return { kysely }
    })
  }
}
