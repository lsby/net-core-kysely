import { z } from 'zod'
import { 插件 } from '@lsby/net-core'
import { Right } from '@lsby/ts-fp-data'
import { Kysely管理器 } from '@lsby/ts-kysely'

const Kysely插件Zod = <NAME extends string, DB>(
  name: NAME,
): z.ZodObject<{ [key in NAME]: z.ZodType<Kysely管理器<DB>> }> => {
  return z.object({
    [name]: z.custom<Kysely管理器<DB>>((instance) => instance instanceof Kysely管理器),
  } as { [key in NAME]: z.ZodType<Kysely管理器<DB>> })
}

var 错误类型描述 = z.never()

export class Kysely插件<NAME extends string, DB> extends 插件<
  typeof 错误类型描述,
  ReturnType<typeof Kysely插件Zod<NAME, DB>>
> {
  constructor(name: NAME, kysely: Kysely管理器<DB>) {
    var 正确类型描述 = Kysely插件Zod(name)
    super(错误类型描述, 正确类型描述 as any, async (_request, _response) => {
      return new Right({ [name]: kysely }) as any
    })
  }
}
