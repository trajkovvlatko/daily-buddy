import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web';
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo';

import FatalErrorPage from 'src/pages/FatalErrorPage';
import Routes from 'src/Routes';

import { AuthProvider, useAuth } from './auth';
import FileStackContextProvider from './contexts/FileStackContext';
import './styles/scaffold.css';
import './styles/index.css';

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="Daily buddy">
      <AuthProvider>
        <RedwoodApolloProvider useAuth={useAuth}>
          <FileStackContextProvider>
            <Routes />
          </FileStackContextProvider>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
);

export default App;
