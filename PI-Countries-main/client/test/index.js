import React from 'react';
import LandingPage from "../src/components/LandingPage"
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';


configure({ adapter: new Adapter() });

describe('<LandingPage /> Mounted', () => {

    it("Renderiza sin Romperse", () => {
        shallow(<LandingPage />);
      });

      it("Renderiza el botón", () => {
        const render = shallow(<LandingPage />);
        const button = <button> Log in </button>;
        expect(render.contains(button)).toEqual(true);
      });
})