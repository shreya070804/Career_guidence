// Mock Supabase client that redirects to local backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const mockQueryBuilder = (table: string) => {
  const tableMapping: Record<string, string> = {
    'counseling_sessions': 'sessions',
    'resources': 'resources',
    'students': 'admin/students'
  };
  
  const mappedTable = tableMapping[table] || table;

  const builder: any = {
    select: () => builder,
    eq: () => builder,
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
      try {
        const response = await fetch(`${API_BASE_URL}/api/${mappedTable}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        return { data: result, error: null };
      } catch (error: any) {
        return { data: null, error };
      }
    },
    // This allows the use of 'await' directly on the builder
    then: (onFulfilled: any) => {
      let url = `${API_BASE_URL}/api/${mappedTable}`;
      return fetch(url)
        .then(r => r.json())
        .then(data => onFulfilled({ data, error: null }))
        .catch(error => onFulfilled({ data: [], error }));
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