const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3333";

export async function api(endpoint, options = {}) {
  const token = localStorage.getItem("@Borala:token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (err) {
      errorData = { error: "Ocorreu um erro inesperado na requisição." };
    }

    throw new Error(
      errorData.error || errorData.message || "Erro na requisição",
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
