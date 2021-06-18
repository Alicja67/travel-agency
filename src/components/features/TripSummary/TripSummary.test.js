import React from 'react';
import { shallow } from 'enzyme';
import TripSummary from './TripSummary';


describe('Component TripSummary', () => {
  it(`should render correct link with id = 'abc'`, () => {
    const expectedId = 'abc';
    const expectedLink = '/trip/abc';
    const component = shallow(<TripSummary  image={'image.jpg'} name={'name'} id={expectedId} days={1} cost={'cost'} />);
    // console.log(component.debug());
    expect(component.find('.link').prop('to')).toEqual(expectedLink);
  });

  it('should render correct image and alt', () => {
    const expectedImage = 'image.jpg';
    const expectedAlt = 'name';
    const component = shallow(<TripSummary image={expectedImage} name={expectedAlt} id={'id'} days={1} cost={'cost'} />);
    // console.log(component.debug());

    expect(component.find('img').prop('src')).toEqual(expectedImage);

    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
  });

  it('should render correct name, days, cost', () => {
    const expectedName = 'name';
    const expectedCost = '$150';
    const expectedDays = 1;
    const component = shallow(<TripSummary image={'image.jpg'} name={expectedName} id={'id'} days={expectedDays} cost={expectedCost}  />);
    // console.log(component.debug());
    expect(component.find('.details span').at(0).text()).toEqual(`${expectedDays} days`);
    expect(component.find('.details span').at(1).text()).toEqual(`from ${expectedCost}`);
    expect(component.find('.title').text()).toEqual(expectedName);
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should render tags in span', () => {
    const tags = ['a', 'b', 'c'];
    const component = shallow(<TripSummary tags={tags} image={'image.jpg'} name={'name'} id={'id'} days={1} cost={'cost'}  />);
    // console.log(component.debug());
    expect(component.find('.tag').at(0).text()).toEqual(tags[0]);
    expect(component.find('.tag').at(1).text()).toEqual(tags[1]);
    expect(component.find('.tag').at(2).text()).toEqual(tags[2]);
  });

  it('should not render .tags if tags are undefined', () => {
    const component = shallow(<TripSummary image={'image.jpg'} name={'name'} id={'id'} days={1} cost={'cost'}  />);
    // console.log(component.debug());
    expect(component.exists('.tags')).toBe(false);
  });
});
