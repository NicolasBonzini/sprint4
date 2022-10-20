import { screen, render, act } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import { useParams } from "react-router-dom";
import EditForm from "./EditForm";
import { waitFor } from "@testing-library/dom";

import products from "../../__mocks__/products/products";
import putProducts from "../../utils/putProducts";
import getProductById from "../../utils/getProductById";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../utils/putProducts");
jest.mock("../../utils/getProductById");

// Aqui testeo el useParams
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useParams: jest.fn(),
  };
});

const formulario = {
  id: 1,
  title: "Producto",
  description: "iphone 9",
  price: 1,
  rating: {
    rate: 5,
    count: 0,
  },
  stock: 5,
  category: "Categoria",
  images: [
    "https://tito.uy/wp-content/uploads/Dulce-De-Leche-Conaprole-500-Grs.jpg",
  ],
};

describe("testeando putProducts", () => {
  it("Posteo un formulario y me devuelve status de 200", async () => {
    putProducts.mockResolvedValue({
      json: () => new Promise((resolve) => resolve({ status: 200 })),
    });

    const res = await putProducts(formulario).then((res) => res.json());

    expect(res.status).toBe(Number("200"));
  });
});

describe("La pagina del producto obtiene los datos e imprime en pantalla", () => {
  test.only("Me trae el producto y lo muestra correctamente", async () => {
    useParams.mockReturnValue({
      id: "",
    });
    // Simulo el prompt
    window.prompt = jest.fn();

    getProductById.mockImplementation((id) => {
      return new Promise((resolve) => {
        resolve({
          json: () =>
            new Promise((resolve) =>
              resolve(products.filter((prod) => prod.id === id))
            ),
        });
      });
    });

    const form = (await getProductById(4).then((res) => res.json()))[0];
    console.log(form);
    // await waitFor(() => expect(form.images).toHaveLength(5));

    await act(async () => {
      await render(
        <MemoryRouter>
          <EditForm />
        </MemoryRouter>
      );
    });

    const inputName = screen.getByLabelText("Nombre");
  });

  test.skip("La cartita del producto se renderiza correctamente", async () => {
    const id = 6;

    getProductById.mockResolvedValue({
      json: () => new Promise((resolve) => resolve(products[id])),
    });

    const form = await getProductById(0).then((res) => res.json());
  });
});
