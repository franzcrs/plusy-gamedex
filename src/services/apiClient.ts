// ═══════════════════════════════════════════════════════════════════
// 📍 FRONTEND CLOUD API CONFIGURATION
// Cloud API client for managing games.json via Cloud Run
// Change API_BASE_URL based on your current environment
// ═══════════════════════════════════════════════════════════════════

type Environment = 'development' | 'production' | 'client';

const API_URLS: Record<Environment, string> = {
  // Development & Production Demo (same domain, different routing)
  // Dev: Cloudflare Tunnel → localhost
  // Prod: Cloudflare DNS → Cloud Run
  development: 'https://plusy.nomoreboringtimes.com',
  production: 'https://plusy.nomoreboringtimes.com',

  // 🔄 CHANGE TO THIS when transitioning to client's domain
  client: 'https://cloud.taikentokyo.com',
};

// Set current environment here
// For development: run tunnel-dev.sh, then use 'development'
// For production demo: stop tunnel, use 'production' (same URL, routes to Cloud Run)
// For client handoff: use 'client'
const CURRENT_ENV: Environment = 'development';

export const API_BASE_URL = API_URLS[CURRENT_ENV];

// ═══════════════════════════════════════════════════════════════════
// Simple API Client for testing Cloud API endpoints
// ═══════════════════════════════════════════════════════════════════

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

interface HealthResponse {
  status: string;
  timestamp: string;
}

interface GamesResponse {
  games: unknown[];
}

interface UploadUrlResponse {
  uploadUrl: string;
  expiresIn: string;
  file: string;
}

interface VersionInfo {
  name: string;
  generation: string;
  size: string;
  updated: string;
  isLatest: boolean;
}

interface VersionsResponse {
  versions: VersionInfo[];
  total: number;
}

class ApiClient {
  private baseUrl: string;
  private authToken: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  clearAuthToken() {
    this.authToken = null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.authToken && { Authorization: `Bearer ${this.authToken}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { data: null, error: errorData.error || `HTTP ${response.status}` };
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: (error as Error).message };
    }
  }

  // Health check (no auth required)
  async healthCheck(): Promise<ApiResponse<HealthResponse>> {
    return this.request<HealthResponse>('/health');
  }

  // Fetch games (auth required)
  async getGames(): Promise<ApiResponse<GamesResponse>> {
    return this.request<GamesResponse>('/api/games');
  }

  // Get upload URL (auth required)
  async getUploadUrl(): Promise<ApiResponse<UploadUrlResponse>> {
    return this.request<UploadUrlResponse>(
      '/api/games/upload-url',
      { method: 'POST' }
    );
  }

  // Upload games data using signed URL
  async uploadGames(uploadUrl: string, gamesData: unknown): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gamesData),
      });

      if (!response.ok) {
        return { data: null, error: `Upload failed: HTTP ${response.status}` };
      }

      return { data: undefined, error: null };
    } catch (error) {
      return { data: null, error: (error as Error).message };
    }
  }

  // List versions (auth required)
  async listVersions(): Promise<ApiResponse<VersionsResponse>> {
    return this.request<VersionsResponse>('/api/versions');
  }

  // Get specific version (auth required)
  async getVersion(generation: string): Promise<ApiResponse<unknown>> {
    return this.request<unknown>(`/api/versions/${generation}`);
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);
