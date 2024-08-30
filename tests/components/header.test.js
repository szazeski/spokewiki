import {h} from 'preact';
import Header from '../../src/components/header';
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import {mount} from 'enzyme';

describe('Initial Test of the Header', () => {
    test('Header renders 4 nav items', () => {
        const wrapper = mount(<Header/>);

        expect(wrapper.find('Link').at(0).text()).toEqual('New');
        expect(wrapper.find('Link').at(1).text()).toEqual('All');
        expect(wrapper.find('Link').at(2).text()).toBe('Queue');
        expect(wrapper.find('Link').at(3).text()).toBe('Request');
        expect(wrapper.find('Link').at(4).text()).toBe('Settings');
    });
});
