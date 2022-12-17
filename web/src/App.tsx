import { AuthProvider } from '@redwoodjs/auth';

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web';
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo';

import FatalErrorPage from 'src/pages/FatalErrorPage';
import Routes from 'src/Routes';

import './styles/scaffold.css';
import './styles/index.css';

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="Daily buddy">
      <AuthProvider type="dbAuth">
        <RedwoodApolloProvider>
          <Routes />
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
);

export default App;
