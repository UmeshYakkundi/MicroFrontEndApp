import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Header from './Header';
import AddDevice from './AddDevice';

const root = createRoot(document.getElementById('root'));
root.render(
<>
<Header />
<AddDevice/>
</>
);