import { FatalErrorBoundary, RedwoodProvider } from "@redwoodjs/web";
import { RedwoodApolloProvider } from "@redwoodjs/web/apollo";

import possibleTypes from "src/graphql/possibleTypes";

import FatalErrorPage from "src/pages/FatalErrorPage";
import Routes from "src/Routes";

import { AuthProvider, useAuth } from "./auth";
import FileStackContextProvider from "./contexts/FileStackContext";
import "./styles/scaffold.css";
import "./styles/index.css";

const graphQLClientConfig = {
  cacheConfig: {
    possibleTypes: possibleTypes.possibleTypes,
  },
};

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="Daily buddy">
      <AuthProvider>
        <RedwoodApolloProvider
          useAuth={useAuth}
          graphQLClientConfig={graphQLClientConfig}
        >
          <FileStackContextProvider>
            <Routes />
          </FileStackContextProvider>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
);

export default App;
