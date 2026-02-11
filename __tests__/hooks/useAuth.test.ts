import { useAuth } from "@/hooks/useAuth";

describe("useAuth Hook", () => {
  // Guardamos la referencia original para no romper otros tests
  const originalLocation = window.location;

  beforeEach(() => {
    localStorage.clear();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    useAuth.setState({ userEmail: null });

    // Mock de window.location
    // Usamos delete + assignment con new URL() para evitar errores de internal slots en JSDOM
    delete (window as any).location;
    window.location = new URL("http://localhost/") as any;
  });

  afterAll(() => {
    // Restauramos al terminar el set de pruebas
    window.location = originalLocation as any;
  });

  test("debe guardar el token y el email al hacer login", () => {
    const email = "test@example.com";
    const password = "password123";
    useAuth.getState().login(email, password);
    expect(localStorage.getItem("token")).toBeDefined();
    expect(localStorage.getItem("user_email")).toBe(email);
    expect(useAuth.getState().userEmail).toBe(email);
  });

  test("debe limpiar el almacenamiento al hacer logout", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    useAuth.getState().login("test@example.com", "123");
    useAuth.getState().logout();

    expect(localStorage.getItem("token")).toBeNull();

    consoleSpy.mockRestore();
  });

  test("debe recuperar la sesión con checkAuth", () => {
    localStorage.setItem("user_email", "persisted@test.com");
    useAuth.getState().checkAuth();
    expect(useAuth.getState().userEmail).toBe("persisted@test.com");
  });
});
