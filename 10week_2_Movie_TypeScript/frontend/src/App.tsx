import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthProvider from './context/AuthContext'

import RootLayout from './layout/rootlayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import HomePage from './components/homepage'

import Category from './Movie/Category'
import NowPlaying from './Movie/nowplaying'
import Popular from './Movie/popular'
import TopRated from './Movie/TopRated'
import Upcoming from './Movie/upcoming'
import MovieDetail from './Movie/card/moviedetail'
import Search from './Search/search'
import NotFound from './NotFound/NotFound'
import Signup from './Authentication/signup'
import Login from './Authentication/login'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route path="/search" element={<Search />} />

            <Route path="/category" element={<Category />} />
            <Route path="/category/nowplaying" element={<NowPlaying />} />
            <Route path="/category/popular" element={<Popular />} />
            <Route path="/category/toprated" element={<TopRated />} />
            <Route path="/category/upcoming" element={<Upcoming />} />
            <Route path="/movie/:movieId" element={<MovieDetail />} />

            <Route path="*" element={<NotFound/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </QueryClientProvider>
  );
}

export default App
