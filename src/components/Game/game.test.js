import React from 'react';
import { shallow } from 'enzyme';
import Game from './Game';
import PlayerForm from '../PlayerForm/PlayerForm'
import checkPropTypes from 'check-prop-types';

const setUp = (props) => {
  let component = shallow(<Game {...props}/>)
  return component;
}

describe('testing Game Component', () => {
  let component;
  beforeEach(() => {
    const props = {
      playAgain: () => 'Fake fn',
    }
    component = setUp(props);
  })

  describe('testing prop types', () => {
    it ('should not throw a warning', () => {
      const testProps = {
        playAgain: () => 'Fake fn',
      }
      const propsErr = checkPropTypes(Game.propTypes, testProps, 'prop', Game);
      expect(propsErr).toBeUndefined();
    })

    it('should throw a warning', () => {
      const testProps = {
        playAgain: false,
      }
      const propsErr = (/Failed prop type/).test(checkPropTypes(Game.propTypes, testProps, 'prop', Game));
      expect(propsErr).toBe(true);

    })
  })
  it ('should render Player Form without errors', () => {
    let wrapper = component.find(`[data-test="Player Form"]`);
    expect(wrapper.length).toBe(1);
    wrapper = component.find(`[data-test="Board and GameInfo"]`);
    expect(wrapper.length).toBe(0);
    wrapper = component.find(`[data-test="Winner"]`);
    expect(wrapper.length).toBe(0)
  })

//props() returns props object for root node of wrapper. Must be a single node wrapper. The wrapper is now a double node wrapper, so can't call props. Call childAt(1) first
  it('should render Board and GameInfo if showForm is false', () => {
    let childComponent = component.find('.playerform-container').childAt(1);
    childComponent.props().setPlayerNames('whoeever', 'nobody');
    let wrapper = component.find(`[data-test="Board and GameInfo"]`);
    expect(wrapper.length).toBe(1);
    wrapper = component.find(`[data-test="Player Form"]`);
    expect(wrapper.length).toBe(0);
    wrapper = component.find(`[data-test="Winner"]`);
    expect(wrapper.length).toBe(0)
  })
})
