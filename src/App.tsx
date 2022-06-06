import { MantineProvider, TypographyStylesProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Clients from './components/pages/Clients';
import Login from './components/pages/Login';
import Organization from './components/pages/Organization';
import Projects from './components/pages/Projects';
import Report from './components/pages/Report';
import ResetPassword from './components/pages/ResetPassword';
import Timer from './components/pages/Timer';
import ProtectedRoute from './components/ProtectedRoute';
import UserProvider from './components/UserProvider';
import { Routes as ERoutes } from './constants/routes';

function NotFound() {
  return <h1>Not found</h1>;
}

function Fallback() {
  return <h1>Loading...</h1>;
}

function NotImplemented() {
  return <h1>Not implemented</h1>;
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <TypographyStylesProvider>
            <Suspense fallback={<Fallback />}>
              <Router>
                <UserProvider>
                  <Routes>
                    <Route element={<ProtectedRoute />}>
                      <Route index element={<Timer />} />
                      <Route path={ERoutes.REPORT} element={<Report />} />
                      <Route path={ERoutes.PROJECTS} element={<Projects />} />
                      <Route path={ERoutes.CLIENTS} element={<Clients />} />
                      <Route path={ERoutes.ORGANIZATION} element={<Organization />} />
                      <Route path={ERoutes.PROFILE} element={<NotImplemented />} />
                      <Route path={ERoutes.SETTINGS} element={<NotImplemented />} />
                    </Route>
                    <Route path={ERoutes.LOGIN} element={<Login />} />
                    <Route path={ERoutes.RESET_PASSWORD} element={<ResetPassword />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </UserProvider>
              </Router>
              <ReactQueryDevtools initialIsOpen={false} />
            </Suspense>
          </TypographyStylesProvider>
        </NotificationsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
