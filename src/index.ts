import { Kysely } from 'kysely'
import { z } from 'zod'
import { 插件 } from '@lsby/net-core'

const Kysely插件Zod = <NAME extends string, DB>(name: NAME): z.ZodObject<{ [key in NAME]: z.ZodType<Kysely<DB>> }> => {
  return z.object({
    [name]: z.custom<Kysely<DB>>((instance) => instance instanceof Kysely),
  } as { [key in NAME]: z.ZodType<Kysely<DB>> })
}

export class Kysely插件<NAME extends string, DB> extends 插件<z.ZodObject<{ [key in NAME]: z.ZodType<Kysely<DB>> }>> {
  constructor(name: NAME, kysely: Kysely<DB>) {
    super(Kysely插件Zod(name), async (_request, _response) => {
      return { [name]: kysely } as any
    })
  }
}
