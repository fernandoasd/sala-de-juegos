import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})

// Se crea el cliente sola UNA vez desde aca, luego se inyecto
export class SupabaseService {
  from(arg0: string) {
    throw new Error('Method not implemented.');
  }
  supabase: SupabaseClient<any, "public", any>;

  constructor() {
    this.supabase = createClient(
      "https://zvfexktcpppuodwshfeb.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2ZmV4a3RjcHBwdW9kd3NoZmViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNjIwNjQsImV4cCI6MjA2MjYzODA2NH0.AFXKXMW1tPeH91DXAV9CNl5S-SEGMxt7DKDL0khBKZA"
    );
   }
}
