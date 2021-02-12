import React from 'react';
import ReactDOM from 'react-dom';
import '.src/index.css';
import App from '.src/App';
import * as serviceWorker from '.src/serviceWorker';

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
