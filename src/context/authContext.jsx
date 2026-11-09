// src/context/authContext.jsx
import { createContext, useCallback, useEffect, useState } from "react";
import { api, TOKEN_STORAGE_KEY } from "../lib/api";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Kept so existing toggle UI still works (login vs signup view)
  const [login, setLogin] = useState(true);

  const persistUser = useCallback((nextUser) => {
    setUser(nextUser);
    setIsAuthenticated(!!nextUser);
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await api.get("/profile/");
      if (res.data?.success) persistUser(res.data.data);
      else clearSession();
    } catch {
      clearSession();
    } finally {
      setLoading(false);
    }
  }, [persistUser, clearSession]);

  // ---- Register ----
  const registerUser = async ({ email, password, password2, first_name, last_name, phone, current_mode }) => {
    try {
      const res = await api.post("/accounts/register/", {
        email,
        password,
        password2: password2 || password,
        first_name: first_name || "",
        last_name: last_name || "",
        phone: phone || "",
        current_mode: current_mode || "Buyer",
      });
      if (res.data?.success) {
        return { success: true, data: res.data.data };
      }
      return { success: false, error: res.data?.error || "Registration failed" };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || "Registration failed" };
    }
  };

  // ---- Resend OTP ----
  const resendOTP = async (email) => {
    try {
      const res = await api.post("/accounts/resend-otp/", { email });
      if (res.data?.success) return { success: true, message: res.data.message };
      return { success: false, error: res.data?.error || "Failed to resend OTP" };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || "Failed to resend OTP" };
    }
  };

  // ---- Verify OTP ----
  const verifyOTP = async ({ email, otp }) => {
    try {
      const res = await api.post("/accounts/verify-otp/", { email, otp });
      if (res.data?.success) {
        const { user: verified, token } = res.data.data || {};
        if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token);
        if (verified) persistUser(verified);
        else await checkAuth();
        return { success: true, data: res.data.data };
      }
      return { success: false, error: res.data?.error || "OTP verification failed" };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || "OTP verification failed",
        code: err.response?.data?.code,
      };
    }
  };

  // ---- Login ----
  const loginUser = async ({ identifier, password, remember_me = false }) => {
    try {
      const res = await api.post("/accounts/sign-in/", { identifier, password, remember_me });
      if (res.data?.success) {
        const { token, user: signedIn } = res.data.data || {};
        if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token);
        if (signedIn) persistUser(signedIn);
        else await checkAuth();
        return { success: true, data: res.data.data };
      }
      return { success: false, error: res.data?.error || "Login failed" };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || "Login failed",
        code: err.response?.data?.code,
      };
    }
  };

  // ---- Logout ----
  const logoutUser = async () => {
    try {
      await api.post("/accounts/logout/");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      clearSession();
    }
  };

  // ---- Select mode ----
  const updateUserMode = async (mode, gender = "Male") => {
    try {
      const res = await api.post("/accounts/select-mode/", { mode, gender });
      if (res.data?.success) {
        setUser((prev) => (prev ? { ...prev, current_mode: res.data.data.current_mode, gender: res.data.data.gender } : prev));
        return { success: true, data: res.data.data };
      }
      return { success: false, error: res.data?.error || "Failed to update mode" };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || "Failed to update mode" };
    }
  };

  // ---- Profile ----
  const refreshUser = useCallback(async () => {
    try {
      const res = await api.get("/profile/");
      if (res.data?.success) {
        persistUser(res.data.data);
        return { success: true, data: res.data.data };
      }
      return { success: false, error: res.data?.error || "Failed to refresh" };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || "Failed to refresh" };
    }
  }, [persistUser]);

  const updateProfile = async (payload) => {
    try {
      const res = await api.post("/profile/edit/", payload);
      if (res.data?.success) {
        persistUser(res.data.data);
        return { success: true, data: res.data.data };
      }
      return { success: false, error: res.data?.error || "Update failed" };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || "Update failed" };
    }
  };

  const uploadAvatar = async (file) => {
    try {
      const fd = new FormData();
      fd.append("avatar", file);
      const res = await api.post("/profile/avatar/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.success) {
        setUser((prev) =>
          prev ? { ...prev, profile: { ...prev.profile, avatar_url: res.data.data.avatar_url } } : prev
        );
        return { success: true, data: res.data.data };
      }
      return { success: false, error: res.data?.error || "Upload failed" };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || "Upload failed" };
    }
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <authContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        setLogin,
        api,
        registerUser,
        resendOTP,
        verifyOTP,
        loginUser,
        logoutUser,
        updateUserMode,
        refreshUser,
        updateProfile,
        uploadAvatar,
        checkAuth,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;