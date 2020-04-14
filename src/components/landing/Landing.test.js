import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import Landing from './Landing'
import { act } from 'react-dom/test-utils'

let container = null

beforeEach(()=>{
    container = document.createElement("div")
    document.body.appendChild(container)
})

afterEach(()=>{
    unmountComponentAtNode(container)
    container.remove()
    container = null
})

it("Calculates 1 + 1", () => {
    act(() => {
        render(<Landing/>, container)
    })
    expect(container.textContent).toEqual(2)
})