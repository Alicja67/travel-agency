import React from 'react';
import { shallow } from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from 'react-datepicker';


describe('Component OrderOption', () => {
  it('should render', () => {
    const component = shallow(<OrderOption name={'name'} />);
    expect(component).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption name={'name'} />);
    expect(component).toEqual({});
  });

  it('should display title', () => {
    const expectedName = 'name';
    const component = shallow(<OrderOption type={'number'} name={expectedName} />);
    // console.log(component.debug());

    expect(component.find('.title').text()).toEqual(expectedName);
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });

    /* common tests */
    it('passes dummy test', () => {
      // console.log(component.debug());
      // console.log(subcomponent.debug());
      expect(1).toBe(1);
    });

    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);

          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }

      case 'icons' : {
        it('should render', () => {
          const icon = renderedSubcomponent.find('.icon');
          const iconActive = renderedSubcomponent.find('.iconActive');
          // console.log(icon.debug());

          expect(icon.length).toBe(2);
          expect(iconActive.length).toBe(1);
        });

        it('should run setOrderOption fn on click', () => {
          renderedSubcomponent.find('.icon').at(1).simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue});
        });
        break;
      }

      case 'checkboxes' : {
        it('should render', () => {
          const checkboxes = renderedSubcomponent.find('input[type="checkbox"]');
          expect(checkboxes.length).toBe(mockProps.values.length);

          const activeCheckbox = renderedSubcomponent.find('input[type="checkbox"]').at(0);
          expect(activeCheckbox.prop('checked')).toBe(true);
        });

        it('should run setOrderOption fn on change', () => {
          renderedSubcomponent.find('input[type="checkbox"]').at(1).simulate('change', {currentTarget: {checked: true}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [ mockProps.currentValue, testValue ]});
        });

        break;
      }

      case 'number' : {
        it('should render', () => {
          const input = renderedSubcomponent.find('input[type="number"]');
          expect(input.length).toBe(1);
          expect(input.prop('min')).toBe(mockProps.limits.min);
          expect(input.prop('max')).toBe(mockProps.limits.max);
        });

        it('should run setOrderOption fn on change', () => {
          renderedSubcomponent.find('.inputSmall').simulate('change', {currentTarget: {value: testValueNumber}} );
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });

        break;
      }

      case 'text' : {
        it('should render', () => {
          const text = renderedSubcomponent.find('input[type="text"]');
          expect(text.length).toBe(1);
          expect(text.prop('value')).toBe(mockProps.currentValue);

        });

        it('should run setOrderOption fn on change', () => {
          renderedSubcomponent.find('input[type="text"]').simulate('change', {currentTarget: { value: testValue }});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });

        break;
      }

      case 'date' : {
        it('should render', () => {
          const date = renderedSubcomponent.find(DatePicker);
          expect(date.length).toBe(1);
        });

        it('should run setOrderOption fn on change', () => {
          renderedSubcomponent.find(DatePicker).simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
        });

        break;
      }
    }
  });
}
