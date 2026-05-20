import { Module, Global } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Global()
@Module({
  providers: [
    {
      provide: 'SUPABASE_CLIENT',
      useFactory: (): SupabaseClient => {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
          throw new Error(
            'SUPABASE_URL e SUPABASE_ANON_KEY devem estar definidos',
          );
        }

        return createClient(supabaseUrl, supabaseKey);
      },
    },
  ],
  exports: ['SUPABASE_CLIENT'],
})
export class DatabaseModule {}
