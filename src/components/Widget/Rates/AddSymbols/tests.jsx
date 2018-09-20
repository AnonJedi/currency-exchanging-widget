import React from 'react';
import { shallow } from 'enzyme';

import AddSymbols from '.';
import fixtures from './fixtures';

const MockGenerator = jest.fn();

describe('AddSymbols Component', () => {
  test('should render with empty symbols object', () => {
    const wrapper = shallow(<AddSymbols symbols={{}} onSymbolsSubmit={() => {}} />);
    expect(wrapper.find('.dropdown_label').text()).toEqual('ADD NEW CURRENCY');
    expect(wrapper.state('isOpened')).toBe(false);

    wrapper.find('.dropdown_label').simulate('click');
    expect(wrapper.state('isOpened'));
    expect(wrapper.find('.dropdown_list').length).toEqual(1);
    expect(wrapper.find('.dropdown_item').length).toEqual(0);

    wrapper.find('.dropdown_label').simulate('click');
    expect(wrapper.state('isOpened')).toBe(false);
    expect(wrapper.find('.dropdown_list').length).toEqual(0);

    wrapper.unmount();
  });

  test('should submit a pair', () => {
    const onSymbolsSubmit = new MockGenerator();

    const wrapper = shallow(<AddSymbols symbols={fixtures.symbols} onSymbolsSubmit={onSymbolsSubmit} />);
    wrapper.find('.dropdown_label').simulate('click');

    expect(wrapper.find('.dropdown_item').length).toEqual(2);
    expect(wrapper.find('.dropdown_item .selected').length).toEqual(0);

    wrapper.find('.dropdown_item').first.simulate('click');
    expect(wrapper.find('.dropdown_item .selected').length).toEqual(1);

    wrapper.find('.dropdown_item').last.simulate('click');
    expect(wrapper.state('isOpened')).toBe(false);

    const [args] = onSymbolsSubmit.mock;
    expect(args[0]).toEqual(fixtures.symbols.USD.id);
    expect(args[1]).toEqual(fixtures.symbols.GBP.id);

    wrapper.unmount();
  });

  test('should select and unselect symbol', () => {
    const wrapper = shallow(<AddSymbols symbols={fixtures.symbols} onSymbolsSubmit={() => {}} />);
    wrapper.find('.dropdown_label').simulate('click');

    expect(wrapper.find('.dropdown_item').length).toEqual(2);
    expect(wrapper.find('.dropdown_item .selected').length).toEqual(0);

    wrapper.find('.dropdown_item').first.simulate('click');
    expect(wrapper.find('.dropdown_item .selected').length).toEqual(1);

    wrapper.find('.dropdown_item').first.simulate('click');
    expect(wrapper.find('.dropdown_item .selected').length).toEqual(0);

    wrapper.unmount();
  });
});
