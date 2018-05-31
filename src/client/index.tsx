import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Observe, observable, watch} from 'rewire-core';
import { getit, getitAsync } from './gql';
import gql from 'graphql-tag';

// import {Observe, observable, watch} from 'rewire-core/Observe';

const employee = observable({name: 'Some Guy', email: 'someone@gmail.com'});
setTimeout(() => employee.name = 'dude', 3000); // update the name property asynchronously 
watch(() => employee.name, () => employee.name); // watch any changes to name and log them to the console.
 
// use plain ole react components. Observe will take a dependency on all 
// properties accessed during render and only re-render the input when those dependencies change. 

const r = getitAsync().then(( json ) => {
  const data = json.data.searchType;
  const airport = observable(data[0]);
  console.log(airport);
  setTimeout(() => airport.name = 'dunkin donuts', 3000); // update the name property asynchronously 
  watch(() => airport.name, () => console.log('im changed!', airport));
});

ReactDOM.render((
  <div>
    <h4> hello </h4>
    <Observe render={() => <input value={employee.name} onChange={(evt) => this.stuff()} />} />
  </div>
), document.getElementById('root'));
