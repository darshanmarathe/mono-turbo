interface AuthState {
    accessToken: string | null;
    login: (token: string) => void;
    logout: () => void;
}
export declare const useAuthStore: import("zustand").UseBoundStore<import("zustand").StoreApi<AuthState>>;
export {};
