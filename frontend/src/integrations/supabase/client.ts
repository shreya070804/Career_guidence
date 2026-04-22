// Mock Supabase client that redirects to local backend
const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const mockQueryBuilder = (table: string) => {
  const tableMapping: Record<string, string> = {
    'counseling_sessions': 'counseling',
    'resources': 'resources',
    'students': 'admin/students'
  };
  
  const mappedTable = tableMapping[table] || table;

  let student_id: string | null = null;
  const builder: any = {
    select: () => builder,
    eq: (col: string, val: any) => {
      if (col === 'student_id') student_id = val;
      return builder;
    },
    order: () => builder,
    maybeSingle: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/${mappedTable}`);
        const data = await response.json();
        return { data: Array.isArray(data) ? data[0] : data, error: null };
      } catch (error: any) {
        return { data: null, error };
      }
    },
    single: async () => {
       try {
        const response = await fetch(`${API_BASE_URL}/api/${mappedTable}`);
        const data = await response.json();
        return { data: Array.isArray(data) ? data[0] : data, error: null };
      } catch (error: any) {
        return { data: null, error };
      }
    },
    insert: async (data: any) => {
      console.log(`Supabase Mock: Inserting into ${table}`, data);
      try {
        let insertUrl = `${API_BASE_URL}/api/${mappedTable}`;
        // Use the alt-path for counseling sessions to bypass routing issues
        if (table === 'counseling_sessions') {
          insertUrl = `${API_BASE_URL}/api/book-session`;
        }
        
        const response = await fetch(insertUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
           const errorText = await response.text();
           console.error(`Backend Error (${response.status}):`, errorText);
           return { data: null, error: { message: `Backend error ${response.status}` } };
        }

        const result = await response.json();
        return { data: result, error: null };
      } catch (error: any) {
        console.error("Supabase Insert Error:", error);
        return { data: null, error };
      }
    },
    then: (onFulfilled: any) => {
      let url = `${API_BASE_URL}/api/${mappedTable}`;
      if (table === 'counseling_sessions' && student_id) {
        url = `${API_BASE_URL}/api/counseling/student/${student_id}`;
      }
      
      console.log(`Supabase Mock: Fetching from ${url}`);
      return fetch(url)
        .then(r => {
          if (!r.ok) {
            console.error(`Fetch failed for ${url}: ${r.status}`);
            throw new Error(`HTTP error! status: ${r.status}`);
          }
          return r.json();
        })
        .then(data => {
          console.log(`Supabase Mock: Received data for ${table}`, data);
          onFulfilled({ data, error: null });
        })
        .catch(error => {
           console.error("Supabase Fetch Error:", error);
           onFulfilled({ data: [], error });
        });
    }
  };
  
  return builder;
};

export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: (callback: any) => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async () => ({ data: { user: null }, error: new Error("Supabase removed") }),
    signUp: async () => ({ data: { user: null }, error: new Error("Supabase removed") }),
    signOut: async () => ({ error: null }),
  },
  from: (table: string) => mockQueryBuilder(table),
};