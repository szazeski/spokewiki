import {h} from 'preact';
import Header from '../src/components/header';
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import {shallow} from 'enzyme';

describe('Initial Test of the Header', () => {
    test('Header renders 4 nav items', () => {
        const context = shallow(<Header/>);
        expect(context.find('Link').length).toBe(5);
        // expect(context.find('Link')[0].text()).toBe('New');
        // expect(context.find('Link')[1].text()).toBe('All');
        // expect(context.find('Link')[2].text()).toBe('Queue');
        // expect(context.find('Link')[3].text()).toBe('Settings');
    });
});
