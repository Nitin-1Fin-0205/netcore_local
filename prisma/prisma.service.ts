import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'prisma/prisma-client';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super({
            log: [
                {
                    emit: 'event',
                    level: 'query',
                },
            ],
        });
    }

    async onModuleInit(): Promise<void> {
        await this.$connect();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.$on('query', async (e) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            //   console.log(`${e.query} ${e.params}`)
            // console.log('query ran')
        });
    }

    async enableShutdownHooks(app: INestApplication): Promise<void> {
        process.on('beforeExit', async () => {
            await app.close();
        });
    }
}