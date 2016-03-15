import {expect} from 'chai'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import aboutDetails from '../components/aboutDetails'

function setup() {
  let props = {
    params:{name: 'xxx'}
  }  

  let renderer = TestUtils.createRenderer()
  
  renderer.render(React.createElement(aboutDetails, props));
  
  let output = renderer.getRenderOutput()

  console.log(output);

  return {
    props,
    output,
    renderer
  }
}

describe('components', () => {
  describe('about details', () => {
    it('should render correctly', () => {
      const { output } = setup()

      expect(output.type).equal('div')
      
      let [ lbl, nameVal ] = output.props.children
      
      expect(lbl).to.equal('Details for ')

      expect(nameVal).to.equal('xxx')            
    })

    // it('should call addTodo if length of text is greater than 0', () => {
    //   const { output, props } = setup()
    //   let input = output.props.children[1]
    //   input.props.onSave('')
    //   expect(props.addTodo.calls.length).toBe(0)
    //   input.props.onSave('Use Redux')
    //   expect(props.addTodo.calls.length).toBe(1)
    // })
  })
})