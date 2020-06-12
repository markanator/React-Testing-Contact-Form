import React from 'react';
import {render,fireEvent,cleanup } from '@testing-library/react';
import ContactForm from '../ContactForm';

// running a cleanup after all every test
afterEach(cleanup);

// Test 1: renders w/out crashing
test('renders without crashing',()=>{
    const {getByTestId} = render(<ContactForm/>);
    expect(getByTestId('App')).toBeTruthy();
})

// Test 2: get firstName input
test('FIRSTNAME input checking', ()=>{
    const {getByTestId} = render(<ContactForm />);

    const firstNameInput = getByTestId(/firstName/i);

    fireEvent.change(firstNameInput,{ target: {value: 'mark'}})

    expect(firstNameInput.value).toBe('mark');
})

// Test 3: get lastName input
test('LASTNAME input checking', ()=>{
    const {getByTestId} = render(<ContactForm />);

    const TextInput = getByTestId(/lastname/i);

    fireEvent.change(TextInput,{ target: {value: 'Ambro'}})

    expect(TextInput.value).toBe('Ambro');
})

// Test 4: get email input
test('EMAIL input checking', ()=>{
    const {getByTestId} = render(<ContactForm />);

    const TextInput = getByTestId(/email/i);

    fireEvent.change(TextInput,{ target: {value: 'mark@test.com'}})

    expect(TextInput.value).toBe('mark@test.com');
})

// Test 5: get email input
test('TEXTAREA input checking', ()=>{
    const {getByTestId} = render(<ContactForm />);

    const TextInput = getByTestId(/message/i);

    fireEvent.change(TextInput,{ target: {value: 'Hello world!'}})

    expect(TextInput.value).toBe('Hello world!');
})

// Test 6: Empty Form Submit, Multi-Error checking
test('Empty Form Submit, Multi-Error checking', async ()=>{
    const { getByText, findAllByText } = render(<ContactForm />);
    
    fireEvent.click(getByText(/submit/i));

    const err = await findAllByText(/error/i);

    expect(err).toBeTruthy();
    expect(err).toHaveLength(3);
})

// Test 7: firstname required check
test('firstname required check', async ()=>{
    const {getByTestId,findByTestId} = render(<ContactForm />);

    fireEvent.blur(getByTestId(/firstname/i));

    const err = await findByTestId(/errorFN/i);

    expect(err.textContent).toContain('Looks like there was an error: required')
})
