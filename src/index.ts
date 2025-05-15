import { z } from 'zod'
import { 插件 } from '@lsby/net-core'
import { Kysely管理器 } from '@lsby/ts-kysely'

const Kysely插件Zod = <NAME extends string, DB>(
  name: NAME,
): z.ZodObject<{ [key in NAME]: z.ZodType<Kysely管理器<DB>> }> => {
  return z.object({
    [name]: z.custom<Kysely管理器<DB>>((instance) => instance instanceof Kysely管理器),
  } as { [key in NAME]: z.ZodType<Kysely管理器<DB>> })
}

export class Kysely插件<NAME extends string, DB> extends 插件<
  z.ZodObject<{ [key in NAME]: z.ZodType<Kysely管理器<DB>> }>
> {
  constructor(name: NAME, kysely: Kysely管理器<DB>) {
    super(Kysely插件Zod(name), async (_request, _response) => {
      return { [name]: kysely } as any
    })
  }
}
