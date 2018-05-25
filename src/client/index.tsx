import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Observe, observable, watch} from 'rewire-core';
import {query, getit} from './gql';

// import {Observe, observable, watch} from 'rewire-core/Observe';

const employee = observable({name: 'Some Guy', email: 'someone@gmail.com'});
setTimeout(() => employee.name = 'dude', 5000); // update the name property asynchronously 
watch(() => employee.name, () => console.log(employee.name)); // watch any changes to name and log them to the console.
 
// use plain ole react components. Observe will take a dependency on all 
// properties accessed during render and only re-render the input when those dependencies change. 

getit(query);

ReactDOM.render((
  <div>
    <h2> hello </h2>
    <Observe render={() => <input value={employee.name} onChange={(evt) => employee.name = evt.target.value} />} />
  </div>
), document.getElementById('root'));
