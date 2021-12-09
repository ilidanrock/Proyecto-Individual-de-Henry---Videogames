import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
// import isReact from "is-react";
import VideoGameCreated from "../components/VideoGameCreated.jsx"
import {store} from '../store/index'

configure({ adapter: new Adapter() });

describe("<VideoGameCreated/>", () => {

  describe("<Create/>", () => {
    // const mockStore = configureStore([thunk]);
    let wrapper
    // let store = mockStore(state);
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <VideoGameCreated />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Debería renderizar un form", () => {
      expect(wrapper.find("form")).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "Nombre:"', () => {
      expect(wrapper.find("label").at(0).text()).toEqual("Nombre:");
    });


    it('Debería renderizar un label con el texto "Descripción:"', () => {
      expect(wrapper.find("label").at(1).text()).toEqual("Descripción:");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "released"', () => {
      expect(wrapper.find('input[name="released"]')).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "Fecha de lanzamiento:"', () => {
      expect(wrapper.find("label").at(2).text()).toEqual("Fecha de lanzamiento:");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "rating"', () => {
      expect(wrapper.find('input[name="rating"]')).toHaveLength(1);
    });

    it('Debería renderizar un button con "type" igual a "submit" y con texto "Volver"', () => {
      expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
      expect(wrapper.find("button").at(0).text()).toEqual("Volver");
    });
  });
});
