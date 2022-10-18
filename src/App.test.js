import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

<<<<<<< HEAD
test('renders learn react link', () => {

=======
const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return {
    user: userEvent.setup(),
    ...render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>),
  };
};

describe("Testeo de toda la navegacion", () => {
  const jsdomPrompt = window.prompt;

  beforeEach(() => {
    window.prompt = () => {};
  });

  afterEach(() => {
    window.prompt = jsdomPrompt;
  });

  test("Al dar click sobre el boton de inicio la app debe navegar a la ruta de inicio", async () => {
    const route = "/";
    const { user } = renderWithRouter(<App />);

    const currentRoute = screen.getByTestId("/");
    const homeButton = screen.getByRole("link", { name: /inicio/i });

    await user.click(homeButton);

    expect(currentRoute.dataset.testid).toMatch(route);
  });

  test("Al dar click sobre el boton del perfil la app debe navegar a la ruta profile", async () => {
    const { user } = renderWithRouter(<App />);

    const currentRoute = screen.getByTestId("/");
    const profileButton = screen.getByRole("link", { name: /profilepic/i });

    await user.click(profileButton);

    expect(currentRoute.dataset.testid).toMatch(/profile/i);
  });

  test("Al dar click sobre el boton de productos la app debe navegar a la ruta products", async () => {
    const { user } = renderWithRouter(<App />);

    const currentRoute = screen.getByTestId("/");
    const productsButton = screen.getByRole("link", { name: /productos/i });

    await user.click(productsButton);

    expect(currentRoute.dataset.testid).toMatch(/products/i);
  });

  test("Al dar click sobre el boton de tiendas la app debe navegar a la ruta de stores", async () => {
    const { user } = renderWithRouter(<App />);

    const currentRoute = screen.getByTestId("/");
    const storesButton = screen.getByRole("link", { name: /tiendas/i });

    await user.click(storesButton);

    expect(currentRoute.dataset.testid).toMatch(/stores/i);
  });

  test("Al dar click para acceder a la ruta profile debe aparecer la vista de error404", async () => {
    const { user } = renderWithRouter(<App />);

    const profileButton = screen.getByRole("link", { name: /profilepic/i });

    await user.click(profileButton);

    const errorMessage = screen.getByText(/no encontramos la pagina/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("Al dar click para acceder a la ruta stores debe aparecer la vista de error404", async () => {
    const { user } = renderWithRouter(<App />);

    const storesButton = screen.getByRole("link", { name: /tiendas/i });

    await user.click(storesButton);

    const errorMessage = screen.getByText(/no encontramos la pagina/i);
    expect(errorMessage).toBeInTheDocument();
  });
>>>>>>> 2ddec57a168cfb48677437e4b1ad4be98c8bdf6a
});
