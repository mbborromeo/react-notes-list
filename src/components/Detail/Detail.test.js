import React from "react";
import { render, wait, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import axios from 'axios-jsonp-pro';
import { StaticRouter } from 'react-router-dom';
import Detail from './Detail';

describe('Detail', () => {
  it('reads corresponding data for ID from URL', async () => {
    // Mock jsonp to return canned data
    jest.spyOn(axios, 'jsonp');
    axios.jsonp.mockResolvedValue([
      {
        id: 223,
        title: 'Test Item',
        completed: false
      }
    ]);

    // Use the asynchronous version of act to apply resolved promises
    // await act(async () => {
    //   render(<Detail match={{ params: { id: "223" } }} />, container);
    // });
    render(
      <StaticRouter>
        <Detail match={{ params: { id: "223" } }} />
      </StaticRouter>
    );

    // Make sure loading indicator comes up first
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await wait(
      // () => expect(screen.getByText('223')).toBeInTheDocument()

      // Error: received value must be an HTMLElement or an SVGElement. Received has value: null
      () => expect(screen.queryByText('223')).toBeInTheDocument()
      
      // () => expect(screen.querySelector('#id').textContent).toBe( 'ID: 223' )
      // () => expect(screen.findBy('#id').textContent).toBe( 'ID: 223' )
      // () => expect(screen.querySelector('#id')).toHaveTextContent(/223/)
    );

    // await wait(
    //   () => expect(screen.getByText('Test Item')).toBeInTheDocument()
    // );

    // await wait(
    //   () => expect(screen.getByText('false')).toBeInTheDocument()
    // );
    
    // remove the mock to ensure tests are completely isolated
    axios.jsonp.mockRestore();
  });

});